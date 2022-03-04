import { Part, update as updatePart } from "./part";
import { audioContext, playInterval, getQuantizedTime } from "./audio";
import * as soundEffect from "./soundEffect";

export type Track = {
  parts: Part[];
  notesStepsCount: number;
  notesStepsIndex: number;
  noteInterval: number;
  nextNotesTime: number;
  speedRatio: number;
  isPlaying: boolean;
  isLooping: boolean;
};

let tracks: Track[] = [];

export function init() {
  stopAll();
  tracks = [];
}

export function get(
  parts: Part[],
  notesStepsCount: number,
  speedRatio = 1
): Track {
  parts.forEach((p) => {
    p.noteIndex = 0;
  });
  const t = {
    parts,
    notesStepsCount,
    notesStepsIndex: undefined,
    noteInterval: undefined,
    nextNotesTime: undefined,
    speedRatio,
    isPlaying: false,
    isLooping: false,
  };
  initTrack(t);
  return t;
}

function initTrack(track: Track) {
  const noteInterval = playInterval / 4 / track.speedRatio;
  track.notesStepsIndex = 0;
  track.noteInterval = noteInterval;
  track.nextNotesTime =
    getQuantizedTime(audioContext.currentTime) - noteInterval;
}

export function add(track: Track) {
  tracks.push(track);
}

export function remove(track: Track) {
  tracks = tracks.filter((t) => t !== track);
}

export function update() {
  tracks.forEach((t) => {
    updateTrack(t);
  });
}

export function play(track: Track, isLooping = false) {
  track.isLooping = isLooping;
  initTrack(track);
  track.isPlaying = true;
}

export function stop(track: Track) {
  track.isPlaying = false;
  track.parts.forEach((p) => {
    soundEffect.stop(p.soundEffect);
  });
}

export function stopAll() {
  tracks.forEach((t) => {
    stop(t);
  });
}

function updateTrack(track: Track) {
  if (!track.isPlaying) {
    return;
  }
  const currentTime = audioContext.currentTime;
  if (currentTime < track.nextNotesTime) {
    return;
  }
  track.nextNotesTime += track.noteInterval;
  if (track.nextNotesTime < currentTime - playInterval) {
    track.nextNotesTime = getQuantizedTime(currentTime);
  }
  track.parts.forEach((p) => {
    updatePart(track, p, track.nextNotesTime);
  });
  track.notesStepsIndex++;
  if (track.notesStepsIndex >= track.notesStepsCount) {
    if (track.isLooping) {
      track.notesStepsIndex = 0;
    } else {
      track.isPlaying = false;
    }
  }
}

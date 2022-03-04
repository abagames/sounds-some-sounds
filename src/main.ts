import MMLIterator from "mml-iterator";
import * as track from "./track";
import * as trackGenerator from "./trackGenerator";
import * as part from "./part";
import * as soundEffect from "./soundEffect";
import { getHashFromString, pitchToFreq } from "./util";
import {
  init as initAudio,
  setTempo,
  setQuantize,
  setVolume,
  playEmpty,
  resumeAudioContext,
  start as startAudio,
} from "./audio";

export {
  setTempo,
  setQuantize,
  setVolume,
  playEmpty,
  resumeAudioContext,
  startAudio,
};

const random = soundEffect.random;
let baseRandomSeed;
let jingles: { [key: string]: track.Track };
let generatedTrack: track.Track;

export function play(
  name = "0",
  numberOfSounds = 2,
  pitch?: number,
  volume = 1
) {
  playSoundEffect(trackGenerator.playPrefixes[name[0]], {
    seed: baseRandomSeed + getHashFromString(name),
    numberOfSounds,
    pitch,
    volume,
  });
}

export function playBgm(
  name = "0",
  pitch = 69 - 24,
  len = 32,
  interval = 0.25,
  numberOfTracks = 4,
  soundEffectTypes = ["laser", "select", "hit", "hit"],
  volume = 1
) {
  generatedTrack = trackGenerator.generateBgm(
    name,
    pitch,
    len,
    interval,
    numberOfTracks,
    soundEffectTypes,
    volume
  );
  track.add(generatedTrack);
  track.play(generatedTrack, true);
}

export function stopBgm() {
  if (generatedTrack == null) {
    return;
  }
  track.stop(generatedTrack);
  track.remove(generatedTrack);
  generatedTrack = undefined;
}

export function playJingle(
  name = "0",
  isSoundEffect = false,
  note = 69 - 12,
  len = 16,
  interval = 0.25,
  numberOfTracks = 4,
  volume = 1
) {
  const key = `${name}_${isSoundEffect}_${note}_${len}_${interval}_${numberOfTracks}_${volume}`;
  if (jingles[key] == null) {
    const jingle = trackGenerator.generateJingle(
      name,
      isSoundEffect,
      note,
      len,
      interval,
      numberOfTracks,
      volume
    );
    track.add(jingle);
    jingles[key] = jingle;
  }
  track.play(jingles[key]);
}

export function stopJingles() {
  track.stopAll();
}

const mmlQuantizeInterval = 0.125;
let soundEffects: { [key: string]: soundEffect.SoundEffect };
let mmlTrack: track.Track;

export function playMml(
  mmlStrings: string[],
  _options?: { volume?: number; speed?: number; isLooping?: boolean }
) {
  const options = { ...{ volume: 1, speed: 1, isLooping: true }, ..._options };
  let notesStepsCount = 0;
  const tracks = mmlStrings.map((ms) => soundEffect.fromMml(ms));
  tracks.forEach((t) => {
    const s = getNotesStepsCount(t.mml);
    if (s > notesStepsCount) {
      notesStepsCount = s;
    }
  });
  const parts: part.Part[] = tracks.map((t) => {
    const { mml, args } = t;
    const sequence = mmlToQuantizedSequence(mml, notesStepsCount);
    const se = soundEffect.getForSequence(
      sequence,
      args.isDrum,
      args.seed,
      args.type,
      args.volume * options.volume
    );
    return part.get(mml, sequence, se);
  });
  mmlTrack = track.get(parts, notesStepsCount, options.speed);
  track.add(mmlTrack);
  track.play(mmlTrack, options.isLooping);
}

export function stopMml() {
  if (mmlTrack == null) {
    return;
  }
  track.stop(mmlTrack);
  track.remove(mmlTrack);
  mmlTrack = undefined;
}

export function playSoundEffect(
  type: soundEffect.Type = undefined,
  _options?: {
    seed?: number;
    numberOfSounds?: number;
    pitch?: number;
    volume?: number;
  }
) {
  const options = {
    ...{ seed: undefined, numberOfSounds: 2, volume: 1, pitch: undefined },
    ..._options,
  };
  const key = `${type}_${JSON.stringify(options)}`;
  if (soundEffects[key] == null) {
    if (type == null) {
      random.setSeed(options.seed);
      type = soundEffect.types[random.getInt(8)];
    }
    const se = soundEffect.get(
      type,
      options.seed == null ? baseRandomSeed : options.seed,
      options.numberOfSounds,
      options.volume,
      options.pitch == null ? undefined : pitchToFreq(options.pitch)
    );
    soundEffect.add(se);
    soundEffects[key] = se;
  }
  soundEffect.play(soundEffects[key]);
}

export function update() {
  track.update();
  soundEffect.update();
}

export function init(
  baseRandomSeed = 1,
  audioContext: AudioContext = undefined
) {
  setSeed(baseRandomSeed);
  initAudio(audioContext);
  reset();
}

export function reset() {
  track.init();
  jingles = {};
  soundEffect.init();
  soundEffects = {};
  stopMml();
}

export function setSeed(_baseRandomSeed = 1) {
  baseRandomSeed = _baseRandomSeed;
  trackGenerator.setSeed(baseRandomSeed);
}

function getNotesStepsCount(mml: string) {
  const iter = new MMLIterator(mml);
  for (let ne of iter) {
    if (ne.type === "end") {
      return Math.floor(ne.time / mmlQuantizeInterval);
    }
  }
}

function mmlToQuantizedSequence(mml: string, notesStepsCount: number) {
  const notes = [];
  const iter = new MMLIterator(mml);
  for (let ne of iter) {
    if (ne.type === "note") {
      let endStep = Math.floor((ne.time + ne.duration) / mmlQuantizeInterval);
      if (endStep >= notesStepsCount) {
        endStep -= notesStepsCount;
      }
      notes.push({
        pitch: ne.noteNumber,
        quantizedStartStep: Math.floor(ne.time / mmlQuantizeInterval),
        quantizedEndStep: endStep,
      });
    }
  }
  return { notes };
}

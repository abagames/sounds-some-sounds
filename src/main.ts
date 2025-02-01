import MMLIterator from "mml-iterator";
import * as track from "./track";
import * as trackGenerator from "./trackGenerator";
import * as mmlGenerator from "./mmlGenerator";
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
  audioContext,
} from "./audio";
import { Note } from "@tonaljs/tonal";

export type { Type as SoundEffectType } from "./soundEffect";
export {
  setTempo,
  setQuantize,
  setVolume,
  playEmpty,
  resumeAudioContext,
  startAudio,
};

let baseRandomSeed;

export function playSoundEffect(
  type: soundEffect.Type,
  _options?: {
    seed?: number;
    numberOfSounds?: number;
    pitch?: number;
    freq?: number;
    note?: string;
    volume?: number;
  }
): soundEffect.SoundEffect {
  const options = {
    ...{ seed: 0, numberOfSounds: 2, volume: 1 },
    ..._options,
  };
  const key = `${type}_${JSON.stringify(options)}_${baseRandomSeed}`;
  if (soundEffects[key] != null) {
    soundEffect.play(soundEffects[key]);
    return soundEffects[key];
  }
  let freq: number;
  if (options.freq != null) {
    freq = options.freq;
  } else if (options.pitch != null) {
    freq = pitchToFreq(options.pitch);
  } else if (options.note != null) {
    freq = Note.get(
      options.note.toUpperCase().replace("+", "#").replace("-", "b")
    ).freq;
  }
  let numberOfSounds = options.numberOfSounds;
  let attackRatio = 1;
  let sustainRatio = 1;
  if (type === "synth") {
    attackRatio = sustainRatio = 0.2;
  } else if (type === "tone") {
    attackRatio = sustainRatio = 0.1;
    numberOfSounds = 1;
  }
  const se = soundEffect.get(
    type,
    options.seed + baseRandomSeed,
    numberOfSounds,
    options.volume,
    freq,
    attackRatio,
    sustainRatio
  );
  soundEffect.add(se);
  soundEffects[key] = se;
  soundEffect.play(se);
  return se;
}

const mmlQuantizeInterval = 0.125;
let soundEffects: { [key: string]: soundEffect.SoundEffect };
let loopingTrack: track.Track;

export function playMml(
  mmlStrings: string[],
  _options?: { volume?: number; speed?: number; isLooping?: boolean }
): track.Track {
  stopMml();
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
  const t = track.get(parts, notesStepsCount, options.speed);
  track.add(t);
  track.play(t, options.isLooping);
  if (options.isLooping) {
    loopingTrack = t;
  }
  return t;
}

export function stopMml(_track?: track.Track) {
  let t = _track;
  if (t == null) {
    if (loopingTrack != null) {
      t = loopingTrack;
      loopingTrack = undefined;
    } else {
      return;
    }
  }
  track.stop(t);
  track.remove(t);
  loopingTrack = undefined;
}

export function generateMml(option?: mmlGenerator.Option): string[] {
  return mmlGenerator.generate(option);
}

export function update() {
  const currentTime = audioContext.currentTime;
  track.update(currentTime);
  soundEffect.update(currentTime);
}

export function init(
  baseRandomSeed = 1,
  audioContext: AudioContext = undefined,
  gainNode: GainNode = undefined
) {
  setSeed(baseRandomSeed);
  initAudio(audioContext, gainNode);
  reset();
}

export function reset() {
  track.init();
  loopingTrack = undefined;
  jingles = {};
  soundEffect.init();
  soundEffects = {};
}

export function setSeed(_baseRandomSeed = 1) {
  baseRandomSeed = _baseRandomSeed;
  trackGenerator.setSeed(baseRandomSeed);
  mmlGenerator.setSeed(baseRandomSeed);
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

// For backward compatibility (v <= 2.0.0)

let jingles: { [key: string]: track.Track };
let generatedTrack: track.Track;

export function play(
  name = "0",
  numberOfSounds = 2,
  pitch?: number,
  volume = 1
) {
  playSoundEffect(trackGenerator.playPrefixes[name[0]], {
    seed: getHashFromString(name),
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
  stopBgm();
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

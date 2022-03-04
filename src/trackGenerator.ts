import * as soundEffect from "./soundEffect";
import * as track from "./track";
import * as part from "./part";
import { times, getHashFromString, pitchToFreq } from "./util";

type GeneratedParts = {
  noteRatios: number[];
  notes: number[];
  soundEffect: soundEffect.SoundEffect;
};

export const playPrefixes = {
  c: "coin",
  l: "laser",
  e: "explosion",
  p: "powerUp",
  h: "hit",
  j: "jump",
  s: "select",
  u: "random",
  r: "random",
};
const random = soundEffect.random;
let baseRandomSeed = 1;

export function setSeed(_baseRandomSeed: number) {
  baseRandomSeed = _baseRandomSeed;
}

export function generateBgm(
  name: string,
  pitch: number,
  len: number,
  interval: number,
  numberOfTracks: number,
  soundEffectTypes: string[],
  volume: number
) {
  random.setSeed(baseRandomSeed + getHashFromString(name));
  initProgression();
  prevTrack = null;
  let param = random.select(soundEffectTypes);
  const tracks = times(numberOfTracks, () => {
    const randomness = Math.floor(
      Math.abs(random.get() + random.get() - 1) * 3
    );
    const chordOffset = Math.floor((random.get() + random.get() - 1) * 10);
    const velocityRatio = Math.abs(random.get() + random.get() - 1);
    const hasSameNoteWithPrevPart = random.get() < 0.25;
    if (!hasSameNoteWithPrevPart) {
      param = random.select(soundEffectTypes);
    }
    const isLimitNoteWidth = random.get() < 0.5;
    const isLimitNoteResolution = random.get() < 0.5;
    const isRepeatHalf = random.get() < 0.9;
    return generatePart(
      len,
      param,
      pitch,
      0.7,
      randomness,
      chordOffset,
      velocityRatio,
      hasSameNoteWithPrevPart,
      isLimitNoteWidth,
      isLimitNoteResolution,
      isRepeatHalf,
      undefined,
      volume
    );
  });
  return getTrack(tracks, 0.5 / interval);
}

export function generateJingle(
  name: string = "0",
  isSe = false,
  note = 69 - 12,
  len = 16,
  interval = 0.25,
  numberOfTracks = 4,
  volume = 1
) {
  random.setSeed(baseRandomSeed + getHashFromString(name));
  initProgression();
  prevTrack = null;
  let soundEffectType = playPrefixes[name[0]];
  if (soundEffectType == null) {
    soundEffectType = soundEffect.types[random.getInt(8)];
  }
  let durationRatio = 0.8;
  if (isSe) {
    interval /= 4;
    durationRatio /= 2;
  }
  const tracks = times(numberOfTracks, () => {
    const randomness = Math.floor(
      Math.abs(random.get() + random.get() - 1) * 3
    );
    const chordOffset = Math.floor((random.get() + random.get() - 1) * 10);
    const velocityRatio = isSe ? 2 : Math.abs(random.get() + random.get() - 1);
    const hasSameNoteWithPrevPart = random.get() < 0.25;
    const isLimitNoteWidth = isSe ? false : random.get() < 0.5;
    const isLimitNoteResolution = random.get() < 0.5;
    const isRepeatHalf = isSe ? random.get() < 0.25 : random.get() < 0.9;
    const restRatio = random.get(0.5);
    const track = generatePart(
      len,
      soundEffectType,
      note,
      durationRatio,
      randomness,
      chordOffset,
      velocityRatio,
      hasSameNoteWithPrevPart,
      isLimitNoteWidth,
      isLimitNoteResolution,
      isRepeatHalf,
      restRatio,
      volume
    );
    return track;
  });
  return getTrack(tracks, 0.5 / interval);
}

function getTrack(gps: GeneratedParts[], speedRatio: number) {
  const parts = gps.map((t) => {
    const notes = [];
    t.notes.forEach((n, i) => {
      if (n != null) {
        notes.push({ pitch: n + 69, quantizedStartStep: i * 2 });
      }
    });
    return part.get(undefined, { notes }, t.soundEffect);
  });
  return track.get(parts, gps[0].notes.length * 2, speedRatio);
}

let prevTrack: GeneratedParts;

function generatePart(
  len = 32,
  soundEffectName: string,
  pitch = 60,
  durationRatio = 1,
  chordOffset = 0,
  randomness = 0,
  velocityRatio = 1,
  hasSameNoteWithPrevPart = false,
  isLimitNoteWidth = false,
  isLimitNoteResolution = false,
  isRepeatHalf = false,
  restRatio = null,
  volume = 0.1
) {
  const generatedPart = getGeneratedPart(
    soundEffectName,
    pitchToFreq(pitch),
    durationRatio,
    volume
  );
  if (prevTrack != null && hasSameNoteWithPrevPart) {
    generatedPart.noteRatios = prevTrack.noteRatios;
  } else {
    const pattern =
      restRatio != null
        ? createRandomPatternWithRestRatio(len, restRatio)
        : createRandomPattern(len);
    generatedPart.noteRatios = createNoteRatios(
      pattern,
      isLimitNoteWidth ? 0 : -1,
      1,
      velocityRatio,
      isRepeatHalf
    );
  }
  generatedPart.notes = createNotes(
    generatedPart.noteRatios,
    chordOffset,
    randomness,
    isLimitNoteResolution
  );
  prevTrack = generatedPart;
  return generatedPart;
}

function createRandomPattern(len: number) {
  let pattern = times(len, () => false);
  let pi = 4;
  while (pi <= len) {
    pattern = reversePattern(pattern, pi);
    pi *= 2;
  }
  return pattern;
}

function reversePattern(pattern: boolean[], interval) {
  let pt = times(interval, () => false);
  const pn = Math.floor(Math.abs(random.get() + random.get() - 1) * 4);
  for (let i = 0; i < pn; i++) {
    pt[random.getInt(interval - 1)] = true;
  }
  return pattern.map((p, i) => (pt[i % interval] ? !p : p));
}

function createRandomPatternWithRestRatio(len: number, restRatio: number) {
  return times(len, () => random.get() >= restRatio);
}

const chords = [
  [0, 4, 7],
  [0, 3, 7],
  [0, 4, 7, 10],
  [0, 4, 7, 11],
  [0, 3, 7, 10],
];

// I C:0, II D:2, III E:4, IV F:5, V G:7, VI A:9, VII B:11
// M:0, m:1, 7:2, M7:3, m7:4
const progressions = [
  [
    [0, 0],
    [7, 0],
    [9, 1],
    [4, 1],
  ],
  [
    [5, 0],
    [0, 0],
    [5, 0],
    [7, 0],
  ],
  [
    [5, 3],
    [7, 2],
    [4, 4],
    [9, 1],
  ],
  [
    [9, 1],
    [2, 1],
    [7, 0],
    [0, 0],
  ],
  [
    [9, 1],
    [5, 0],
    [7, 0],
    [0, 0],
  ],
];

let progression: number[][];

function initProgression() {
  const baseProgression = random.select(progressions);
  progression = baseProgression.map((bp, i) => [
    random.get() < 0.7
      ? bp[0]
      : progressions[random.getInt(progressions.length)][i][0],
    random.get() < 0.7 ? bp[1] : random.getInt(chords.length),
  ]);
}

function createNoteRatios(
  pattern: boolean[],
  min,
  max,
  velocityRatio,
  isRepeatHalf
) {
  let n = random.get();
  let nv = random.get(-0.5, 0.5);
  let len = pattern.length;
  let cordLength = len / progression.length;
  let noteRatios = [];
  pattern.forEach((p, pi) => {
    let i = Math.floor(pi / cordLength);
    let j = pi % cordLength;
    if (isRepeatHalf && i === Math.floor(progression.length / 2)) {
      noteRatios.push(noteRatios[j]);
      if (noteRatios[j] != null) {
        n = noteRatios[j];
      }
      return;
    }
    if (!p) {
      noteRatios.push(null);
      return;
    }
    noteRatios.push(n);
    nv += random.get(-0.25, 0.25);
    n += nv * velocityRatio;
    if (random.get() < 0.2 || n <= min || n >= max) {
      n -= nv * 2;
      nv *= -1;
    }
  });
  return noteRatios;
}

function createNotes(
  noteRatios: number[],
  offset: number,
  randomness: number,
  isLimitNoteResolution
) {
  let len = noteRatios.length;
  let cordLength = len / progression.length;
  return noteRatios.map((nr, ni) => {
    if (nr == null) {
      return null;
    }
    let i = Math.floor(ni / cordLength);
    let d = progression[i][0];
    let chord = chords[progression[i][1]];
    let n = nr;
    if (isLimitNoteResolution) {
      n = Math.floor(n * 2) / 2;
    }
    let b = Math.floor(n);
    let cn = Math.floor((n - b) * chord.length);
    cn += offset + random.getInt(-randomness, randomness + 1);
    while (cn >= chord.length) {
      cn -= chord.length;
      b++;
    }
    while (cn < 0) {
      cn += chord.length;
      b--;
    }
    return d + b * 12 + chord[cn];
  });
}

function getGeneratedPart(
  soundEffectName,
  freq,
  durationRatio,
  volume
): GeneratedParts {
  return {
    noteRatios: undefined,
    notes: undefined,
    soundEffect: soundEffect.get(
      soundEffectName,
      undefined,
      1,
      volume,
      freq,
      durationRatio,
      durationRatio
    ),
  };
}

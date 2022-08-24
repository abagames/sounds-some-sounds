import { Progression, Chord } from "@tonaljs/tonal";
import { Random } from "./random";
import { times } from "./util";

export type Option = {
  seed?: number;
  noteLength?: number;
  partCount?: number;
  drumPartRatio?: number;
};

const defaultOptions: Option = {
  seed: 0,
  noteLength: 32,
  partCount: 4,
  drumPartRatio: 0.5,
};

const random = new Random();
let baseRandomSeed = 1;

export function setSeed(_baseRandomSeed: number) {
  baseRandomSeed = _baseRandomSeed;
}

export function generate(_options?: Option) {
  const options = { ...defaultOptions, ..._options };
  random.setSeed(baseRandomSeed + options.seed);
  const chordProgressionNotes = generateChordProgression(options.noteLength);
  return times(options.partCount, () => {
    const isDrum = random.get() < options.drumPartRatio;
    if (isDrum) {
      return generateDrumNote(options.noteLength);
    } else {
      return generateMelodyNote(options.noteLength, chordProgressionNotes);
    }
  });
}

function generateMelodyNote(
  noteLength: number,
  chordProgressionNotes: string[][]
) {
  const pattern = createRandomPattern(noteLength, 1);
  const continuingPattern = times(noteLength, () => random.get() < 0.8);
  const randomChordPatterns = random.select([
    [0, 2],
    [0, 1, 2],
    [0, 1, 2, 3],
  ]);
  let seType = random.select([
    "tone",
    "tone",
    "tone",
    "select",
    "laser",
    "synth",
    "hit",
  ]);
  let volume = random.getInt(36, 50);
  if (seType === "synth" || seType === "select") {
    volume = Math.floor(volume * 0.6);
  }
  const baseOctaveOffset = random.getInt(-1, 1);
  const baseNoteDuration = 16;
  let mml = `@${seType}@s${random.getInt(
    999999999
  )} v${volume} l${baseNoteDuration} `;
  let octave = -1;
  let hasPrevNote = false;
  for (let i = 0; i < noteLength; i++) {
    if (!pattern[i]) {
      mml += "r";
      hasPrevNote = false;
      continue;
    }
    if (continuingPattern[i] && hasPrevNote) {
      mml += "^";
      continue;
    }
    hasPrevNote = true;
    const ns = chordProgressionNotes[i][random.select(randomChordPatterns)];
    let o = Number.parseFloat(ns.charAt(ns.length - 1)) + baseOctaveOffset;
    let n = ns
      .substring(0, ns.length - 1)
      .replace("#", "+")
      .replace("b", "-")
      .toLowerCase();
    if (o !== octave) {
      mml += ` o${o}`;
      octave = o;
    }
    mml += n;
  }
  return mml;
}

function generateDrumNote(noteLength: number) {
  const pattern = createRandomPattern(noteLength, 3);
  const continuingPattern = times(noteLength, () => random.get() < 0.4);
  const seType = random.select(["hit", "hit", "click", "explosion"]);
  let volume = random.getInt(36, 50);
  if (seType === "click" || seType === "explosion") {
    volume = Math.floor(volume * 0.5);
  }
  const baseNoteDuration = 16;
  let mml = `@${seType}@d@s${random.getInt(
    999999999
  )} v${volume} l${baseNoteDuration} `;
  let hasPrevNote = false;
  for (let i = 0; i < noteLength; i++) {
    if (!pattern[i]) {
      mml += "r";
      hasPrevNote = false;
      continue;
    }
    if (continuingPattern[i] && hasPrevNote) {
      mml += "^";
      continue;
    }
    hasPrevNote = true;
    mml += "c";
  }
  return mml;
}

const chords = [
  ["I", "IIIm", "VIm"],
  ["IV", "IIm"],
  ["V", "VIIm"],
];
const nextChordsIndex = [
  [0, 1, 2],
  [1, 2, 0],
  [2, 0],
];

function generateChordProgression(len: number): string[][] {
  const key = random.select(["C", "D", "Eb", "F", "G", "A", "Bb"]);
  const octave = 4;
  const chordChangeInterval = 4;
  let chord: string;
  let chordsIndex: number;
  let type: string;
  let tonic: string;
  return times(len, (i) => {
    if (i % chordChangeInterval === 0) {
      if (i === 0) {
        chordsIndex = random.getInt(chords.length - 1);
        chord = random.select(chords[chordsIndex]);
      } else if (random.get() < 0.8 - ((i / chordChangeInterval) % 2) * 0.5) {
        chordsIndex = random.select(nextChordsIndex[chordsIndex]);
        chord = random.select(chords[chordsIndex]);
      }
      const progression = Progression.fromRomanNumerals(`${key}${octave}`, [
        chord,
      ])[0];
      if (progression.charAt(progression.length - 1) === "m") {
        type = "m7";
        tonic = progression.substring(0, progression.length - 1);
      } else {
        type = "7";
        tonic = progression;
      }
    }
    return Chord.getChord(type, tonic).notes;
  });
}

function createRandomPattern(len: number, freq: number) {
  let pattern = times(len, () => false);
  let interval = 4;
  while (interval <= len) {
    pattern = reversePattern(pattern, interval, freq);
    interval *= 2;
  }
  return pattern;
}

function reversePattern(pattern: boolean[], interval: number, freq: number) {
  let pt = times(interval, () => false);
  times(freq, () => {
    pt[random.getInt(interval)] = true;
  });
  return pattern.map((p, i) => (pt[i % interval] ? !p : p));
}

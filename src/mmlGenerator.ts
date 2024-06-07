import { Progression, Chord } from "@tonaljs/tonal";
import { Random } from "./random";
import { times, clamp } from "./util";

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
      return random.get() < 0.5
        ? generateMelodyNote(options.noteLength, chordProgressionNotes)
        : generateChordNote(options.noteLength, chordProgressionNotes);
    }
  });
}

function generateMelodyNote(
  noteLength: number,
  chordProgressionNotes: string[][]
) {
  const seType = random.select(["tone", "synth"]);
  const volume = 32;
  const baseNoteDuration = 16;
  let mml = `@${seType}@s${random.getInt(
    999999999
  )} v${volume} l${baseNoteDuration} `;
  const pattern = createRandomPattern(noteLength, 4, 8, 3);
  let octaveOffset = random.getInt(-1, 1);
  let octave = -1;
  for (let i = 0; i < noteLength; i++) {
    if (random.get() < 0.1) {
      octaveOffset += random.getInt(-1, 2);
    }
    if (!pattern[i]) {
      mml += "r";
      continue;
    }
    const ns = chordProgressionNotes[i][random.getInt(4)];
    let o = clamp(
      Number.parseFloat(ns.charAt(ns.length - 1)) + octaveOffset,
      2,
      7
    );
    const n = ns
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

function generateChordNote(
  noteLength: number,
  chordProgressionNotes: string[][]
) {
  const seType = random.select(["tone", "synth", "select"]);
  const isArpeggio = random.get() < 0.3;
  const volume = isArpeggio ? 24 : 30;
  const baseNoteDuration = 16;
  let mml = `@${seType}@s${random.getInt(
    999999999
  )} v${volume} l${baseNoteDuration} `;
  const arpeggioInterval = random.select([4, 8, 16]);
  const arpeggioPattern = times(arpeggioInterval, () => random.getInt(4));
  const interval = random.select([2, 4, 8]);
  const pattern = isArpeggio
    ? times(noteLength, () => true)
    : createRandomPattern(
        noteLength,
        random.select([1, 1, interval / 2]),
        interval,
        2
      );
  let baseOctave = random.getInt(-1, 1);
  const isReciprocatingOctave = random.get() < (isArpeggio ? 0.3 : 0.8);
  let octaveOffset = 0;
  let octave = -1;
  for (let i = 0; i < noteLength; i++) {
    if (isReciprocatingOctave && i % interval === 0) {
      octaveOffset = (octaveOffset + 1) % 2;
    }
    if (!pattern[i]) {
      mml += "r";
      continue;
    }
    const ns =
      chordProgressionNotes[i][
        isArpeggio ? arpeggioPattern[i % arpeggioInterval] : 0
      ];
    let o = clamp(
      Number.parseFloat(ns.charAt(ns.length - 1)) + baseOctave + octaveOffset,
      2,
      7
    );
    const n = ns
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
  const volume = 36;
  const baseNoteDuration = 16;
  const seType = random.select(["hit", "click", "explosion"]);
  let mml = `@${seType}@d@s${random.getInt(
    999999999
  )} v${volume} l${baseNoteDuration} o2 `;
  const pattern = createRandomPattern(
    noteLength,
    random.getInt(1, 3),
    random.select([4, 8]),
    3
  );
  for (let i = 0; i < noteLength; i++) {
    mml += pattern[i] ? "c" : "r";
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

function createRandomPattern(
  len: number,
  freq: number,
  interval: number,
  loop: number
) {
  let pattern = times(len, () => false);
  for (let i = 0; i < loop; i++) {
    if (interval > len) {
      break;
    }
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

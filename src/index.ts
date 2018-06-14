import * as jsfx from "jsfx";

export let playInterval: number;
export const Preset = jsfx.Preset;
let live;
let random: Random;
let sounds = {};
let tracks: Track[] = [];
let schedulingInterval: number;
let seed;
const playPrefixes = {
  c: Preset.Coin,
  l: Preset.Laser,
  e: Preset.Explosion,
  p: Preset.Powerup,
  h: Preset.Hit,
  j: Preset.Jump,
  s: Preset.Select,
  u: Preset.Lucky
};
const playPrefixArray = values(playPrefixes);
let quantize = 0.5;
let isEmptyPlayed = false;
let prevPlayingFileName: string;

export function init(_seed: number = 0, tempo = 120, fps = 60) {
  live = jsfx.Live({});
  setVolume(0.1);
  seed = _seed;
  random = new Random();
  jsfx.setRandomFunc(random.get);
  playInterval = 60 / tempo;
  schedulingInterval = (1 / fps) * 2;
}

export function setSeed(_seed: number = 0) {
  seed = _seed;
}

export function play(
  name: string = "0",
  note = 69 - 12,
  numberOfSounds: number = 2,
  params = null,
  volume: number = null
) {
  if (live == null) {
    return;
  }
  if (sounds[name] != null) {
    sounds[name].play(volume);
    return;
  }
  random.setSeed(seed + getHashFromString(name));
  if (params == null) {
    let p = playPrefixes[name[0]];
    if (typeof p === "undefined") {
      p = random.select(playPrefixArray);
    }
    params = nArray(numberOfSounds, p);
  }
  sounds[name] = new Sound(params, midiNoteNumberToFrequency(note));
  sounds[name].play(volume);
}

export function setVolume(volume: number) {
  if (live == null) {
    return;
  }
  live._volume.gain.value = volume;
}

export function setQuantize(_quantize: number) {
  quantize = _quantize;
}

export function update(): number {
  if (live == null) {
    return;
  }
  const currentTime = live._context.currentTime;
  const schedulingTime = currentTime + schedulingInterval;
  forOwn(sounds, s => s.update(currentTime, schedulingTime));
  forEach(tracks, t => t.update(currentTime, schedulingTime));
  return currentTime;
}

export function reset() {
  stopBgm();
  sounds = {};
  tracks = [];
}

export function playEmpty() {
  if (live == null) {
    return;
  }
  if (isEmptyPlayed) {
    return;
  }
  const eb = live._createEmptyBuffer();
  live._playBuffer(eb, 0);
  isEmptyPlayed = true;
}

export function playParam(param) {
  if (live == null) {
    return;
  }
  live._play(param);
}

export function playBgm(
  name: string = "0",
  note = 69 - 24,
  len = 32,
  interval = 0.25,
  params = [Preset.Laser, Preset.Select, Preset.Hit, Preset.Hit],
  tracksNum = 4,
  volume: number = null
) {
  if (live == null) {
    return;
  }
  stopBgm();
  random.setSeed(seed + getHashFromString(name));
  initProgression();
  tracks = [];
  let param = random.select(params);
  times(tracksNum, () => {
    const randomness = Math.floor(
      Math.abs(random.get() + random.get() - 1) * 3
    );
    const chordOffset = Math.floor((random.get() + random.get() - 1) * 10);
    const velocityRatio = Math.abs(random.get() + random.get() - 1);
    const hasSameNoteWithPrevPart = random.get() < 0.25;
    if (!hasSameNoteWithPrevPart) {
      param = random.select(params);
    }
    const isLimitNoteWidth = random.get() < 0.5;
    const isLimitNoteResolution = random.get() < 0.5;
    addTrack(
      len,
      interval,
      param,
      note,
      randomness,
      chordOffset,
      velocityRatio,
      hasSameNoteWithPrevPart,
      isLimitNoteWidth,
      isLimitNoteResolution
    );
  });
  forEach(tracks, t => t.play(volume));
}

export function stopBgm() {
  if (live == null) {
    return;
  }
  forEach(tracks, t => t.stop());
}

export function addTrack(
  len = 32,
  interval = 0.25,
  param: any,
  note = 60,
  chordOffset = 0,
  randomness = 0,
  velocityRatio = 1,
  hasSameNoteWithPrevPart = false,
  isLimitNoteWidth = false,
  isLimitNoteResolution = false
) {
  const track = new Track(param, midiNoteNumberToFrequency(note), 0.7);
  track.noteInterval = interval;
  if (tracks.length > 0 && hasSameNoteWithPrevPart) {
    track.noteRatios = tracks[tracks.length - 1].noteRatios;
  } else {
    const pattern = createRandomPattern(len);
    track.noteRatios = createNoteRatios(
      pattern,
      isLimitNoteWidth ? 0 : -1,
      1,
      velocityRatio
    );
  }
  track.notes = createNotes(
    track.noteRatios,
    chordOffset,
    randomness,
    isLimitNoteResolution
  );
  tracks.push(track);
}

function midiNoteNumberToFrequency(d) {
  const a = 440;
  return a * Math.pow(2, (d - 69) / 12);
}

function createRandomPattern(len: number) {
  let pattern = nArray(len, false);
  let pi = 4;
  while (pi <= len) {
    pattern = reversePattern(pattern, pi);
    pi *= 2;
  }
  return pattern;
}

function reversePattern(pattern: boolean[], interval) {
  let pt = nArray(interval, false);
  const pn = Math.floor(Math.abs(random.get() + random.get() - 1) * 4);
  for (let i = 0; i < pn; i++) {
    pt[random.getInt(interval - 1)] = true;
  }
  return map(pattern, (p, i) => (pt[i % interval] ? !p : p));
}

const chords = [
  [0, 4, 7],
  [0, 3, 7],
  [0, 4, 7, 10],
  [0, 4, 7, 11],
  [0, 3, 7, 10]
];

// I C:0, II D:2, III E:4, IV F:5, V G:7, VI A:9, VII B:11
// M:0, m:1, 7:2, M7:3, m7:4
const progressions = [
  [[0, 0], [7, 0], [9, 1], [4, 1]],
  [[5, 0], [0, 0], [5, 0], [7, 0]],
  [[5, 3], [7, 2], [4, 4], [9, 1]],
  [[9, 1], [2, 1], [7, 0], [0, 0]],
  [[9, 1], [5, 0], [7, 0], [0, 0]]
];

let progression: number[][];

function initProgression() {
  const baseProgression = random.select(progressions);
  progression = baseProgression.map((bp, i) => [
    random.get() < 0.7
      ? bp[0]
      : progressions[random.getInt(progressions.length)][i][0],
    random.get() < 0.7 ? bp[1] : random.getInt(chords.length)
  ]);
}

function createNoteRatios(pattern: boolean[], min, max, velocityRatio) {
  let n = random.get();
  let nv = random.get(-0.5, 0.5);
  let len = pattern.length;
  let cordLength = len / progression.length;
  let noteRatios = [];
  pattern.forEach((p, pi) => {
    let i = Math.floor(pi / cordLength);
    let j = pi % cordLength;
    if (i === Math.floor(progression.length / 2)) {
      noteRatios.push(noteRatios[j]);
      n = noteRatios[j];
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
    let j = ni % cordLength;
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
    return (d + b * 12 + chord[cn]) * 100;
  });
}

class Sound {
  buffers: AudioBuffer[];
  isPlaying = false;
  playedTime: number = null;
  gainNode: GainNode;
  volume: number;

  constructor(params: any | any[], frequency = null, durationRatio = 1) {
    if (!Array.isArray(params)) {
      params = [params];
    }
    this.buffers = map(params, p => {
      if (p instanceof Function) {
        p = p();
      }
      p.Volume.Sustain *= durationRatio;
      p.Volume.Decay *= durationRatio;
      if (frequency != null) {
        p.Frequency.Start = frequency;
      }
      return live._createBuffer(p);
    });
    this.gainNode = live._createGain();
  }

  play(volume: number = null) {
    this.isPlaying = true;
    this.volume = volume;
  }

  stop() {
    this.isPlaying = false;
  }

  update(currentTime: number, schedulingTime: number) {
    if (!this.isPlaying) {
      return;
    }
    this.isPlaying = false;
    const interval = playInterval * quantize;
    const time =
      interval > 0 ? Math.ceil(currentTime / interval) * interval : currentTime;
    if (this.playedTime == null || time > this.playedTime) {
      this.playLater(time);
      this.playedTime = time;
    }
  }

  playLater(when: number, detune: number = null) {
    if (this.volume == null) {
      forEach(this.buffers, b => live._playBuffer(b, when, detune));
    } else {
      this.gainNode.gain.value = this.volume;
      forEach(this.buffers, b =>
        live._playBufferAndConnect(b, when, this.gainNode, detune)
      );
    }
  }
}

class Track extends Sound {
  noteRatios: number[];
  notes: number[];
  noteIndex = 0;
  noteInterval = 0.25;
  scheduledTime: number = null;
  nextNote: number;

  update(currentTime: number, schedulingTime: number) {
    if (!this.isPlaying) {
      return;
    }
    if (this.scheduledTime == null) {
      this.calcFirstScheduledTime(currentTime);
    }
    for (let i = 0; i < 99; i++) {
      if (this.scheduledTime >= currentTime) {
        break;
      }
      this.calcNextScheduledTime();
    }
    if (this.scheduledTime < currentTime) {
      this.scheduledTime = null;
    } else {
      while (this.scheduledTime <= schedulingTime) {
        if (this.nextNote != null) {
          this.playLater(this.scheduledTime, this.nextNote);
        }
        this.calcNextScheduledTime();
      }
    }
  }

  calcFirstScheduledTime(currentTime: number) {
    this.scheduledTime =
      Math.ceil(currentTime / playInterval) * playInterval -
      playInterval * this.noteInterval;
    this.noteIndex = 0;
    this.calcNextScheduledTime();
  }

  calcNextScheduledTime() {
    const pl = this.notes.length;
    const pi = playInterval * this.noteInterval;
    for (let i = 0; i < pl; i++) {
      this.scheduledTime += pi;
      this.nextNote = this.notes[this.noteIndex];
      this.noteIndex++;
      if (this.noteIndex >= pl) {
        this.noteIndex = 0;
      }
      if (this.nextNote != null) {
        break;
      }
    }
  }
}

class Random {
  x: number;
  y: number;
  z: number;
  w: number;

  get(fromOrTo: number = 1, to: number = null) {
    if (to == null) {
      to = fromOrTo;
      fromOrTo = 0;
    }
    return (this.getToMaxInt() / 0xffffffff) * (to - fromOrTo) + fromOrTo;
  }

  getInt(fromOrTo: number, to: number = null) {
    return Math.floor(this.get(fromOrTo, to));
  }

  getPm() {
    return this.getInt(2) * 2 - 1;
  }

  select(values: any[]) {
    return values[this.getInt(values.length)];
  }

  setSeed(w: number = null) {
    this.w = w != null ? w : Math.floor(Math.random() * 0xffffffff);
    this.x = (0 | (this.w << 13)) >>> 0;
    this.y = (0 | ((this.w >>> 9) ^ (this.x << 6))) >>> 0;
    this.z = (0 | (this.y >>> 7)) >>> 0;
    return this;
  }

  getToMaxInt() {
    const t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    this.w = (this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8))) >>> 0;
    return this.w;
  }

  constructor() {
    this.setSeed();
    this.get = this.get.bind(this);
    this.getToMaxInt = this.getToMaxInt.bind(this);
  }
}

function getHashFromString(str: string) {
  let hash = 0;
  const len = str.length;
  for (let i = 0; i < len; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

function values(obj: any) {
  let vs = [];
  for (let p in obj) {
    if (obj.hasOwnProperty(p)) {
      vs.push(obj[p]);
    }
  }
  return vs;
}

function nArray(n: number, v: any) {
  let a = [];
  for (let i = 0; i < n; i++) {
    a.push(v);
  }
  return a;
}

function times(n: number, func: Function) {
  for (let i = 0; i < n; i++) {
    func();
  }
}

function forEach(array: any[], func: Function) {
  for (let i = 0; i < array.length; i++) {
    func(array[i]);
  }
}

function forOwn(obj: any, func: Function) {
  for (let p in obj) {
    func(obj[p]);
  }
}

function map(array: any[], func: Function) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result.push(func(array[i], i));
  }
  return result;
}

function mapString(str: string, func: Function) {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(func(str.charAt(i), i));
  }
  return result;
}

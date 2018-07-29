import * as jsfx from "jsfx";

export let playInterval: number;
export const Preset = jsfx.Preset;
let live;
let random: Random;
let sounds: { [key: string]: Sound } = {};
let tracks: { [key: string]: Track[] } = {};
let bgmTracks: Track[] = [];
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
const schedulingFrame = 3;

export function init(_seed: number = 0, tempo = 120, fps = 60) {
  live = jsfx.Live({});
  setVolume(0.1);
  seed = _seed;
  random = new Random();
  jsfx.setRandomFunc(random.get);
  playInterval = 60 / tempo;
  schedulingInterval = (1 / fps) * schedulingFrame;
}

export function setSeed(_seed: number = 0) {
  seed = _seed;
}

export function play(
  name: string = "0",
  numberOfSounds: number = 2,
  note = null,
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
  const frequency = note == null ? null : midiNoteNumberToFrequency(note);
  sounds[name] = new Sound(params, frequency);
  sounds[name].play(volume);
}

export function playJingle(
  name: string = "0",
  isSe = false,
  note = 69 - 12,
  len = 16,
  interval = 0.25,
  numberOfTracks: number = 4,
  param = null,
  volume: number = null
) {
  if (live == null) {
    return;
  }
  if (tracks[name] != null) {
    tracks[name].forEach(t => t.play(volume));
    return;
  }
  random.setSeed(seed + getHashFromString(name));
  initProgression();
  prevTrack = null;
  if (param == null) {
    let p = playPrefixes[name[0]];
    if (typeof p === "undefined") {
      p = random.select(playPrefixArray);
    }
    param = p;
  }
  let durationRatio = 0.8;
  if (isSe) {
    interval /= 4;
    durationRatio /= 2;
  }
  tracks[name] = timesMap(numberOfTracks, () => {
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
    const track = createTrack(
      len,
      interval,
      param,
      note,
      durationRatio,
      randomness,
      chordOffset,
      velocityRatio,
      hasSameNoteWithPrevPart,
      isLimitNoteWidth,
      isLimitNoteResolution,
      isRepeatHalf,
      restRatio
    );
    track.isLooping = false;
    return track;
  });
  tracks[name].forEach(t => t.play(volume));
}

export function stopJingles() {
  forOwn(tracks, ts => forEach(ts, t => t.stop()));
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
  forOwn(tracks, ts => forEach(ts, t => t.update(currentTime, schedulingTime)));
  forEach(bgmTracks, t => t.update(currentTime, schedulingTime));
  return currentTime;
}

export function reset() {
  stopBgm();
  sounds = {};
  tracks = {};
  bgmTracks = [];
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
  numberOfTracks = 4,
  params = [Preset.Laser, Preset.Select, Preset.Hit, Preset.Hit],
  volume: number = null
) {
  if (live == null) {
    return;
  }
  stopBgm();
  random.setSeed(seed + getHashFromString(name));
  initProgression();
  prevTrack = null;
  let param = random.select(params);
  bgmTracks = timesMap(numberOfTracks, () => {
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
    const isRepeatHalf = random.get() < 0.9;
    return createTrack(
      len,
      interval,
      param,
      note,
      0.7,
      randomness,
      chordOffset,
      velocityRatio,
      hasSameNoteWithPrevPart,
      isLimitNoteWidth,
      isLimitNoteResolution,
      isRepeatHalf
    );
  });
  forEach(bgmTracks, t => t.play(volume));
}

export function stopBgm() {
  if (live == null) {
    return;
  }
  forEach(bgmTracks, t => t.stop());
}

let prevTrack: Track;

function createTrack(
  len = 32,
  interval = 0.25,
  param: any,
  note = 60,
  durationRatio = 1,
  chordOffset = 0,
  randomness = 0,
  velocityRatio = 1,
  hasSameNoteWithPrevPart = false,
  isLimitNoteWidth = false,
  isLimitNoteResolution = false,
  isRepeatHalf = false,
  restRatio = null
) {
  const track = new Track(
    param,
    midiNoteNumberToFrequency(note),
    durationRatio
  );
  track.noteInterval = interval;
  if (prevTrack != null && hasSameNoteWithPrevPart) {
    track.noteRatios = prevTrack.noteRatios;
  } else {
    const pattern =
      restRatio != null
        ? createRandomPatternWithRestRatio(len, restRatio)
        : createRandomPattern(len);
    track.noteRatios = createNoteRatios(
      pattern,
      isLimitNoteWidth ? 0 : -1,
      1,
      velocityRatio,
      isRepeatHalf
    );
  }
  track.notes = createNotes(
    track.noteRatios,
    chordOffset,
    randomness,
    isLimitNoteResolution
  );
  prevTrack = track;
  return track;
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

function createRandomPatternWithRestRatio(len: number, restRatio: number) {
  return timesMap(len, () => random.get() >= restRatio);
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
  isLooping = true;

  play(volume: number = null) {
    super.play(volume);
    this.scheduledTime = null;
  }

  update(currentTime: number, schedulingTime: number) {
    if (!this.isPlaying) {
      return;
    }
    if (this.scheduledTime == null) {
      this.calcFirstScheduledTime(currentTime);
    }
    for (let i = 0; i < 9; i++) {
      if (this.scheduledTime >= currentTime) {
        break;
      }
      this.calcNextScheduledTime();
      if (!this.isLooping && this.noteIndex === 0) {
        break;
      }
    }
    if (this.scheduledTime < currentTime) {
      if (this.isLooping) {
        this.scheduledTime = null;
      } else {
        this.stop();
      }
      return;
    }
    while (this.scheduledTime <= schedulingTime) {
      if (this.nextNote != null) {
        this.playLater(this.scheduledTime, this.nextNote);
      }
      if (!this.isLooping && this.noteIndex === 0) {
        this.stop();
        return;
      }
      this.calcNextScheduledTime();
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
        if (!this.isLooping) {
          break;
        }
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
    if (to == null) {
      to = fromOrTo;
      fromOrTo = 0;
    }
    return (this.getToMaxInt() % (to - fromOrTo)) + fromOrTo;
  }

  getPm() {
    return this.getInt(2) * 2 - 1;
  }

  select(values: any[]) {
    return values[this.getInt(values.length)];
  }

  setSeed(
    w: number = null,
    x = 123456789,
    y = 362436069,
    z = 521288629,
    loopCount = 32
  ) {
    this.w = w != null ? w >>> 0 : Math.floor(Math.random() * 0xffffffff) >>> 0;
    this.x = x >>> 0;
    this.y = y >>> 0;
    this.z = z >>> 0;
    for (let i = 0; i < loopCount; i++) {
      this.getToMaxInt();
    }
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

function timesMap(n: number, func: Function) {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(func(i));
  }
  return result;
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

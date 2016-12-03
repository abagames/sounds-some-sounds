declare const require: any;
const jsfx = require('jsfx');

export let playInterval: number;
export const Preset = jsfx.Preset;
let live;
let random: Random;
let buffers = {};
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
  u: Preset.Lucky,
};
const playprefixeArray = values(playPrefixes);
let quantize = 0.5;
let isEmptyPlayed = false;
let prevPlayingFileName: string;

export function init(_seed: number = 0, tempo = 120, fps = 60) {
  live = jsfx.Live({});
  setVolume(0.1);
  seed = _seed;
  random = new Random();
  jsfx.setRandomFunc(random.get01);
  playInterval = 60 / tempo;
  schedulingInterval = 1 / fps * 2;
}

export function setSeed(_seed: number = 0) {
  seed = _seed;
}

export function play(name: string = '0', mult: number = 2, params = null) {
  if (live == null) {
    return;
  }
  if (buffers[name] != null) {
    buffers[name].play();
    return;
  }
  random.setSeed(seed + getHashFromString(name));
  if (params == null) {
    let p = playPrefixes[name[0]];
    if (typeof p === 'undefined') {
      p = random.sample(playprefixeArray);
    }
    params = nArray(mult, p);
  }
  buffers[name] = new Sound(params);
  buffers[name].play();
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

export function playBgm(name: string = '0', interval = 0.25,
  params = [Preset.Laser, Preset.Hit], tracksNum = 8) {
  if (live == null) {
    return;
  }
  stopBgm();
  random.setSeed(seed + getHashFromString(name));
  tracks = [];
  times(tracksNum, () => addRandomTrack(interval, params));
  forEach(tracks, t => t.play());
}

export function stopBgm() {
  if (live == null) {
    return;
  }
  forEach(tracks, t => t.stop());
}

export function update(): number {
  if (live == null) {
    return;
  }
  const currentTime = live._context.currentTime;
  const schedulingTime = currentTime + schedulingInterval;
  forOwn(buffers, b => b.update(currentTime, schedulingTime));
  forEach(tracks, t => t.update(currentTime, schedulingTime));
  return currentTime;
}

export function reset() {
  stopBgm();
  buffers = {};
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

function addRandomTrack(interval: number, params: any[]) {
  addTrack(random.sample(params), createRandomPattern(), interval);
}

function createRandomPattern() {
  const len = 64;
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
  let pr = 0.5;
  for (let i = 0; i < interval / 2; i++) {
    if (random.f() < pr) {
      pt[random.i(interval - 1)] = true;
    }
    pr *= 0.5;
  }
  return map(pattern, (p, i) => pt[i % interval] ? !p : p);
}

export function addTrack(param, pattern: string | boolean[], interval = 0.25) {
  const track = new Track(param);
  track.patternInterval = interval;
  if (typeof pattern === 'string') {
    track.pattern = mapString(pattern, p => p === '1');
  } else {
    track.pattern = pattern;
  }
  tracks.push(track);
}

class Sound {
  buffers: AudioBuffer[];
  isPlaying = false;
  playedTime: number = null;

  constructor(params: any | any[]) {
    if (!Array.isArray(params)) {
      params = [params];
    }
    this.buffers = map(params, p => live._createBuffer(p));
  }

  play() {
    this.isPlaying = true;
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
    const time = interval > 0 ?
      Math.ceil(currentTime / interval) * interval : currentTime;
    if (this.playedTime == null || time > this.playedTime) {
      this.playLater(time);
      this.playedTime = time;
    }
  }

  playLater(when: number) {
    forEach(this.buffers, b => live._playBuffer(b, when));
  }
}

class Track extends Sound {
  pattern: boolean[];
  patternIndex = 0;
  patternInterval = 0.25;
  scheduledTime: number = null;

  update(currentTime: number, schedulingTime: number) {
    if (!this.isPlaying) {
      return;
    }
    if (this.scheduledTime == null) {
      this.scheduledTime = Math.ceil(currentTime / playInterval) * playInterval -
        playInterval * this.patternInterval;
      this.patternIndex = 0;
      this.calcNextScheduledTime();
    }
    for (let i = 0; i < 99; i++) {
      if (this.scheduledTime >= currentTime) {
        break;
      }
      this.calcNextScheduledTime();
    }
    while (this.scheduledTime <= schedulingTime) {
      this.playLater(this.scheduledTime);
      this.calcNextScheduledTime();
    }
  }

  calcNextScheduledTime() {
    const pl = this.pattern.length;
    const pi = playInterval * this.patternInterval;
    for (let i = 0; i < pl; i++) {
      this.scheduledTime += pi;
      const p = this.pattern[this.patternIndex];
      this.patternIndex++;
      if (this.patternIndex >= pl) {
        this.patternIndex = 0;
      }
      if (p) {
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

  setSeed(v: number = -0x7fffffff) {
    if (v === -0x7fffffff) {
      v = Math.floor(Math.random() * 0x7fffffff);
    }
    this.x = v = 1812433253 * (v ^ (v >> 30))
    this.y = v = 1812433253 * (v ^ (v >> 30)) + 1
    this.z = v = 1812433253 * (v ^ (v >> 30)) + 2
    this.w = v = 1812433253 * (v ^ (v >> 30)) + 3;
    return this;
  }

  f(minOrMax: number = null, max: number = null) {
    if (minOrMax == null) {
      return this.get01();
    }
    if (max == null) {
      return this.get01() * minOrMax;
    }
    return this.get01() * (max - minOrMax) + minOrMax;
  }

  i(minOrMax: number = null, max: number = null) {
    return Math.floor(this.f(minOrMax, max + 1));
  }

  sample(array: any[]) {
    return array[this.i(array.length - 1)];
  }

  getInt() {
    var t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    this.w = (this.w ^ (this.w >> 19)) ^ (t ^ (t >> 8));
    return this.w;
  }

  get01() {
    return this.getInt() / 0x7fffffff;
  }

  constructor() {
    this.setSeed();
    this.get01 = this.get01.bind(this);
    this.f = this.f.bind(this);
    this.i = this.i.bind(this);
  }
}

function getHashFromString(str: string) {
  let hash = 0;
  const len = str.length;
  for (let i = 0; i < len; i++) {
    const chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
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

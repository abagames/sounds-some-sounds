declare const require: any;
const jsfx = require('jsfx');
import * as _ from 'lodash';

let live;
let random: Random;
let buffers = {};
let tracks: Track[] = [];
let playInterval: number;
let schedulingInterval: number;
let seed;
export function init(_seed: number = 0, tempo = 120, fps = 60) {
  live = jsfx.Live({});
  setVolume(0.1);
  seed = _seed;
  random = new Random();
  jsfx.setRandomFunc(random.get01);
  playInterval = 60 / tempo;
  schedulingInterval = 1 / fps * 2;
}

export const Preset = jsfx.Preset;
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
const playprefixeArray = _.values(playPrefixes);
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
    params = _.times(mult, p);
  }
  buffers[name] = new Buffer(params);
  buffers[name].play();
}

export function setVolume(volume: number) {
  if (live == null) {
    return;
  }
  live._volume.gain.value = volume;
}

let quantize = 0.5;
export function setQuantize(_quantize: number) {
  quantize = _quantize;
}

export function playBgm(name: string = '0', interval = 0.25,
  params = [Preset.Laser, Preset.Hit]) {
  stopBgm();
  random.setSeed(seed + getHashFromString(name));
  tracks = [];
  _.times(4, () => addRandomTrack(interval, params));
  _.forEach(tracks, t => t.play());
}

export function stopBgm() {
  _.forEach(tracks, t => t.stop());
}

export function update() {
  if (live == null) {
    return;
  }
  const currentTime = live._context.currentTime;
  const schedulingTime = currentTime + schedulingInterval;
  _.forOwn(buffers, b => b.update(currentTime, schedulingTime));
  _.forEach(tracks, t => t.update(currentTime, schedulingTime));
}

export function reset() {
  stopBgm();
  buffers = {};
  tracks = [];
}

let isEmptyPlayed = false;
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
  let pattern = _.times(len, () => false);
  let pi = 4;
  while (pi <= len) {
    pattern = reversePattern(pattern, pi);
    pi *= 2;
  }
  return pattern;
}

function reversePattern(pattern: boolean[], interval) {
  let pt = _.times(interval, () => false);
  let pr = 0.5;
  for (let i = 0; i < interval / 2; i++) {
    if (random.f() < pr) {
      pt[random.i(interval - 1)] = true;
    }
    pr *= 0.5;
  }
  return _.map(pattern, (p, i) => pt[i % interval] ? !p : p);
}

export function addTrack(param, pattern: string | boolean[], interval = 0.25) {
  const track = new Track(param);
  track.patternInterval = interval;
  if (typeof pattern === 'string') {
    track.pattern = _.map(pattern, p => p === '1');
  } else {
    track.pattern = pattern;
  }
  tracks.push(track);
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

class Buffer {
  buffers: AudioBuffer[];
  isPlaying = false;
  playedTime: number = null;

  constructor(params: any | any[]) {
    if (!_.isArray(params)) {
      params = [params];
    }
    this.buffers = _.map(params, p => live._createBuffer(p));
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
    return;
  }

  playLater(when: number) {
    _.forEach(this.buffers, b => live._playBuffer(b, when));
  }
}

class Track extends Buffer {
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
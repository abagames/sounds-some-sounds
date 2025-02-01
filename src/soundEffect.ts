import { jsfx } from "../lib/jsfx/index";
import {
  audioContext,
  getQuantizedTime,
  gainNode as masterGainNode,
} from "./audio";
import { Random } from "./random";
import { times } from "./util";

export type SoundEffect = {
  type: Type;
  params;
  volume: number;
  buffers: AudioBuffer[];
  bufferSourceNodes: AudioBufferSourceNode[];
  gainNode: GainNode;
  isPlaying: boolean;
  playedTime: number;
  isDrum?: boolean;
  seed?: number;
};

export const types = [
  "coin",
  "laser",
  "explosion",
  "powerUp",
  "hit",
  "jump",
  "select",
  "lucky",
  "random",
  "click",
  "synth",
  "tone",
] as const;
export type Type = (typeof types)[number];
const typeFunctionNames = {
  coin: "Coin",
  laser: "Laser",
  explosion: "Explosion",
  powerUp: "Powerup",
  hit: "Hit",
  jump: "Jump",
  select: "Select",
  lucky: "Lucky",
  random: "Lucky",
  click: "Click",
  synth: "Synth",
  tone: "Tone",
};

export const random = new Random();
let soundEffects: SoundEffect[];
let live;

export function init() {
  live = jsfx.Live();
  soundEffects = [];
  jsfx.setRandomFunc(() => random.get());
}

export function play(soundEffect: SoundEffect) {
  playSoundEffect(soundEffect);
}

export function update(currentTime: number) {
  soundEffects.forEach((se) => {
    updateSoundEffect(se, currentTime);
  });
}

export function get(
  type: Type = undefined,
  seed: number = undefined,
  numberOfSounds = 2,
  volume = 0.5,
  freq: number = undefined,
  attackRatio: number = 1,
  sustainRatio: number = 1
): SoundEffect {
  if (seed != null) {
    random.setSeed(seed);
  }
  const preset =
    jsfx.Preset[
      typeFunctionNames[type != null ? type : types[random.getInt(8)]]
    ];
  const params = times(numberOfSounds, () => {
    const p = preset();
    if (freq != null && p.Frequency.Start != null) {
      p.Frequency.Start = freq;
    }
    if (p.Volume.Attack != null) {
      p.Volume.Attack *= attackRatio;
    }
    if (p.Volume.Sustain != null) {
      p.Volume.Sustain *= sustainRatio;
    }
    return p;
  });
  return createBuffers(type, params, volume);
}

function createBuffers(type: Type, params, volume: number): SoundEffect {
  const buffers = params.map((p) => {
    const values = live._generate(p);
    const buffer = audioContext.createBuffer(1, values.length, jsfx.SampleRate);
    var channelData = buffer.getChannelData(0);
    channelData.set(values);
    return buffer;
  });
  const gainNode = audioContext.createGain();
  gainNode.gain.value = volume;
  gainNode.connect(masterGainNode);
  return {
    type,
    params,
    volume,
    buffers,
    bufferSourceNodes: undefined,
    gainNode,
    isPlaying: false,
    playedTime: undefined,
  };
}

export function getForSequence(
  sequence,
  isDrum: boolean,
  seed: number,
  type?: Type,
  volume?: number
) {
  const random = new Random();
  random.setSeed(seed);
  let se: SoundEffect;
  if (isDrum) {
    let t = random.select(["hit", "click", "explosion"]);
    if (type != null) {
      t = type;
    }
    se = get(
      t,
      random.getInt(999999999),
      t === "explosion" ? 1 : 2,
      volume != null ? volume : t === "explosion" ? 0.4 : 0.5,
      random.get(100, 200),
      t === "explosion" ? 0.5 : 1,
      t === "explosion" ? 0.2 : 1
    );
  } else {
    const al = calcNoteLengthAverage(sequence);
    let t =
      random.get() < 1 / al
        ? "select"
        : random.select(["tone", "tone", "synth"]);
    if (type != null) {
      t = type;
    }
    se = get(
      t,
      random.getInt(999999999),
      t !== "select" ? 1 : 2,
      volume != null ? volume : 0.3,
      261.6,
      t !== "select" ? 0.1 : 1,
      t !== "select" ? 2 : 1
    );
  }
  se.isDrum = isDrum;
  se.seed = seed;
  return se;
}

function calcNoteLengthAverage(sequence) {
  if (sequence == null || sequence.notes.length === 0) {
    return 1;
  }
  let sl = 0;
  let nc = 0;
  sequence.notes.forEach((n) => {
    const o = n.quantizedEndStep - n.quantizedStartStep;
    if (o > 0) {
      sl += o;
      nc++;
    }
  });
  return sl / nc;
}

export function add(se: SoundEffect) {
  soundEffects.push(se);
}

export function remove(tse: SoundEffect) {
  soundEffects = soundEffects.filter((se) => se !== tse);
}

export function setVolume(soundEffect: SoundEffect, volume: number) {
  soundEffect.gainNode.gain.value = volume;
}

function playSoundEffect(soundEffect: SoundEffect) {
  soundEffect.isPlaying = true;
}

function updateSoundEffect(soundEffect: SoundEffect, currentTime: number) {
  if (!soundEffect.isPlaying) {
    return;
  }
  soundEffect.isPlaying = false;
  const time = getQuantizedTime(currentTime);
  if (soundEffect.playedTime == null || time > soundEffect.playedTime) {
    playLater(soundEffect, time);
    soundEffect.playedTime = time;
  }
}

export function playLater(
  soundEffect: SoundEffect,
  when: number,
  detune: number = undefined
) {
  soundEffect.bufferSourceNodes = [];
  soundEffect.buffers.forEach((b) => {
    const bufferSourceNode = audioContext.createBufferSource();
    bufferSourceNode.buffer = b;
    if (detune != null && bufferSourceNode.playbackRate != null) {
      const semitoneRatio = Math.pow(2, 1 / 12);
      bufferSourceNode.playbackRate.value = Math.pow(semitoneRatio, detune);
    }
    bufferSourceNode.start =
      bufferSourceNode.start || (bufferSourceNode as any).noteOn;
    bufferSourceNode.connect(soundEffect.gainNode);
    bufferSourceNode.start(when);
    soundEffect.bufferSourceNodes.push(bufferSourceNode);
  });
}

export function stop(soundEffect: SoundEffect, when: number = undefined) {
  if (soundEffect.bufferSourceNodes != null) {
    soundEffect.bufferSourceNodes.forEach((n) => {
      if (when == null) {
        n.stop();
      } else {
        n.stop(when);
      }
    });
    soundEffect.bufferSourceNodes = undefined;
  }
}

const volumeMultiplier = 100;

export function toMml(soundEffect: SoundEffect) {
  return `@${soundEffect.type}${soundEffect.isDrum ? "@d" : ""}@s${
    soundEffect.seed
  } v${Math.floor(soundEffect.volume * volumeMultiplier)}`;
}

export function fromMml(mml: string) {
  let leftMml = `${mml}`;
  let type: Type;
  types.forEach((t) => {
    const st = `@${t}`;
    const ti = leftMml.indexOf(st);
    if (ti >= 0) {
      type = t;
      leftMml = `${leftMml.slice(0, ti)}${leftMml.slice(ti + st.length)}`;
    }
  });
  const sd = "@d";
  const di = leftMml.indexOf(sd);
  let isDrum = false;
  if (di >= 0) {
    isDrum = true;
    leftMml = `${leftMml.slice(0, di)}${leftMml.slice(di + sd.length)}`;
  }
  const ss = leftMml.match(/@s\d+/);
  let seed = 1;
  if (ss != null) {
    seed = Number.parseInt(ss[0].substring(2));
    leftMml = leftMml.replace(/@s\d+/, "");
  }
  const vs = leftMml.match(/v\d+/);
  let volume = 0.5;
  if (vs != null) {
    volume = Number.parseInt(vs[0].substring(1)) / volumeMultiplier;
    leftMml = leftMml.replace(/v\d+/, "");
  }
  return { mml: leftMml, args: { isDrum, seed, type, volume } };
}

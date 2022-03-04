export let audioContext: AudioContext;
export let tempo: number;
export let playInterval: number;
export let quantize: number;
export let volume: number;
let isStarted = false;

export function init(_audioContext: AudioContext = undefined) {
  audioContext =
    _audioContext == null
      ? new (window.AudioContext || (window as any).webkitAudioContext)()
      : _audioContext;
  setTempo();
  setQuantize();
  setVolume();
}

export function start() {
  if (isStarted) {
    return;
  }
  isStarted = true;
  playEmpty();
}

export function setTempo(_tempo = 120) {
  tempo = _tempo;
  playInterval = 60 / tempo;
}

export function setQuantize(noteLength = 8) {
  quantize = noteLength > 0 ? 4 / noteLength : undefined;
}

export function setVolume(_volume = 0.1) {
  volume = _volume;
}

export function getQuantizedTime(time: number) {
  if (quantize == null) {
    return time;
  }
  const interval = playInterval * quantize;
  return interval > 0 ? Math.ceil(time / interval) * interval : time;
}

export function playEmpty() {
  const bufferSource = audioContext.createBufferSource();
  bufferSource.start = bufferSource.start || (bufferSource as any).noteOn;
  bufferSource.start();
}

export function resumeAudioContext() {
  audioContext.resume();
}

import { Track } from "./track";
import * as soundEffect from "./soundEffect";

export type Part = {
  mml: string;
  sequence;
  soundEffect: soundEffect.SoundEffect;
  noteIndex: number;
  endStep: number;
  visualizer?;
};

export function get(
  mml: string,
  sequence,
  soundEffect: soundEffect.SoundEffect,
  visualizer?
): Part {
  return {
    mml,
    sequence,
    soundEffect,
    noteIndex: 0,
    endStep: -1,
    visualizer,
  };
}

export function update(t: Track, p: Part, time: number) {
  const n = p.sequence.notes[p.noteIndex];
  if (n == null) {
    return;
  }
  if (
    (p.soundEffect.type === "synth" || p.soundEffect.type === "tone") &&
    p.endStep === t.notesStepsIndex
  ) {
    soundEffect.stop(p.soundEffect, time);
  }
  if (n.quantizedStartStep !== t.notesStepsIndex) {
    return;
  }
  if (p.soundEffect.type === "synth" || p.soundEffect.type === "tone") {
    soundEffect.stop(p.soundEffect);
  }
  if (p.soundEffect.isDrum) {
    soundEffect.playLater(p.soundEffect, time);
  } else {
    soundEffect.playLater(p.soundEffect, time, n.pitch - 69);
  }
  if (p.visualizer != null) {
    p.visualizer.redraw(n);
  }
  p.endStep = n.quantizedEndStep;
  if (p.endStep >= t.notesStepsCount) {
    p.endStep -= t.notesStepsCount;
  }
  p.noteIndex++;
  if (p.noteIndex >= p.sequence.notes.length) {
    p.noteIndex = 0;
  }
}

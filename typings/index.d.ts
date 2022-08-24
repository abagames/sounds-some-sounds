// Play sound effect
declare function playSoundEffect(
  // The list of SoundEffectType is as follows:
  // "coin", "laser", "explosion", "powerUp", "hit", "jump", "select",
  // "random"("lucky"), "click", "synth", "tone"
  type: SoundEffectType,
  options?: {
    // Random seed (default = 0)
    seed?: number;
    // Number of simultaneous sounds (default = 2)
    numberOfSounds?: number;
    // Sound volume (default = 1)
    volume?: number;
    // To set the pitch of the sound, set one of the following 3 parameters
    pitch?: number; // MIDI note number
    freq?: number; // Frequency (Hz)
    note?: string; // Note string (e.g. "C4", "F#3", "Ab5")
  }
): SoundEffect;
// Play music described in MML
declare function playMml(
  mmlStrings: string[],
  options?: {
    // Sound volume (default = 1)
    volume?: number;
    // Playback speed (default = 1)
    speed?: number;
    // Looping at the end of the music (default = true)
    isLooping?: boolean;
  }
): Track;
// Stop MML music
declare function stopMml(track?: Track): void;
// Generate MML strings
declare function generateMml(options?: {
  // Random seed (default = 0)
  seed?: number;
  // Generated music length (16 notes = 1 bar) (default = 32)
  noteLength?: number;
  // Number of simultaneous parts (default = 4)
  partCount?: number;
  // Probability of drum part generation (default = 0.5)
  drumPartRatio?: number;
}): string[];
// Initialize the library
declare function init(
  // Used to generate sound effects and MMLs
  baseRandomSeed?: number,
  // When reusing an existing AudioContext
  audioContext?: AudioContext
): void;
// The startAudio function needs to be called from within
// the user operation event handler to enable audio playback in the browser
declare function startAudio(): void;
// The update function needs to be called every
// certain amount of time (typically 60 times per second)
declare function update(): void;
// Set the tempo of the music
declare function setTempo(tempo?: number): void;
// Set the quantize timing of sound effects by the length of the note
declare function setQuantize(noteLength?: number): void;
// Set a master volume
declare function setVolume(volume?: number): void;
// Reset all states
declare function reset(): void;
// Set a random seed number
declare function setSeed(baseRandomSeed?: number): void;

declare type SoundEffectType =
  | "coin"
  | "laser"
  | "explosion"
  | "powerUp"
  | "hit"
  | "jump"
  | "select"
  | "lucky"
  | "random"
  | "click"
  | "synth"
  | "tone";

declare type SoundEffect = {
  type: SoundEffectType;
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

declare type Note = {
  pitch: number;
  quantizedStartStep: number;
  quantizedEndStep: number;
};

declare type Part = {
  mml: string;
  sequence: { notes: Note[] };
  soundEffect: SoundEffect;
  noteIndex: number;
  endStep: number;
  visualizer?;
};

declare type Track = {
  parts: Part[];
  notesStepsCount: number;
  notesStepsIndex: number;
  noteInterval: number;
  nextNotesTime: number;
  speedRatio: number;
  isPlaying: boolean;
  isLooping: boolean;
};

// For backward compatibility (v <= 2.0.0)
// Play the sound effect
declare function play(
  name?: string,
  numberOfSounds?: number,
  pitch?: number,
  volume?: number
): void;
// Play generated background music
declare function playBgm(
  name?: string,
  pitch?: number,
  len?: number,
  interval?: number,
  numberOfTracks?: number,
  soundEffectTypes?: string[],
  volume?: number
): void;
// Stop the background music
declare function stopBgm(): void;
// Play generated jingle
declare function playJingle(
  name?: string,
  isSoundEffect?: boolean,
  note?: number,
  len?: number,
  interval?: number,
  numberOfTracks?: number,
  volume?: number
): void;
// Stop all jingles
declare function stopJingles(): void;
// Utility functions for resuming AudioContext
declare function playEmpty(): void;
declare function resumeAudioContext(): void;

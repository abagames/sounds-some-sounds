// Play the sound effect
export declare function play(
  name?: string,
  numberOfSounds?: number,
  pitch?: number,
  volume?: number
): void;
export declare function playSoundEffect(
  type?:
    | "coin"
    | "laser"
    | "explosion"
    | "powerUp"
    | "hit"
    | "jump"
    | "select"
    | "random"
    | "synth"
    | "tone"
    | "click",
  _options?: {
    seed?: number;
    numberOfSounds?: number;
    pitch?: number;
    volume?: number;
  }
): void;
// Play generated background music
export declare function playBgm(
  name?: string,
  pitch?: number,
  len?: number,
  interval?: number,
  numberOfTracks?: number,
  soundEffectTypes?: string[],
  volume?: number
): void;
// Stop the background music
export declare function stopBgm(): void;
// Play generated jingle
export declare function playJingle(
  name?: string,
  isSoundEffect?: boolean,
  note?: number,
  len?: number,
  interval?: number,
  numberOfTracks?: number,
  volume?: number
): void;
// Stop all jingles
export declare function stopJingles(): void;
// Play music described in MML
export declare function playMml(
  mmlStrings: string[],
  _options?: { volume?: number; speed?: number; isLooping?: boolean }
): void;
// Stop MML music
export declare function stopMml(): void;
// The update export declare function needs to be called every
// certain amount of time (typically 60 times per second)
export declare function update(): void;
// Initialize the library (baseRandomSeed represents
// the seed of the random number used to generate the sound effect)
export declare function init(
  baseRandomSeed?: number,
  audioContext?: AudioContext
): void;
// The startAudio export declare function needs to be called from within
// the user operation event handler to enable audio playback in the browser
export declare function startAudio(): void;
// Set the tempo of the music
export declare function setTempo(tempo?: number): void;
// Set the quantize timing of sound effects by the length of the note
export declare function setQuantize(noteLength?: number): void;
// Set a master volume
export declare function setVolume(volume?: number): void;
// Rest all states
export declare function reset(): void;
// Set a random number seed
export declare function setSeed(baseRandomSeed?: number): void;

export declare function playEmpty(): void;
export declare function resumeAudioContext(): void;

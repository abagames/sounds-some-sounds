declare module sss {
  // Play the sound effect
  function play(
    name?: string,
    numberOfSounds?: number,
    pitch?: number,
    volume?: number
  ): void;
  function playSoundEffect(
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
  function playBgm(
    name?: string,
    pitch?: number,
    len?: number,
    interval?: number,
    numberOfTracks?: number,
    soundEffectTypes?: string[],
    volume?: number
  ): void;
  // Stop the background music
  function stopBgm(): void;
  // Play generated jingle
  function playJingle(
    name?: string,
    isSoundEffect?: boolean,
    note?: number,
    len?: number,
    interval?: number,
    numberOfTracks?: number,
    volume?: number
  ): void;
  // Stop all jingles
  function stopJingles(): void;
  // Play music described in MML
  function playMml(
    mmlStrings: string[],
    _options?: { volume?: number; speed?: number; isLooping?: boolean }
  ): void;
  // Stop MML music
  function stopMml(): void;
  // The update function needs to be called every
  // certain amount of time (typically 60 times per second)
  function update(): void;
  // Initialize the library (baseRandomSeed represents
  // the seed of the random number used to generate the sound effect)
  function init(baseRandomSeed?: number, audioContext?: AudioContext): void;
  // The startAudio function needs to be called from within
  // the user operation event handler to enable audio playback in the browser
  function startAudio(): void;
  // Set the tempo of the music
  function setTempo(tempo?: number): void;
  // Set the quantize timing of sound effects by the length of the note
  function setQuantize(noteLength?: number): void;
  // Set a master volume
  function setVolume(volume?: number): void;
  // Rest all states
  function reset(): void;
  // Set a random number seed
  function setSeed(baseRandomSeed?: number): void;

  function playEmpty(): void;
  function resumeAudioContext(): void;
}

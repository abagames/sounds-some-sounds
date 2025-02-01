# sounds-some-sounds ([Demo](https://abagames.github.io/sounds-some-sounds/index.html))

Add sounds to your game in a minute.

## How to use

Load [build/index.js](https://raw.githubusercontent.com/abagames/sounds-some-sounds/master/build/index.js) script,

```html
<script src="https://unpkg.com/sounds-some-sounds@3.1.1/build/index.js"></script>
```

or install from npm and import.

```
> npm i sounds-some-sounds
```

```js
import * as sss from "sounds-some-sounds";
```

Initialize the library with `init()` function. The first argument allows you to set a random number seed for sound generation. Generated sound effects and music can be changed by setting another random number seed.

```js
addEventListener("load", () => {
  sss.init(42);
  update();
```

Since Safari and Chrome require playing the first sound within the event handler of a user operation, `startAudio()` should be called in the event handler.

```js
addEventListener("touchstart", () => {
  sss.startAudio();
// It should also be called in 'mousedown' and 'keydown' events.
```

`update()` should be called per a frame for updating sounds.

```js
function update() {
  requestAnimationFrame(update);
  // update function should be called in an animation frame handler
  sss.update();
```

Call `playSoundEffect()` to play a sound effect.

```js
sss.playSoundEffect("coin");
```

You can specify the type of sound effect with the first argument. The type corresponds to the [jsfx](https://github.com/loov/jsfx) preset sound effects (Coin, Laser, Explosion, Powerup, Hit, Jump, Select and Random (Lucky)). You can hear these sounds on the [demo page](https://abagames.github.io/sounds-some-sounds/index.html).

Use `playMml()` and `generateMml()` to play an automatically generated background music.

```js
sss.playMml(sss.generateMml());
```

`playMml()` plays music described in [MML (Music Macro Language)](https://github.com/mohayonao/mml-iterator). `generateMml()` generate MML with melody and drums procedurally.

You can also specify the MML string manually.

```javascript
sss.playMml([
  // Specify the tone as `@synth`.
  // `@s308454596`sets the random number seed to generate the tone.
  "@synth@s308454596 v50 l16 o4 r4b4 >c+erer8.<b b2 >c+2 <b2 >c+ec+<ar>c+r<a f+g+af+rf+er e2",
  "@synth@s771118616 v35 l4 o4 f+f+ f+1 >c+ <g+ f+f+ eg+ ab b2",
  "@synth@s848125671 v40 l4 o4 d+16d+16f+16e16e16e16e16<b16 >ee b8.b16r8>f+8 c+c+ <b>f+ <aa a2 bb",
  // Set the drum part with '@d'.
  "@explosion@d@s364411560 v40 l16 o4 cr8.cr8. cr8.cr8. cr8.cr8. cr8.cr8. cr8.cr8. cr8.cr8. cr8.cr8. cr8.cr8.",
  "@explosion@d@s152275772 v40 l16 o4 r8crcrcr8. cccrcr8. crcrcr8. crcrcr8. crcrcr8. crcrcr8. crcrcr8. crcrcr",
  "@hit@d@s234851483 v50 l16 o4 rcr4^16c rcr4. ccr4^16c rcr4.^16 cr4^16c rcr4.^16 cr4^16c rcr4.",
]);
```

Sound effects are automatically quantized to the background music. The quantize interval can be changed with the `setQuantize()` function. `setQuantize(0)` disables quantization.

## Functions

```typescript
// Play sound effect
function playSoundEffect(
  // The list of SoundEffectType is as follows:
  // "coin", "jump", "powerUp", "laser", "hit", "select", "click", "explosion", "random",
  // "synth", "tone"
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
function playMml(
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
function stopMml(track?: Track): void;
// Generate MML strings
function generateMml(options?: {
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
function init(
  // Used to generate sound effects and MMLs
  baseRandomSeed?: number,
  // When reusing an existing AudioContext
  audioContext?: AudioContext
  // When reusing an existing GainNode
  gainNode?: GainNode
): void;
// The startAudio function needs to be called from within
// the user operation event handler to enable audio playback in the browser
function startAudio(): void;
// The update function needs to be called every
// certain amount of time (typically 60 times per second)
function update(): void;
// Set the tempo of the music
function setTempo(tempo?: number): void;
// Set the quantize timing of sound effects by the length of the note
function setQuantize(noteLength?: number): void;
// Set a master volume
function setVolume(volume?: number): void;
// Reset all states
function reset(): void;
// Set a random seed number
function setSeed(baseRandomSeed?: number): void;
```

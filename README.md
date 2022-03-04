# sounds-some-sounds ([Demo](https://abagames.github.io/sounds-some-sounds/index.html))

Add sounds to your game in a minute.

## How to use

Load [build/index.js](https://github.com/abagames/sounds-some-sounds/blob/master/build/index.js) script,

```html
<script src="https://unpkg.com/sounds-some-sounds/build/index.js"></script>
```

or install from npm.

```
> npm i sounds-some-sounds
```

```js
import * as sss from "sounds-some-sounds";
```

Initialize the sss (sounds-some-sounds) library with `init()` function. The first argument allows you to set a random number seed for sound generation. Generated SEs (sound effects) and a BGM can be changed by setting the another random number seed.

```js
addEventListener("load", () => {
  sss.init(31);
```

Since Safari and Chrome requires playing the first sound within the event handler of a user operation, `startAudio()` should be called in the event handler.

```js
addEventListener("touchstart", () => {
  sss.startAudio();
// It is better to call this function from within
// 'mousedown' or 'keydown' event as well.
```

Call `playBgm()` to start a BGM.

```js
sss.playBgm();
```

`update()` should be called per a frame for updating sounds.

```js
function update() {
  requestAnimationFrame(update);
  // update function should be called in an animation frame handler
  sss.update();
```

Call `play()` to play an SE. The first argument is the name of the SE. The SEs having the same name have the same sound. You can change the generated sound by changing the name.

If the name starts with 'c', 'l', 'e', 'p', 'h', 'j', 's' or 'r',
corresponding [jsfx](https://github.com/loov/jsfx) Preset SE
(Coin, Laser, Explosion, Powerup, Hit, Jump, Select and Random (Lucky)) is generated.
You can hear these sounds at the [demo page](https://abagames.github.io/sounds-some-sounds/index.html).

The second argument is the number of generated sounds played at a time. As the number gets larger, the sound becomes louder and more complicated.

```javascript
// play the jsfx.Preset.'s'elect SE
sss.play("s1");
```

SEs are automatically quantized to the BGM. The quantize interval can be changed with the `setQuantize()` function (`setQuantize(0)` disables quantization).

You can also play a jingle (short melody) with `playJingle()`.

```javascript
// play an opening jingle (short melody) with the jsfx.Preset.'s'elect
sss.playJingle("s0");
```

```javascript
// play the jsfx.Preset.'l'aser jingle as a SE (sound effect)
sss.playJingle("l1", true);
```

`playMml()` function plays music described in [MML (Music Macro Language)](https://github.com/mohayonao/mml-iterator). You can use MML automatically composed by [good-old-game-sound-generator](https://github.com/abagames/good-old-game-sound-generator).

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

## Functions

```typescript
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
```

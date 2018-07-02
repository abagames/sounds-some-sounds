# sounds-some-sounds ([Demo](https://abagames.github.io/sounds-some-sounds/index.html?rects))

Add sounds to your game in a minute. (Web Audio API required)

### How to use

See the [sample code](https://github.com/abagames/sounds-some-sounds/blob/master/src/samples/rects.ts).

Include [build/index.js](https://github.com/abagames/sounds-some-sounds/blob/master/build/index.js) script.

Initialize the sss (sounds-some-sounds) library.
Auto generated SEs (sound effects) and a BGM can be changed by setting the another random seed.

```js
window.onload = () => {
  // initialize sss with a random seed number
  sss.init(51649);  
```

Since Safari on iOS requires playing the first sound within a touch event handler,
playEmpty() is called in document.ontouchstart handler.

```js
// play an empty sound in a touch event handler for iOS
sss.playEmpty();
```

Call playBgm() to start a BGM.

```js
// start playing a BGM
sss.playBgm();
```

update() should be called per a frame for updating sounds.

```js
function update() {
  requestAnimationFrame(update);
  // update function should be called in an animation frame handler
  sss.update();
```

Call play() to play an SE. The first argument is the name of the SE.
The SEs having the same name have the same sound.
You can change the generated sound by changing the name.

If the name starts with 'c', 'l', 'e', 'p', 'h', 'j', 's' or 'u',
corresponding [jsfx](https://github.com/loov/jsfx) Preset SE
(Coin, Laser, Explosion, Powerup, Hit, Jump, Select and Lucky) is generated.
You can hear these sounds at the [jsfx demo page](http://loov.io/jsfx/).

The second argument is the number of generated sounds played at a time.
As the number gets larger, the sound becomes louder and more complicated.

```js
// play the jsfx.Preset.'S'elect SE
sss.play("s1");
```

You can also play a jingle (short melody) with playJingle().

```js
// play an opening jingle (short melody)
sss.playJingle("s1");
```

```js
// play the jsfx.Preset.'L'aser jingle as a SE (sound effect)
sss.playJingle("l1", true);
```

SEs are automatically quantized. Call setQuantize() to change the interval of
each SE (setQuantize(0) disables quantization).

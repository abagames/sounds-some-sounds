# sounds-some-sounds ([Demo](https://abagames.github.io/sounds-some-sounds/samples/index.html?rects))

Add sounds to your game in a minute. (Web Audio API required)

### How to use

See the [sample code](https://github.com/abagames/sounds-some-sounds/blob/master/docs/index.html).

Include sounds-some-sounds/index.js script.

```html
  <script src="../sounds-some-sounds/index.js"></script>
```

Initialize the sss (sounds-some-sounds) library.
Auto generated SEs (sound effects) and a BGM can be changed by setting the another random seed.

```js
window.onload = () => {
  sss.init(1252650); // initialize sss (1252650 is a random seed)
```

Since Safari on iOS requires playing the first sound within a touch event handler,
playEmpty() is called in touchStarted().

```js
function onCursorDown(e) {
  sss.playEmpty(); // play an empty sound in a touch event handler for iOS
```

Call playBgm() to start a BGM.

```js
  if (!isInGame) {
    sss.playBgm(); // start playing a BGM
```

update() should be called per a frame for updating a BGM.

```js
function draw() {
  sss.update(); // update function should be called in an animation frame handler
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
        if (it.isEnemy) {
          sss.play('u1', 7); // play the jsfx.Preset.L'u'cky SE (7 sounds at a time)
          isInGame = false;
          sss.stopBgm();
        } else {
          sss.play('c1'); // play the jsfx.Preset.'C'oin SE
```

SEs are automatically quantized. Call setQuantize() to change the interval of
each SE (setQuantize(0) disables quantization).

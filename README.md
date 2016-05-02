sounds-some-sounds
======================
Add sounds to your game in a minute.

### How to use

See the [sample code](https://github.com/abagames/sounds-some-sounds/blob/master/www/index.html).
([p5.js](https://p5js.org/) is used for drawing.)

Include sss/index.js script.
```html
  <script src="./libs/sss/index.js"></script>
```

Initialize the sss (sounds-some-sounds) library.
Auto generated SEs and a BGM can be changed by setting the another random seed.
```js
function setup() {
  sss.init(184); // initialize sss (184 is a random seed)
```

Since Safari on iOS requires playing the first sound within a touch event handler,
playEmpty() is called in touchStarted().
```js
function touchStarted() {
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

Call play() to play an SE (sound effect). The first argument is the name of the SE.
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

You can play [the demo](http://abagames.sakura.ne.jp/16/sss/) of the sample code.

SEs are automatically quantized. Call setQuantize() to change the interval of
each SE (setQuantize(0) disables quantization).

### Libraries

[jsfx](https://github.com/loov/jsfx) /
[p5.js](https://p5js.org/)

License
----------
MIT

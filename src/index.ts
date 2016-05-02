import * as sss from './sss/index';
declare const require: any;
const p5 = require('p5');

new p5(p => {
  p.setup = () => {
    sss.init(17);
    p.createCanvas(480, 480);
    p.noStroke();
    initSeedUi();
  };
  let isInGame = false;
  let score = 0;
  let ticks = 0;
  let shipX = 240;
  const shipY = 320;
  const shipSize = 36;
  let items = [];
  p.touchStarted = () => {
    sss.playEmpty();
    if (!isInGame) {
      sss.playBgm();
      isInGame = true;
      score = 0;
      ticks = 0;
    }
  };
  p.touchMoved = () => {
    return false;
  };
  p.draw = () => {
    sss.update();
    p.background(255);
    if (isInGame) {
      p.fill('#8e8');
      shipX = p.constrain(p.mouseX, 16, 480 - 16);
      p.rect(shipX - shipSize / 2, shipY - shipSize / 2, shipSize, shipSize);
    }
    if (p.random() < 0.1 * Math.sqrt(ticks / 1000 + 1)) {
      const pos = p.createVector(p.random() * 480, -60);
      const size = (p.random() * p.random() + 0.5) * 100;
      const speed = (p.random() + 1) * (Math.sqrt(ticks / 1000 + 1)) * 2;
      const isEnemy = p.random() < (0.2 * Math.sqrt(ticks / 1000 + 1));
      items.push({ pos, size, speed, isEnemy });
    }
    for (let i = 0; i < items.length;) {
      const it = items[i];
      it.pos.y += it.speed;
      p.fill(it.isEnemy ? '#e88' : '#ee8');
      p.rect(it.pos.x - it.size / 2, it.pos.y - it.size / 2, it.size, it.size);
      const isHitting = isInGame &&
        (Math.abs(it.pos.x - shipX) < (it.size + shipSize) / 2 &&
          Math.abs(it.pos.y - shipY) < (it.size + shipSize) / 2);
      if (it.pos.y > 550 || isHitting) {
        if (isHitting) {
          if (it.isEnemy) {
            sss.play('u1', 7);
            isInGame = false;
            sss.stopBgm();
          } else {
            sss.play('c1');
            score++;
          }
        }
        items.splice(i, 1);
      } else {
        i++;
      }
    }
    p.fill('#135');
    p.textSize(24);
    p.text(score, 20, 40);
    ticks++;
  };
  function initSeedUi() {
    const change = <HTMLButtonElement>document.getElementById('change');
    const seed = <HTMLInputElement>document.getElementById('seed');
    const set = <HTMLButtonElement>document.getElementById('set');
    change.onclick = () => {
      seed.value = Math.floor(Math.random() * 9999999).toString();
      reset();
    };
    set.onclick = reset;
    function reset() {
      sss.reset();
      sss.setSeed(Number(seed.value));
      if (isInGame) {
        sss.playBgm();
      }
    }
  }
});

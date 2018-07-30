import * as sss from "../index";

const size = 480;
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;
let cursorPos = { x: 0, y: 0 };

window.onload = () => {
  // initialize sss with a random seed number
  sss.init(4733606);
  canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  context = canvas.getContext("2d");
  document.body.appendChild(canvas);
  initSeedUi();
  document.addEventListener("mousedown", e => {
    onCursorDown(e.clientX, e.clientY);
  });
  document.addEventListener("touchstart", e => {
    onCursorDown(e.touches[0].clientX, e.touches[0].clientY);
  });
  document.addEventListener("mousemove", e => {
    onCursorMove(e.clientX, e.clientY);
  });
  document.addEventListener(
    "touchmove",
    e => {
      e.preventDefault();
      onCursorMove(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: false }
  );
  document.addEventListener("mouseup", e => {
    onCursorUp();
  });
  document.addEventListener(
    "touchend",
    e => {
      e.preventDefault();
      onCursorUp();
      (e.target as any).click();
    },
    { passive: false }
  );
  update();
};

let isInGame = false;
let score = 0;
let ticks = 0;
let shipX = 240;
const shipY = 320;
const shipSize = 36;
let items = [];

function onCursorDown(x: number, y: number) {
  // play an empty sound in a touch event handler for iOS
  sss.playEmpty();
  if (!isInGame) {
    isInGame = true;
    // play an opening jingle (short melody) with the jsfx.Preset.'s'elect
    sss.playJingle("s0");
    score = 0;
    ticks = 0;
  }
  onCursorMove(x, y);
}

function onCursorMove(x: number, y: number) {
  cursorPos.x = x - canvas.offsetLeft;
  cursorPos.y = y - canvas.offsetTop;
}

function onCursorUp() {
  // call AudioContext#resume() in a ui event handler for Chrome
  sss.resumeAudioContext();
}

function update() {
  requestAnimationFrame(update);
  // update function should be called in an animation frame handler
  sss.update();
  context.fillStyle = "white";
  context.fillRect(0, 0, size, size);
  if (isInGame) {
    if (ticks === 180) {
      // start playing a BGM
      sss.playBgm();
    }
    context.fillStyle = "#8e8";
    shipX = constrain(cursorPos.x, 16, size - 16);
    context.fillRect(
      shipX - shipSize / 2,
      shipY - shipSize / 2,
      shipSize,
      shipSize
    );
  }
  if (Math.random() < 0.1 * Math.sqrt(ticks / 1000 + 1)) {
    const pos = { x: Math.random() * 480, y: -60 };
    const size = (Math.random() * Math.random() + 0.5) * 100;
    const speed = (Math.random() + 1) * Math.sqrt(ticks / 1000 + 1) * 2;
    const isEnemy = Math.random() < 0.2 * Math.sqrt(ticks / 1000 + 1);
    items.push({ pos, size, speed, isEnemy });
  }
  for (let i = 0; i < items.length; ) {
    const it = items[i];
    it.pos.y += it.speed;
    context.fillStyle = it.isEnemy ? "#e88" : "#ee8";
    context.fillRect(
      it.pos.x - it.size / 2,
      it.pos.y - it.size / 2,
      it.size,
      it.size
    );
    const isHitting =
      isInGame &&
      (Math.abs(it.pos.x - shipX) < (it.size + shipSize) / 2 &&
        Math.abs(it.pos.y - shipY) < (it.size + shipSize) / 2);
    if (it.pos.y > 550 || isHitting) {
      if (isHitting) {
        if (it.isEnemy) {
          isInGame = false;
          sss.stopBgm();
          sss.stopJingles();
          // play the jsfx.Preset.'l'aser jingle as a SE (sound effect)
          sss.playJingle("l1", true);
        } else {
          // play the jsfx.Preset.'s'elect SE
          sss.play("s1");
          score++;
        }
      }
      items.splice(i, 1);
    } else {
      i++;
    }
  }
  context.fillStyle = "#135";
  context.font = "24px monospace";
  context.fillText(String(score), 20, 40);
  ticks++;
}

function constrain(v: number, min: number, max: number) {
  return Math.max(min, Math.min(v, max));
}

function initSeedUi() {
  const change = <HTMLButtonElement>document.getElementById("change");
  const seed = <HTMLInputElement>document.getElementById("seed");
  const set = <HTMLButtonElement>document.getElementById("set");
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

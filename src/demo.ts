import * as sss from "./main";
(window as any).sss = sss;
import "../lib/crisp-game-lib/bundle.js";

(window as any).options = {
  isShowingScore: false,
};

let playingButtons;
let currentPlay;
let seed = 31;

(window as any).update = function () {
  if (ticks === 0) {
    playingButtons = [
      "coin",
      "laser",
      "explosion",
      "powerUp",
      "hit",
      "jump",
      "select",
      "random",
    ].map((p, i) =>
      getButton({
        pos: vec(5, 2 + i * 9),
        size: vec(56, 7),
        text: p,
        isToggle: false,
        onClick: () => {
          sss.play(p);
          currentPlay = p;
        },
      })
    );
    sss.setSeed(seed);
    sss.playBgm();
  }
  playingButtons.forEach((pb) => {
    updateButton(pb);
  });
  const bp = vec(5, 73);
  color("light_blue");
  rect(bp.x, bp.y, 90, 5);
  color("white");
  rect(bp.x + 1, bp.y + 1, 88, 3);
  if (input.pos.isInRect(bp.x + 1, bp.y + 1, 88, 3)) {
    let nextSeed = input.pos.x - bp.x;
    color("blue");
    rect(bp.x + nextSeed, bp.y + 1, 1, 3);
    text(`${nextSeed}`, 85, bp.y - 3);
    if (input.isJustPressed) {
      seed = nextSeed;
      sss.stopBgm();
      sss.setSeed(seed);
      sss.playBgm();
    }
  }
  color("black");
  rect(bp.x + seed, bp.y + 1, 1, 3);
  text(`init(${seed})`, 5, 88);
  if (currentPlay != null) {
    text(`play("${currentPlay}");`, 5, 95);
  }
};

declare const onLoad: any;
window.addEventListener("load", onLoad);

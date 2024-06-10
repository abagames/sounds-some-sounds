import * as sss from "./main";
(window as any).sss = sss;
import "../lib/crisp-game-lib/bundle.js";

(window as any).options = {
  theme: "dark",
  isShowingScore: false,
};

let playingButtons;
let seed = 1;

(window as any).update = function () {
  if (ticks === 0) {
    playingButtons = [
      "coin",
      "jump",
      "powerUp",
      "laser",
      "select",
      "hit",
      "click",
      "explosion",
      "random",
    ].map((p, i) =>
      getButton({
        pos: vec(5, 2 + i * 9),
        size: vec(56, 7),
        text: p,
        isToggle: false,
        onClick: () => {
          sss.playSoundEffect(p as SoundEffectType);
        },
      })
    );
    sss.setSeed(seed);
    sss.playMml(sss.generateMml());
  }
  playingButtons.forEach((pb) => {
    updateButton(pb);
  });
  const bp = vec(5, 92);
  color("light_blue");
  rect(bp.x, bp.y, 90, 5);
  color("white");
  rect(bp.x + 1, bp.y + 1, 88, 3);
  if (input.pos.isInRect(bp.x + 1, bp.y + 1, 88, 3)) {
    let nextSeed = input.pos.x - bp.x;
    color("blue");
    rect(bp.x + nextSeed, bp.y + 1, 1, 3);
    text(`${nextSeed}`, 90, bp.y - 4, { isSmallText: true });
    if (input.isJustPressed) {
      seed = nextSeed;
      sss.stopMml();
      sss.setSeed(seed);
      sss.playMml(sss.generateMml());
    }
  }
  color("black");
  rect(bp.x + seed, bp.y + 1, 1, 3);
  text(`seed: ${seed}`, 5, bp.y - 4, { isSmallText: true });
};

declare const onLoad: any;
window.addEventListener("load", onLoad);

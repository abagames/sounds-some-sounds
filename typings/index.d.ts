declare module "sounds-some-sounds" {
  function init(_seed?: number, tempo?: number, fps?: number);
  function setSeed(_seed?: number);
  function play(
    name?: string,
    numberOfSounds?: number,
    note?: number,
    params?: any,
    volume?: number
  );
  function playJingle(
    name?: string,
    isSe?: boolean,
    note?: number,
    len?: number,
    interval?: number,
    numberOfTracks?: number,
    param?: any,
    volume?: number
  );
  function stopJingles();
  function setVolume(volume: number);
  function setQuantize(_quantize: number);
  function playBgm(
    name?: string,
    note?: number,
    len?: number,
    interval?: number,
    numberOfTracks?: number,
    params?: any,
    volume?: number
  );
  function stopBgm();
  function update(): number;
  function reset();
  function playEmpty();
  function playParam(param: any);
  const Preset;
  let playInterval: number;
}

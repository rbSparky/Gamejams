import { config } from "/config.js";

let kaboomOptions = {
  canvas: document.getElementById("game"),
  width: config.gameWidth,
  height: config.gameHeight,
  scale: 1,
  version: "v2000.1",
  //global: false,
  clearColor: [0, 0, 0, 1],
  crisp: true,
  debug: true,
};

export const k = kaboom(kaboomOptions);
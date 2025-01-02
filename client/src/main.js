import Phaser from "phaser";
import { Boot } from "./scenes/Boot";
import { Game } from "./scenes/Game";
import { GameOver } from "./scenes/GameOver";
import { MainMenu } from "./scenes/MainMenu";
import { Preloader } from "./scenes/Preloader";
import FullscreenUtils from "./utils/canvaFullScreen";

// Phaser Game Config
let config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: "game-container",
  backgroundColor: "#028af8",
  scene: [Boot, Preloader, MainMenu, Game, GameOver],
};

const game = new Phaser.Game(config);

// Initialize FullscreenUtils
const fullscreenUtils = new FullscreenUtils({
  canvas: document.getElementById("game-container"),
  controls: document.getElementById("controls"),
  defaultSize: { width: 1280, height: 720 },
  fullscreenSize: { width: 1920, height: 1080 },
  gameInstance: game,
});

// Add fullscreen toggle to button
document.getElementById("fullscreen-btn").addEventListener("click", () => {
  fullscreenUtils.toggleFullscreen();
});

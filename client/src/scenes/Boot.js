import { Scene } from "phaser";
import FullscreenUtils from "../utils/canvaFullScreen"; // Update the import path accordingly

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    // Load assets
    this.load.image("background", "assets/bg.png");
    this.load.image("logo", "assets/images.jpeg");
  }

  create() {
    // Add the background image
    this.bg = this.add.image(0, 0, "background").setOrigin(0, 0);
    this.bg.setDisplaySize(this.scale.width, this.scale.height);

    // Setup fullscreen utils (pass scene for resizing background)
    this.fullscreenUtils = new FullscreenUtils({
      canvas: document.getElementById("game-container"),
      controls: document.getElementById("controls"),
      defaultSize: { width: 1280, height: 720 },
      fullscreenSize: { width: 1920, height: 1080 },
      gameInstance: this.game,
      scene: this, // Pass scene to allow manual resize of the background
    });

    // Listen for resize events to dynamically resize the background
    this.scale.on("resize", this.resizeBackground, this);

    // Start the next scene
    this.scene.start("Preloader");
  }

  resizeBackground(gameSize) {
    // Update the background's size dynamically when the canvas size changes
    const { width, height } = gameSize;
    this.bg.setDisplaySize(width, height);
  }
}

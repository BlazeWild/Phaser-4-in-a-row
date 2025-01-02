export default class FullscreenUtils {
    constructor({ canvas, controls, defaultSize, fullscreenSize, gameInstance }) {
      this.canvas = canvas;
      this.controls = controls;
      this.defaultSize = defaultSize;
      this.fullscreenSize = fullscreenSize;
      this.gameInstance = gameInstance;
      this.scene = null;
      this.hideControlsTimeout = null;
  
      // Bind events
      this.setupEventListeners();
    }
  
    setScene(scene) {
      this.scene = scene;
    }
  
    setupEventListeners() {
      document.addEventListener('fullscreenchange', this.handleFullscreenChange.bind(this));
  
      this.canvas.addEventListener('mousemove', this.showControls.bind(this));
  
      this.controls.addEventListener('click', (event) => {
        event.stopPropagation();
        this.showControls();
      });
    }
  
    toggleFullscreen() {
      if (!document.fullscreenElement) {
        this.canvas.requestFullscreen().then(() => {
          this.resizeCanvas(this.fullscreenSize.width, this.fullscreenSize.height);
          this.controls.classList.add('fullscreen-mode');
          this.resizeBackground(); // Resize the background and all images
        });
      } else {
        document.exitFullscreen().then(() => {
          this.resizeCanvas(this.defaultSize.width, this.defaultSize.height);
          this.controls.classList.remove('fullscreen-mode');
          this.resizeBackground(); // Resize the background and all images
        });
      }
    }
  
    handleFullscreenChange() {
      if (!document.fullscreenElement) {
        this.resizeCanvas(this.defaultSize.width, this.defaultSize.height);
        this.controls.classList.remove('fullscreen-mode');
        this.resizeBackground(); // Resize the background and all images
      }
    }
  
    resizeCanvas(width, height) {
      this.gameInstance.scale.resize(width, height);
    }
  
    resizeBackground() {
      if (this.scene) {
        const { width, height } = this.gameInstance.scale;
  
        // Resize the background to fit the full canvas
        const scalePercentage = 0.8; // Example: Set 80% of the canvas size
        this.scene.bg.setDisplaySize(width * scalePercentage, height * scalePercentage);
  
        // Loop through all images in the scene and resize them
        this.scene.children.list.forEach(child => {
          if (child.type === 'Image') {
            child.setDisplaySize(width * scalePercentage, height * scalePercentage);
          }
        });
      } else {
        console.warn("Scene is not initialized yet, skipping background resize.");
      }
    }
  
    showControls() {
      this.controls.classList.add('active');
      clearTimeout(this.hideControlsTimeout);
      this.hideControlsTimeout = setTimeout(() => {
        this.controls.classList.remove('active');
      }, 3000); // Keep controls visible for 3 seconds
    }
  }
  
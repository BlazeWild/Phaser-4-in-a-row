export class BackgroundUtils {
  static createBackground(scene, key) {
    const background = scene.add.image(0, 0, key);
    background.setOrigin(0, 0);
    background.setDisplaySize(
      background.texture.width,
      background.texture.height
    );
    return background;
  }
}

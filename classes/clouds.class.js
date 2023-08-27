class Clouds extends moveableObject {
  height = 350;
  width = 650;
  y = 20;
  x = Math.random() * 500;
  speed = 0.15;

  /**
   * The Constructor first loads the Parent Class and the cloud Image.
   * after that the function starts animation of clouds moving to the left.
   * @param {string} path - Image Path
   */
  constructor(path) {
    super().loadImage(path);
    this.moveClouds();
  }

  /**
   * Calling a Function called moveLeft which is used for the Animation of the Clouds.
   */
  moveClouds() {
    this.moveLeft();
  }

  /**
   * This function is animating the Clouds moving to the left.
   */
  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}

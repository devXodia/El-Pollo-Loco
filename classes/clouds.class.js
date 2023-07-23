class Clouds extends moveableObject {
  height = 350;
  width = 650;
  y = 20;
  x = Math.random() * 500;
  speed = 0.15;
  constructor(path) {
    super().loadImage(path);
    this.moveClouds();
  }

  moveClouds() {
    this.moveLeft();
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}

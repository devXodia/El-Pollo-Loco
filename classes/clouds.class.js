class Clouds extends moveableObject {
  height = 350;
  width = 650;
  y = 20;
  x = Math.random() * 500;

  constructor(path) {
    super().loadImage(path);
    this.moveClouds();
  }

  moveClouds() {
    setInterval(() => {
      this.x -= 0.15;
    }, 1000 / 60);
  }
}

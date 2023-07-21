class Clouds extends moveableObject {
  height = 350;
  width = 650;
  y = 20;
  x = Math.random() * 500;

  constructor(path) {
    super().loadImage(path);
  }
}

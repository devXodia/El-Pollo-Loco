class BackgroundObject extends moveableObject {
  width = 720;
  height = 400;
  constructor(path, x, y) {
    super().loadImage(path);
    this.x = x;
    this.y = y;
  }
}

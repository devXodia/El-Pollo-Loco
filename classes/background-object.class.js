class BackgroundObject extends moveableObject {
  width = 720;
  y = 330;
  x = 0;

  constructor(path) {
    super().loadImage(path);
  }
}

class Chicken extends moveableObject {
  constructor() {
    super().loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.height = 50;
    this.width = 50;
    this.y = 370;
    this.x = 200 + Math.random() * 500;
  }
}

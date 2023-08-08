class Coin extends BackgroundObject {
  IMAGES_WALKING = ["../img/8_coin/coin_1.png", "../img/8_coin/coin_2.png"];

  x = 200;

  constructor() {
    super().loadImage("../img/8_coin/coin_1.png");
    this.height = 110;
    this.width = 110;
    this.y = 330 + Math.random() * -100;
    this.x = Coin.nextX;
    Coin.nextX += 150;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}

Coin.nextX = 200;

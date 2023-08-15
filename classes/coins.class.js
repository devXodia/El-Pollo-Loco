class Coin extends BackgroundObject {
  IMAGES_WALKING = ["../img/8_coin/coin_1.png", "../img/8_coin/coin_2.png"];

  x = 200;

  constructor() {
    super().loadImage("../img/8_coin/coin_1.png");
    this.height = 80;
    this.width = 80;
    this.y = 330 + Math.random() * -100;
    this.x = Coin.nextX;
    Coin.nextX += 250;
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}

Coin.nextX = 250;

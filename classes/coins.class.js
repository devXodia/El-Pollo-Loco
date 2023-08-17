class Coin extends BackgroundObject {
  IMAGES_COINS = ["../img/8_coin/coin_1.png", "../img/8_coin/coin_2.png"];

  x = 200;

  constructor() {
    super().loadImage("../img/8_coin/coin_1.png");
    this.height = 80;
    this.width = 80;
    this.y = 330 + Math.random() * -100;
    this.x = Coin.nextX;
    Coin.nextX += 200;
    this.loadImages(this.IMAGES_COINS);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 200);
  }
}

Coin.nextX = 200;

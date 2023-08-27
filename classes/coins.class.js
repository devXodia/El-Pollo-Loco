class Coin extends BackgroundObject {
  IMAGES_COINS = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  x = 200;

   /**
  * 
  * The Constructor first loads the Image of the Coin to be shown first. 
  * Sets up height, width, x and y position of the Coin.
  * After that the function adds a random number to the y position of every new Coin and 200 to the x position of every new Coin.
  * And then all the images are created with the given array of images and ready for animation. 
  * 
  */
  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.height = 80;
    this.width = 80;
    this.y = 330 + Math.random() * -100;
    this.x = Coin.nextX;
    Coin.nextX += 200;
    this.loadImages(this.IMAGES_COINS);
    this.animate();
  }

  /**
   * This Function animates the Coins.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 200);
  }
}

Coin.nextX = 250;

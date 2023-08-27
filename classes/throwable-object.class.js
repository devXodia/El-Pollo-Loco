class ThrowableObject extends moveableObject {
  currentX = this.x;
  isThrown;

  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * This constructor loades the Parent Class and loads the first Image.
   * After that it sets the throwable bottle x and y position to the ones of the character.
   * Then it sets the height of the Bottle.
   * The Direction of the Bottle throw is being set to the characters currently looked at direction.
   * And after that it calls the Throw function
   * 
   * @param {number} x - x position of character
   * @param {number} y - y position of character
   */
  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.height = 80;
    this.isThrown = true;
    this.otherDirection = world.character.otherDirection;
    this.throw();
  }

  /**
   * This function is used to animate the bottle throw.
   */
  throw() {
    if (this.isThrown) {
      this.speedY = 25;
      this.applyGravityBottle();
      this.throwInterval = setInterval(() => {
          if (this.otherDirection) {
          this.x -= 10;
          } if (!this.otherDirection ) {
            this.x += 10
          }
          this.playAnimation(this.IMAGES_ROTATION);
        }, 29);
      }
  }
  
  /**
   * This function applys gravity to the Bottle.
   */
  applyGravityBottle() {
    if (this.isThrown) {
      this.gravityInterval = setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }, 1000 / 25);
    }
  }

  /**
   * this function is used to stop the bottle Throw animation.
   */
  stopIntervals() {
    clearInterval(this.throwInterval);
    clearInterval(this.gravityInterval);
  }

  /**
   * This function is used to play the Bottle Spinning Animation for needed specific duration
   * @param {Array} images - Array of Images 
   * @param {number} duration - Animation duration
   * @param {Function} onComplete - Call back function
   */
  bottlePlayAnimation(images, duration, onComplete) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;

    const animationTimer = setTimeout(() => {
      this.stopAnimation();
      if (onComplete) {
        onComplete();
      }
    }, duration);

    this.animationTimer = animationTimer;
  }

  /**
   * This function stops the Animation of the bottle spin.
   */
  stopAnimation() {
    clearInterval(this.animationTimer);
  }

  /**
   * This function positions the bottle on the chicken
   * @param {Object} bottle - Current bottle object
   * @param {Object} enemy - Current chicken object
   */
  positionBottleOnEnemy(bottle, enemy) {
    bottle.x = enemy.x + (enemy.width - bottle.width) / 2;
    bottle.y = enemy.y + (enemy.height - bottle.height) / 2;
  }

  /**
   * this function is used for removing the Bottle Object out of the Array.
   */
  killBottle() {
    world.ThrowableObjects.splice(0, 1);
  }
}

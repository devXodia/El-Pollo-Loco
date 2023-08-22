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

  throw() {
    if (this.isThrown) {
      this.speedY = 25;
      this.applyGravityBottle();

      this.throwInterval = setInterval(
        () => {
          if (this.otherDirection) {
          
          this.x -= 10;
          } if (!this.otherDirection ) {
            this.x += 10
          }
          this.playAnimation(this.IMAGES_ROTATION);
        },

        29
      );
    }
  }

  applyGravityBottle() {
    if (this.isThrown) {
      this.gravityInterval = setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }, 1000 / 25);
    }
  }

  stopIntervals() {
    clearInterval(this.throwInterval);
    clearInterval(this.gravityInterval);
  }

  bottlePlayAnimation(images, duration, onComplete) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;

    // Set up a timer to stop the animation after the specified duration
    const animationTimer = setTimeout(() => {
      this.stopAnimation();
      if (onComplete) {
        onComplete();
      }
    }, duration);

    // Keep track of the timer so you can cancel it if needed
    this.animationTimer = animationTimer;
  }

  stopAnimation() {
    clearInterval(this.animationTimer);
    // Reset the currentImage or perform any other necessary cleanup
  }

  positionBottleOnEnemy(bottle, enemy) {
    bottle.x = enemy.x + (enemy.width - bottle.width) / 2;
    bottle.y = enemy.y + (enemy.height - bottle.height) / 2;
  }

  killBottle() {
    world.ThrowableObjects.splice(0, 1);
  }
}

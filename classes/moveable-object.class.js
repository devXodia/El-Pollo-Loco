class moveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }, 1000 / 25);
  }

  isAboveGround() {
     
    if (this instanceof ThrowableObject) {
      // Throwable Object should always fall
      return true;
    } else {
      return this.y < 250;
      
    }
    
  }

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 1;
  }

  isDead() {
    return this.energy == 0;
  }

  /**
   *
   * @param {Array} arr - [Image Sources]
   */

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  jump() {
    this.speedY = 21;
    
    
  }

  updateCharacterHealth() {
    this.hit();
    if (!audio_muted) {
      hurt_sound.play();
    }
    this.world.statusBar.setPercentage(this.energy);
  }

  bottleKillsChicken(enemy, bottle) {
    enemy.chickenHit();
    bottle.positionBottleOnEnemy(bottle, enemy);
    enemy.chickenDeathAnimation(enemy);
    bottle.killBottle();
  }

  newPlayAnimation(images, duration, onComplete) {
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
}

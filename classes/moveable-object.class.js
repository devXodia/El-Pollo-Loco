class moveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;


  /**
   * This function applys gravity to the Character.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        if (this.y > 250) {
          this.y = 250;
          this.speedY = 0; // Stop the downward motion
        }
      }
      this.speedY -= this.acceleration;
    }, 1000 / 25);
  }


  /**
   * 
   * @returns returns if the Character is currently above the Ground or not and excludes the Bottle Objects.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      // Throwable Object should always fall
      return true;
    } else {
      return this.y < 250;
      
    }
    
  }

  /**
   * 
   * @param {Object} mo - Currently given moveable object 
   * @returns returns if the given Object is colliding with the object the function is called from.
   */
  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y + mo.height
    );
  }

  /**
   * This function is subtracting hp from the Character and saving the time when the character was last hit.
   */
  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * 
   * @returns returns if the last time since the character was hit is less then a second ago
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 1;
  }

  /**
   * 
   * @returns returns if the Character is Dead or not
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * this function makes the given object move to the right.
   */
  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  /**
   * this function makes the given object move to the left.
   */
  moveLeft() {
    this.x -= this.speed;
    this.otherDirection = true;
  }

  /**
   * This function is displaying every Image in given Array and is creating a animation effect.
   * @param {Array} images - given array with image paths 
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * This function is used for the given object to jump.
   */
  jump() {
    this.speedY = 21;
  }

  /**
   * This function is used to update the Health of the Character and playing a hurt sound if the Audio is not muted.
   */
  updateCharacterHealth() {
    this.hit();
    if (!audio_muted) {
      hurt_sound.play();
    }
    this.world.statusBar.setPercentage(this.energy);
  }

  /**
   * This function is used to kill the chicken with a bottle.
   * 
   * @param {Object} enemy - Currently given enemy chicken
   * @param {Object} bottle  Currently given bottle
   */
  bottleKillsChicken(enemy, bottle) {
    enemy.chickenHit();
    bottle.positionBottleOnEnemy(bottle, enemy);
    enemy.chickenDeathAnimation(enemy);
    bottle.killBottle();
  }

  /**
   * this function is also creating a animation but used in specific cases for speciifc animation durations
   * 
   * @param {Array} images - Array with Image paths
   * @param {number} duration - given duration of the Animation
   * @param {Function} onComplete - callback Function after the Animation is played
   */
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

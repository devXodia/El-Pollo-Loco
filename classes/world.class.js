class World {
  character = new Character();
  boss = new Endboss();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = -0;
  statusBar = new Statusbar();
  moneyBar = new Moneybar();
  bottleBar = new Bottlebar();
  ThrowableObjects = [];

  /**
   * This constructor sets up the world of the Game.
   *
   * 
   * @param {HTMLElement} canvas - Html element of Canvas
   */
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.getCoin();
    this.getBottle();
    this.checkCollisionsInterval();
  }

  /**
   * ths function sets the world for character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * this function is used to check if the user is currently buying bottles, throwing bottles or if the game is over or not.
   */
  run() {
    setInterval(() => {
      this.buyBottle();
      this.checkThrowObjects();
      isGameOver();
    }, 180);
  }

  /**
   * This function is used to check if the bottle is Colliding with the enemy chicken and if the character is colliding 
   * with chicken or endboss.
   */
  checkCollisionsInterval() {
    setInterval(() => {
      this.bottleCollison();
      this.checkCollisions();
    }, 100);
  }

  /**
   * this function is used to add money to the user if the user picks up the coins in the world.
   */
  getCoin() {
    setInterval(() => {
      this.level.coins.forEach((coin) => {
        if (this.character.isColliding(coin)) {
          this.moneyBar.addMoney();
          if (!audio_muted) {
            coin_sound.play();
          }
          this.moneyBar.setPercentage(this.moneyBar.coin);
          this.level.coins.splice(0, 1);
        }
      });
    }, 200);
  }

  /**
   * this function is used to add bottles to the user if the user picks up the bottles in the world.
   */
  getBottle() {
    setInterval(() => {
      this.level.bottles.forEach((bottle) => {
        if (this.character.isColliding(bottle)) {
          this.bottleBar.addBottle();
          this.bottleBar.setPercentage(this.bottleBar.bottle);
          this.level.bottles.splice(0, 1);
        }
      });
    }, 200);
  }

  /**
   * this function is used to draw all the objects on the Canvas.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawBackgroundObjects();
    this.drawStatusbars();
    this.addToMap(this.character);
    this.drawCollectables();
    this.drawEnemies();
    this.addToMap(this.boss);
    this.ctx.translate(-this.camera_x, 0);
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * This function adds the Objects to the Map.
   * @param {object} object - currently given object 
   */
  addObjectsToMap(object) {
    object.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  /**
   * This function is checking in which direction the object is currently looking and draws it.
   * @param {Object} mo - given moveable object
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * This function is used to flip the image to its original.
   * @param {object} mo - given moveable object 
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }
  /**
   * This function is used to flip the image opposite of the original.
   * @param {object} mo - given moveable object 
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * this function is used to check collisions with character, chickens and boss.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (!this.character.isAboveGround() && enemy.hp === 100) {
          this.character.updateCharacterHealth();
        } else if (this.character.isAboveGround() && this.character.isColliding(enemy) && !this.character.isHurt()){
          this.killChickenWithJump(enemy);
        }}});
    if (this.bossCollision()) {
      this.boss.newPlayAnimation(this.boss.IMAGES_ATTACK, 200, () => {});
      this.character.updateCharacterHealth();
    }
  }

  /**
   * This function checks if the user wants to throw the bottle and throws it.
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.bottleBar.bottle > 0) {
      let bottle = new ThrowableObject(this.character.x, this.character.y);
      this.ThrowableObjects.push(bottle);
      this.bottleBar.bottle -= 10;
      this.bottleBar.percentage -= 8;
      this.bottleBar.setPercentage(this.bottleBar.percentage);
    } else if (this.keyboard.D && !audio_muted && this.bottlesNotAvailable()) {
      negative_sound.play();
    }
  }
  
  /**
   * This function checks if the bottle is colliding with chicken or boss.
   */
  bottleCollison() {
    this.ThrowableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          this.bottleAnimationsOnChicken(enemy, bottle);
        }
      });

      if (bottle.isColliding(this.boss)) {
        this.bottleAnimationsOnBoss(bottle);
        this.boss.bossHit();
      }
    });
  }

  /**
   * This function checks if the user wants to buy the bottle and buys it.
   */
  buyBottle() {
    if ((this.keyboard.B && this.moneyBar.coin <= 0) || (this.keyboard.B && this.bottleBar.bottle >= 100)) {
      if (!audio_muted) {
        negative_sound.play();
      }
    } else if (this.keyboard.B && this.moneyBar.coin > 0) {
      if (!audio_muted) {
        buy_audio.currentTime = 0;
        buy_audio.play();
      }
      this.bottleBuying();
    }
  }

  /**
   * this function checks if the user wants to throw the bottle when they are not available
   * @returns returns if bottles are available or not
   */
  bottlesNotAvailable() {
    return this.keyboard.D && this.bottleBar.bottle <= 0;
  }

  /**
   * This function is used to return the array index of given chicken
   * @param {object} enemy - chicken object
   * @returns returns the index of current chicken
   */
  getIndex(enemy) {
    return level1.enemies.indexOf(enemy);
  }

  /**
   * this function is used to check if the character is currently above ground and the given chicken has 100 hp
   * @returns returns if the character is above ground or not and if the chicken has 100 hp
   */
  chickenCollision() {
    return !this.character.isAboveGround() && enemy.hp === 100;
  }

  /**
   * this function is used to check if there is a collision between boss and character
   * @returns returns collision between boss and character
   */
  bossCollision() {
    return (
      this.character.isColliding(this.boss) ||
      this.boss.isColliding(this.character)
    );
  }

  /**
   * This function is used to play a splash animation of the bottle on the given chicken and to remove the bottle and chicken afterwards.
   * @param {object} enemy - currently given chicken object 
   * @param {object} bottle - currently given bottle object
   */
  bottleAnimationsOnChicken(enemy, bottle) {
    bottle.stopIntervals();
    bottle.bottlePlayAnimation(bottle.IMAGES_SPLASH, 100, () => {
      bottle.bottleKillsChicken(enemy, bottle);
      bottle.killBottle();
    });
  }

  /**
   *  This function is used to play a splash animation of the bottle on the endboss and to remove the bottle afterwards.
   * @param {object} bottle - currently given bottle object 
   */
  bottleAnimationsOnBoss(bottle) {
    bottle.stopIntervals();
    bottle.bottlePlayAnimation(bottle.IMAGES_SPLASH, 100, () => {
      bottle.killBottle();
    });
  }
  
  /**
   * this function is used to subtract money and add bottles to the user. 
   * After that the percentage of the statusbars are being set to the amount of available money and bottles.
   */
  bottleBuying() {
    this.moneyBar.subtractMoney();
    this.bottleBar.addBottle();
    this.moneyBar.setPercentage(this.moneyBar.coin);
    this.bottleBar.setPercentage(this.bottleBar.bottle);
  }

  /**
   * This function draws the Background Objects in the World.
   */
  drawBackgroundObjects(){
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
  }

  /**
   * This function draws the Statusbars in the World.
   */
  drawStatusbars(){
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.moneyBar);
    this.addToMap(this.bottleBar);
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * This function draws the collectables in the World.
   */
  drawCollectables(){
    this.addObjectsToMap(this.ThrowableObjects);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    
  }

  /**
   * This function draws the Enemies in the World.
   */
  drawEnemies(){
    this.addObjectsToMap(this.level.enemies);
  }

  /**
   * This function kills the given Chicken.
   * @param {object} enemy - Currently given Chicken Object 
   */
  killChickenWithJump(enemy){
    this.character.jump();
    enemy.chickenHit();
    enemy.chickenDeathAnimation(enemy);
  }
}

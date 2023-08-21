class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = -0;
  statusBar = new Statusbar();
  moneyBar = new Moneybar();
  bottleBar = new Bottlebar();
  ThrowableObjects = [];

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.getCoin();
    this.getBottle();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.bottleCollison();
      console.log(this.character.x)
    }, 200);
  }

  getCoin() {
    setInterval(() => {
      this.level.coins.forEach((coin) => {
        if (this.character.isColliding(coin)) {
          this.moneyBar.addMoney();
          if(!audio_muted){
            coin.sound.play();
          } else {
          this.moneyBar.setPercentage(this.moneyBar.coin);
          this.level.coins.splice(0, 1);
        }
        }
      });
    }, 200);
  }

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

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBar);
    this.addToMap(this.moneyBar);
    this.addToMap(this.bottleBar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);

    this.addObjectsToMap(this.ThrowableObjects);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.boss);

    this.ctx.translate(-this.camera_x, 0);

    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(object) {
    object.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

   checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      this.level.boss.forEach((boss) => {
        if (this.character.isColliding(enemy) && enemy.hp == 100) {
          this.character.updateCharacterHealth();
        } else if (this.character.jumpCollision(enemy)) {
          enemy.chickenHit()
        } else if (this.character.isColliding(boss)) {
          this.character.updateCharacterHealth();
        }
      });
    });
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.bottleBar.bottle > 0) {
      let bottle = new ThrowableObject(this.character.x, this.character.y);
      this.ThrowableObjects.push(bottle);
      this.bottleBar.bottle -= 10;
      this.bottleBar.percentage -= 8;
      this.bottleBar.setPercentage(this.bottleBar.percentage);
    }
  }

  bottleCollison() {
    this.ThrowableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        this.level.boss.forEach((boss) => {
          if (bottle.isColliding(enemy)) {
            bottle.stopIntervals();
            bottle.bottlePlayAnimation(bottle.IMAGES_SPLASH, 100, () => {
              bottle.bottleKillsChicken(enemy, bottle);
            });
          } else if (bottle.isColliding(boss)) {
            boss.hp -= 4;
            if (boss.hp < 50) {
              boss.speed = 20;
            }
          }
        });
      });
    });
  }
}

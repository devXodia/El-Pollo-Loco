class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [
    new Clouds("../img/5_background/layers/4_clouds/1.png"),
    new Clouds("../img/5_background/layers/4_clouds/2.png"),
  ];
  backgroundObjects = [
    new BackgroundObject("../img/5_background/layers/3_third_layer/1.png"),
  ];
  ctx;
  canvas;
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addToMap(this.character);

    this.enemies.forEach((enemy) => {
      this.addToMap(enemy);
    });

    this.clouds.forEach((cloud) => {
      this.addToMap(cloud);
    });

    this.backgroundObjects.forEach((object) => {
      this.addToMap(object);
    });
    // Draw wird immer wieder aufgerufen
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}

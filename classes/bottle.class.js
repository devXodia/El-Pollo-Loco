class Bottle extends BackgroundObject{

    IMAGES_BOTTLE = [
      "img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

  x = 300;

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.height = 80;
    this.width = 80;
    this.y = 330;
    this.x = Bottle.nextX;
    Bottle.nextX += 190;
    this.loadImages(this.IMAGES_BOTTLE);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 200);
  }
}

Bottle.nextX = 350;


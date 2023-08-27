class Bottle extends BackgroundObject{

    IMAGES_BOTTLE = [
      "img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png"];

  x = 300;


 /**
  * 
  * The Constructor first loads the Image to be shown first. 
  * Sets up height, width, x and y position of the Bottle on the Ground.
  * After that the function adds 190 to the x position of every new bottle.
  * And then all the images are created with the given array of images and ready for animation. 
  * 
  */
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

  /**
   * This Function animates the Bottles on the Ground.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 200);
  }
}

Bottle.nextX = 350;


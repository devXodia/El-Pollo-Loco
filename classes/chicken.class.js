class Chicken extends moveableObject {
  IMAGES_WALKING = [
    "../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD = [
    "img/3_enemies_chicken/chicken_normal/2_dead/dead.png"
  ];
  
  hp = 100;

  /**
   *
   * The Constructor first loads parent class.
   * Sets up the position, height and width of the character. 
   * After that the function makes sure that every new Chicken is being created at a random x position from 150 upwards
   * Creates all The Images needed for the different States of the Chicken.
   * After that every Chicken gets its unique traveling speed
   * and starts the animations for the Chicken.
   *
   */
  constructor() {
    super().loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.height = 50;
    this.width = 50;
    this.y = 370;
    this.x = Chicken.nextX;
    Chicken.nextX += 150 + Math.random() * 300;
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGE_DEAD);
    this.speed = 0.15 + Math.random() * 0.25;
    this.animate();
  }

  /**
   * This function is used for Animations of the Chicken.
   */
  animate() {
    setInterval(() => {
      if(this.hp === 100){
      this.moveLeft();
      this.otherDirection = false;
    } else if(this.hp < 100){
  }}, 1000 / 60);
    
    setInterval(() => { 
      if(this.hp === 100){
      this.playAnimation(this.IMAGES_WALKING);
    } 
  }, 200);
  }

  /**
   * This function is used to remove the HP of the chicken.
   */
  chickenHit(){
    this.hp -= 100;
  }

  /**
   * This function is used to play the Death Animation on the currently given enemy chicken.
   * 
   * @param {string} enemy - Currently given Enemy Chicken
   */
  chickenDeathAnimation(enemy){
    this.newPlayAnimation(this.IMAGE_DEAD, 100, () => {
      level1.enemies.splice(world.getIndex(enemy), 1)
    })
  }
}

Chicken.nextX = 550;
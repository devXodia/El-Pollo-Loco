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
    } else if(this.hp < 100){
      this.loadImage(this.IMAGE_DEAD);
      this.IMAGE_DEAD.splice(0, 1);
      
    }
  }, 200);
  }

  chickenHit(){
    this.hp -= 100;
  }
}

Chicken.nextX = 550;
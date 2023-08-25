class Endboss extends moveableObject {
  height = 400;
  width = 300;
  y = 60;
  speed = 4.75;
  hp = 100;
  currentX;
  boss_angry = false;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[1]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2500;
    this.animate();
  }

  animate() {
    let bossAnimation = setInterval(() => {
      if(this.bossIsDead()){
        this.newPlayAnimation(this.IMAGES_DEAD, 100, () => {
          this.bossStopMoving();
          clearInterval(bossAnimation);
          this.loadImage(this.IMAGES_DEAD[2]);
          wonGame();
          clearAllIntervals();
        })}
      else if(this.bossIsHurt()){
        this.newPlayAnimation(this.IMAGES_HURT, 200, () => {
        })
      }
      else if(this.hp == 100){
        this.newPlayAnimation(this.IMAGES_WALKING, 200, () => {})
      }
      else if(this.currentX === world.character.x){
        this.bossStopMoving();
        this.newPlayAnimation(this.IMAGES_ATTACK, 200, () => {})
      }
    }, 200);
  }

  bossStopMoving() {
    this.x = this.currentX;
  }

  bossMove() {
    this.moveLeft();
    this.otherDirection = false;
    this.currentX = this.x;
  }

  bossIsHurt() {
    return this.hp < 100;
  }

  bossIsDead() {
    return this.hp <= 0;
  }

  bossHit(){
    this.hp -= 8;
  }
}

class Endboss extends moveableObject {
  height = 400;
  width = 300;
  y = 60;
  speed = 25.75;
  hp = 100;
  currentX;
  
  bossChasing = false;

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

  /**
   *
   * The Constructor first loads the parent class and the first image to be shown.
   * Creates all The Images needed for the different States of the endboss.
   * After that the function sets the x position of the endboss to be at the end of the map
   * and starts the Animations.
   *
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[1]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2500;
    this.animate();
  }

  /**
   * This function is animating the endboss
   */
  animate() {
    let bossAnimation = setInterval(() => {
      if(this.bossIsDead()){
        this.bossDeathAnimation();
        }
      if (this.isColliding(world.character)) {
          this.bossChasing = false;
          this.bossStopMoving();
      }
      if(this.bossIsHurt() && !this.bossIsDead()){
        this.newPlayAnimation(this.IMAGES_HURT, 200, () => {})}
      if(this.hp == 100){
        this.newPlayAnimation(this.IMAGES_WALKING, 200, () => {})
      }
      if (this.bossChasing) {
        this.bossMove();
      }}, 200);
  }


  /**
   * This function stops the boss movement.
   */
  bossStopMoving() {
    this.x = this.currentX;
  }

  /**
   * This function moves the boss.
   */
  bossMove() {
    this.moveLeft();
    this.otherDirection = false;
    this.currentX = this.x;
  }

  /**
   * 
   * @returns - returns if the Boss is currently hurt or not.
   */
  bossIsHurt() {
    return this.hp < 100;
  }

  /**
   * 
   * @returns returns if the Boss is currently dead or not.
   */
  bossIsDead() {
    return this.hp <= 0;
  }

  /**
   * This function subtracts hp of the boss.
   */
  bossHit(){
    this.hp -= 8;
  }

  /**
   * This function is showing the death animation of the boss.
   */
  bossDeathAnimation(){
    this.newPlayAnimation(this.IMAGES_DEAD, 230, () => {
      this.bossStopMoving();
      this.loadImage(this.IMAGES_DEAD[2]);
      wonGame();
    })
  }
}

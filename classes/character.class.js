class Character extends moveableObject {
  IMAGES_WALKING = [
    "/img/2_character_pepe/2_walk/W-21.png",
    "/img/2_character_pepe/2_walk/W-22.png",
    "/img/2_character_pepe/2_walk/W-23.png",
    "/img/2_character_pepe/2_walk/W-24.png",
    "/img/2_character_pepe/2_walk/W-25.png",
    "/img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_JUMPING = [
    "/img/2_character_pepe/3_jump/J-31.png",
    "/img/2_character_pepe/3_jump/J-32.png",
    "/img/2_character_pepe/3_jump/J-33.png",
    "/img/2_character_pepe/3_jump/J-34.png",
    "/img/2_character_pepe/3_jump/J-35.png",
    "/img/2_character_pepe/3_jump/J-36.png",
    "/img/2_character_pepe/3_jump/J-37.png",
    "/img/2_character_pepe/3_jump/J-38.png",
    "/img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_DEAD = [
    "/img/2_character_pepe/5_dead/D-51.png",
    "/img/2_character_pepe/5_dead/D-52.png",
    "/img/2_character_pepe/5_dead/D-53.png",
    "/img/2_character_pepe/5_dead/D-54.png",
    "/img/2_character_pepe/5_dead/D-55.png",
    "/img/2_character_pepe/5_dead/D-56.png",
    "/img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  currentImage = 0;
  speed = 10;
  world;
  y = 250;
  width = 125;
  character_hit = false;

  /**
   *
   * The Constructor first loads the parent class.
   * Creates all The Images needed for the different States of the Character.
   * After that the function applys Gravity to the Characters behavior
   * and starts the Animations.
   *
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.applyGravity();
    this.animate();
  }

  /**
   * This Function is used for showing Animations of the character.
   */
  animate() {
    setInterval(() => {
      this.checkKeyboard();
      
    }, 1000 / 60);

    this.charachterAnimation();
  }

  /**
   * 
   * @param {string} enemy - Currently given Enemy from Array.
   * @returns - returns if the Character is Colliding with the Enemy Chicken or not.
   */
  jumpCollision(enemy) {
    return this.isColliding(enemy) && this.isAboveGround();
  }

  /**
   * This Function is moving the Character to the right and checking if the Audio is muted or not.
   */
  moveRightCharacter() {
    this.moveRight();
    if (!audio_muted) {
      walking_sound.play();
    }
  }

  /**
   * This function is moving the Character to the left and checking if the Audio is muted or not.
   */
  moveLeftCharacter() {
    this.moveLeft();
    if (!audio_muted) {
      walking_sound.play();
    }
  }



  /**
   * This function is used for animation of different States of the Character.
   */
  charachterAnimation() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      } else if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.D) {
        this.playAnimation(this.IMAGES_IDLE);
      
      }
    }, 150);
  }

 
  /**
   * This Function checks Keyboard Input while playing the Game so that the Character responds to given input.
   * Also if the Character is meeting the boss for the first Time - the Character should be chased and playing Bossfight Music.
   */
  checkKeyboard(){
    walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRightCharacter();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeftCharacter();
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
      }
      if (this.x >= 1980) {
        if (!audio_muted) {
          this.playBossMusic();
        }
        world.boss.bossChasing = true; // Boss starts chasing when character sees them
      }
      this.world.camera_x = -this.x + 100;
  }

  /**
   * Plays Bossfight Music and stops the usual background Music.
   */
  playBossMusic() {
    music.pause();
    boss_music.play();
  }
}

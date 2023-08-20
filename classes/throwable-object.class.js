class ThrowableObject extends moveableObject {

    currentX = this.x;
    isThrown;

    IMAGES_ROTATION = [
        "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
        "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
        
    ];

    IMAGES_SPLASH = [
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
        "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
    ]

    constructor(x, y){
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.loadImages(this.IMAGES_ROTATION);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.isThrown = true;
        this.throw();

    }

    throw() {
        if (this.isThrown) {
            this.speedY = 25;
            this.applyGravityBottle();

            this.throwInterval = setInterval(() => {
                this.x += 10;
                this.playAnimation(this.IMAGES_ROTATION);
            }, 25);
        }
    }

    applyGravityBottle() {
        if (this.isThrown) {
            this.gravityInterval = setInterval(() => {
                if (this.isAboveGround() || this.speedY > 0) this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }, 1000 / 25);
        }
    }

    stopIntervals() {
        clearInterval(this.throwInterval);
        clearInterval(this.gravityInterval);
    }
}
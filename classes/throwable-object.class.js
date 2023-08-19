class ThrowableObject extends moveableObject {

    constructor(x, y){
        super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
        this.x = x;
        this.y = y;
        this.height = 80;
        this.throw();

    }

    throw(){
        this.speedY = 25;
        this.applyGravity();
        setInterval( () => {
            this.x += 10;
        }, 25);
    }

   
}
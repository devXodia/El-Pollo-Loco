class Bottlebar extends Statusbar{

    bottle = 0;

    IMAGES_BOTTLES = [
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
        "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png"
    ];

    constructor(){
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.IMAGES = this.IMAGES_BOTTLES;
        this.setPercentage(0);
        this.y = 90;
    }

    addBottle(){
        this.bottle += 10;
        
      }
}
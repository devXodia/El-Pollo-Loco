class Moneybar extends Statusbar {
    coin = 0;
    

    IMAGES_MONEY = [
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
        "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png"
    ];

    constructor(){
        super();
        this.loadImages(this.IMAGES_MONEY);
        this.IMAGES = this.IMAGES_MONEY;
        this.setPercentage(0);
        this.y = 40;

    }

    addMoney(){
        this.coin += 10;
        if(this.coin > 100){
            this.coin = 100;
        }
      }
    
    
}
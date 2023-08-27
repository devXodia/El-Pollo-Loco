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

    /**
   *
   * The Constructor first loads the parent class.
   * Creates all The Images needed for the money Statusbar.
   * After that the function sets the Base Percentage of the Statusbar to be shown
   * and sets the y position of the Statusbar.
   *
   */
    constructor(){
        super();
        this.loadImages(this.IMAGES_MONEY);
        this.IMAGES = this.IMAGES_MONEY;
        this.setPercentage(0);
        this.y = 40;

    }

    /**
     * This function adds Money to the User and makes sure it doesn't exceed more then 100. 
     */
    addMoney(){
        this.coin += 20;
        if(this.coin > 100){
            this.coin = 100;
        }
      }
    
      /**
       * This function subtracts Money from the User.
       */
    subtractMoney(){
        this.coin -= 20;
        if(this.coin < 0){
            this.coin = 0
        }
    }
    
}
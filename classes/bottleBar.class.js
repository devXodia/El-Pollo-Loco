class Bottlebar extends Statusbar {
  bottle = 0;

  IMAGES_BOTTLES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  /**
   *
   * The Constructor first loads the parent class.
   * Creates all The Images needed for the Bottle Statusbar.
   * After that the function sets the Base Percentage of the Statusbar to be shown
   * and sets the y position of the Statusbar.
   *
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLES);
    this.IMAGES = this.IMAGES_BOTTLES;
    this.setPercentage(0);
    this.y = 90;
  }


  /**
   * This function counts the available Bottles. 
   * If the Bottles are exceeding the Number of allowed Bottles they get set to the Maximum amount of 100
   */
  addBottle() {
    this.bottle += 10;
    if (this.bottle >= 100) {
      this.bottle = 100;
    }
  }
}

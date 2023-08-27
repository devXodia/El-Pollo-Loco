class Statusbar extends DrawableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];
  perecentage = 100;

  /**
   *
   * The Constructor first loads the parent class.
   * Creates all The Images needed for the Statusbar.
   * After that the function sets the Base Percentage of the Statusbar to be shown
   * and sets the x, y position of the Statusbar and height and width.
   *
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.setPercentage(100);
    this.x = 30;
    this.y = 0;
    this.width = 200;
    this.height = 60;
  }

  /**
   * This function is used to show the Statusbar Image corresponding with the current HP, Money or available bottles.
   * @param {number} percentage - Percentage to be shown of the Statusbar 
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * This function returns which index of the array should be shown for the current amount of hp, money and bottles on Statusbar.
   * @returns reutrns index for the needed image corresponding with the current amount of hp, money or bottles.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }

  
}

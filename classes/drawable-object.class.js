class DrawableObject {
  x = 120;
  y = 250;
  height = 175;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;

  /**
   * This function creates a new Image with the given Image Path.
   * @param {string} path - Currently given Image Path 
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * This function Draws the currently given Image on the Canvas.
   * @param {HTMLElement} ctx -  Canvas Element
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  
  /**
   * This function creates new Images with the given Path out of the Array and stores it in to a Image Cache JSON.
   * @param {Array} arr - Array with Image Paths
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

 
}

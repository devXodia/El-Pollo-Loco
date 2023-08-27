class BackgroundObject extends moveableObject {
  width = 720;
  height = 480;

  /**
   * The Constructor loads the Image Path and x position of given Backgroundobject
   * 
   * @param {string} path - This is the Image Path 
   * @param {number} x - This is the X Position of the Image
   */
  constructor(path, x) {
    super().loadImage(path);
    this.x = x;
    this.y = 480 - this.height;
  }
}

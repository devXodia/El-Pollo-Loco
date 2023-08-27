class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  
  
  level_end_x = 2200;

  /**
   * 
   * This function sets up the Objects of the current Level.
   * 
   * @param {Array} enemies - Array with Chicken Objects
   * @param {Array} clouds - Array with Cloud Objects
   * @param {Array} backgroundObjects - Array with Background Image Objects
   * @param {Array} coins - Array with Coin Objects
   * @param {Array} bottles - Array with Bottle Objects
   */
  constructor(enemies, clouds, backgroundObjects, coins, bottles) {
    this.coins = coins;
    this.bottles = bottles;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    
  }
}

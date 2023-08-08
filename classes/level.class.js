class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  level_end_x = 2200;

  constructor(enemies, clouds, backgroundObjects, coins) {
    this.coins = coins;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}

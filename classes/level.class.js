class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  bottles;
  Endboss;
  
  level_end_x = 2200;

  constructor(enemies, boss, clouds, backgroundObjects, coins, bottles) {
    this.coins = coins;
    this.bottles = bottles;
    this.enemies = enemies;
    this.boss = boss;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    
  }
}

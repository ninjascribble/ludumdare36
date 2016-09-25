import Actors from '../actors';

const LEVELS = {
  0: require('./level0.js'),
  1: require('./level1.js')
}

export default class LevelManager{
  constructor(game, humans, enemies, bricks, player){
    this.currentLevel = 0;
    this.humans = humans;
    this.enemies = enemies;
    this.game = game;
    this.bricks = bricks;
    this.player = player;
  }

  load (index) {
    if (LEVELS[index]) {
      this.humans.removeAll();
      this.enemies.removeAll();
      this.bricks.removeAll();
      this.buildHumans(LEVELS[index].humans)
      this.buildEnemies(LEVELS[index].enemies)
      this.buildBoundryWalls();
      this.placePlayer(LEVELS[index].player)
      return true;
    }
    else {
      return false;
    }
  }

  next () {
    this.currentLevel++;
    return this.load(this.currentLevel);
  }

  buildHumans (positions = []) {
    positions.forEach((human) => {
      Actors.human(this.game, human.x, human.y, this.humans);
    });
  }

  buildEnemies (positions = []) {
    positions.forEach((enemy) => {
      Actors.alien(this.game, enemy.x, enemy.y, this.enemies);
    });
  }
  //We're passing the player's position as an object to this function.
  placePlayer (position = []){
    this.player.sprite.x = position.x;
    this.player.sprite.y = position.y;
  }
  buildBoundryWalls () {
    let x = 0;
    let y = 0;

    while (x < 320) {
      this.bricks.placeBrick(x, 16);
      this.bricks.placeBrick(x, 240);
      x += 16;
    }

    while (y < 256) {
      this.bricks.placeBrick(0, y);
      this.bricks.placeBrick(304, y);
      y += 16;
    }
  }

}

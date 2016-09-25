import Actors from '../actors';

const LEVELS = {
  0: require('./level0.js'),
  1: require('./level1.js')
}

export default class LevelManager{
  constructor(game, humans, enemies){
    this.humans = humans;
    this.enemies = enemies;
    this.game = game;
  }

  load (index) {
    this.humans.removeAll();
    this.enemies.removeAll();

    if (LEVELS[index]) {
      this.buildHumans(LEVELS[index].humans)
      this.buildEnemies(LEVELS[index].enemies)
      return true;
    }
    else {
      return false;
    }
  }

  buildHumans (positions) {
    positions.forEach((human) => {
      Actors.human(this.game, human.x, human.y, this.humans);
    });
  }

  buildEnemies (positions) {
    positions.forEach((enemy) => {
      Actors.alien(this.game, enemy.x, enemy.y, this.enemies);
    });
  }
}

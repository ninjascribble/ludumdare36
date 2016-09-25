import LevelManager from './LevelManager';

module.exports = {
  create: function levelManager(game, humans, enemies, bricks, player){
    //var levelManager = new levelManager();
    return new LevelManager(game, humans, enemies, bricks, player);
  }

};

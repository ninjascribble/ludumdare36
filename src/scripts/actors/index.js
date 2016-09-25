import Alien from './Alien';
import Human from './Human';
import Groups from '../groups';
import Player from './Player';
import Sprites from '../sprites';

module.exports = {
  player: function player (game, x, y, group = null) {
    var sprite = Sprites.trump(game, x, y);
    var brickFactory = Groups.brickCannon(game);
    var actor = new Player(game, sprite, brickFactory);

    if (group) {
      group.add(sprite);
      group.add(brickFactory);
    }

    return actor;
  },

  alien: function alien (game, x, y, group = null) {
    var sprite = Sprites.alien(game, x, y);
    var actor = new Alien(game, sprite);

    if (group) {
      group.add(sprite);
    }

    actor.moveTimer()

    return actor;
  },

  human: function human (game, x, y, group = null) {
    var sprite = Sprites.human(game, x, y);
    var actor = new Human(game, sprite);

    if (group) {
      group.add(sprite);
    }

    actor.moveTimer()

    return actor;
  }
};

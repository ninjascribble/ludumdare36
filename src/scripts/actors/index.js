import Alien from './Alien';
import Human from './Human';
import Fonts from '../fonts';
import Groups from '../groups';
import Player from './Player';
import Sprites from '../sprites';

module.exports = {
  player: function player (game, x, y, hud, bricks, group = null) {
    var sprite = Sprites.trump(game, x, y);
    var actor = new Player(game, sprite, bricks, hud);

    if (group) {
      group.add(sprite);
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

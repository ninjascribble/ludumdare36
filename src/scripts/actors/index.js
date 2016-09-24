import Groups from '../groups';
import Player from './Player';
import Mexican from './Mexican';
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

  mexican: function mexican (game, x, y, group = null) {
    var sprite = Sprites.mexican(game, x, y);
    var actor = new Mexican(game, sprite);

    if (group) {
      group.add(sprite);
    }

    return actor;
  }
};

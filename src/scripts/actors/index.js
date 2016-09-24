import Player from './Player';
import Sprites from '../sprites';

module.exports = {
  player: function player (game, x, y, group = null) {
    var trump = Sprites.trump(game, x, y);
    var player = new Player(game, trump);

    if (group) {
      group.add(player.trump);
    }

    return player;
  }
};

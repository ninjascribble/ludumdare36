import Player from './Player';
import Mexican from './Mexican';
import Sprites from '../sprites';

module.exports = {
  player: function player (game, x, y, group = null) {
    var sprite = Sprites.trump(game, x, y);
    var tileReservation = Sprites.tileReservation(game, x, y);
    var actor = new Player(game, sprite, tileReservation);

    if (group) {
      group.add(actor.sprite);
    }

    return actor;
  },

  mexican: function mexican (game, x, y, group = null) {
    var sprite = Sprites.mexican(game, x, y);
    var tileReservation = Sprites.tileReservation(game, x, y);
    var actor = new Mexican(game, sprite, tileReservation);

    if (group) {
      group.add(actor.sprite);
    }

    return actor;
  }
};

import Alien from './Alien';
import Fonts from '../fonts';
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

  hud: function hud (game, x, y, w, h, group = null) {
    var hud = new Phaser.Group(game);
    var gfx = new Phaser.Graphics(game);
    var bkgTexture = gfx.beginFill(0x000000).drawRect(x, y, w, h).endFill().generateTexture();
    var bkg = new Phaser.Image(game, x, y, w, h);
    var points = Fonts.display(game, w - 8, 8, '00000 pts', 6, 'right');
    var bricks = Fonts.display(game, 8, 8, '10 bricks left', 6, 'left');

    bkg.setTexture(bkgTexture);

    hud.add(bkg);
    hud.add(points);
    hud.add(bricks);

    if (group) {
      group.add(hud);
    }

    return hud;
  }
};

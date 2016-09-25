import BrickCannon from './BrickCannon';
import Hud from './Hud';
import Fonts from '../fonts';

module.exports = {
  brickCannon: (game) => {
    return new BrickCannon(game);
  },

  hud: function hud (game, x, y, w, h, parent = null) {
    var gfx = new Phaser.Graphics(game);
    var bkgTexture = gfx.beginFill(0x000000).drawRect(x, y, w, h).endFill().generateTexture();
    var bkg = new Phaser.Image(game, x, y, w, h);
    var points = Fonts.display(game, w - 8, 8, '', 6, 'right');
    var bricks = Fonts.display(game, 8, 8, '', 6, 'left');
    var hud = new Hud(game, bricks, points);

    bkg.setTexture(bkgTexture);
    hud.addAt(bkg, 0, true);

    if (parent) {
      parent.add(hud);
    }

    return hud;
  }
};

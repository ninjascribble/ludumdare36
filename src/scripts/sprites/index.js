import TrumpSprite from './TrumpSprite';
import BrickSprite from './BrickSprite';

module.exports = {
  loadResources: function loadResources (loader) {
    TrumpSprite.loadResource(loader);
    BrickSprite.loadResource(loader);
  },

  trump: function playertrump (game, x, y) {
    return new TrumpSprite(game, x, y);
  },

  brick: function brickSprite (game, x, y) {
    return new BrickSprite(game, x, y);
  }
};

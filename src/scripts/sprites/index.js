import trumpSprite from './trumpSprite';
import BrickSprite from './BrickSprite';

module.exports = {
  loadResources: function loadResources (loader) {
    trumpSprite.loadResource(loader);
    BrickSprite.loadResource(loader);
  },

  trump: function playertrump (game, x, y) {
    return new trumpSprite(game, x, y);
  },

  brick: function brickSprite (game, x, y) {
    return new BrickSprite(game, x, y);
  }
};

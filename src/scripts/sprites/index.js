import trumpSprite from './trumpSprite';
import BrickSprite from './BrickSprite';
import MexicanSprite from './MexicanSprite';

module.exports = {
  loadResources: function loadResources (loader) {
    trumpSprite.loadResource(loader);
    BrickSprite.loadResource(loader);
    MexicanSprite.loadResource(loader);
  },

  trump: function playertrump (game, x, y) {
    return new trumpSprite(game, x, y);
  },

  brick: function brickSprite (game, x, y) {
    return new BrickSprite(game, x, y);
  },

  mexican: function mexicanSprite (game, x, y) {
    return new MexicanSprite(game, x, y);
  }
};

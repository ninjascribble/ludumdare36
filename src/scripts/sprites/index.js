import TrumpSprite from './TrumpSprite';
import BrickSprite from './BrickSprite';
import CheckerboardSprite from './CheckerboardSprite';
import MexicanSprite from './MexicanSprite';

module.exports = {
  loadResources: function loadResources (loader) {
    TrumpSprite.loadResource(loader);
    BrickSprite.loadResource(loader);
    CheckerboardSprite.loadResource(loader);
    MexicanSprite.loadResource(loader);
  },

  trump: function playertrump (game, x, y) {
    return new TrumpSprite(game, x, y);
  },

  brick: function brickSprite (game, x, y) {
    return new BrickSprite(game, x, y);
  },

  checkerboard: function checkerboardSprite (game, x, y, w, h) {
    return new CheckerboardSprite(game, x, y, w, h);
  },

  mexican: function mexicanSprite (game, x, y) {
    return new MexicanSprite(game, x, y);
  }
};

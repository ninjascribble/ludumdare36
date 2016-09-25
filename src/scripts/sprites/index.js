import AlienSprite from './AlienSprite';
import HumanSprite from './HumanSprite';
import BrickSprite from './BrickSprite';
import CheckerboardSprite from './CheckerboardSprite';
import TrumpSprite from './TrumpSprite';

module.exports = {
  loadResources: function loadResources (loader) {
    TrumpSprite.loadResource(loader);
    BrickSprite.loadResource(loader);
    CheckerboardSprite.loadResource(loader);
    AlienSprite.loadResource(loader);
    HumanSprite.loadResource(loader);
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

  alien: function alienSprite (game, x, y) {
    return new AlienSprite(game, x, y);
  },

  human: function humanSprite(game, x, y){
    return new HumanSprite(game, x, y);
  }
};

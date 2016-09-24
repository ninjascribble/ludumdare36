import ShipSprite from './ShipSprite';
import BrickSprite from './BrickSprite';

module.exports = {
  loadResources: function loadResources (loader) {
    ShipSprite.loadResource(loader);
    BrickSprite.loadResource(loader);
  },

  ship: function playerShip (game, x, y) {
    return new ShipSprite(game, x, y);
  },

  brick: function brickSprite (game, x, y) {
    return new BrickSprite(game, x, y);
  }
};

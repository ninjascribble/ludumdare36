import trumpSprite from './trumpSprite';

module.exports = {
  loadResources: function loadResources (loader) {
    trumpSprite.loadResource(loader);
  },

  trump: function playertrump (game, x, y) {
    return new trumpSprite(game, x, y);
  }
};

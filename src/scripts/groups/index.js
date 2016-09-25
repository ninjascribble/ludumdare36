import BrickCannon from './BrickCannon';
import Interlopers from './Interlopers';

module.exports = {
  brickCannon: (game) => {
    return new BrickCannon(game);
  },

  interlopers: (game) => {
    return new Interlopers(game);
  }
};

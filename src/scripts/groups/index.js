import BrickCannon from './BrickCannon';

let tileReservations;

module.exports = {
  brickCannon: (game) => {
    return new BrickCannon(game);
  }
};

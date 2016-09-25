import _Sprite from './_Sprite';

const KEY = 'blank';
const SRC = 'assets/blank.png';
const WIDTH = 16;
const HEIGHT = 16;

export default class TileReservationSprite extends _Sprite {
  static loadResource (loader) {
    loader.load.spritesheet(KEY, SRC, WIDTH, HEIGHT);
  }

  constructor (game, x, y) {
    super(game, x, y, KEY);
    game.physics.enable(this);
    this.body.immovable = true;
  }
}
import _TileSprite from './_TileSprite';

const KEY = 'checkerboard';
const SRC = 'assets/checkerboard.png';
const WIDTH = 32;
const HEIGHT = 32;

export default class CheckerboardSprite extends _TileSprite {
  static loadResource (loader) {
    loader.load.spritesheet(KEY, SRC, WIDTH, HEIGHT);
  }

  constructor (game, x, y, w, h) {
    super(game, x, y, w, h, KEY);
  }
}

import _PhysicsSprite from './_PhysicsSprite';

const KEY = 'brick';
const SRC = 'assets/brick.png';
const WIDTH = 16;
const HEIGHT = 16;

export default class BrickSprite extends _PhysicsSprite {
  static loadResource (loader) {
    loader.load.spritesheet(KEY, SRC, WIDTH, HEIGHT);
  }

  constructor (game, x, y) {
    super(game, x, y, KEY);
  }

  onCollide () {
    super.onCollide();
    this.body.immovable = true;
  }
}

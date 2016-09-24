import _Sprite from './_Sprite';

const KEY = 'trump';
const SRC = 'assets/trump.png';
const WIDTH = 16;
const HEIGHT = 16;

export default class TrumpSprite extends _Sprite {
  static loadResource (loader) {
    loader.load.spritesheet(KEY, SRC, WIDTH, HEIGHT);
  }

  constructor (game, x, y) {
    super(game, x, y, KEY);
    game.physics.enable(this);
    this.animations.add('walkDown', [0, 1, 0, 2], 6, true);
    this.animations.add('walkUp', [3, 4, 3, 5], 6, true);
    this.animations.add('walkRight', [6, 7, 6, 8], 6, true);
    this.animations.add('walkLeft', [9, 10, 9, 11], 6, true);


    //this.anchor.setTo(0.5, 0);
  }
}

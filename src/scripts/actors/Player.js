import _Actor from './_Actor';

const THROW_BRICK_COOLDOWN = 500; // milliseconds
const THROW_BRICK_VELOCITY = 300;

export default class Player extends _Actor {
  constructor (game, sprite, brickFactory, hud) {
    super(game, sprite);
    this.bricks = brickFactory;
    this.hud = hud;
    this.canThrow = true;
    this.bricksLeft = 100;
    this.points = 0;
  }

  set bricksLeft (value) {
    this._bricksLeft = value;
    this.hud.bricks(value);
  }

  get bricksLeft () {
    return this._bricksLeft;
  }

  set points (value) {
    this._points = value;
    this.hud.points(value);
  }

  get points () {
    return this._points;
  }

  throwBrick () {
    if (this.canFire == false) {
      return;
    }

    let timer = this.game.time.create()
    let x = this.sprite.x;
    let y = this.sprite.y;
    let vx = 0;
    let vy = 0;

    this.canFire = false;
    timer.add(THROW_BRICK_COOLDOWN, () => this.canFire = true);

    switch (this.facing) {
      case 'up':
        y -= this.sprite.width + 1;
        vy = -1 * THROW_BRICK_VELOCITY;
        break;
      case 'down':
        y += this.sprite.width + 1;
        vy = 1 * THROW_BRICK_VELOCITY;
        break;
      case 'left':
        x -= this.sprite.height + 1;
        vx = -1 * THROW_BRICK_VELOCITY;
        break;
      case 'right':
        x += this.sprite.height + 1;
        vx = 1 * THROW_BRICK_VELOCITY;
        break;
    }

    this.bricks.fireBrick(x, y, vx, vy);
    this.bricksLeft -= 1;
    timer.start();
  }
}

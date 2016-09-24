import _Actor from './_Actor';

const THROW_BRICK_COOLDOWN = 500; // milliseconds
const THROW_BRICK_VELOCITY = 300;

export default class Player extends _Actor {
  constructor (game, sprite, brickFactory) {
    super(game, sprite);
    this.bricks = brickFactory;
    this.canThrow = true;
    this.cash = 100;
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
        y -= this.sprite.width;
        vy = -1 * THROW_BRICK_VELOCITY;
        break;
      case 'down':
        y += this.sprite.width;
        vy = 1 * THROW_BRICK_VELOCITY;
        break;
      case 'left':
        x -= this.sprite.height;
        vx = -1 * THROW_BRICK_VELOCITY;
        break;
      case 'right':
        x += this.sprite.height;
        vx = 1 * THROW_BRICK_VELOCITY;
        break;
    }

    this.bricks.fireBrick(x, y, vx, vy)
    timer.start();
  }
}

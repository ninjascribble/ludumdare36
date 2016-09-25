import Sprites from '../sprites';

export default class BrickCannon extends Phaser.Group {
  constructor (game) {
    super(game, null, 'brickCannon');
  }

  createBrick (x, y) {
    return this.add(Sprites.brick(this.game, x, y));
  }

  placeBrick (x, y) {
    let brick = this.createBrick(x, y)
    brick.body.immovable = true;
  }

  fireBrick (x, y, vx, vy) {
    let brick = this.createBrick(x, y)
    brick.body.velocity.setTo(vx, vy);
  }
}

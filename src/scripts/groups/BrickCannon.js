import Sprites from '../sprites';

export default class BrickCannon extends Phaser.Group {
  constructor (game) {
    super(game, null, 'brickCannon');
    this.onBrickDone = new Phaser.Signal();
  }

  createBrick (x, y) {
    const brick = Sprites.brick(this.game, x, y);
    brick.onDone.add(() => {
      this.onBrickDone.dispatch();
    }, this);
    return this.add(brick);
  }

  placeBrick (x, y) {
    let brick = this.createBrick(x, y);
    brick.body.immovable = true;
  }

  fireBrick (x, y, vx, vy) {
    let brick = this.createBrick(x, y);
    brick.body.velocity.setTo(vx, vy);
  }
}

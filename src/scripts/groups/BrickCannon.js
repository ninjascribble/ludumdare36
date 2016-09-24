import Sprites from '../sprites';

export default class BrickCannon extends Phaser.Group {
  constructor (game) {
    super(game, null, 'brickCannon');
    this.direction = {
      up: { x: 0, y: -150, xOffset: -8, yOffset: -32 },
      down: { x: 0, y: 150, xOffset: -8, yOffset: 0 },
      left: { x: -150, y: 0, xOffset: -16, yOffset: -16 },
      right: { x: 150, y: 0, xOffset: 0, yOffset: -16 }
    };
  }

  fireBrick (from, direction) {
    let brick = Sprites.brick(this.game, from.x + direction.xOffset, from.y + direction.yOffset);
    this.add(brick);
    // brick.body.collideWorldBounds = true;

    brick.body.velocity.setTo(direction.x, direction.y);
  }
}

import Sprites from '../sprites'

export default class BrickCannon extends Phaser.Group {
  constructor (game) {
    super(game, null, 'brickCannon');
    this.direction = {
      up: { x: 0, y: -150 },
      down: { x: 0, y: 150 },
      left: { x: -150, y: 0 },
      right: { x: 150, y: 0 }
    };
  }

  fireBrick (from, direction) {
    let brick = Sprites.brick(this.game, from.x, from.y);
    this.add(brick);
    brick.body.collideWorldBounds = true;
    brick.body.drag.setTo(10, 10);
    brick.body.friction.setTo(0, 0);
    brick.body.bounce.setTo(.25);

    brick.body.velocity.setTo(direction.x, direction.y);
  }
};

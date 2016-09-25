import _State from './_State';
import Actors from '../actors';
import Fonts from '../fonts';
import Groups from '../groups';
import Sprites from '../sprites';

const WIDTH = 256;
const HEIGHT = 256;

export default class Gameplay extends _State {
  create () {
    this.world.setBounds(0, 0, WIDTH, HEIGHT);

    this.background = Sprites.checkerboard(this.game, 0, 0, this.world.width, this.world.height);
    this.game.add.existing(this.background);

    this.bricks = Groups.brickCannon(this.game);
    this.game.add.existing(this.bricks);

    this.mexican = Actors.mexican(this.game, WIDTH / 2, 16, this.world);
    this.mexican.moveTimer();
    this.player = Actors.player(this.game, this.world.centerX, this.world.centerY, this.world);
    this.buildBoundryWalls();
  }

  buildBoundryWalls () {
    let x = 0;
    let y = 0;

    while (x < WIDTH) {
      this.bricks.placeBrick(x, 0);
      this.bricks.placeBrick(x, HEIGHT - 16);
      x += 16;
    }

    while (y < HEIGHT) {
      this.bricks.placeBrick(0, y);
      this.bricks.placeBrick(WIDTH - 16, y);
      y += 16;
    }
  }

  onBrickCollision (wall, otherWall) {
    wall.body.immovable = true;
    otherWall.body.immovable = true;
  }

  update () {
    this.game.physics.arcade.collide(this.player.bricks, this.bricks, this.onBrickCollision);
    this.game.physics.arcade.collide(this.player.bricks, this.player.bricks, this.onBrickCollision);
    this.game.physics.arcade.collide(this.bricks, this.player.tileReservation, this.onBrickCollision);
    this.game.physics.arcade.collide(this.player.bricks, this.player.tileReservation, this.onBrickCollision);
    this.game.physics.arcade.collide(this.bricks, this.mexican.tileReservation, this.onBrickCollision);
    this.game.physics.arcade.collide(this.player.bricks, this.mexican.tileReservation, this.onBrickCollision);

    if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.player.tryMoveLeft([this.bricks, this.player.bricks]);
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.player.tryMoveRight([this.bricks, this.player.bricks]);
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.player.tryMoveUp([this.bricks, this.player.bricks]);
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.player.tryMoveDown([this.bricks, this.player.bricks]);
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.player.throwBrick();
    }
  }
}

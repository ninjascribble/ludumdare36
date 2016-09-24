import _State from './_State';
import Actors from '../actors';
import Fonts from '../fonts';
import Groups from '../groups';
import Sprites from '../sprites';

const WIDTH = 320;
const HEIGHT = 256;

export default class Gameplay extends _State {
  create () {
    this.world.setBounds(0, 0, WIDTH, HEIGHT);
    this.background = Sprites.checkerboard(this.game, 0, 0, this.world.width, this.world.height);
    this.game.add.existing(this.background);
    this.titleText = this.createTitleText(this.world.centerX, 40);

    this.player = Actors.player(this.game, this.world.centerX, this.world.centerY, this.world);
    this.brickCannon = Groups.brickCannon(this.game);
    this.game.add.existing(this.brickCannon);
    this.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_LOCKON);
    this.buildBoundryWalls();

    const wKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.add(() => {
      if (!this.isBrickAt(this.player.sprite.location)) {
        this.brickCannon.fireBrick(this.player.sprite.position, this.brickCannon.direction.up);
      }
    });

    const sKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
    sKey.onDown.add(() => {
      this.brickCannon.fireBrick(this.player.sprite.position, this.brickCannon.direction.down);
    });

    const aKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
    aKey.onDown.add(() => {
      this.brickCannon.fireBrick(this.player.sprite.position, this.brickCannon.direction.left);
    });

    const dKey = this.input.keyboard.addKey(Phaser.Keyboard.D);
    dKey.onDown.add(() => {
      this.brickCannon.fireBrick(this.player.sprite.position, this.brickCannon.direction.right);
    });
  }

  buildBoundryWalls () {
    let x = 0;
    let y = 0;

    while (x < WIDTH) {
      const leftBrick = Sprites.brick(this.game, x, 0);
      const rightBrick = Sprites.brick(this.game, x, HEIGHT - 16);
      leftBrick.body.immovable = true;
      rightBrick.body.immovable = true;

      this.brickCannon.add(leftBrick);
      this.brickCannon.add(rightBrick);
      x += 16;
    }

    while (y < HEIGHT) {
      const topBrick = Sprites.brick(this.game, 0, y);
      const bottomBrick = Sprites.brick(this.game, WIDTH - 16, y);
      topBrick.body.immovable = true;
      bottomBrick.body.immovable = true;

      this.brickCannon.add(topBrick);
      this.brickCannon.add(bottomBrick);
      y += 16;
    }
  }

  createTitleText (x, y) {
    return Fonts.display(this.game, x, y, 'this is the Trump', 12, 'center', this.world);
  }

  onBrickCollision (wall, otherWall) {
    wall.body.immovable = true;
    otherWall.body.immovable = true;
  }

  isBrickAt (location) {
    this.brickCannon.children.forEach((brick) => {
      if (location.x > brick.bounds.left && location.x < brick.bounds.right && location.y > brick.bounds.top && location.y < brick.bounds.bottom) {
        return true;
      }
      return false;
    });
  }

  update () {
    this.game.physics.arcade.collide(this.brickCannon, this.brickCannon, this.onBrickCollision);
    this.game.physics.arcade.collide(this.brickCannon, this.player.sprite, this.onBrickCollision);

    if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.player.moveLeft();
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.player.moveRight();
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      this.player.moveUp();
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      this.player.moveDown();
    }
  }
}

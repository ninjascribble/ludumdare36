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

    this.player = Actors.player(this.game, this.world.centerX + 8, this.world.centerY, this.world);
    this.brickCannon = Groups.brickCannon(this.game);
    this.game.add.existing(this.brickCannon);
    this.camera.follow(this.player.sprite, Phaser.Camera.FOLLOW_LOCKON);
    this.buildBoundryWalls();

    const leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    leftKey.onDown.add(this.player.moveLeft, this.player);

    const rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    rightKey.onDown.add(this.player.moveRight, this.player);

    const upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(this.player.moveUp, this.player);

    const downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    downKey.onDown.add(this.player.moveDown, this.player);

    const wKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.add(() => {
      this.brickCannon.fireBrick(this.player.sprite.position, this.brickCannon.direction.up);
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
    this.walls = this.game.add.group();

    while (x < WIDTH) {
      const leftBrick = Sprites.brick(this.game, x, 0);
      const rightBrick = Sprites.brick(this.game, x, HEIGHT - 16);
      leftBrick.body.immovable = true;
      rightBrick.body.immovable = true;

      this.walls.add(leftBrick);
      this.walls.add(rightBrick);
      x += 16;
    }

    while (y < HEIGHT) {
      const topBrick = Sprites.brick(this.game, 0, y);
      const bottomBrick = Sprites.brick(this.game, WIDTH - 16, y);
      topBrick.body.immovable = true;
      bottomBrick.body.immovable = true;

      this.walls.add(topBrick);
      this.walls.add(bottomBrick);
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

  update () {
    this.game.physics.arcade.collide(this.brickCannon, this.brickCannon, this.onBrickCollision);
    this.game.physics.arcade.collide(this.brickCannon, this.walls, this.onBrickCollision);

    if (this.input.keyboard.isDown(Phaser.Keyboard.Q)) {
      this.player.respawn(this.game.world.centerX, this.player.sprite.y);
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.O)) {
      this.player.destroy();
    }

    this.player.update();
  }
}

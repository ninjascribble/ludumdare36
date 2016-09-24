import _State from './_State';
import Actors from '../actors';
import Fonts from '../fonts';
import Groups from '../groups';
import Sprites from '../sprites';

export default class Gameplay extends _State {
  create () {
    this.world.setBounds(0, 0, 1400, 1400);
    this.background = Sprites.checkerboard(this.game, 0, 0, this.world.width, this.world.height);
    this.game.add.existing(this.background);
    this.titleText = this.createTitleText(this.world.centerX, 40);
    this.player = Actors.player(this.game, this.world.centerX, 60, this.world);
    this.brickCannon = Groups.brickCannon(this.game);
    this.game.add.existing(this.brickCannon);
    this.camera.follow(this.player.trump, Phaser.Camera.FOLLOW_LOCKON);

    let leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    leftKey.onDown.add(this.player.moveLeft, this.player);

    let rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    rightKey.onDown.add(this.player.moveRight, this.player);

    let upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(this.player.moveUp, this.player);

    let downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    downKey.onDown.add(this.player.moveDown, this.player);

    let wKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.add(() => {
      this.brickCannon.fireBrick(this.player.trump.position, this.brickCannon.direction.up);
    });

    let sKey = this.input.keyboard.addKey(Phaser.Keyboard.S);
    sKey.onDown.add(() => {
      this.brickCannon.fireBrick(this.player.trump.position, this.brickCannon.direction.down);
    });

    let aKey = this.input.keyboard.addKey(Phaser.Keyboard.A);
    aKey.onDown.add(() => {
      this.brickCannon.fireBrick(this.player.trump.position, this.brickCannon.direction.left);
    });

    let dKey = this.input.keyboard.addKey(Phaser.Keyboard.D);
    dKey.onDown.add(() => {
      this.brickCannon.fireBrick(this.player.trump.position, this.brickCannon.direction.right);
    });
  }

  createTitleText (x, y) {
    return Fonts.display(this.game, x, y, 'this is the Trump', 12, 'center', this.world);
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.Q)) {
      this.player.respawn(this.game.world.centerX, this.player.trump.y);
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.O)) {
      this.player.destroy();
    }

    this.player.update();
  }
}

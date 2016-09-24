import _State from './_State';
import Actors from '../actors';
import Fonts from '../fonts';

export default class Gameplay extends _State {
  create () {
    this.world.setBounds(0, 0, 1400, 1400);
    this.titleText = this.createTitleText(this.world.centerX, 40);
    this.player = Actors.player(this.game, this.world.centerX, 60, this.world);
    this.camera.follow(this.player.trump, Phaser.Camera.FOLLOW_LOCKON);

    var leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    leftKey.onDown.add(this.player.moveLeft, this.player);

    var rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    rightKey.onDown.add(this.player.moveRight, this.player);

    var upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(this.player.moveUp, this.player);

    var downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    downKey.onDown.add(this.player.moveDown, this.player);

  }

  createTitleText (x, y) {
    return Fonts.display(this.game, x, y, 'this is the game', 12, 'center', this.world);
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.A)) {
      this.player.respawn(this.game.world.centerX, this.player.trump.y);
    }

    if (this.input.keyboard.isDown(Phaser.Keyboard.O)) {
      this.player.destroy();
    }

    this.player.update();
  }
}

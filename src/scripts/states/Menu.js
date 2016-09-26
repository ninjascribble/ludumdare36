import _State from './_State';
import Fonts from '../fonts';
import Sounds from '../sounds';

export default class Menu extends _State {
  create () {
    this.titleText = this.createTitleText(this.world.centerX, 40);
    this.instructionText = this.createInstructionText(this.world.centerX, 100);
    this.actionText = this.createActionText(this.world.centerX, 140);
    this.time.events.loop(750, () => {
      this.actionText.visible = Boolean(!this.actionText.visible);
    });

    Sounds.init();
    Sounds.playMusic('menuSong', 1);
  }

  createTitleText (x, y) {
    return Fonts.display(this.game, x, y, 'space alien attack\r\ndefender simulation', 12, 'center', this.world);
  }

  createInstructionText (x, y) {
    return Fonts.display(this.game, x, y, 'press \'t\'for instructions', 6, 'center', this.world);
  }

  createActionText (x, y) {
    return Fonts.display(this.game, x, y, 'press space\r\nto start the game', 6, 'center', this.world);
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.game.sound.play('throwBrick');
      Sounds.stopMusic();
      this.stateProvider.gameplay(this.state);
    }
    if (this.input.keyboard.isDown(Phaser.Keyboard.T)) {
      this.game.sound.play('throwBrick');
      this.stateProvider.instructions(this.state);
    }
  }
}

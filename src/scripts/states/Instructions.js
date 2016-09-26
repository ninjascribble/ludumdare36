import _State from './_State';
import Fonts from '../fonts';
import Sounds from '../sounds';

const maxPages = 2;

export default class Instructions extends _State {
  create () {
    this.pages = [
      'tiny space aliens are invading your home\r\nyour only recourse is to try to build walls\r\nbetween your family and the interlopers',
      'use the arrow keys to move\r\n\r\nuse the spacebar to deploy walls'
    ];
    this.instructionText = this.createInstructionText(this.world.centerX, 80);
    this.actionText = this.createActionText(this.world.centerX, 180);
    this.time.events.loop(750, () => {
      this.actionText.visible = Boolean(!this.actionText.visible);
    });

    this.game.input.keyboard.addKey(Phaser.Keyboard.T).onUp.add(() => {
      this.game.sound.play('throwBrick');
      let nextText = this.pages.shift();
      if (!nextText) {
        this.stateProvider.menu(this.state);
      } else {
        this.instructionText.text = nextText;
      }
    });
  }

  createInstructionText (x, y) {
    return Fonts.display(this.game, x, y, this.pages.shift(), 8, 'center', this.world);
  }

  createActionText (x, y) {
    return Fonts.display(this.game, x, y, 'press \'T\' to continue', 6, 'center', this.world);
  }

  update () {
  }
}

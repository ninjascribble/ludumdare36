import _State from './_State';
import Fonts from '../fonts';

export default class GameOver extends _State {
  init (params) {
    this.score = params.score;
    this.reason = params.reason;
  }

  create () {
    this.titleText = this.createTitleText(this.world.centerX, 40);
    this.scoreText = this.createScoreText(this.world.centerX, 80);
    this.reasonText = this.createReasonText(this.world.centerX, 120);
    this.actionText = this.createActionText(this.world.centerX, 180);
    this.time.events.loop(400, () => {
      this.actionText.visible = Boolean(!this.actionText.visible);
    });
  }

  createTitleText (x, y) {
    return Fonts.display(this.game, x, y, 'Yer done!', 12, 'center', this.world);
  }

  createScoreText (x, y) {
    return Fonts.display(this.game, x, y, 'You scored ' + this.score, 12, 'center', this.world);
  }

  createReasonText (x, y) {
    return Fonts.display(this.game, x, y, this.reason, 8, 'center', this.world);
  }

  createActionText (x, y) {
    return Fonts.display(this.game, x, y, 'press \'S\'\r\nto start again!', 6, 'center', this.world);
  }

  update () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.S)) {
      this.stateProvider.gameplay(this.state);
    }
  }
}

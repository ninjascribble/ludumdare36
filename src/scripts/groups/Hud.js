import Sprites from '../sprites';

export default class Hud extends Phaser.Group {
  constructor (game, timerFont, bricksFont, pointsFont) {
    super(game, null, 'hud');
    this.timerFont = timerFont;
    this.bricksFont = bricksFont;
    this.pointsFont = pointsFont;

    this.add(this.timerFont);
    this.add(this.pointsFont);
    this.add(this.bricksFont);

    this.time(0)
    this.bricks(0);
    this.points(0);
  }

  bricks (value) {
    this.bricksFont.text = `${value} bricks left`;
  }

  points (value) {
    this.pointsFont.text = `${value} pts`;
  }

  time (value) {
    this.timerFont.text = `${value} sec`;
  }
}

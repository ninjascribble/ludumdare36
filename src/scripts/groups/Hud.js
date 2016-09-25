import Sprites from '../sprites';

export default class Hud extends Phaser.Group {
  constructor (game, bricksFont, pointsFont) {
    super(game, null, 'hud');
    this.bricksFont = bricksFont;
    this.pointsFont = pointsFont;

    this.add(this.pointsFont);
    this.add(this.bricksFont);

    this.bricks(200);
    this.points(0);
  }

  bricks (value) {
    this.bricksFont.text = `${value} bricks left`;
  }

  points (value) {
    this.pointsFont.text = `${value} pts`;
  }
}

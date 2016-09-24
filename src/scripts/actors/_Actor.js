const MOVE_DURATION = 100;
const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';

export default class Actor {
  constructor (game, sprite) {
    this.game = game;
    this.canMove = true;
    this.isAlive = true;
    this.facing = DOWN;
    this.sprite = sprite;
  }

  move (x, y, facing, animation) {
    if (this.canMove == false) {
      return
    }

    if (animation) {
      this.sprite.animations.play(animation);
    }

    this.canMove = false;
    this.facing = facing;
    this.game.tweens.create(this.sprite.body)
      .to({ x: this.sprite.x + x, y: this.sprite.y + y }, MOVE_DURATION)
      .start()
      .onComplete.addOnce(() => {
        this.canMove = true;
      })
  }

  moveLeft () {
    this.move(-16, 0, LEFT, 'walkLeft');
  }

  moveRight () {
    this.move(16, 0, RIGHT, 'walkRight');
  }

  moveUp () {
    this.move(0, -16, UP, 'walkUp');
  }

  moveDown () {
    this.move(0, 16, DOWN, 'walkDown');
  }

  update () {

  }
}

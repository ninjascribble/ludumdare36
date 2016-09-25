const MOVE_DURATION = 100;
const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';

export default class Actor {
  constructor (game, sprite) {
    this.game = game;
    this.sprite = sprite;
    this.sprite.actor = this;

    this.canMove = true;
    this.isAlive = true;
    this.facing = DOWN;

    this.sprite.body.onMoveComplete.add(() => this.canMove = true);
    this.sprite.body.onCollide.add(() => this.canMove = true);
  }

  kill () {
    this.sprite.kill();
    this.isAlive = false;
  }

  move (x, y, facing, animation) {
    if (this.canMove == false) {
      return;
    }

    if (animation) {
      this.sprite.animations.play(animation);
    }

    this.canMove = false;
    this.facing = facing;

    switch (this.facing) {
      case LEFT:
        this.sprite.body.moveTo(MOVE_DURATION, 16, 180)
        break;
      case RIGHT:
        this.sprite.body.moveTo(MOVE_DURATION, 16, 0)
        break;
      case UP:
        this.sprite.body.moveTo(MOVE_DURATION, 16, 270)
        break;
      case DOWN:
        this.sprite.body.moveTo(MOVE_DURATION, 16, 90)
        break;
    }
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

  moveTimer(){
    var moveDelay = this.game.time.create();
    moveDelay.loop(500, this.travel, this);
    moveDelay.start();
  }

  travel(){
    var dirNum = this.game.rnd.integerInRange(1, 4);

    switch(dirNum){
      case 1: this.moveLeft();
        break;
      case 2: this.moveRight();
        break;
      case 3: this.moveUp();
        break;
      case 4: this.moveDown();
        break;
      default:
        break;
      }
  }
}

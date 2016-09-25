const MOVE_DURATION = 100;
const UP = 'up';
const DOWN = 'down';
const LEFT = 'left';
const RIGHT = 'right';

export default class Actor {
  constructor (game, sprite, tileReservation) {
    this.game = game;
    this.canMove = true;
    this.processingMove = false;
    this.isAlive = true;
    this.facing = DOWN;
    this.sprite = sprite;
    this.tileReservation = tileReservation;
    this.game.add.existing(tileReservation);
  }

  move (x, y, facing, animation, collisionObjects) {
    if (this.canMove == false || this.processingMove == true) {
      return;
    }

    this.facing = facing;
    this.processingMove = true;
    this.testDestination(x, y, collisionObjects).then((isClear) => {
      this.processingMove = false;
      if (isClear) {
        if (animation) {
          this.sprite.animations.play(animation);
        }

        this.canMove = false;

        this.game.tweens.create(this.sprite.body)
          .to({ x: this.sprite.x + x, y: this.sprite.y + y }, MOVE_DURATION)
          .start()
          .onComplete.addOnce(() => {
            this.canMove = true;
          });
      }
    });
  }

  tryMoveLeft (collisionObjects) {
    this.move(-16, 0, LEFT, 'walkLeft', collisionObjects);
  }

  tryMoveRight (collisionObjects) {
    this.move(16, 0, RIGHT, 'walkRight', collisionObjects);
  }

  tryMoveUp (collisionObjects) {
    this.move(0, -16, UP, 'walkUp', collisionObjects);
  }

  tryMoveDown (collisionObjects) {
    this.move(0, 16, DOWN, 'walkDown', collisionObjects);
  }

  testDestination (x, y, collisionObjects) {
    let clearPath = true;
    let origX = this.sprite.x;
    let origY = this.sprite.y;
    let obstacles = collisionObjects || [];

    this.tileReservation.x = this.sprite.x + x;
    this.tileReservation.y = this.sprite.y + y;

    return new Promise((resolve, reject) => {
      this.game.time.events.add(40, () => {
        obstacles.forEach((collisionObject) => {
          if (this.game.physics.arcade.overlap(this.tileReservation, collisionObject)) {
            clearPath = false;
            this.tileReservation.x = origX;
            this.tileReservation.y = origY;
          }
        });

        resolve(clearPath);
      }, this);
    });
  }

  update () {

  }
}

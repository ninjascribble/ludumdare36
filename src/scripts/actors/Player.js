import _Actor from './_Actor';

export default class Player extends _Actor {
  constructor (game, trump) {
    super(game);
    this.trump = trump;
    this.trump.body.maxVelocity = new Phaser.Point(120, 120);
  }

  respawn (x = 0, y = 0) {
    this.isAlive = true;
    this.trump.scale.x = 1;
    this.trump.x = x;
    this.trump.y = y;
    this.trump.body.acceleration.x = 0;
    this.trump.body.velocity.x = 0;
    this.trump.revive();
  }

  destroy () {
    this.isAlive = false;
    this.trump.body.acceleration.x = 0;
  }

  moveLeft () {
      this.trump.body.moveTo(300, 16, 180);
     this.trump.animations.play('walkLeft');

  }

  moveRight () {
    this.trump.body.moveTo(300, 16, 0);
    this.trump.animations.play('walkRight');
  }

  moveUp () {
    this.trump.body.moveTo(300, 16, 270);
    this.trump.animations.play('walkUp');
  }

  moveDown () {
    this.trump.body.moveTo(300, 16, 90);
    this.trump.animations.play('walkDown');
  }

  update () {
    if (this.isAlive == false) {
      this.trump.animations.play('explode', null, null, true);
      return;
    }

    if (this.trump.body.acceleration.x > 0) {
      this.trump.scale.x = -1;
    } else {
      this.trump.scale.x = 1;
    }

    /*if (this.trump.body.acceleration.x != 0) {
      // Slow acceleration first...
      this.trump.body.acceleration.x = (Math.abs(this.trump.body.acceleration.x) <= 20) ?
        0 : this.trump.body.acceleration.x * 0.5;
    //  this.trump.animations.play('bank');
    } else {
      // Then velocity...
      this.trump.body.velocity.x = (Math.abs(this.trump.body.velocity.x) <= 20) ?
        0 : this.trump.body.velocity.x * 0.92;
      this.trump.animations.play('normal');
    }*/
  }
}

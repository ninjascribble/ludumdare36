import _Actor from './_Actor';

export default class Player extends _Actor {
  constructor (game, sprite) {
    super(game);
    this.sprite = sprite;
    this.sprite.body.maxVelocity = new Phaser.Point(120, 120);
  }

  respawn (x = 0, y = 0) {
    this.isAlive = true;
    this.sprite.scale.x = 1;
    this.sprite.x = x;
    this.sprite.y = y;
    this.sprite.body.acceleration.x = 0;
    this.sprite.body.velocity.x = 0;
    this.sprite.revive();
  }

  destroy () {
    this.isAlive = false;
    this.sprite.body.acceleration.x = 0;
  }

  moveLeft () {
    this.sprite.body.moveTo(300, 16, 180);
    this.sprite.animations.play('walkLeft');
  }

  moveRight () {
    this.sprite.body.moveTo(300, 16, 0);
    this.sprite.animations.play('walkRight');
  }

  moveUp () {
    this.sprite.body.moveTo(300, 16, 270);
    this.sprite.animations.play('walkUp');
  }

  moveDown () {
    this.sprite.body.moveTo(300, 16, 90);
    this.sprite.animations.play('walkDown');
  }

  update () {
    if (this.isAlive == false) {
      this.sprite.animations.play('explode', null, null, true);
      return;
    }

    if (this.sprite.body.acceleration.x > 0) {
      this.sprite.scale.x = -1;
    } else {
      this.sprite.scale.x = 1;
    }

    /*if (this.sprite.body.acceleration.x != 0) {
      // Slow acceleration first...
      this.sprite.body.acceleration.x = (Math.abs(this.sprite.body.acceleration.x) <= 20) ?
        0 : this.sprite.body.acceleration.x * 0.5;
    //  this.sprite.animations.play('bank');
    } else {
      // Then velocity...
      this.sprite.body.velocity.x = (Math.abs(this.sprite.body.velocity.x) <= 20) ?
        0 : this.sprite.body.velocity.x * 0.92;
      this.sprite.animations.play('normal');
    }*/
  }
}

import _Actor from './_Actor';

export default class Player extends _Actor {
  constructor (game, trump) {
    super(game);
    this.sprite = trump;
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
     this.sprite.x= this.sprite.x - 16;
  }

  moveRight () {
    this.sprite.x = this.sprite.x + 16;
  }

  moveUp () {
    this.sprite.y = this.sprite.y - 16;
  }

  moveDown () {
    this.sprite.y = this.sprite.y + 16;
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

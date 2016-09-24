import _Actor from './_Actor';

export default class Mexican extends _Actor {
  constructor (game, mexican) {
    super(game);
    this.mexican = mexican;
    this.mexican.body.maxVelocity = new Phaser.Point(120, 120);
  }

  destroy () {
    this.isAlive = false;
    this.mexican.body.acceleration.x = 0;
  }

  moveLeft () {
      this.mexican.body.moveTo(300, 16, 180);
     this.mexican.animations.play('walkLeft')
  }

  moveRight () {
    this.mexican.body.moveTo(300, 16, 0);
    this.mexican.animations.play('walkRight');
  }

  moveUp () {
    this.mexican.body.moveTo(300, 16, 270);
    this.mexican.animations.play('walkUp');
  }

  moveDown () {
    this.mexican.body.moveTo(300, 16, 90);
    this.mexican.animations.play('walkDown');
  }

  update () {
    if (this.isAlive == false) {
      this.mexican.animations.play('explode', null, null, true);
      return;
    }

  }
}

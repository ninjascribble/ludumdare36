export default class _Sprite extends Phaser.Sprite {
  constructor (game, x, y, key, frame) {
    super(game, x, y, key, frame);

    game.physics.enable(this);

    this.body.mass = 0;

    // Why is this disabled by default...?
    this.body.onCollide = new Phaser.Signal();

    this.body.onMoveComplete.add(this.onMoveComplete, this);
    this.body.onCollide.add(this.onCollide, this);
  }

  onMoveComplete () {
    this.body.x = Phaser.Math.snapTo(this.body.x, 16);
    this.body.y = Phaser.Math.snapTo(this.body.y, 16);
  }

  onCollide () {
    this.onMoveComplete();
    this.body.overlapX = 0;
    this.body.overlapY = 0;
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
  }
}

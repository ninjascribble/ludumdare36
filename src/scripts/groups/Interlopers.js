export default class Interlopers extends Phaser.Group {
  constructor (game) {
    super(game, null, 'interlopers');
    this.obstacles = [];
  }

  get tileReservations () {
    return this.children.map((child) => {
      return child.tileReservation;
    });
  }

  registerObstacle (obstacle) {
    this.obstacles.push(obstacle);
  }

  moveTimer () {
    var moveDelay = this.game.time.create();
    this.children.forEach((interloper) => {
      moveDelay.loop(500, () => this.travel(interloper), this);
      //moveDelay.add(2000/*1175*/, this.travel, this);
      moveDelay.start();
      //console.log(moveDelay.next);
    });
  }

  travel (interloper) {
    console.log('travel Log');

    const dirNum = this.game.rnd.integerInRange(1, 4);

    switch (dirNum) {
      case 1: interloper.tryMoveLeft(this.obstacles);
        break;
      case 2: interloper.tryMoveRight(this.obstacles);
        break;
      case 3: interloper.tryMoveUp(this.obstacles);
        break;
      case 4: interloper.tryMoveDown(this.obstacles);
        break;
      default:
        break;
    }
  }
}

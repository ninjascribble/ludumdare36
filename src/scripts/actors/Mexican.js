import _Actor from './_Actor';

export default class Mexican extends _Actor {
  constructor (game, sprite) {
    super(game, sprite);
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

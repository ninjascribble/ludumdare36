import _Actor from './_Actor';

export default class Alien extends _Actor {
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
      case 1: super.moveLeft();
        break;
      case 2: super.moveRight();
        break;
      case 3: super.moveUp();
        break;
      case 4: super.moveDown();
        break;
      default:
        break;
      }
  }
}

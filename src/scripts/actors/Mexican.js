import _Actor from './_Actor';

export default class Mexican extends _Actor {
  constructor (game, sprite, tileReservation) {
    super(game, sprite, tileReservation);
  }

  moveTimer(){
    var moveDelay = this.game.time.create();
    moveDelay.loop(2000, this.travel, this);
    //moveDelay.add(2000/*1175*/, this.travel, this);
    moveDelay.start();
    //console.log(moveDelay.next);
  }

  travel(){
    console.log('travel Log');

    var dirNum = this.game.rnd.integerInRange(1, 4);

    switch(dirNum){
      case 1: super.tryMoveLeft();
        break;
      case 2: super.tryMoveRight();
        break;
      case 3: super.tryMoveUp();
        break;
      case 4: super.tryMoveDown();
        break;
      default:
        break;
      }
  }
}

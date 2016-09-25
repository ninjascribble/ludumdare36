import Actors from '../actors';

const WIDTH = 320;
const HEIGHT = 256;

export default class LevelManager{
  constructor(game, humans, aliens){
    this.humans = humans;
    this.aliens = aliens;
    this.game = game;
  }

  levelLoad(level){
    switch (level){
      case 1: levelOne();
        break;
      case 2: levelTwo();
        break;
      case 3: levelThree();
        break;
      default:
        break;
    }
  }

  levelOne(){
    this.humans.removeAll();
    this.aliens.removeAll();

    this.human1 = Actors.human(this.game, WIDTH / 4, HEIGHT /4, this.humans);
    this.enemy1 = Actors.alien(this.game, WIDTH * 3 / 4, HEIGHT * 3 / 4, this.aliens);
    /*this.human1 = Actors.human(this.game, WIDTH - 32, HEIGHT - 64, this.humans);
    this.human2 = Actors.human(this.game, WIDTH / 2, HEIGHT - 64, this.humans);
    this.human3 = Actors.human(this.game, 32, HEIGHT - 64, this.humans);

    this.enemy1 = Actors.alien(this.game, WIDTH / 2, 32, this.aliens);
    this.enemy2 = Actors.alien(this.game, 16, 32, this.aliens);
    this.enemy3 = Actors.alien(this.game, WIDTH - 32, 32, this.aliens);
    this.enemy4 = Actors.alien(this.game, WIDTH / 4, 64, this.aliens);
    this.enemy5 = Actors.alien(this.game, WIDTH * 3 / 4, 64, this.aliens);*/
  }

  levelTwo(){
    this.humans.removeAll();
    this.aliens.removeAll();

    this.human1 = Actors.human(this.game, WIDTH / 4, HEIGHT / 4, this.humans);
    this.human1 = Actors.human(this.game, WIDTH / 2, HEIGHT / 4, this.humans);
    this.human1 = Actors.human(this.game, WIDTH / 4, HEIGHT / 2, this.humans);

    this.enemy1 = Actors.alien(this.game, WIDTH * 3 / 4, HEIGHT * 3 / 4, this.aliens);
  }

  levelThree(){
    //this.human1 = Actors.human(this.game,,, this.humans);

    this.humans.removeAll();
    this.aliens.removeAll();
  }




}

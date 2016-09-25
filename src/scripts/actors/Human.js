import _Actor from './_Actor';

export default class Human extends _Actor{
  constructor(game, sprite){
    super(game, sprite);
  }

  save () {
    this.sprite.save();
  }
}

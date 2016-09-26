export default class CountdownTimer {
  constructor (game, timeRemaining = 60, interval = 1000) {
    this.game = game;
    this.timeRemaining = timeRemaining;
    this.timer = game.time.create();
    this.timer.loop(1000, this.tick, this);
    this.onTick = new Phaser.Signal();
    this.onComplete = new Phaser.Signal();
  }

  set time (value = 0) {
    this.timeRemaining = (value > 0) ? value : 0;
  }

  get time () {
    return this.timeRemaining;
  }

  tick () {
    this.time -= 1;
    if (this.time == 0) {
      this.onComplete.dispatch();
      this.stop();
    }
    else {
      this.onTick.dispatch();
    }
  }

  pause () {
    this.timer.pause();
  }

  start (delay = 0) {
    this.timer.start(delay);
  }

  stop () {
    this.timer.stop();
  }

  addTime (value = 0) {
    this.time += value;
  }
}

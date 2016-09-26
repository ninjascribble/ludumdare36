import CountdownTimer from './CountdownTimer';

module.exports = {
  countdown: function create (game, timeRemaining, interval) {
    return new CountdownTimer(game, timeRemaining, interval);
  }
};

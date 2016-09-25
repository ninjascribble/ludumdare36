let game;

export default {
  loadResources: (state) => {
    game = state.game;
    game.load.audio('menuSong', 'assets/Visager_-_26_-_We_Can_Do_It_Loop.mp3', true);
    game.load.audio('gameOverSong', 'assets/looperman-l-1319133-0090841-fanto8bc-julian-8-bit.wav', true);
    game.load.audio('brickImpact', 'assets/brick_impact.wav', true);
    game.load.audio('throwBrick', 'assets/throw_brick.wav', true);
    game.load.audio('alienAttack', 'assets/alien_attack.wav', true);
  }
};

import States from './scripts/states';

// 20 x 16 grid, 16px squares
const width = 320;
const height = 256;
const renderer = Phaser.AUTO;
const parent = 'content';
const defaultState = null;
const transparent = false;
const antialias = false;
const physicsConfig = null;
const game = new Phaser.Game(
  width,
  height,
  renderer,
  parent,
  defaultState,
  transparent,
  antialias,
  physicsConfig
);

States.loading(game.state);

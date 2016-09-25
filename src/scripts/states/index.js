import Gameplay from './Gameplay';
import Loading from './Loading';
import Menu from './Menu';
import GameOver from './GameOver';

module.exports = {
  loading: function loading (stateManager) {
    changeState(stateManager, Loading);
  },

  menu: function menu (stateManager) {
    changeState(stateManager, Menu);
  },

  gameplay: function gameplay (stateManager) {
    changeState(stateManager, Gameplay);
  },

  gameover: function gameover (stateManager, params) {
    changeState(stateManager, GameOver, params);
  }
};

/**
 * This weird little work-around is here because I wasn't able to import
 * index.js into files in the same directory. Injecting the module via
 * each state's constructor felt OKAY, but I'd love to understand more.
 */
function createState (state) {
  return new state(module.exports);
}

function changeState (stateManager, state, params) {
  if (stateManager.checkState(state.name) != true) {
    stateManager.add(state.name, createState(state));
  }
  stateManager.start(state.name, true, false, params);
}

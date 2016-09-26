/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _states = __webpack_require__(1);
	
	var _states2 = _interopRequireDefault(_states);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// 20 x 16 grid, 16px squares
	var width = 320;
	var height = 256;
	var renderer = Phaser.AUTO;
	var parent = 'content';
	var defaultState = null;
	var transparent = false;
	var antialias = false;
	var physicsConfig = null;
	var game = new Phaser.Game(width, height, renderer, parent, defaultState, transparent, antialias, physicsConfig);
	
	_states2.default.loading(game.state);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Gameplay = __webpack_require__(2);
	
	var _Gameplay2 = _interopRequireDefault(_Gameplay);
	
	var _Loading = __webpack_require__(37);
	
	var _Loading2 = _interopRequireDefault(_Loading);
	
	var _Menu = __webpack_require__(38);
	
	var _Menu2 = _interopRequireDefault(_Menu);
	
	var _GameOver = __webpack_require__(39);
	
	var _GameOver2 = _interopRequireDefault(_GameOver);
	
	var _Instructions = __webpack_require__(40);
	
	var _Instructions2 = _interopRequireDefault(_Instructions);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	  loading: function loading(stateManager) {
	    changeState(stateManager, _Loading2.default);
	  },
	
	  menu: function menu(stateManager) {
	    changeState(stateManager, _Menu2.default);
	  },
	
	  gameplay: function gameplay(stateManager) {
	    changeState(stateManager, _Gameplay2.default);
	  },
	
	  gameover: function gameover(stateManager, params) {
	    changeState(stateManager, _GameOver2.default, params);
	  },
	
	  instructions: function instructions(stateManager, params) {
	    changeState(stateManager, _Instructions2.default, params);
	  }
	};
	
	/**
	 * This weird little work-around is here because I wasn't able to import
	 * index.js into files in the same directory. Injecting the module via
	 * each state's constructor felt OKAY, but I'd love to understand more.
	 */
	function createState(state) {
	  return new state(module.exports);
	}
	
	function changeState(stateManager, state, params) {
	  if (stateManager.checkState(state.name) != true) {
	    stateManager.add(state.name, createState(state));
	  }
	  stateManager.start(state.name, true, false, params);
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State3 = __webpack_require__(3);
	
	var _State4 = _interopRequireDefault(_State3);
	
	var _actors = __webpack_require__(4);
	
	var _actors2 = _interopRequireDefault(_actors);
	
	var _fonts = __webpack_require__(8);
	
	var _fonts2 = _interopRequireDefault(_fonts);
	
	var _groups = __webpack_require__(11);
	
	var _groups2 = _interopRequireDefault(_groups);
	
	var _sprites = __webpack_require__(13);
	
	var _sprites2 = _interopRequireDefault(_sprites);
	
	var _services = __webpack_require__(23);
	
	var _services2 = _interopRequireDefault(_services);
	
	var _timers = __webpack_require__(30);
	
	var _timers2 = _interopRequireDefault(_timers);
	
	var _levels = __webpack_require__(32);
	
	var _levels2 = _interopRequireDefault(_levels);
	
	var _sounds = __webpack_require__(36);
	
	var _sounds2 = _interopRequireDefault(_sounds);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var WIDTH = 320;
	var HEIGHT = 256;
	var OFFSET_X = 0;
	var OFFSET_Y = 0;
	
	var Gameplay = function (_State2) {
	  _inherits(Gameplay, _State2);
	
	  function Gameplay() {
	    _classCallCheck(this, Gameplay);
	
	    return _possibleConstructorReturn(this, (Gameplay.__proto__ || Object.getPrototypeOf(Gameplay)).apply(this, arguments));
	  }
	
	  _createClass(Gameplay, [{
	    key: 'create',
	    value: function create() {
	      var _this2 = this;
	
	      this.allowUpdates = true;
	      this.world.setBounds(OFFSET_X, OFFSET_Y, WIDTH, HEIGHT);
	      _sounds2.default.playMusic('menuSong', 0.5);
	
	      this.background = _sprites2.default.checkerboard(this.game, 0, 0, this.world.width, this.world.height);
	      this.game.add.existing(this.background);
	
	      this.bricks = _groups2.default.brickCannon(this.game);
	      this.game.add.existing(this.bricks);
	
	      this.hud = _groups2.default.hud(this.game, 0, 0, WIDTH, 16, this.world);
	      this.player = _actors2.default.player(this.game, this.world.centerX, this.world.centerY, this.hud, this.bricks, this.world);
	
	      this.enemies = this.game.add.group();
	      this.humans = this.game.add.group();
	
	      this.levels = _levels2.default.create(this.game, this.humans, this.enemies, this.bricks, this.player);
	      this.levels.load(0);
	
	      this.player.bricksLeft = 20;
	
	      this.timer = _timers2.default.countdown(this.game, 20);
	      this.timer.start();
	
	      this.pathfinding = _services2.default.pathfinding();
	      this.bricks.onBrickDone.add(function () {
	        _this2.pathfinding.calculateGrid([_this2.bricks], { width: WIDTH, height: HEIGHT }, { width: 16, height: 16 });
	
	        _this2.humans.forEachAlive(function (human) {
	          var promises = [];
	
	          _this2.enemies.forEachAlive(function (enemy) {
	            promises.push(new Promise(function (resolve) {
	              _this2.pathfinding.findPath(enemy, human, resolve);
	            }));
	          });
	
	          Promise.all(promises).then(function (results) {
	            if (results.every(function (result) {
	              return !result;
	            })) {
	              human.actor.save();
	              _this2.player.points += 200;
	              _this2.player.points += _this2.pathfinding.countContiguousTiles(human);
	            }
	          });
	        });
	      });
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.allowUpdates = false;
	    }
	  }, {
	    key: 'resume',
	    value: function resume() {
	      this.allowUpdates = true;
	    }
	  }, {
	    key: 'endGame',
	    value: function endGame(reason) {
	      var _this3 = this;
	
	      this.timer.stop();
	      this.pause();
	      this.game.time.events.add(750, function () {
	        _sounds2.default.stopMusic();
	        _this3.stateProvider.gameover(_this3.state, {
	          score: _this3.player.points,
	          reason: reason
	        });
	      });
	    }
	  }, {
	    key: 'nextLevel',
	    value: function nextLevel() {
	      var _this4 = this;
	
	      this.game.sound.play('stageComplete');
	
	      if (this.levels.hasNext() == false) {
	        this.endGame('You saved the world!');
	      } else {
	        this.pause();
	        this.game.time.events.add(750, function () {
	          _this4.levels.next();
	          _this4.timer.addTime(20);
	          _this4.player.bricksLeft += 20;
	          _this4.resume();
	        });
	      }
	    }
	  }, {
	    key: 'onPlayerEnemiesCollide',
	    value: function onPlayerEnemiesCollide(player, enemy) {
	      this.game.sound.play('alienAttack');
	      player.actor.kill();
	    }
	  }, {
	    key: 'onHumansEnemiesCollide',
	    value: function onHumansEnemiesCollide(human, enemy) {
	      this.game.sound.play('alienAttack');
	      human.actor.kill();
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this.hud.time(this.timer.time);
	
	      this.game.physics.arcade.collide(this.bricks, this.bricks);
	      this.game.physics.arcade.collide(this.enemies, this.bricks);
	      this.game.physics.arcade.collide(this.enemies, this.enemies);
	      this.game.physics.arcade.collide(this.player.sprite, this.bricks);
	      this.game.physics.arcade.collide(this.player.sprite, this.enemies, this.onPlayerEnemiesCollide, null, this);
	      this.game.physics.arcade.collide(this.player.sprite, this.humans);
	      this.game.physics.arcade.collide(this.humans, this.bricks);
	      this.game.physics.arcade.collide(this.humans, this.enemies, this.onHumansEnemiesCollide, null, this);
	      this.game.physics.arcade.collide(this.humans, this.humans);
	
	      if (this.allowUpdates == false) {
	        return;
	      }
	
	      var aliveHumans = this.humans.filter(function (human) {
	        return human.alive;
	      }).list;
	
	      var savedHumans = this.humans.filter(function (human) {
	        return human.saved;
	      }).list;
	
	      if (this.player.isAlive == false) {
	        this.endGame('You were killed by the aliens');
	      }
	
	      if (aliveHumans.length <= 0) {
	        if (savedHumans.length > 0) {
	          this.nextLevel();
	        } else {
	          this.endGame('There were no survivors');
	        }
	      }
	
	      if (this.player.bricksLeft <= 0) {
	        this.endGame('You ran out of bricks');
	      }
	
	      if (this.timer.time <= 0) {
	        this.endGame('You ran out of time');
	      }
	
	      if (this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
	        this.player.moveLeft();
	      }
	
	      if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
	        this.player.moveRight();
	      }
	
	      if (this.input.keyboard.isDown(Phaser.Keyboard.UP)) {
	        this.player.moveUp();
	      }
	
	      if (this.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
	        this.player.moveDown();
	      }
	
	      if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
	        var rect = new Phaser.Rectangle(this.player.sprite.x + 1, this.player.sprite.y + 1, this.player.sprite.width - 2, this.player.sprite.height - 2);
	        var gameObjs = this.bricks.children.concat(this.enemies.children, this.humans.children);
	
	        switch (this.player.facing) {
	          case 'up':
	            rect.y -= this.player.sprite.width;
	            break;
	          case 'down':
	            rect.y += this.player.sprite.width;
	            break;
	          case 'left':
	            rect.x -= this.player.sprite.height;
	            break;
	          case 'right':
	            rect.x += this.player.sprite.height;
	            break;
	        }
	
	        if (gameObjs.every(function (obj) {
	          return rect.intersects(obj.body) == false;
	        })) {
	          this.player.throwBrick();
	        }
	      }
	    }
	  }]);
	
	  return Gameplay;
	}(_State4.default);
	
	exports.default = Gameplay;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _State = function (_Phaser$State) {
	  _inherits(_State, _Phaser$State);
	
	  function _State(stateProvider) {
	    _classCallCheck(this, _State);
	
	    var _this = _possibleConstructorReturn(this, (_State.__proto__ || Object.getPrototypeOf(_State)).call(this));
	
	    _this.stateProvider = stateProvider;
	    return _this;
	  }
	
	  return _State;
	}(Phaser.State);
	
	exports.default = _State;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Alien = __webpack_require__(5);
	
	var _Alien2 = _interopRequireDefault(_Alien);
	
	var _Human = __webpack_require__(7);
	
	var _Human2 = _interopRequireDefault(_Human);
	
	var _fonts = __webpack_require__(8);
	
	var _fonts2 = _interopRequireDefault(_fonts);
	
	var _groups = __webpack_require__(11);
	
	var _groups2 = _interopRequireDefault(_groups);
	
	var _Player = __webpack_require__(22);
	
	var _Player2 = _interopRequireDefault(_Player);
	
	var _sprites = __webpack_require__(13);
	
	var _sprites2 = _interopRequireDefault(_sprites);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	  player: function player(game, x, y, hud, bricks) {
	    var group = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];
	
	    var sprite = _sprites2.default.trump(game, x, y);
	    var actor = new _Player2.default(game, sprite, bricks, hud);
	
	    if (group) {
	      group.add(sprite);
	    }
	
	    return actor;
	  },
	
	  alien: function alien(game, x, y) {
	    var group = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	
	    var sprite = _sprites2.default.alien(game, x, y);
	    var actor = new _Alien2.default(game, sprite);
	
	    if (group) {
	      group.add(sprite);
	    }
	
	    actor.moveTimer();
	
	    return actor;
	  },
	
	  human: function human(game, x, y) {
	    var group = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];
	
	    var sprite = _sprites2.default.human(game, x, y);
	    var actor = new _Human2.default(game, sprite);
	
	    if (group) {
	      group.add(sprite);
	    }
	
	    actor.moveTimer();
	
	    return actor;
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Actor3 = __webpack_require__(6);
	
	var _Actor4 = _interopRequireDefault(_Actor3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Alien = function (_Actor2) {
	  _inherits(Alien, _Actor2);
	
	  function Alien(game, sprite) {
	    _classCallCheck(this, Alien);
	
	    return _possibleConstructorReturn(this, (Alien.__proto__ || Object.getPrototypeOf(Alien)).call(this, game, sprite));
	  }
	
	  return Alien;
	}(_Actor4.default);
	
	exports.default = Alien;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MOVE_DURATION = 100;
	var UP = 'up';
	var DOWN = 'down';
	var LEFT = 'left';
	var RIGHT = 'right';
	
	var Actor = function () {
	  function Actor(game, sprite) {
	    var _this = this;
	
	    _classCallCheck(this, Actor);
	
	    this.game = game;
	    this.sprite = sprite;
	    this.sprite.actor = this;
	
	    this.canMove = true;
	    this.isAlive = true;
	    this.facing = DOWN;
	
	    this.sprite.body.onMoveComplete.add(function () {
	      return _this.canMove = true;
	    });
	    this.sprite.body.onCollide.add(function () {
	      return _this.canMove = true;
	    });
	  }
	
	  _createClass(Actor, [{
	    key: 'kill',
	    value: function kill() {
	      this.sprite.kill();
	      this.isAlive = false;
	    }
	  }, {
	    key: 'move',
	    value: function move(x, y, facing, animation) {
	      if (this.canMove == false) {
	        return;
	      }
	
	      if (animation) {
	        this.sprite.animations.play(animation);
	      }
	
	      this.canMove = false;
	      this.facing = facing;
	
	      switch (this.facing) {
	        case LEFT:
	          this.sprite.body.moveTo(MOVE_DURATION, 16, 180);
	          break;
	        case RIGHT:
	          this.sprite.body.moveTo(MOVE_DURATION, 16, 0);
	          break;
	        case UP:
	          this.sprite.body.moveTo(MOVE_DURATION, 16, 270);
	          break;
	        case DOWN:
	          this.sprite.body.moveTo(MOVE_DURATION, 16, 90);
	          break;
	      }
	    }
	  }, {
	    key: 'moveLeft',
	    value: function moveLeft() {
	      this.move(-16, 0, LEFT, 'walkLeft');
	    }
	  }, {
	    key: 'moveRight',
	    value: function moveRight() {
	      this.move(16, 0, RIGHT, 'walkRight');
	    }
	  }, {
	    key: 'moveUp',
	    value: function moveUp() {
	      this.move(0, -16, UP, 'walkUp');
	    }
	  }, {
	    key: 'moveDown',
	    value: function moveDown() {
	      this.move(0, 16, DOWN, 'walkDown');
	    }
	  }, {
	    key: 'moveTimer',
	    value: function moveTimer() {
	      var moveDelay = this.game.time.create();
	      moveDelay.loop(500, this.travel, this);
	      moveDelay.start();
	    }
	  }, {
	    key: 'travel',
	    value: function travel() {
	      var dirNum = this.game.rnd.integerInRange(1, 4);
	
	      switch (dirNum) {
	        case 1:
	          this.moveLeft();
	          break;
	        case 2:
	          this.moveRight();
	          break;
	        case 3:
	          this.moveUp();
	          break;
	        case 4:
	          this.moveDown();
	          break;
	        default:
	          break;
	      }
	    }
	  }]);
	
	  return Actor;
	}();
	
	exports.default = Actor;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Actor3 = __webpack_require__(6);
	
	var _Actor4 = _interopRequireDefault(_Actor3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Human = function (_Actor2) {
	  _inherits(Human, _Actor2);
	
	  function Human(game, sprite) {
	    _classCallCheck(this, Human);
	
	    return _possibleConstructorReturn(this, (Human.__proto__ || Object.getPrototypeOf(Human)).call(this, game, sprite));
	  }
	
	  _createClass(Human, [{
	    key: 'save',
	    value: function save() {
	      this.sprite.save();
	    }
	  }]);
	
	  return Human;
	}(_Actor4.default);
	
	exports.default = Human;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _DisplayFont = __webpack_require__(9);
	
	var _DisplayFont2 = _interopRequireDefault(_DisplayFont);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	  loadResources: function loadResources(loader) {
	    _DisplayFont2.default.loadResource(loader);
	  },
	
	  display: function display(game, x, y, text, size, align, group) {
	    var font = new _DisplayFont2.default(game, x, y, text, size, align);
	
	    if (group) {
	      group.add(font);
	    }
	
	    return font;
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BitmapFont3 = __webpack_require__(10);
	
	var _BitmapFont4 = _interopRequireDefault(_BitmapFont3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var KEY = '8bit_wonder-light';
	var FONT = 'assets/8bit_wonder-light.png';
	var MAP = 'assets/8bit_wonder-light.fnt';
	
	var DisplayFont = function (_BitmapFont2) {
	  _inherits(DisplayFont, _BitmapFont2);
	
	  _createClass(DisplayFont, null, [{
	    key: 'loadResource',
	    value: function loadResource(loader) {
	      loader.load.bitmapFont(KEY, FONT, MAP);
	    }
	  }]);
	
	  function DisplayFont(game, x, y, text, size, align) {
	    _classCallCheck(this, DisplayFont);
	
	    return _possibleConstructorReturn(this, (DisplayFont.__proto__ || Object.getPrototypeOf(DisplayFont)).call(this, game, x, y, KEY, text, size, align));
	  }
	
	  return DisplayFont;
	}(_BitmapFont4.default);
	
	exports.default = DisplayFont;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _BitmapFont = function (_Phaser$BitmapText) {
	  _inherits(_BitmapFont, _Phaser$BitmapText);
	
	  function _BitmapFont(game, x, y, font, text, size, align) {
	    _classCallCheck(this, _BitmapFont);
	
	    return _possibleConstructorReturn(this, (_BitmapFont.__proto__ || Object.getPrototypeOf(_BitmapFont)).call(this, game, x, y, font, text, size, align));
	  }
	
	  /**
	   * @override Phaser.BitmapText._align
	   */
	
	
	  _createClass(_BitmapFont, [{
	    key: '_align',
	    set: function set(value) {
	      this.__align = value;
	      switch (value) {
	        case 'center':
	          this.anchor.x = 0.5;
	          this.anchor.y = 0.5;
	          break;
	        case 'right':
	          this.anchor.x = 1;
	          this.anchor.y = 0.5;
	          break;
	        case 'left':
	        default:
	          this.anchor.x = 0;
	          this.anchor.y = 0.5;
	          break;
	      }
	    },
	    get: function get() {
	      return this.__align;
	    }
	  }]);
	
	  return _BitmapFont;
	}(Phaser.BitmapText);
	
	exports.default = _BitmapFont;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _BrickCannon = __webpack_require__(12);
	
	var _BrickCannon2 = _interopRequireDefault(_BrickCannon);
	
	var _Hud = __webpack_require__(21);
	
	var _Hud2 = _interopRequireDefault(_Hud);
	
	var _fonts = __webpack_require__(8);
	
	var _fonts2 = _interopRequireDefault(_fonts);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	  brickCannon: function brickCannon(game) {
	    return new _BrickCannon2.default(game);
	  },
	
	  hud: function hud(game, x, y, w, h) {
	    var parent = arguments.length <= 5 || arguments[5] === undefined ? null : arguments[5];
	
	    var gfx = new Phaser.Graphics(game);
	    var bkgTexture = gfx.beginFill(0x000000).drawRect(x, y, w, h).endFill().generateTexture();
	    var bkg = new Phaser.Image(game, x, y, w, h);
	    var timer = _fonts2.default.display(game, game.world.centerX, 8, '', 6, 'center');
	    var points = _fonts2.default.display(game, w - 8, 8, '', 6, 'right');
	    var bricks = _fonts2.default.display(game, 8, 8, '', 6, 'left');
	    var hud = new _Hud2.default(game, timer, bricks, points);
	
	    bkg.setTexture(bkgTexture);
	    hud.addAt(bkg, 0, true);
	
	    if (parent) {
	      parent.add(hud);
	    }
	
	    return hud;
	  }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _sprites = __webpack_require__(13);
	
	var _sprites2 = _interopRequireDefault(_sprites);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BrickCannon = function (_Phaser$Group) {
	  _inherits(BrickCannon, _Phaser$Group);
	
	  function BrickCannon(game) {
	    _classCallCheck(this, BrickCannon);
	
	    var _this = _possibleConstructorReturn(this, (BrickCannon.__proto__ || Object.getPrototypeOf(BrickCannon)).call(this, game, null, 'brickCannon'));
	
	    _this.onBrickDone = new Phaser.Signal();
	    return _this;
	  }
	
	  _createClass(BrickCannon, [{
	    key: 'createBrick',
	    value: function createBrick(x, y) {
	      var _this2 = this;
	
	      var brick = _sprites2.default.brick(this.game, x, y);
	      brick.onDone.addOnce(function () {
	        _this2.onBrickDone.dispatch();
	      }, this);
	      return this.add(brick);
	    }
	  }, {
	    key: 'placeBrick',
	    value: function placeBrick(x, y) {
	      var brick = this.createBrick(x, y);
	      brick.body.immovable = true;
	    }
	  }, {
	    key: 'fireBrick',
	    value: function fireBrick(x, y, vx, vy) {
	      this.game.sound.play('throwBrick');
	      var brick = this.createBrick(x, y);
	      brick.body.velocity.setTo(vx, vy);
	    }
	  }]);
	
	  return BrickCannon;
	}(Phaser.Group);
	
	exports.default = BrickCannon;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _AlienSprite = __webpack_require__(14);
	
	var _AlienSprite2 = _interopRequireDefault(_AlienSprite);
	
	var _HumanSprite = __webpack_require__(16);
	
	var _HumanSprite2 = _interopRequireDefault(_HumanSprite);
	
	var _BrickSprite = __webpack_require__(17);
	
	var _BrickSprite2 = _interopRequireDefault(_BrickSprite);
	
	var _CheckerboardSprite = __webpack_require__(18);
	
	var _CheckerboardSprite2 = _interopRequireDefault(_CheckerboardSprite);
	
	var _TrumpSprite = __webpack_require__(20);
	
	var _TrumpSprite2 = _interopRequireDefault(_TrumpSprite);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	  loadResources: function loadResources(loader) {
	    _TrumpSprite2.default.loadResource(loader);
	    _BrickSprite2.default.loadResource(loader);
	    _CheckerboardSprite2.default.loadResource(loader);
	    _AlienSprite2.default.loadResource(loader);
	    _HumanSprite2.default.loadResource(loader);
	  },
	
	  trump: function playertrump(game, x, y) {
	    return new _TrumpSprite2.default(game, x, y);
	  },
	
	  brick: function brickSprite(game, x, y) {
	    return new _BrickSprite2.default(game, x, y);
	  },
	
	  checkerboard: function checkerboardSprite(game, x, y, w, h) {
	    return new _CheckerboardSprite2.default(game, x, y, w, h);
	  },
	
	  alien: function alienSprite(game, x, y) {
	    return new _AlienSprite2.default(game, x, y);
	  },
	
	  human: function humanSprite(game, x, y) {
	    return new _HumanSprite2.default(game, x, y);
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _PhysicsSprite3 = __webpack_require__(15);
	
	var _PhysicsSprite4 = _interopRequireDefault(_PhysicsSprite3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var KEY = 'alien';
	var SRC = 'assets/alien.png';
	var WIDTH = 16;
	var HEIGHT = 16;
	
	var AlienSprite = function (_PhysicsSprite2) {
	  _inherits(AlienSprite, _PhysicsSprite2);
	
	  _createClass(AlienSprite, null, [{
	    key: 'loadResource',
	    value: function loadResource(loader) {
	      loader.load.spritesheet(KEY, SRC, WIDTH, HEIGHT);
	    }
	  }]);
	
	  function AlienSprite(game, x, y) {
	    _classCallCheck(this, AlienSprite);
	
	    var _this = _possibleConstructorReturn(this, (AlienSprite.__proto__ || Object.getPrototypeOf(AlienSprite)).call(this, game, x, y, KEY));
	
	    _this.animations.add('walkDown', [0, 1, 0, 2], 6, true);
	    _this.animations.add('walkUp', [3, 4, 3, 5], 6, true);
	    _this.animations.add('walkRight', [6, 7, 6, 8], 6, true);
	    _this.animations.add('walkLeft', [9, 10, 9, 11], 6, true);
	
	    return _this;
	  }
	
	  return AlienSprite;
	}(_PhysicsSprite4.default);
	
	exports.default = AlienSprite;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _Sprite = function (_Phaser$Sprite) {
	  _inherits(_Sprite, _Phaser$Sprite);
	
	  function _Sprite(game, x, y, key, frame) {
	    _classCallCheck(this, _Sprite);
	
	    var _this = _possibleConstructorReturn(this, (_Sprite.__proto__ || Object.getPrototypeOf(_Sprite)).call(this, game, x, y, key, frame));
	
	    game.physics.enable(_this);
	
	    _this.body.mass = 0;
	
	    // Why is this disabled by default...?
	    _this.body.onCollide = new Phaser.Signal();
	
	    _this.body.onMoveComplete.add(_this.onMoveComplete, _this);
	    _this.body.onCollide.add(_this.onCollide, _this);
	    return _this;
	  }
	
	  _createClass(_Sprite, [{
	    key: "onMoveComplete",
	    value: function onMoveComplete() {
	      this.body.x = Phaser.Math.snapTo(this.body.x, 16);
	      this.body.y = Phaser.Math.snapTo(this.body.y, 16);
	    }
	  }, {
	    key: "onCollide",
	    value: function onCollide() {
	      this.onMoveComplete();
	      this.body.overlapX = 0;
	      this.body.overlapY = 0;
	      this.body.velocity.x = 0;
	      this.body.velocity.y = 0;
	    }
	  }]);
	
	  return _Sprite;
	}(Phaser.Sprite);
	
	exports.default = _Sprite;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _PhysicsSprite3 = __webpack_require__(15);
	
	var _PhysicsSprite4 = _interopRequireDefault(_PhysicsSprite3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var KEY = 'human';
	var SRC = 'assets/human.png';
	var WIDTH = 16;
	var HEIGHT = 16;
	
	var HumanSprite = function (_PhysicsSprite2) {
	  _inherits(HumanSprite, _PhysicsSprite2);
	
	  _createClass(HumanSprite, null, [{
	    key: 'loadResource',
	    value: function loadResource(loader) {
	      loader.load.spritesheet(KEY, SRC, WIDTH, HEIGHT);
	    }
	  }]);
	
	  function HumanSprite(game, x, y) {
	    _classCallCheck(this, HumanSprite);
	
	    var _this = _possibleConstructorReturn(this, (HumanSprite.__proto__ || Object.getPrototypeOf(HumanSprite)).call(this, game, x, y, KEY));
	
	    _this.saved = false;
	
	    _this.animations.add('walkDown', [0, 1, 0, 2], 6, true);
	    _this.animations.add('walkUp', [3, 4, 3, 5], 6, true);
	    _this.animations.add('walkRight', [6, 7, 6, 8], 6, true);
	    _this.animations.add('walkLeft', [9, 10, 9, 11], 6, true);
	    return _this;
	  }
	
	  _createClass(HumanSprite, [{
	    key: 'save',
	    value: function save() {
	      this.saved = true;
	      this.alive = false;
	    }
	  }]);
	
	  return HumanSprite;
	}(_PhysicsSprite4.default);
	
	exports.default = HumanSprite;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _PhysicsSprite3 = __webpack_require__(15);
	
	var _PhysicsSprite4 = _interopRequireDefault(_PhysicsSprite3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var KEY = 'brick';
	var SRC = 'assets/brick.png';
	var WIDTH = 16;
	var HEIGHT = 16;
	
	var BrickSprite = function (_PhysicsSprite2) {
	  _inherits(BrickSprite, _PhysicsSprite2);
	
	  _createClass(BrickSprite, null, [{
	    key: 'loadResource',
	    value: function loadResource(loader) {
	      loader.load.spritesheet(KEY, SRC, WIDTH, HEIGHT);
	    }
	  }]);
	
	  function BrickSprite(game, x, y) {
	    _classCallCheck(this, BrickSprite);
	
	    var _this = _possibleConstructorReturn(this, (BrickSprite.__proto__ || Object.getPrototypeOf(BrickSprite)).call(this, game, x, y, KEY));
	
	    _this.onDone = new Phaser.Signal();
	    return _this;
	  }
	
	  _createClass(BrickSprite, [{
	    key: 'onCollide',
	    value: function onCollide() {
	      _get(BrickSprite.prototype.__proto__ || Object.getPrototypeOf(BrickSprite.prototype), 'onCollide', this).call(this);
	      if (!this.body.immovable) {
	        this.game.sound.play('brickImpact');
	      }
	
	      this.body.immovable = true;
	      this.onDone.dispatch();
	    }
	  }]);
	
	  return BrickSprite;
	}(_PhysicsSprite4.default);
	
	exports.default = BrickSprite;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _TileSprite3 = __webpack_require__(19);
	
	var _TileSprite4 = _interopRequireDefault(_TileSprite3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var KEY = 'checkerboard';
	var SRC = 'assets/checkerboard.png';
	var WIDTH = 32;
	var HEIGHT = 32;
	
	var CheckerboardSprite = function (_TileSprite2) {
	  _inherits(CheckerboardSprite, _TileSprite2);
	
	  _createClass(CheckerboardSprite, null, [{
	    key: 'loadResource',
	    value: function loadResource(loader) {
	      loader.load.spritesheet(KEY, SRC, WIDTH, HEIGHT);
	    }
	  }]);
	
	  function CheckerboardSprite(game, x, y, w, h) {
	    _classCallCheck(this, CheckerboardSprite);
	
	    return _possibleConstructorReturn(this, (CheckerboardSprite.__proto__ || Object.getPrototypeOf(CheckerboardSprite)).call(this, game, x, y, w, h, KEY));
	  }
	
	  return CheckerboardSprite;
	}(_TileSprite4.default);
	
	exports.default = CheckerboardSprite;

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _TileSprite = function (_Phaser$TileSprite) {
	  _inherits(_TileSprite, _Phaser$TileSprite);
	
	  function _TileSprite(game, x, y, w, h, key, frame) {
	    _classCallCheck(this, _TileSprite);
	
	    return _possibleConstructorReturn(this, (_TileSprite.__proto__ || Object.getPrototypeOf(_TileSprite)).call(this, game, x, y, w, h, key, frame));
	  }
	
	  return _TileSprite;
	}(Phaser.TileSprite);
	
	exports.default = _TileSprite;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _PhysicsSprite3 = __webpack_require__(15);
	
	var _PhysicsSprite4 = _interopRequireDefault(_PhysicsSprite3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var KEY = 'trump';
	var SRC = 'assets/trump.png';
	var WIDTH = 16;
	var HEIGHT = 16;
	
	var TrumpSprite = function (_PhysicsSprite2) {
	  _inherits(TrumpSprite, _PhysicsSprite2);
	
	  _createClass(TrumpSprite, null, [{
	    key: 'loadResource',
	    value: function loadResource(loader) {
	      loader.load.spritesheet(KEY, SRC, WIDTH, HEIGHT);
	    }
	  }]);
	
	  function TrumpSprite(game, x, y) {
	    _classCallCheck(this, TrumpSprite);
	
	    var _this = _possibleConstructorReturn(this, (TrumpSprite.__proto__ || Object.getPrototypeOf(TrumpSprite)).call(this, game, x, y, KEY));
	
	    _this.animations.add('walkDown', [0, 1, 0, 2], 6, true);
	    _this.animations.add('walkUp', [3, 4, 3, 5], 6, true);
	    _this.animations.add('walkRight', [6, 7, 6, 8], 6, true);
	    _this.animations.add('walkLeft', [9, 10, 9, 11], 6, true);
	    return _this;
	  }
	
	  return TrumpSprite;
	}(_PhysicsSprite4.default);
	
	exports.default = TrumpSprite;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _sprites = __webpack_require__(13);
	
	var _sprites2 = _interopRequireDefault(_sprites);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Hud = function (_Phaser$Group) {
	  _inherits(Hud, _Phaser$Group);
	
	  function Hud(game, timerFont, bricksFont, pointsFont) {
	    _classCallCheck(this, Hud);
	
	    var _this = _possibleConstructorReturn(this, (Hud.__proto__ || Object.getPrototypeOf(Hud)).call(this, game, null, 'hud'));
	
	    _this.timerFont = timerFont;
	    _this.bricksFont = bricksFont;
	    _this.pointsFont = pointsFont;
	
	    _this.add(_this.timerFont);
	    _this.add(_this.pointsFont);
	    _this.add(_this.bricksFont);
	
	    _this.time(0);
	    _this.bricks(0);
	    _this.points(0);
	    return _this;
	  }
	
	  _createClass(Hud, [{
	    key: 'bricks',
	    value: function bricks(value) {
	      this.bricksFont.text = value + ' bricks left';
	    }
	  }, {
	    key: 'points',
	    value: function points(value) {
	      this.pointsFont.text = value + ' pts';
	    }
	  }, {
	    key: 'time',
	    value: function time(value) {
	      this.timerFont.text = value + ' sec';
	    }
	  }]);
	
	  return Hud;
	}(Phaser.Group);
	
	exports.default = Hud;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Actor3 = __webpack_require__(6);
	
	var _Actor4 = _interopRequireDefault(_Actor3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var THROW_BRICK_COOLDOWN = 500; // milliseconds
	var THROW_BRICK_VELOCITY = 300;
	
	var Player = function (_Actor2) {
	  _inherits(Player, _Actor2);
	
	  function Player(game, sprite, brickFactory, hud) {
	    _classCallCheck(this, Player);
	
	    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, sprite));
	
	    _this.bricks = brickFactory;
	    _this.hud = hud;
	    _this.canThrow = true;
	    _this.bricksLeft = 20;
	    _this.points = 0;
	    return _this;
	  }
	
	  _createClass(Player, [{
	    key: 'throwBrick',
	    value: function throwBrick() {
	      var _this2 = this;
	
	      if (this.canFire == false) {
	        return;
	      }
	
	      var timer = this.game.time.create();
	      var x = this.sprite.x;
	      var y = this.sprite.y;
	      var vx = 0;
	      var vy = 0;
	
	      this.canFire = false;
	      timer.add(THROW_BRICK_COOLDOWN, function () {
	        return _this2.canFire = true;
	      });
	
	      switch (this.facing) {
	        case 'up':
	          y -= this.sprite.width + 1;
	          vy = -1 * THROW_BRICK_VELOCITY;
	          break;
	        case 'down':
	          y += this.sprite.width + 1;
	          vy = 1 * THROW_BRICK_VELOCITY;
	          break;
	        case 'left':
	          x -= this.sprite.height + 1;
	          vx = -1 * THROW_BRICK_VELOCITY;
	          break;
	        case 'right':
	          x += this.sprite.height + 1;
	          vx = 1 * THROW_BRICK_VELOCITY;
	          break;
	      }
	
	      this.bricks.fireBrick(x, y, vx, vy);
	      this.bricksLeft -= 1;
	      timer.start();
	    }
	  }, {
	    key: 'bricksLeft',
	    set: function set(value) {
	      this._bricksLeft = value;
	      this.hud.bricks(value);
	    },
	    get: function get() {
	      return this._bricksLeft;
	    }
	  }, {
	    key: 'points',
	    set: function set(value) {
	      this._points = value;
	      this.hud.points(value);
	    },
	    get: function get() {
	      return this._points;
	    }
	  }]);
	
	  return Player;
	}(_Actor4.default);
	
	exports.default = Player;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _pathfinding2 = __webpack_require__(24);
	
	var _pathfinding3 = _interopRequireDefault(_pathfinding2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  pathfinding: function pathfinding() {
	    return _pathfinding3.default;
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _easystarjs = __webpack_require__(25);
	
	var _easystarjs2 = _interopRequireDefault(_easystarjs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var easystar = new _easystarjs2.default.js();
	var mapData = [];
	
	function pointToTile(point) {
	  return new Phaser.Point(Phaser.Math.snapTo(point.x, 16) / 16, Phaser.Math.snapTo(point.y, 16) / 16);
	}
	
	function tileToPoint(point) {
	  return new Phaser.Point(Math.floor(point.x * 16), Math.floor(point.y * 16));
	}
	
	exports.default = {
	  countContiguousTiles: function countContiguousTiles(playerSprite, gridSize) {
	    var visitedTiles = [];
	    var tileQueue = [];
	    var currentTile = pointToTile(playerSprite.body.position);
	    var tileCount = 1;
	
	    function queueAdjacentTiles(tile) {
	      visitedTiles[tile.y][tile.x] = true;
	
	      if (mapData[tile.y][tile.x - 1] === 0 && !visitedTiles[tile.y][tile.x - 1]) {
	        tileQueue.unshift({ x: tile.x - 1, y: tile.y });
	        visitedTiles[tile.y][tile.x - 1] = true;
	      }
	      if (mapData[tile.y][tile.x + 1] === 0 && !visitedTiles[tile.y][tile.x + 1]) {
	        visitedTiles[tile.y][tile.x + 1] = true;
	        tileQueue.unshift({ x: tile.x + 1, y: tile.y });
	      }
	      if (mapData[tile.y - 1][tile.x] === 0 && !visitedTiles[tile.y - 1][tile.x]) {
	        visitedTiles[tile.y - 1][tile.x] = true;
	        tileQueue.unshift({ x: tile.x, y: tile.y - 1 });
	      }
	      if (mapData[tile.y + 1][tile.x] === 0 && !visitedTiles[tile.y + 1][tile.x]) {
	        tileQueue.unshift({ x: tile.x, y: tile.y + 1 });
	        visitedTiles[tile.y + 1][tile.x] = true;
	      }
	    }
	
	    for (var i = 0; i < mapData.length; i++) {
	      visitedTiles[i] = [];
	    }
	
	    queueAdjacentTiles(currentTile);
	
	    while (tileQueue.length) {
	      console.log('queue length: ' + tileQueue.length);
	      if (mapData[currentTile.y][currentTile.x] === 0) {
	        console.log('x: ' + currentTile.x + ', y: ' + currentTile.y);
	        tileCount++;
	      }
	
	      currentTile = tileQueue.pop();
	      queueAdjacentTiles(currentTile);
	    }
	
	    return tileCount;
	  },
	
	  findPath: function findPath(sourceSprite, destinationSprite, callback) {
	    var actorTile = pointToTile(sourceSprite.body.position);
	    var targetTile = pointToTile(destinationSprite.body.position);
	
	    easystar.findPath(actorTile.x, actorTile.y, targetTile.x, targetTile.y, callback);
	    easystar.calculate();
	  },
	
	  calculateGrid: function calculateGrid(obstacleGroups, mapSize, gridSize) {
	    var walkables = [0];
	    var gridWidth = mapSize.width / gridSize.width;
	    var gridHeight = mapSize.height / gridSize.height;
	
	    mapData = [];
	
	    console.log('calculating grid');
	
	    for (var i = 0; i < gridHeight; i++) {
	      for (var j = 0; j < gridWidth; j++) {
	        if (!mapData[i]) {
	          mapData[i] = [];
	        }
	
	        mapData[i][j] = 0;
	      }
	    }
	
	    obstacleGroups.forEach(function (obstacleGroup) {
	      obstacleGroup.children.forEach(function (obstacle) {
	        var tile = pointToTile(obstacle.body.position);
	        mapData[tile.y][tile.x] = 1;
	      });
	    });
	
	    easystar.setGrid(mapData);
	    easystar.setAcceptableTiles(walkables);
	  },
	
	  pointToTile: pointToTile,
	
	  tileToPoint: tileToPoint
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	*   EasyStar.js
	*   github.com/prettymuchbryce/EasyStarJS
	*   Licensed under the MIT license.
	* 
	*   Implementation By Bryce Neal (@prettymuchbryce)
	**/
	
	var EasyStar = {};
	var Instance = __webpack_require__(26);
	var Node = __webpack_require__(27);
	var Heap = __webpack_require__(28);
	
	var CLOSED_LIST = 0;
	var OPEN_LIST = 1;
	
	module.exports = EasyStar;
	
	EasyStar.js = function () {
	    var STRAIGHT_COST = 1.0;
	    var DIAGONAL_COST = 1.4;
	    var syncEnabled = false;
	    var pointsToAvoid = {};
	    var collisionGrid;
	    var costMap = {};
	    var pointsToCost = {};
	    var allowCornerCutting = true;
	    var iterationsSoFar;
	    var instances = [];
	    var iterationsPerCalculation = Number.MAX_VALUE;
	    var acceptableTiles;
	    var diagonalsEnabled = false;
	
	    /**
	    * Sets the collision grid that EasyStar uses.
	    * 
	    * @param {Array|Number} tiles An array of numbers that represent 
	    * which tiles in your grid should be considered
	    * acceptable, or "walkable".
	    **/
	    this.setAcceptableTiles = function (tiles) {
	        if (tiles instanceof Array) {
	            // Array
	            acceptableTiles = tiles;
	        } else if (!isNaN(parseFloat(tiles)) && isFinite(tiles)) {
	            // Number
	            acceptableTiles = [tiles];
	        }
	    };
	
	    /**
	    * Enables sync mode for this EasyStar instance..
	    * if you're into that sort of thing.
	    **/
	    this.enableSync = function () {
	        syncEnabled = true;
	    };
	
	    /**
	    * Disables sync mode for this EasyStar instance.
	    **/
	    this.disableSync = function () {
	        syncEnabled = false;
	    };
	
	    /**
	     * Enable diagonal pathfinding.
	     */
	    this.enableDiagonals = function () {
	        diagonalsEnabled = true;
	    };
	
	    /**
	     * Disable diagonal pathfinding.
	     */
	    this.disableDiagonals = function () {
	        diagonalsEnabled = false;
	    };
	
	    /**
	    * Sets the collision grid that EasyStar uses.
	    * 
	    * @param {Array} grid The collision grid that this EasyStar instance will read from. 
	    * This should be a 2D Array of Numbers.
	    **/
	    this.setGrid = function (grid) {
	        collisionGrid = grid;
	
	        //Setup cost map
	        for (var y = 0; y < collisionGrid.length; y++) {
	            for (var x = 0; x < collisionGrid[0].length; x++) {
	                if (!costMap[collisionGrid[y][x]]) {
	                    costMap[collisionGrid[y][x]] = 1;
	                }
	            }
	        }
	    };
	
	    /**
	    * Sets the tile cost for a particular tile type.
	    *
	    * @param {Number} The tile type to set the cost for.
	    * @param {Number} The multiplicative cost associated with the given tile.
	    **/
	    this.setTileCost = function (tileType, cost) {
	        costMap[tileType] = cost;
	    };
	
	    /**
	    * Sets the an additional cost for a particular point.
	    * Overrides the cost from setTileCost.
	    *
	    * @param {Number} x The x value of the point to cost.
	    * @param {Number} y The y value of the point to cost.
	    * @param {Number} The multiplicative cost associated with the given point.
	    **/
	    this.setAdditionalPointCost = function (x, y, cost) {
	        pointsToCost[x + '_' + y] = cost;
	    };
	
	    /**
	    * Remove the additional cost for a particular point.
	    *
	    * @param {Number} x The x value of the point to stop costing.
	    * @param {Number} y The y value of the point to stop costing.
	    **/
	    this.removeAdditionalPointCost = function (x, y) {
	        delete pointsToCost[x + '_' + y];
	    };
	
	    /**
	    * Remove all additional point costs.
	    **/
	    this.removeAllAdditionalPointCosts = function () {
	        pointsToCost = {};
	    };
	
	    /**
	    * Sets the number of search iterations per calculation. 
	    * A lower number provides a slower result, but more practical if you 
	    * have a large tile-map and don't want to block your thread while
	    * finding a path.
	    * 
	    * @param {Number} iterations The number of searches to prefrom per calculate() call.
	    **/
	    this.setIterationsPerCalculation = function (iterations) {
	        iterationsPerCalculation = iterations;
	    };
	
	    /**
	    * Avoid a particular point on the grid, 
	    * regardless of whether or not it is an acceptable tile.
	    *
	    * @param {Number} x The x value of the point to avoid.
	    * @param {Number} y The y value of the point to avoid.
	    **/
	    this.avoidAdditionalPoint = function (x, y) {
	        pointsToAvoid[x + "_" + y] = 1;
	    };
	
	    /**
	    * Stop avoiding a particular point on the grid.
	    *
	    * @param {Number} x The x value of the point to stop avoiding.
	    * @param {Number} y The y value of the point to stop avoiding.
	    **/
	    this.stopAvoidingAdditionalPoint = function (x, y) {
	        delete pointsToAvoid[x + "_" + y];
	    };
	
	    /**
	    * Enables corner cutting in diagonal movement.
	    **/
	    this.enableCornerCutting = function () {
	        allowCornerCutting = true;
	    };
	
	    /**
	    * Disables corner cutting in diagonal movement.
	    **/
	    this.disableCornerCutting = function () {
	        allowCornerCutting = false;
	    };
	
	    /**
	    * Stop avoiding all additional points on the grid.
	    **/
	    this.stopAvoidingAllAdditionalPoints = function () {
	        pointsToAvoid = {};
	    };
	
	    /**
	    * Find a path.
	    * 
	    * @param {Number} startX The X position of the starting point.
	    * @param {Number} startY The Y position of the starting point.
	    * @param {Number} endX The X position of the ending point.
	    * @param {Number} endY The Y position of the ending point.
	    * @param {Function} callback A function that is called when your path
	    * is found, or no path is found.
	    * 
	    **/
	    this.findPath = function (startX, startY, endX, endY, callback) {
	        // Wraps the callback for sync vs async logic
	        var callbackWrapper = function callbackWrapper(result) {
	            if (syncEnabled) {
	                callback(result);
	            } else {
	                setTimeout(function () {
	                    callback(result);
	                });
	            }
	        };
	
	        // No acceptable tiles were set
	        if (acceptableTiles === undefined) {
	            throw new Error("You can't set a path without first calling setAcceptableTiles() on EasyStar.");
	        }
	        // No grid was set
	        if (collisionGrid === undefined) {
	            throw new Error("You can't set a path without first calling setGrid() on EasyStar.");
	        }
	
	        // Start or endpoint outside of scope.
	        if (startX < 0 || startY < 0 || endX < 0 || endY < 0 || startX > collisionGrid[0].length - 1 || startY > collisionGrid.length - 1 || endX > collisionGrid[0].length - 1 || endY > collisionGrid.length - 1) {
	            throw new Error("Your start or end point is outside the scope of your grid.");
	        }
	
	        // Start and end are the same tile.
	        if (startX === endX && startY === endY) {
	            callbackWrapper([]);
	            return;
	        }
	
	        // End point is not an acceptable tile.
	        var endTile = collisionGrid[endY][endX];
	        var isAcceptable = false;
	        for (var i = 0; i < acceptableTiles.length; i++) {
	            if (endTile === acceptableTiles[i]) {
	                isAcceptable = true;
	                break;
	            }
	        }
	
	        if (isAcceptable === false) {
	            callbackWrapper(null);
	            return;
	        }
	
	        // Create the instance
	        var instance = new Instance();
	        instance.openList = new Heap(function (nodeA, nodeB) {
	            return nodeA.bestGuessDistance() - nodeB.bestGuessDistance();
	        });
	        instance.isDoneCalculating = false;
	        instance.nodeHash = {};
	        instance.startX = startX;
	        instance.startY = startY;
	        instance.endX = endX;
	        instance.endY = endY;
	        instance.callback = callbackWrapper;
	
	        instance.openList.push(coordinateToNode(instance, instance.startX, instance.startY, null, STRAIGHT_COST));
	
	        instances.push(instance);
	    };
	
	    /**
	    * This method steps through the A* Algorithm in an attempt to
	    * find your path(s). It will search 4-8 tiles (depending on diagonals) for every calculation.
	    * You can change the number of calculations done in a call by using
	    * easystar.setIteratonsPerCalculation().
	    **/
	    this.calculate = function () {
	        if (instances.length === 0 || collisionGrid === undefined || acceptableTiles === undefined) {
	            return;
	        }
	        for (iterationsSoFar = 0; iterationsSoFar < iterationsPerCalculation; iterationsSoFar++) {
	            if (instances.length === 0) {
	                return;
	            }
	
	            if (syncEnabled) {
	                // If this is a sync instance, we want to make sure that it calculates synchronously. 
	                iterationsSoFar = 0;
	            }
	
	            // Couldn't find a path.
	            if (instances[0].openList.size() === 0) {
	                var ic = instances[0];
	                ic.callback(null);
	                instances.shift();
	                continue;
	            }
	
	            var searchNode = instances[0].openList.pop();
	
	            // Handles the case where we have found the destination
	            if (instances[0].endX === searchNode.x && instances[0].endY === searchNode.y) {
	                instances[0].isDoneCalculating = true;
	                var path = [];
	                path.push({ x: searchNode.x, y: searchNode.y });
	                var parent = searchNode.parent;
	                while (parent != null) {
	                    path.push({ x: parent.x, y: parent.y });
	                    parent = parent.parent;
	                }
	                path.reverse();
	                var ic = instances[0];
	                var ip = path;
	                ic.callback(ip);
	                return;
	            }
	
	            var tilesToSearch = [];
	            searchNode.list = CLOSED_LIST;
	
	            if (searchNode.y > 0) {
	                tilesToSearch.push({ instance: instances[0], searchNode: searchNode,
	                    x: 0, y: -1, cost: STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y - 1) });
	            }
	            if (searchNode.x < collisionGrid[0].length - 1) {
	                tilesToSearch.push({ instance: instances[0], searchNode: searchNode,
	                    x: 1, y: 0, cost: STRAIGHT_COST * getTileCost(searchNode.x + 1, searchNode.y) });
	            }
	            if (searchNode.y < collisionGrid.length - 1) {
	                tilesToSearch.push({ instance: instances[0], searchNode: searchNode,
	                    x: 0, y: 1, cost: STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y + 1) });
	            }
	            if (searchNode.x > 0) {
	                tilesToSearch.push({ instance: instances[0], searchNode: searchNode,
	                    x: -1, y: 0, cost: STRAIGHT_COST * getTileCost(searchNode.x - 1, searchNode.y) });
	            }
	            if (diagonalsEnabled) {
	                if (searchNode.x > 0 && searchNode.y > 0) {
	
	                    if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y - 1) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x - 1, searchNode.y)) {
	
	                        tilesToSearch.push({ instance: instances[0], searchNode: searchNode,
	                            x: -1, y: -1, cost: DIAGONAL_COST * getTileCost(searchNode.x - 1, searchNode.y - 1) });
	                    }
	                }
	                if (searchNode.x < collisionGrid[0].length - 1 && searchNode.y < collisionGrid.length - 1) {
	
	                    if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y + 1) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x + 1, searchNode.y)) {
	
	                        tilesToSearch.push({ instance: instances[0], searchNode: searchNode,
	                            x: 1, y: 1, cost: DIAGONAL_COST * getTileCost(searchNode.x + 1, searchNode.y + 1) });
	                    }
	                }
	                if (searchNode.x < collisionGrid[0].length - 1 && searchNode.y > 0) {
	
	                    if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y - 1) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x + 1, searchNode.y)) {
	
	                        tilesToSearch.push({ instance: instances[0], searchNode: searchNode,
	                            x: 1, y: -1, cost: DIAGONAL_COST * getTileCost(searchNode.x + 1, searchNode.y - 1) });
	                    }
	                }
	                if (searchNode.x > 0 && searchNode.y < collisionGrid.length - 1) {
	
	                    if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y + 1) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x - 1, searchNode.y)) {
	
	                        tilesToSearch.push({ instance: instances[0], searchNode: searchNode,
	                            x: -1, y: 1, cost: DIAGONAL_COST * getTileCost(searchNode.x - 1, searchNode.y + 1) });
	                    }
	                }
	            }
	
	            var isDoneCalculating = false;
	
	            // Search all of the surrounding nodes
	            for (var i = 0; i < tilesToSearch.length; i++) {
	                checkAdjacentNode(tilesToSearch[i].instance, tilesToSearch[i].searchNode, tilesToSearch[i].x, tilesToSearch[i].y, tilesToSearch[i].cost);
	                if (tilesToSearch[i].instance.isDoneCalculating === true) {
	                    isDoneCalculating = true;
	                    break;
	                }
	            }
	
	            if (isDoneCalculating) {
	                instances.shift();
	                continue;
	            }
	        }
	    };
	
	    // Private methods follow
	    var checkAdjacentNode = function checkAdjacentNode(instance, searchNode, x, y, cost) {
	        var adjacentCoordinateX = searchNode.x + x;
	        var adjacentCoordinateY = searchNode.y + y;
	
	        if (pointsToAvoid[adjacentCoordinateX + "_" + adjacentCoordinateY] === undefined && isTileWalkable(collisionGrid, acceptableTiles, adjacentCoordinateX, adjacentCoordinateY)) {
	            var node = coordinateToNode(instance, adjacentCoordinateX, adjacentCoordinateY, searchNode, cost);
	
	            if (node.list === undefined) {
	                node.list = OPEN_LIST;
	                instance.openList.push(node);
	            } else if (searchNode.costSoFar + cost < node.costSoFar) {
	                node.costSoFar = searchNode.costSoFar + cost;
	                node.parent = searchNode;
	                instance.openList.updateItem(node);
	            }
	        }
	    };
	
	    // Helpers
	    var isTileWalkable = function isTileWalkable(collisionGrid, acceptableTiles, x, y) {
	        for (var i = 0; i < acceptableTiles.length; i++) {
	            if (collisionGrid[y][x] === acceptableTiles[i]) {
	                return true;
	            }
	        }
	
	        return false;
	    };
	
	    var getTileCost = function getTileCost(x, y) {
	        return pointsToCost[x + '_' + y] || costMap[collisionGrid[y][x]];
	    };
	
	    var coordinateToNode = function coordinateToNode(instance, x, y, parent, cost) {
	        if (instance.nodeHash[x + "_" + y] !== undefined) {
	            return instance.nodeHash[x + "_" + y];
	        }
	        var simpleDistanceToTarget = getDistance(x, y, instance.endX, instance.endY);
	        if (parent !== null) {
	            var costSoFar = parent.costSoFar + cost;
	        } else {
	            costSoFar = 0;
	        }
	        var node = new Node(parent, x, y, costSoFar, simpleDistanceToTarget);
	        instance.nodeHash[x + "_" + y] = node;
	        return node;
	    };
	
	    var getDistance = function getDistance(x1, y1, x2, y2) {
	        if (diagonalsEnabled) {
	            // Octile distance
	            var dx = Math.abs(x1 - x2);
	            var dy = Math.abs(y1 - y2);
	            if (dx < dy) {
	                return DIAGONAL_COST * dx + dy;
	            } else {
	                return DIAGONAL_COST * dy + dx;
	            }
	        } else {
	            // Manhattan distance
	            var dx = Math.abs(x1 - x2);
	            var dy = Math.abs(y1 - y2);
	            return dx + dy;
	        }
	    };
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	 * Represents a single instance of EasyStar.
	 * A path that is in the queue to eventually be found.
	 */
	module.exports = function () {
	    this.isDoneCalculating = true;
	    this.pointsToAvoid = {};
	    this.startX;
	    this.callback;
	    this.startY;
	    this.endX;
	    this.endY;
	    this.nodeHash = {};
	    this.openList;
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	
	/**
	* A simple Node that represents a single tile on the grid.
	* @param {Object} parent The parent node.
	* @param {Number} x The x position on the grid.
	* @param {Number} y The y position on the grid.
	* @param {Number} costSoFar How far this node is in moves*cost from the start.
	* @param {Number} simpleDistanceToTarget Manhatten distance to the end point.
	**/
	module.exports = function (parent, x, y, costSoFar, simpleDistanceToTarget) {
	    this.parent = parent;
	    this.x = x;
	    this.y = y;
	    this.costSoFar = costSoFar;
	    this.simpleDistanceToTarget = simpleDistanceToTarget;
	
	    /**
	    * @return {Number} Best guess distance of a cost using this node.
	    **/
	    this.bestGuessDistance = function () {
	        return this.costSoFar + this.simpleDistanceToTarget;
	    };
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(29);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	// Generated by CoffeeScript 1.8.0
	(function () {
	  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;
	
	  floor = Math.floor, min = Math.min;
	
	  /*
	  Default comparison function to be used
	   */
	
	  defaultCmp = function defaultCmp(x, y) {
	    if (x < y) {
	      return -1;
	    }
	    if (x > y) {
	      return 1;
	    }
	    return 0;
	  };
	
	  /*
	  Insert item x in list a, and keep it sorted assuming a is sorted.
	  
	  If x is already in a, insert it to the right of the rightmost x.
	  
	  Optional args lo (default 0) and hi (default a.length) bound the slice
	  of a to be searched.
	   */
	
	  insort = function insort(a, x, lo, hi, cmp) {
	    var mid;
	    if (lo == null) {
	      lo = 0;
	    }
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    if (lo < 0) {
	      throw new Error('lo must be non-negative');
	    }
	    if (hi == null) {
	      hi = a.length;
	    }
	    while (lo < hi) {
	      mid = floor((lo + hi) / 2);
	      if (cmp(x, a[mid]) < 0) {
	        hi = mid;
	      } else {
	        lo = mid + 1;
	      }
	    }
	    return [].splice.apply(a, [lo, lo - lo].concat(x)), x;
	  };
	
	  /*
	  Push item onto heap, maintaining the heap invariant.
	   */
	
	  heappush = function heappush(array, item, cmp) {
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    array.push(item);
	    return _siftdown(array, 0, array.length - 1, cmp);
	  };
	
	  /*
	  Pop the smallest item off the heap, maintaining the heap invariant.
	   */
	
	  heappop = function heappop(array, cmp) {
	    var lastelt, returnitem;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    lastelt = array.pop();
	    if (array.length) {
	      returnitem = array[0];
	      array[0] = lastelt;
	      _siftup(array, 0, cmp);
	    } else {
	      returnitem = lastelt;
	    }
	    return returnitem;
	  };
	
	  /*
	  Pop and return the current smallest value, and add the new item.
	  
	  This is more efficient than heappop() followed by heappush(), and can be
	  more appropriate when using a fixed size heap. Note that the value
	  returned may be larger than item! That constrains reasonable use of
	  this routine unless written as part of a conditional replacement:
	      if item > array[0]
	        item = heapreplace(array, item)
	   */
	
	  heapreplace = function heapreplace(array, item, cmp) {
	    var returnitem;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    returnitem = array[0];
	    array[0] = item;
	    _siftup(array, 0, cmp);
	    return returnitem;
	  };
	
	  /*
	  Fast version of a heappush followed by a heappop.
	   */
	
	  heappushpop = function heappushpop(array, item, cmp) {
	    var _ref;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    if (array.length && cmp(array[0], item) < 0) {
	      _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
	      _siftup(array, 0, cmp);
	    }
	    return item;
	  };
	
	  /*
	  Transform list into a heap, in-place, in O(array.length) time.
	   */
	
	  heapify = function heapify(array, cmp) {
	    var i, _i, _j, _len, _ref, _ref1, _results, _results1;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    _ref1 = function () {
	      _results1 = [];
	      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--) {
	        _results1.push(_j);
	      }
	      return _results1;
	    }.apply(this).reverse();
	    _results = [];
	    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	      i = _ref1[_i];
	      _results.push(_siftup(array, i, cmp));
	    }
	    return _results;
	  };
	
	  /*
	  Update the position of the given item in the heap.
	  This function should be called every time the item is being modified.
	   */
	
	  updateItem = function updateItem(array, item, cmp) {
	    var pos;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    pos = array.indexOf(item);
	    if (pos === -1) {
	      return;
	    }
	    _siftdown(array, 0, pos, cmp);
	    return _siftup(array, pos, cmp);
	  };
	
	  /*
	  Find the n largest elements in a dataset.
	   */
	
	  nlargest = function nlargest(array, n, cmp) {
	    var elem, result, _i, _len, _ref;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    result = array.slice(0, n);
	    if (!result.length) {
	      return result;
	    }
	    heapify(result, cmp);
	    _ref = array.slice(n);
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      elem = _ref[_i];
	      heappushpop(result, elem, cmp);
	    }
	    return result.sort(cmp).reverse();
	  };
	
	  /*
	  Find the n smallest elements in a dataset.
	   */
	
	  nsmallest = function nsmallest(array, n, cmp) {
	    var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    if (n * 10 <= array.length) {
	      result = array.slice(0, n).sort(cmp);
	      if (!result.length) {
	        return result;
	      }
	      los = result[result.length - 1];
	      _ref = array.slice(n);
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        elem = _ref[_i];
	        if (cmp(elem, los) < 0) {
	          insort(result, elem, 0, null, cmp);
	          result.pop();
	          los = result[result.length - 1];
	        }
	      }
	      return result;
	    }
	    heapify(array, cmp);
	    _results = [];
	    for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
	      _results.push(heappop(array, cmp));
	    }
	    return _results;
	  };
	
	  _siftdown = function _siftdown(array, startpos, pos, cmp) {
	    var newitem, parent, parentpos;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    newitem = array[pos];
	    while (pos > startpos) {
	      parentpos = pos - 1 >> 1;
	      parent = array[parentpos];
	      if (cmp(newitem, parent) < 0) {
	        array[pos] = parent;
	        pos = parentpos;
	        continue;
	      }
	      break;
	    }
	    return array[pos] = newitem;
	  };
	
	  _siftup = function _siftup(array, pos, cmp) {
	    var childpos, endpos, newitem, rightpos, startpos;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    endpos = array.length;
	    startpos = pos;
	    newitem = array[pos];
	    childpos = 2 * pos + 1;
	    while (childpos < endpos) {
	      rightpos = childpos + 1;
	      if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
	        childpos = rightpos;
	      }
	      array[pos] = array[childpos];
	      pos = childpos;
	      childpos = 2 * pos + 1;
	    }
	    array[pos] = newitem;
	    return _siftdown(array, startpos, pos, cmp);
	  };
	
	  Heap = function () {
	    Heap.push = heappush;
	
	    Heap.pop = heappop;
	
	    Heap.replace = heapreplace;
	
	    Heap.pushpop = heappushpop;
	
	    Heap.heapify = heapify;
	
	    Heap.updateItem = updateItem;
	
	    Heap.nlargest = nlargest;
	
	    Heap.nsmallest = nsmallest;
	
	    function Heap(cmp) {
	      this.cmp = cmp != null ? cmp : defaultCmp;
	      this.nodes = [];
	    }
	
	    Heap.prototype.push = function (x) {
	      return heappush(this.nodes, x, this.cmp);
	    };
	
	    Heap.prototype.pop = function () {
	      return heappop(this.nodes, this.cmp);
	    };
	
	    Heap.prototype.peek = function () {
	      return this.nodes[0];
	    };
	
	    Heap.prototype.contains = function (x) {
	      return this.nodes.indexOf(x) !== -1;
	    };
	
	    Heap.prototype.replace = function (x) {
	      return heapreplace(this.nodes, x, this.cmp);
	    };
	
	    Heap.prototype.pushpop = function (x) {
	      return heappushpop(this.nodes, x, this.cmp);
	    };
	
	    Heap.prototype.heapify = function () {
	      return heapify(this.nodes, this.cmp);
	    };
	
	    Heap.prototype.updateItem = function (x) {
	      return updateItem(this.nodes, x, this.cmp);
	    };
	
	    Heap.prototype.clear = function () {
	      return this.nodes = [];
	    };
	
	    Heap.prototype.empty = function () {
	      return this.nodes.length === 0;
	    };
	
	    Heap.prototype.size = function () {
	      return this.nodes.length;
	    };
	
	    Heap.prototype.clone = function () {
	      var heap;
	      heap = new Heap();
	      heap.nodes = this.nodes.slice(0);
	      return heap;
	    };
	
	    Heap.prototype.toArray = function () {
	      return this.nodes.slice(0);
	    };
	
	    Heap.prototype.insert = Heap.prototype.push;
	
	    Heap.prototype.top = Heap.prototype.peek;
	
	    Heap.prototype.front = Heap.prototype.peek;
	
	    Heap.prototype.has = Heap.prototype.contains;
	
	    Heap.prototype.copy = Heap.prototype.clone;
	
	    return Heap;
	  }();
	
	  (function (root, factory) {
	    if (true) {
	      return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
	      return module.exports = factory();
	    } else {
	      return root.Heap = factory();
	    }
	  })(this, function () {
	    return Heap;
	  });
	}).call(undefined);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _CountdownTimer = __webpack_require__(31);
	
	var _CountdownTimer2 = _interopRequireDefault(_CountdownTimer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	  countdown: function create(game, timeRemaining, interval) {
	    return new _CountdownTimer2.default(game, timeRemaining, interval);
	  }
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CountdownTimer = function () {
	  function CountdownTimer(game) {
	    var timeRemaining = arguments.length <= 1 || arguments[1] === undefined ? 60 : arguments[1];
	    var interval = arguments.length <= 2 || arguments[2] === undefined ? 1000 : arguments[2];
	
	    _classCallCheck(this, CountdownTimer);
	
	    this.game = game;
	    this.timeRemaining = timeRemaining;
	    this.timer = game.time.create();
	    this.timer.loop(1000, this.tick, this);
	    this.onTick = new Phaser.Signal();
	    this.onComplete = new Phaser.Signal();
	  }
	
	  _createClass(CountdownTimer, [{
	    key: "tick",
	    value: function tick() {
	      this.time -= 1;
	      if (this.time == 0) {
	        this.onComplete.dispatch();
	        this.stop();
	      } else {
	        this.onTick.dispatch();
	      }
	    }
	  }, {
	    key: "pause",
	    value: function pause() {
	      this.timer.pause();
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      var delay = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	      this.timer.start(delay);
	    }
	  }, {
	    key: "stop",
	    value: function stop() {
	      this.timer.stop();
	    }
	  }, {
	    key: "addTime",
	    value: function addTime() {
	      var value = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	      this.time += value;
	    }
	  }, {
	    key: "time",
	    set: function set() {
	      var value = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	      this.timeRemaining = value > 0 ? value : 0;
	    },
	    get: function get() {
	      return this.timeRemaining;
	    }
	  }]);
	
	  return CountdownTimer;
	}();
	
	exports.default = CountdownTimer;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _LevelManager = __webpack_require__(33);
	
	var _LevelManager2 = _interopRequireDefault(_LevelManager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = {
	  create: function levelManager(game, humans, enemies, bricks, player) {
	    //var levelManager = new levelManager();
	    return new _LevelManager2.default(game, humans, enemies, bricks, player);
	  }
	
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _actors = __webpack_require__(4);
	
	var _actors2 = _interopRequireDefault(_actors);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LEVELS = {
	  0: __webpack_require__(34),
	  1: __webpack_require__(35)
	};
	
	var LevelManager = function () {
	  function LevelManager(game, humans, enemies, bricks, player) {
	    _classCallCheck(this, LevelManager);
	
	    this.currentLevel = 0;
	    this.humans = humans;
	    this.enemies = enemies;
	    this.game = game;
	    this.bricks = bricks;
	    this.player = player;
	  }
	
	  _createClass(LevelManager, [{
	    key: 'load',
	    value: function load(index) {
	      if (LEVELS[index]) {
	        this.humans.removeAll();
	        this.enemies.removeAll();
	        this.bricks.removeAll();
	        this.buildHumans(LEVELS[index].humans);
	        this.buildEnemies(LEVELS[index].enemies);
	        this.buildBoundryWalls();
	        this.placePlayer(LEVELS[index].player);
	        this.placeBricks(LEVELS[index].brickPositions);
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: 'next',
	    value: function next() {
	      this.currentLevel++;
	      return this.load(this.currentLevel);
	    }
	  }, {
	    key: 'hasNext',
	    value: function hasNext() {
	      return Boolean(LEVELS[this.currentLevel + 1]);
	    }
	  }, {
	    key: 'buildHumans',
	    value: function buildHumans() {
	      var _this = this;
	
	      var positions = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	      positions.forEach(function (human) {
	        _actors2.default.human(_this.game, human.x, human.y, _this.humans);
	      });
	    }
	  }, {
	    key: 'buildEnemies',
	    value: function buildEnemies() {
	      var _this2 = this;
	
	      var positions = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	      positions.forEach(function (enemy) {
	        _actors2.default.alien(_this2.game, enemy.x, enemy.y, _this2.enemies);
	      });
	    }
	    //We're passing the player's position as an object to this function.
	
	  }, {
	    key: 'placePlayer',
	    value: function placePlayer() {
	      var position = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	      this.player.sprite.x = position.x;
	      this.player.sprite.y = position.y;
	    }
	  }, {
	    key: 'placeBricks',
	    value: function placeBricks() {
	      var _this3 = this;
	
	      var positions = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	      positions.forEach(function (brick) {
	        _this3.bricks.placeBrick(brick.x, brick.y);
	      });
	    }
	  }, {
	    key: 'buildBoundryWalls',
	    value: function buildBoundryWalls() {
	      var x = 0;
	      var y = 0;
	
	      while (x < 320) {
	        this.bricks.placeBrick(x, 16);
	        this.bricks.placeBrick(x, 240);
	        x += 16;
	      }
	
	      while (y < 256) {
	        this.bricks.placeBrick(0, y);
	        this.bricks.placeBrick(304, y);
	        y += 16;
	      }
	    }
	  }]);
	
	  return LevelManager;
	}();
	
	exports.default = LevelManager;

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  humans: [{ x: 80, y: 64 }],
	  enemies: [{ x: 256, y: 192 }],
	  brickPositions: [{ x: 64, y: 192 }, { x: 64, y: 64 }, { x: 240, y: 64 }, { x: 240, y: 192 }],
	  player: { x: 160, y: 128 }
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = {
	  humans: [
	  //{ x: 80,  y: 64  },
	  { x: 160, y: 64 }, { x: 80, y: 128 }],
	  enemies: [{ x: 240, y: 192 }, { x: 80, y: 64 }],
	  player: { x: 160, y: 128 },
	  brickPositions: [{ x: 96, y: 96 }]
	};

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var game = void 0;
	var currentSong = void 0;
	var songs = {};
	
	exports.default = {
	  loadResources: function loadResources(state) {
	    game = state.game;
	    game.load.audio('menuSong', 'assets/Visager_-_26_-_We_Can_Do_It_Loop.mp3', true);
	    game.load.audio('gameOverSong', 'assets/looperman-l-1319133-0090841-fanto8bc-julian-8-bit.wav', true);
	    game.load.audio('brickImpact', 'assets/brick_impact.wav', true);
	    game.load.audio('throwBrick', 'assets/throw_brick.wav', true);
	    game.load.audio('alienAttack', 'assets/alien_attack.wav', true);
	    game.load.audio('stageComplete', 'assets/stage_complete.wav', true);
	  },
	
	  init: function init() {
	    songs.menuSong = game.add.audio('menuSong', 1, true);
	    songs.gameOverSong = game.add.audio('gameOverSong', 1, true);
	  },
	
	  playMusic: function playMusic(key, volume) {
	    var song = songs[key];
	
	    if (!song) {
	      console.log('no song ' + key);
	      return;
	    }
	
	    if (currentSong && currentSong.key === song.key) {
	      currentSong.volume = volume;
	      return;
	    }
	
	    if (currentSong) {
	      currentSong.stop();
	    }
	
	    currentSong = song;
	    currentSong.play('', 0, volume);
	  },
	
	  stopMusic: function stopMusic() {
	    if (currentSong) {
	      currentSong.stop();
	      currentSong = null;
	    }
	  },
	
	  setMusicVolume: function setMusicVolume(volume) {
	    if (currentSong) {
	      currentSong.volume = volume;
	    }
	  }
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State3 = __webpack_require__(3);
	
	var _State4 = _interopRequireDefault(_State3);
	
	var _fonts = __webpack_require__(8);
	
	var _fonts2 = _interopRequireDefault(_fonts);
	
	var _sprites = __webpack_require__(13);
	
	var _sprites2 = _interopRequireDefault(_sprites);
	
	var _sounds = __webpack_require__(36);
	
	var _sounds2 = _interopRequireDefault(_sounds);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Loading = function (_State2) {
	  _inherits(Loading, _State2);
	
	  function Loading() {
	    _classCallCheck(this, Loading);
	
	    return _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
	  }
	
	  _createClass(Loading, [{
	    key: 'init',
	    value: function init() {
	      // Pixel-perfect canvas scaling!
	      // Thanks to http://www.belenalbeza.com/retro-crisp-pixel-art-in-phaser/
	      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	      this.game.scale.pageAlignHorizontally = true;
	      this.game.scale.pageAlignVertically = true;
	
	      // Rounds x/y positions to the nearest whole to avoid sub-pixel rendering
	      this.game.renderer.renderSession.roundPixels = true;
	
	      // Sets browser-prefixed "image-rendering" CSS property on the game canvas
	      Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
	
	      // Prevent these keys from being handled by the browser
	      // when the game is in focus
	      this.game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
	    }
	  }, {
	    key: 'preload',
	    value: function preload() {
	      _fonts2.default.loadResources(this);
	      _sprites2.default.loadResources(this);
	      _sounds2.default.loadResources(this);
	      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
	    }
	  }, {
	    key: 'onLoadComplete',
	    value: function onLoadComplete() {
	      this.stateProvider.menu(this.state);
	    }
	
	    // create() is automagically triggerd after preload completes
	
	  }, {
	    key: 'create',
	    value: function create() {}
	  }]);
	
	  return Loading;
	}(_State4.default);
	
	exports.default = Loading;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State3 = __webpack_require__(3);
	
	var _State4 = _interopRequireDefault(_State3);
	
	var _fonts = __webpack_require__(8);
	
	var _fonts2 = _interopRequireDefault(_fonts);
	
	var _sounds = __webpack_require__(36);
	
	var _sounds2 = _interopRequireDefault(_sounds);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Menu = function (_State2) {
	  _inherits(Menu, _State2);
	
	  function Menu() {
	    _classCallCheck(this, Menu);
	
	    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
	  }
	
	  _createClass(Menu, [{
	    key: 'create',
	    value: function create() {
	      var _this2 = this;
	
	      this.titleText = this.createTitleText(this.world.centerX, 40);
	      this.instructionText = this.createInstructionText(this.world.centerX, 100);
	      this.actionText = this.createActionText(this.world.centerX, 140);
	      this.time.events.loop(750, function () {
	        _this2.actionText.visible = Boolean(!_this2.actionText.visible);
	      });
	
	      _sounds2.default.init();
	      _sounds2.default.playMusic('menuSong', 1);
	    }
	  }, {
	    key: 'createTitleText',
	    value: function createTitleText(x, y) {
	      return _fonts2.default.display(this.game, x, y, 'space alien attack\r\ndefender simulation', 12, 'center', this.world);
	    }
	  }, {
	    key: 'createInstructionText',
	    value: function createInstructionText(x, y) {
	      return _fonts2.default.display(this.game, x, y, 'press \'t\'for instructions', 6, 'center', this.world);
	    }
	  }, {
	    key: 'createActionText',
	    value: function createActionText(x, y) {
	      return _fonts2.default.display(this.game, x, y, 'press space\r\nto start the game', 6, 'center', this.world);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
	        this.game.sound.play('throwBrick');
	        _sounds2.default.stopMusic();
	        this.stateProvider.gameplay(this.state);
	      }
	      if (this.input.keyboard.isDown(Phaser.Keyboard.T)) {
	        this.game.sound.play('throwBrick');
	        this.stateProvider.instructions(this.state);
	      }
	    }
	  }]);
	
	  return Menu;
	}(_State4.default);
	
	exports.default = Menu;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State3 = __webpack_require__(3);
	
	var _State4 = _interopRequireDefault(_State3);
	
	var _fonts = __webpack_require__(8);
	
	var _fonts2 = _interopRequireDefault(_fonts);
	
	var _sounds = __webpack_require__(36);
	
	var _sounds2 = _interopRequireDefault(_sounds);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GameOver = function (_State2) {
	  _inherits(GameOver, _State2);
	
	  function GameOver() {
	    _classCallCheck(this, GameOver);
	
	    return _possibleConstructorReturn(this, (GameOver.__proto__ || Object.getPrototypeOf(GameOver)).apply(this, arguments));
	  }
	
	  _createClass(GameOver, [{
	    key: 'init',
	    value: function init(params) {
	      this.score = params.score;
	      this.reason = params.reason;
	    }
	  }, {
	    key: 'create',
	    value: function create() {
	      var _this2 = this;
	
	      this.titleText = this.createTitleText(this.world.centerX, 40);
	      this.scoreText = this.createScoreText(this.world.centerX, 80);
	      this.reasonText = this.createReasonText(this.world.centerX, 120);
	      this.actionText = this.createActionText(this.world.centerX, 180);
	      this.time.events.loop(400, function () {
	        _this2.actionText.visible = Boolean(!_this2.actionText.visible);
	      });
	
	      _sounds2.default.playMusic('gameOverSong', 1);
	    }
	  }, {
	    key: 'createTitleText',
	    value: function createTitleText(x, y) {
	      return _fonts2.default.display(this.game, x, y, 'Yer done!', 12, 'center', this.world);
	    }
	  }, {
	    key: 'createScoreText',
	    value: function createScoreText(x, y) {
	      return _fonts2.default.display(this.game, x, y, 'You scored ' + this.score, 12, 'center', this.world);
	    }
	  }, {
	    key: 'createReasonText',
	    value: function createReasonText(x, y) {
	      return _fonts2.default.display(this.game, x, y, this.reason, 8, 'center', this.world);
	    }
	  }, {
	    key: 'createActionText',
	    value: function createActionText(x, y) {
	      return _fonts2.default.display(this.game, x, y, 'press \'S\'\r\nto start again!', 6, 'center', this.world);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      if (this.input.keyboard.isDown(Phaser.Keyboard.S)) {
	        this.game.sound.play('throwBrick');
	        _sounds2.default.stopMusic();
	        this.stateProvider.gameplay(this.state);
	      }
	    }
	  }]);
	
	  return GameOver;
	}(_State4.default);
	
	exports.default = GameOver;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _State3 = __webpack_require__(3);
	
	var _State4 = _interopRequireDefault(_State3);
	
	var _fonts = __webpack_require__(8);
	
	var _fonts2 = _interopRequireDefault(_fonts);
	
	var _sounds = __webpack_require__(36);
	
	var _sounds2 = _interopRequireDefault(_sounds);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var maxPages = 2;
	
	var Instructions = function (_State2) {
	  _inherits(Instructions, _State2);
	
	  function Instructions() {
	    _classCallCheck(this, Instructions);
	
	    return _possibleConstructorReturn(this, (Instructions.__proto__ || Object.getPrototypeOf(Instructions)).apply(this, arguments));
	  }
	
	  _createClass(Instructions, [{
	    key: 'create',
	    value: function create() {
	      var _this2 = this;
	
	      this.pages = ['tiny space aliens are invading your home\r\nyour only recourse is to try to build walls\r\nbetween your family and the interlopers', 'use the arrow keys to move\r\n\r\nuse the spacebar to deploy walls'];
	      this.instructionText = this.createInstructionText(this.world.centerX, 80);
	      this.actionText = this.createActionText(this.world.centerX, 180);
	      this.time.events.loop(750, function () {
	        _this2.actionText.visible = Boolean(!_this2.actionText.visible);
	      });
	
	      this.game.input.keyboard.addKey(Phaser.Keyboard.T).onUp.add(function () {
	        _this2.game.sound.play('throwBrick');
	        var nextText = _this2.pages.shift();
	        if (!nextText) {
	          _this2.stateProvider.menu(_this2.state);
	        } else {
	          _this2.instructionText.text = nextText;
	        }
	      });
	    }
	  }, {
	    key: 'createInstructionText',
	    value: function createInstructionText(x, y) {
	      return _fonts2.default.display(this.game, x, y, this.pages.shift(), 8, 'center', this.world);
	    }
	  }, {
	    key: 'createActionText',
	    value: function createActionText(x, y) {
	      return _fonts2.default.display(this.game, x, y, 'press \'T\' to continue', 6, 'center', this.world);
	    }
	  }, {
	    key: 'update',
	    value: function update() {}
	  }]);
	
	  return Instructions;
	}(_State4.default);
	
	exports.default = Instructions;

/***/ }
/******/ ]);
//# sourceMappingURL=game.js.map
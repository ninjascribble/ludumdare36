import _State from './_State';
import Actors from '../actors';
import Fonts from '../fonts';
import Groups from '../groups';
import Sprites from '../sprites';
import services from '../services';
import levels from '../levels';

const WIDTH = 320;
const HEIGHT = 256;
const OFFSET_X = 0;
const OFFSET_Y = 0;

export default class Gameplay extends _State {
  create () {
    this.world.setBounds(OFFSET_X, OFFSET_Y, WIDTH, HEIGHT);

    this.background = Sprites.checkerboard(this.game, 0, 0, this.world.width, this.world.height);
    this.game.add.existing(this.background);

    this.bricks = Groups.brickCannon(this.game);
    this.game.add.existing(this.bricks);

    this.enemies = this.game.add.group();
    this.humans = this.game.add.group();

    this.levels = levels.create(this.game, this.humans, this.enemies, this.bricks);
    this.levels.load(0);

    this.hud = Groups.hud(this.game, 0, 0, WIDTH, 16, this.world);
    this.player = Actors.player(this.game, this.world.centerX, this.world.centerY, this.hud, this.bricks, this.world);

    this.timeRemaining = 20;
    this.hud.time(this.timeRemaining);
    this.timer = this.game.time.create();
    this.timer.repeat(1000, this.timeRemaining, () => {
      this.timeRemaining--;
      this.hud.time(this.timeRemaining);
    });
    this.timer.start();


    this.pathfinding = services.pathfinding();
    this.bricks.onBrickDone.add(() => {
      this.pathfinding.calculateGrid([this.bricks], { width: WIDTH, height: HEIGHT }, { width: 16, height: 16 });

      this.humans.forEachAlive((human) => {
        var promises = [];

        this.enemies.forEachAlive((enemy) => {
          promises.push(new Promise((resolve) => {
            this.pathfinding.findPath(enemy, human, resolve);
          }));
        });

        Promise.all(promises).then((results) => {
          if (results.every((result) => !result)) {
            human.actor.save();
            this.player.points += 200;
            this.player.points += this.pathfinding.countContiguousTiles(human);
          }
        });
      });
    });
  }

  endGame (reason) {
    this.stateProvider.gameover(this.state, {
      score: this.player.points,
      reason: reason
    });
  }

  nextLevel () {
    if (!this.levels.next()) {
      this.endGame('You saved the world!');
    }
  }

  onPlayerEnemiesCollide (player, enemy) {
    player.actor.kill();
  }

  onHumansEnemiesCollide (human, enemy) {
    human.actor.kill();
  }

  update () {
    this.game.physics.arcade.collide(this.bricks, this.bricks);
    this.game.physics.arcade.collide(this.enemies, this.bricks);
    this.game.physics.arcade.collide(this.enemies, this.enemies);
    this.game.physics.arcade.collide(this.player.sprite, this.bricks);
    this.game.physics.arcade.collide(this.player.sprite, this.enemies, this.onPlayerEnemiesCollide);
    this.game.physics.arcade.collide(this.player.sprite, this.humans);
    this.game.physics.arcade.collide(this.humans, this.bricks);
    this.game.physics.arcade.collide(this.humans, this.enemies, this.onHumansEnemiesCollide);
    this.game.physics.arcade.collide(this.humans, this.humans);

    let aliveHumans = this.humans.filter((human) => {
      return human.alive;
    }).list;

    let savedHumans = this.humans.filter((human) => {
      return human.saved;
    }).list;

    if (this.player.isAlive == false) {
      this.endGame(`You were killed by the aliens`);
    }

    if (aliveHumans.length <= 0) {
      if (savedHumans.length > 0) {
        this.nextLevel();
      } else {
        this.endGame(`There were no survivors`);
      }
    }

    if (this.player.bricksLeft <= 0) {
      this.endGame('You ran out of bricks');
    }

    if (this.timeRemaining <= 0) {
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

      if (gameObjs.every((obj) => rect.intersects(obj.body) == false)) {
        this.player.throwBrick();
      }
    }
  }
}

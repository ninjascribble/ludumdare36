import _State from './_State';
import Actors from '../actors';
import Fonts from '../fonts';
import Groups from '../groups';
import Sprites from '../sprites';
import services from '../services';

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
    this.human1 = Actors.human(this.game, WIDTH - 32, HEIGHT - 64, this.humans);
    this.human2 = Actors.human(this.game, WIDTH / 2, HEIGHT - 64, this.humans);
    this.human3 = Actors.human(this.game, 32, HEIGHT - 64, this.humans);



    this.enemy1 = Actors.alien(this.game, WIDTH / 2, 32, this.enemies);
    this.enemy2 = Actors.alien(this.game, 16, 32, this.enemies);
    this.enemy3 = Actors.alien(this.game, WIDTH - 32, 32, this.enemies);
    this.enemy4 = Actors.alien(this.game, WIDTH / 4, 64, this.enemies);
    this.enemy5 = Actors.alien(this.game, WIDTH * 3 / 4, 64, this.enemies);

    this.hud = Groups.hud(this.game, 0, 0, WIDTH, 16, this.world);
    this.player = Actors.player(this.game, this.world.centerX, this.world.centerY, this.hud, this.world);
    this.buildBoundryWalls();

    this.pathfinding = services.pathfinding();
    this.game.time.events.loop(2000, () => {
      this.pathfinding.calculateGrid([this.bricks, this.player.bricks], { width: WIDTH, height: HEIGHT }, { width: 16, height: 16 });
      const promises = [];

      this.enemies.forEach((enemy) => {
        promises.push(new Promise((resolve) => {
          this.pathfinding.findPath(enemy, this.player.sprite, resolve);
        }));
      });

      Promise.all(promises).then((results) => {
        let done = true;
        results.forEach((result) => {
          done = done && !result;
        });
        if (done) {
          let score = this.pathfinding.countContiguousTiles(this.player.sprite);
          this.stateProvider.gameover(this.state, { score });
        }
      });
    });
  }

  buildBoundryWalls () {
    let x = 0;
    let y = 0;

    while (x < WIDTH) {
      this.bricks.placeBrick(x, 16);
      this.bricks.placeBrick(x, HEIGHT - 16);
      x += 16;
    }

    while (y < HEIGHT) {
      this.bricks.placeBrick(0, y);
      this.bricks.placeBrick(WIDTH - 16, y);
      y += 16;
    }
  }

  update () {
    this.game.physics.arcade.collide(this.player.bricks, this.bricks);
    this.game.physics.arcade.collide(this.player.bricks, this.player.bricks);
    this.game.physics.arcade.collide(this.enemies, this.bricks);
    this.game.physics.arcade.collide(this.enemies, this.player.bricks);
    this.game.physics.arcade.collide(this.enemies, this.enemies);
    this.game.physics.arcade.collide(this.player.sprite, this.bricks);
    this.game.physics.arcade.collide(this.player.sprite, this.player.bricks);
    this.game.physics.arcade.collide(this.player.sprite, this.enemies);
    this.game.physics.arcade.collide(this.humans, this.bricks);
    this.game.physics.arcade.collide(this.humans, this.player.bricks);
    this.game.physics.arcade.collide(this.humans, this.enemies);

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
      this.player.throwBrick();
    }
  }
}

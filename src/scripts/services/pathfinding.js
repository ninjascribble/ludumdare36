import Easystar from 'easystarjs';

let easystar = new Easystar.js();

function pointToTile (point) {
  return new Phaser.Point(Phaser.Math.snapTo(point.x , 16) / 16, Phaser.Math.snapTo(point.y, 16) / 16);
}

function tileToPoint (point) {
  return new Phaser.Point(Math.floor(point.x * 16) + 8, Math.floor(point.y * 16) + 8);
}

export default {
  findPath: (sourceSprite, destinationSprite, callback) => {
    const actorTile = pointToTile(sourceSprite.body.position);
    const targetTile = pointToTile(destinationSprite.body.position);

    easystar.findPath(actorTile.x, actorTile.y, targetTile.x, targetTile.y, callback);
    easystar.calculate();
  },

  calculateGrid: (obstacleGroups, mapSize, gridSize) => {
    const walkables = [0];
    const mapData = [];
    const gridWidth = mapSize.width / gridSize.width;
    const gridHeight = mapSize.height / gridSize.height;
    console.log('calculating grid');

    for (var i = 0; i < gridHeight; i++) {
      for (var j = 0; j < gridWidth; j++) {
        if (!mapData[i]) {
          mapData[i] = [];
        }

        mapData[i][j] = 0;
      }
    }

    obstacleGroups.forEach((obstacleGroup) => {
      obstacleGroup.children.forEach((obstacle) => {
        let tile = pointToTile(obstacle.body.position);
        mapData[tile.y][tile.x] = 1;
      });
    });

    easystar.setGrid(mapData);
    easystar.setAcceptableTiles(walkables);
  },

  pointToTile: pointToTile,

  tileToPoint: tileToPoint
};

import Easystar from 'easystarjs';

let easystar = new Easystar.js();
let mapData = [];

function pointToTile (point) {
  return new Phaser.Point(Phaser.Math.snapTo(point.x , 16) / 16, Phaser.Math.snapTo(point.y, 16) / 16);
}

function tileToPoint (point) {
  return new Phaser.Point(Math.floor(point.x * 16) + 8, Math.floor(point.y * 16) + 8);
}

export default {
  countContiguousTiles: (playerSprite, gridSize) => {
    const visitedTiles = [];
    const tileQueue = [];
    let currentTile = pointToTile(playerSprite.body.position);
    let tileCount = 1;

    function queueAdjacentTiles (tile) {
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
      console.log('queue length: ' + tileQueue.length)
      if (mapData[currentTile.y][currentTile.x] === 0) {
        console.log('x: ' + currentTile.x + ', y: ' + currentTile.y)
        tileCount++;
      }

      currentTile = tileQueue.pop();
      queueAdjacentTiles(currentTile);
    }

    return tileCount;
  },

  findPath: (sourceSprite, destinationSprite, callback) => {
    const actorTile = pointToTile(sourceSprite.body.position);
    const targetTile = pointToTile(destinationSprite.body.position);

    easystar.findPath(actorTile.x, actorTile.y, targetTile.x, targetTile.y, callback);
    easystar.calculate();
  },

  calculateGrid: (obstacleGroups, mapSize, gridSize) => {
    const walkables = [0];
    const gridWidth = mapSize.width / gridSize.width;
    const gridHeight = mapSize.height / gridSize.height;

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

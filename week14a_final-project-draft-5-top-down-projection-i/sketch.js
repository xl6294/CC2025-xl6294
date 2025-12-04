let speed;
let posChar;

let vs = 0.7; //vertical scale factor
let wallHeight;

let tileSize = 50;

// for the game map, I am using 2D array / matrix
// so I could indicate the tile with
// 0 for floor and 1 for occupied by an object
// https://youtu.be/W9CcEDxdnmg?si=5FYQp9cIooIBlzey
// let floorplan = [
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0],
//   [0, 0, 0, 1, 0],
//   [0, 0, 0, 0, 0],
// ];

let floorplan = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
];

// let columns = 5; // x => columns
// let rows = 5; // y => rows

let rows = floorplan.length;
let columns = floorplan[0].length;

let mapWidth = columns * tileSize;
let mapHeight = rows * tileSize;

// creating the player profile
let player = {
  x: mapWidth / 2,
  y: mapHeight / 2,
  xd: 0, // direction indicator // from the python game workshop
  yd: 0,
  speed: 3,
  d: 30,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(100);

  // https://p5js.org/reference/p5/keyIsDown/
  // Update x and y if an arrow key is pressed.

  // reset the direction in x/y axis each frame
  player.xd = 0;
  player.yd = 0;

  if (keyIsDown(LEFT_ARROW) === true) {
    player.xd = -1;
  }

  if (keyIsDown(RIGHT_ARROW) === true) {
    player.xd = 1;
  }

  if (keyIsDown(UP_ARROW) === true) {
    player.yd = -1;
  }

  if (keyIsDown(DOWN_ARROW) === true) {
    player.yd = 1;
  }

  // predict next player movement
  let nextX = player.x + player.xd * player.speed;
  let nextY = player.y + player.yd * player.speed;

  let leftX = nextX - player.d / 2;
  let rightX = nextX + player.d / 2;
  let topY = nextY - player.d / 2;
  let bottomY = nextY + player.d / 2;

  let leftXCurrent = player.x - player.d / 2;
  let rightXCurrent = player.x + player.d / 2;
  let topYCurrent = player.y - player.d / 2;
  let bottomYCurrent = player.y + player.d / 2;

  // here is to prevent crashing when the predicted tile is out of bound
  if (
    floor(leftX / tileSize) < 0 ||
    floor(rightX / tileSize) >= columns ||
    floor(topY / tileSize) < 0 ||
    floor(bottomY / tileSize) >= rows
  ) {
    player.xd = 0;
  } else if (
    floorplan[floor(topYCurrent / tileSize)][floor(leftX / tileSize)] === 0 &&
    floorplan[floor(topYCurrent / tileSize)][floor(rightX / tileSize)] === 0 &&
    floorplan[floor(bottomYCurrent / tileSize)][floor(leftX / tileSize)] ===
      0 &&
    floorplan[floor(bottomYCurrent / tileSize)][floor(rightX / tileSize)] === 0
  ) {
    player.x = nextX;
  }

  // here is to prevent crashing when the predicted tile is out of bound
  if (
    floor(leftX / tileSize) < 0 ||
    floor(rightX / tileSize) >= columns ||
    floor(topY / tileSize) < 0 ||
    floor(bottomY / tileSize) >= rows
  ) {
    player.yd = 0;
  } else if (
    floorplan[floor(topY / tileSize)][floor(leftXCurrent / tileSize)] === 0 &&
    floorplan[floor(topY / tileSize)][floor(rightXCurrent / tileSize)] === 0 &&
    floorplan[floor(bottomY / tileSize)][floor(leftXCurrent / tileSize)] ===
      0 &&
    floorplan[floor(bottomY / tileSize)][floor(rightXCurrent / tileSize)] === 0
  ) {
    player.y = nextY;
  }

  // limit the player circle inside the range of the map
  player.x = constrain(player.x, player.d / 2, mapWidth - player.d / 2);
  player.y = constrain(player.y, player.d / 2, mapHeight - player.d / 2);

  push();

  scale(1, vs);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      // draw the tiles
      push();

      if (floorplan[i][j] === 1) {
        fill(50); // occupied
      } else {
        fill(255); // floor
      }

      stroke(0);
      rect(j * tileSize, i * tileSize, tileSize, tileSize);

      pop();
    }
  }

  // draw the player circle here
  push();
  fill("red");
  circle(player.x, player.y, player.d);
  // draw collision guiding points
  strokeWeight(3);
  stroke("red");
  point(leftX, topY);
  point(rightX, topY);
  point(leftX, bottomY);
  point(rightX, bottomY);
  pop();

  pop();

  playerPosition = createVector(player.x, player.y * vs);
  push();
  strokeWeight(3);
  stroke("green");
  point(playerPosition.x, playerPosition.y);
  pop();
}

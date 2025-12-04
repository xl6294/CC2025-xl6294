let speed;
let posChar;

let tileSize = 100;

// for the game map, I am using 2D array / matrix
// so I could indicate the tile with
// 0 for floor and 1 for occupied by an object
// https://youtu.be/W9CcEDxdnmg?si=5FYQp9cIooIBlzey
let floorplan = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1],
];

let columns = 5;
let rows = 7;

let mapWidth = columns * tileSize;
let mapHeight = rows * tileSize;

// creating the player profile
let player = {
  x: mapWidth / 2,
  y: mapHeight / 2,
  xd: 0, // direction indicator // from the python game workshop
  yd: 0,
  speed: 3,
  d: 50,
};

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(100);

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
  nextX = player.x + player.xd * player.speed;
  nextY = player.y + player.yd * player.speed;

  // will slow down diagnal movement

  // checking collision here

  if (
    floorplan[floor((nextY - player.d / 2) / tileSize)][
      floor((nextX - player.d / 2) / tileSize)
    ] === 1 ||
    floorplan[floor((nextY - player.d / 2) / tileSize)][
      floor((nextX + player.d / 2) / tileSize)
    ] === 1 ||
    floorplan[floor((nextY + player.d / 2) / tileSize)][
      floor((nextX - player.d / 2) / tileSize)
    ] === 1 ||
    floorplan[floor((nextY + player.d / 2) / tileSize)][
      floor((nextX + player.d / 2) / tileSize)
    ] === 1
  ) {
    player.xd = 0;
    player.yd = 0;
  }

  player.x += player.xd * player.speed;
  player.y += player.yd * player.speed;

  // limit the player circle inside the range of the map
  player.x = constrain(player.x, player.d / 2, mapWidth - player.d / 2);
  player.y = constrain(player.y, player.d / 2, mapHeight - player.d / 2);

  // draw the player circle here
  push();
  fill("red");
  circle(player.x, player.y, player.d);
  pop();

  // playerPosition = createVector(player.x, player.y);
}

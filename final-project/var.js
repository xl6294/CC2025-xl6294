let speed;
let posChar;

let vs = 0.8; //vertical scale factor
let wallHeight;

let tileSize = 50;

// for the game map, I am using 2D array / matrix
// so I could indicate the tile with
// 0 for floor and 1 for occupied by an object
// https://youtu.be/W9CcEDxdnmg?si=5FYQp9cIooIBlzey

let floorplan = [
  [1, 0, 1, 1, 1, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// let columns = 5; // x => columns
// let rows = 5; // y => rows

let rows = floorplan.length; // dependent variables
let columns = floorplan[0].length; // dependent variables

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

let leftX, rightX, topY, bottomY; // test helper function

let wH = 100; // wall height

let speed;
let posChar;

let vs = 0.8; //vertical scale factor
let wallHeight;

let tileSize = 50;

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

let leftX, rightX, topY, bottomY; // test helper function

let wH = 100; // wall height

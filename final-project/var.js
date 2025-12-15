// This file holds most of my globals

// below is the vertical scale factor for drawing the grid + items
let vs = 0.8;

let tileSize = 50;

// below will load and hold the json file
let gameObjects;

let bgmSong;

// Load the JSON and create an object
// https://p5js.org/reference/p5/loadJSON/
function preload() {
  gameObjects = loadJSON("objects.json");
  bgmSong = loadSound("bgmSong.mp3");
}

// for the game map, I am using 2D array / matrix
// so I could indicate the tile with
// 0 for floor and 1 for occupied by an object
// https://youtu.be/W9CcEDxdnmg?si=5FYQp9cIooIBlzey
let floorplan = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

// Get dimensions from the floorplan array.
// rows = number of arrays => Y direction
// columns = length of each row => X direction
// ^^^ I got confused about which ties to which all the time :(
let rows = floorplan.length; // dependent variables
let columns = floorplan[0].length; // dependent variables

// Pixel dimensions of the map
// before any drawing transforms like translate, scale, etc.
let mapWidth = columns * tileSize;
let mapHeight = rows * tileSize;

// creating the player profile
let player = {
  x: mapWidth / 2,
  y: mapHeight / 2,
  xd: 0, // direction indicator // from the python game workshop
  yd: 0,
  speed: 3,
  d: 30, // diameter
};

// below are to pair and form the coords for the collision probe points in helper function (the-helper.js)
let leftX, rightX, topY, bottomY;

let wH = 2 * tileSize; // wall height

// below vars are for displaying the info/detail panel
let itemActivated = false;
let selectedExhibit;

// for HTML overlaying elements
let overlay;
let frame;

// sort the Item class objects for rendering
let items = [];

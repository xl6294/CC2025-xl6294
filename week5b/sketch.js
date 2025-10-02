let circleD = 25;

let circleX;
let thetaX = 0;
let radiusX = 100;

let circleY;
let thetaY = 0;
let radiusY = 100;

function setup() {
  // runs once at the start
  createCanvas(windowWidth, windowHeight);
  circleX = width / 2;
  circleY = height / 2;
}

function draw() {
  // runs in a loop after setup
  background(0);

  circleX = cos(radians(thetaX)) * radiusX;
  thetaX++; // ++ adds one to existing var

  translate(width / 2, height / 2);
  circle(circleX, 0, 25);
}

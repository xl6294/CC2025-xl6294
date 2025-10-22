let noisePosition = 0;
let noiseSpeed = 0.01;
let startingPoint = 0;
let noiseTheta = 0;
let noiseRadius = 0;

function setup() {
  // runs once at the start
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("lightgreen");
  translate(width / 2, height / 2);

  strokeWeight(5);
  point(0, 0);

  noiseTheta = map(noise(noisePosition), 0, 1, 0, 2 * PI);
  noiseRadius = map(noise(noisePosition), 0, 1, 0, width / 2);

  let x = cos(noiseTheta) * noiseRadius;
  let y = sin(noiseTheta) * noiseRadius;

  circle(x, y, 10);

  noisePosition += noiseSpeed;
}

function mousePressed() {}

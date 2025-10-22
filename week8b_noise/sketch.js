let noisePosition = 0;
let noiseSpeed = 0.01;
let startingPoint = 0;
let noiseTheta = 0;
let noiseRadius = 0;
let noisePositionAngle = 1000; // set different starting point

function setup() {
  // runs once at the start
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
}

function draw() {
  // background("lightgreen");
  translate(width / 2, height / 2);

  strokeWeight(5);
  point(0, 0);

  noiseTheta = map(noise(noisePositionAngle), 0, 1, -180, 180);
  noiseRadius = map(noise(noisePosition), 0, 1, 0, width / 2);

  let x = cos(noiseTheta) * noiseRadius;
  let y = sin(noiseTheta) * noiseRadius;

  point(0, 0);
  stroke((360 + noiseTheta) % 360, 100, noiseRadius);
  line(0, 0, x, y);

  circle(x, y, 10);

  noisePosition += noiseSpeed;
  noisePositionAngle += noiseSpeed;
}

function mousePressed() {}

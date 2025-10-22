let noisePosition = 0;
let noiseSpeed = 0.01;

function setup() {
  // runs once at the start
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // runs in a loop after setup
  background("beige");
  translate(width / 2, height / 2);
  circleD = noise(noisePosition) * width;
  circle(0, 0, circleD);
  noisePosition = noisePosition + noiseSpeed;
}

function mousePressed() {
  // noisePosition = noisePosition + 0.1;
}

let noisePosition = 0;
let noiseSpeed = 0.01;
let startingPoint = 0;

function setup() {
  // runs once at the start
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // runs in a loop after setup
  background("beige");
  // translate(width / 2, height / 2);
  // circleD = noise(noisePosition) * width;
  // circle(0, 0, circleD);
  // noisePosition = noisePosition + noiseSpeed;

  noisePosition = startingPoint;
  for (let i = 0; i < width; i = i + 0.01) {
    let y = noise(noisePosition) * height;
    noisePosition = noisePosition + noiseSpeed;
    circle(i, y, 5);
  }
  startingPoint = startingPoint + noiseSpeed;
}

function mousePressed() {
  // noisePosition = noisePosition + 0.1;
}

let buttonX = 100;
let buttonY = 100;
let buttonD = 80;
let hovering = false;
// boolean variable that tracks whether mouse is
// hovering over button

let r = 0; // variable to hold red amount
let g = 0; // variable to hold green amount
let b = 0; // variable to hold blue amount

let ballX = 15;
let ballSpeed = 0.5;
let ballD = 30;

function setup() {
  // runs once at the start
  createCanvas(windowWidth, windowHeight);
  background(0);
  ballX = ballD / 2;

  // noLoop();
}

function draw() {
  // runs in a loop after setup

  background(r, g, b); // use r g and b variables for background color
  strokeWeight(1); // reset stroke weight to 1

  fill(0, 255, 0); // green fill
  text("x: " + mouseX + ", y: " + mouseY, 15, 15);

  let distance = dist(mouseX, mouseY, buttonX, buttonY);

  text("dist: " + distance, 15, 30);

  stroke(255); // white stroke
  noFill(); // reset fill to none

  if (distance < buttonD / 2) {
    // IS the distance between the mouse and the
    // center of the button LESS THAN the radius?
    fill(50);
    hovering = true;
    if (mouseIsPressed) {
      strokeWeight(3);
    }
    ballX = ballX + ballSpeed;
  } else {
    hovering = false;
  }

  circle(buttonX, buttonY, buttonD);

  fill("red");
  noStroke();

  if (ballX > width - ballD / 2 || ballX < ballD / 2) {
    ballSpeed = -ballSpeed;
  }

  circle(ballX, 200, 30); // circle uses balX for x pos
}

function mousePressed() {
  // the mousePressed function runs enclosed code
  // ONCE when the mouse is pressed down
  if (hovering == true) {
    r = random(255);
    g = random(255);
    b = random(255);
    ballSpeed = -ballSpeed;
  }
}

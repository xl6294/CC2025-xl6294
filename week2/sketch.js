

function setup() { // runs once at the start
  createCanvas(windowWidth, windowHeight); 
  // createCanvas() is a function that creates a canvas for our p5.js sketch …

}

function draw() { // runs in a loop after setup
  circle(50, 50, 500);
  circle(50, 50, 50);
  circle(500, 50, 50);
  circle(50, 500, 50);
}
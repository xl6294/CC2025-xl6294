let aUnit;
let xUnit;
let yUnit;

function setup() { // runs once at the start
  createCanvas(windowWidth, windowHeight); // createCanvas() is a function that creates a canvas for our p5.js sketch …
  background('white');
  print(width, height);
  stroke('cyan');
  strokeWeight(3); 
  noStroke(); // Disable to see composition
  rectMode(CORNERS);
}

function draw() { // runs in a loop after setup
  let aUnit = windowHeight / 150;
  let xUnit = 0;
  let xShift = xUnit * aUnit;
  let yUnit = -30;
  let yShift = yUnit * aUnit;
  fill('black');
  
  //Draw body triangle
  triangle(80 * aUnit + xShift, 40 * aUnit + yShift, 80 * aUnit + xShift, 120 * aUnit + yShift, 0 * aUnit + xShift, 120 * aUnit + yShift); // triangle(x1, y1, x2, y2, x3, y3)
  
  // Subtractions from the body
  fill('white');
  triangle(10 * aUnit + xShift, 110 * aUnit + yShift, 10 * aUnit + xShift, 120 * aUnit + yShift, 0 * aUnit + xShift, 120 * aUnit + yShift); // triangle(x1, y1, x2, y2, x3, y3)
  triangle(10 * aUnit + xShift, 120 * aUnit + yShift, 26 * aUnit + xShift, 104 * aUnit + yShift, 26 * aUnit + xShift, 120 * aUnit + yShift); // triangle(x1, y1, x2, y2, x3, y3)
  triangle(26 * aUnit + xShift, 120 * aUnit + yShift, 48 * aUnit + xShift, 98 * aUnit + yShift, 70 * aUnit + xShift, 120 * aUnit + yShift); // triangle(x1, y1, x2, y2, x3, y3)  
  beginShape();
  vertex(80 * aUnit + xShift, 80 * aUnit + yShift);
  vertex(60 * aUnit + xShift, 86 * aUnit + yShift);
  vertex(60 * aUnit + xShift, 108 * aUnit + yShift);
  vertex(80 * aUnit + xShift, 128 * aUnit + yShift);
  endShape(CLOSE);
  
  fill('black');
  
  // Draw head circle
  circle(80 * aUnit + xShift, 50 * aUnit + yShift, 20 * aUnit); // circle(x, y, d)
  
  // Draw chest arc pie
  arc(60 * aUnit + xShift, 70 * aUnit + yShift, 60 * aUnit, 60 * aUnit, 0, PI / 2, PIE); // arc(x, y, w, h, start, stop, [mode], [detail])
  
  // Draw neck rectangle
  rect(80 * aUnit + xShift, 50 * aUnit + yShift, 90 * aUnit + xShift, 70 * aUnit + yShift); // rect(x1, y1, x2, y2)
  
  // Draw beak triangle
  triangle(60 * aUnit + xShift, 40 * aUnit + yShift, 80 * aUnit + xShift, 40 * aUnit + yShift, 70 * aUnit + xShift, 50 * aUnit + yShift); // triangle(x1, y1, x2, y2, x3, y3)
  
  // Draw claw rectangle
  rect(60 * aUnit + xShift, 118 * aUnit + yShift, 80 * aUnit + xShift, 120 * aUnit + yShift); // rect(x1, y1, x2, y2)
  
  // Subtract eye circle
  fill('white');
  circle(80 * aUnit + xShift, 46 * aUnit + yShift, 4 * aUnit); // circle(x, y, d)

}
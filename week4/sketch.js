

function setup() { // runs once at the start
  createCanvas(windowWidth, windowHeight);
  
}

function draw() { // runs in a loop after setup
  // Any translations are reset
  // at the beginning of draw
  background('#caf6aaff');
  circle(100, 100, 100);
  circle(85, 90, 5);
  circle(115, 90, 5);
  arc(100, 100, 60, 60, 0, PI)

  // push and pop ISOLATE a transformation
  // anything enclosed within push and pop only applies
  // within that enclosure
  push();

  // transformation system
  // translate is a transformation function
  // it moves the coords matrix according to
  // a new set of coords, which become
  // the  "new" 0,0
  translate(200, 100);

  circle(100, 100, 100);
  circle(85, 90, 5);
  circle(115, 90, 5);
  arc(100, 100, 60, 60, 0, PI)

  pop(); // pop indicates the end of an isolated block

  // text function: text, x, y of top left corner
  text(mouseX + ", " + mouseY, 5, 15)
  // Anything drawn last will show on top

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = min(width, height) / 100;
  scale(s);

  strokeWeight(1 / s); //

  noFill();
  // fill('rgba(255,0,0,1)')

  rectMode(CORNERS); // Change the rect() mode to rect(x1, y1, x2, y2)

  push();
  translate(50, 50);

  // will render the shade of illustration according to hour() function
  push();
  fill("rgba(77,51,51,0.3)");
  arc(0, 0, 100, 100, PI, 0); // Largest circle
  pop();

  rotate((2 * PI) / month());

  circle(0, 0, 100); // Largest circle

  for (i = 0; i < 4; i++) {
    push();
    // translate(50, 30);
    rotate((i * 2 * PI) / 4);

    arc(0, 0, 100, 20, -PI / 2, PI / 2, PIE); // arc(x, y, w, h, start, stop, [mode], [detail])

    pop();
  }

  pop();
}

function draw() {
  // background("rgb(165,165,165)");

  scale(s);

  circle(50, 30, 40); // circular window hole

  ellipse(50, 55, 60, 78); // guiding line for the movement of sun/moon

  rect(28, 8, 72, 52); // Where the final canvas will crop

  // drawing the decorations (half circles) around the window frame
  // number of half circles depend on hour();
  for (i = 0; i < hour(); i++) {
    push();
    translate(50, 30); // center of the month deco
    scale(0.35); // size of the month deco
    rotate((i * 2 * PI) / hour());

    arc(50, 30, 15, 15, -PI / 2, PI / 2, PIE); // draw each half circle

    pop();
  }

  let t = map(second() + 1, 1, 60, PI / 30, 2 * PI);
  // t= map(millis() + 1, 1, 60, PI / 30, 2 * PI);

  // let r = map(t, PI / 30, 2 * PI, 4 * PI / 3, 5 * PI / 3);
  let r = map(second(), 0, 59, (5.25 * PI) / 3, (6.75 * PI) / 3);

  circle(50 + 30 * sin(r), abs(-55 + 40 * cos(r)), 3);

  circle(50 + 20 * sin(t), abs(-30 + 20 * cos(t)), 3);
}

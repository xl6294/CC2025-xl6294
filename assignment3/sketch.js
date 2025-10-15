let s;
let lerpMrAmount = 0;
let speed = 0.01;
let targetMr = 0;
// AstralBody
let ms;

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = min(width, height) / 100;
  scale(s);

  strokeWeight(1 / s); //

  noFill();
  // fill('rgba(255,0,0,1)')

  rectMode(CORNERS); // Change the rect() mode to rect(x1, y1, x2, y2)

  let now = new Date();
  ms = now.getMilliseconds();
}

function draw() {
  background("rgb(255,255,255)");

  scale(s);

  // Zoom
  scale(1 / 0.44);
  translate(-28, -8);

  push();
  translate(50, 50);

  // will render the shade of illustration according to hour() function
  // push();
  // fill("rgba(77,51,51,0.3)");
  // arc(0, 0, 100, 100, PI, 0); // Largest circle
  // pop();

  // rotate the month text circle
  // Negative angles rotate counterclockwise
  targetMr = -((month() - 1) * 2 * PI) / 12;
  lerpMrAmount = lerpMrAmount + speed;
  lerpMrAmount = constrain(lerpMrAmount, 0, 1);
  rotate(lerp(0, targetMr, lerpMrAmount));

  circle(0, 0, 100); // Largest circle

  for (i = 0; i < 12; i++) {
    push();
    // translate(50, 30);
    rotate((i * 2 * PI) / 12);

    if (i + 1 === month()) {
      // When true.
      fill("red");
    } else {
      // When false.
      fill("rgb(63,63,63)");
    }

    textFont("Courier New");
    textSize(3);
    textAlign(CENTER);
    text(monthText(i), 0, -15);

    pop();
  }

  pop();

  push();
  strokeWeight(5);
  stroke("white");
  arc(50, 50, 32, 32, (-4.5 * PI) / 12, (-7.5 * PI) / 12);
  pop();

  circle(50, 30, 40); // circular window hole

  // ellipse(50, 55, 60, 78); // guiding line for the movement of sun/moon

  // rect(28, 8, 72, 52); // Where the final canvas will crop

  let t = map(second() + 1, 1, 60, PI / 30, 2 * PI);

  lerpSec = second() + (((millis() + ms - 1) / 1000) % 1);

  let r2 = map(abs(lerpSec - 30), 0, 30, (5.25 * PI) / 3, (6.75 * PI) / 3);

  // draw the circle that stands for sun or moon (red or blue)
  // will travel along the path twice per minute
  // first in red as the sun, then in blue as the moon
  // so it's day and night
  push();

  noStroke();

  if (second() < 30) {
    fill("red");
    r2 = 2 * PI - r2;
  } else {
    fill("blue");
  }

  circle(50 + 30 * sin(r2), abs(-55 + 36 * cos(r2)), 6);

  pop();

  rect(28, 8, 72, 52); // Where the final canvas will crop

  // Drawing the frame here

  push();
  translate(50, 8);
  scale(0.22);
  drawCornerFrame();
  pop();

  push();
  translate(72, 30);
  rotate(PI / 2);
  scale(0.22);
  drawCornerFrame();
  pop();

  push();
  translate(50, 52);
  rotate(PI);
  scale(0.22);
  drawCornerFrame();
  pop();

  push();
  translate(28, 30);
  rotate((3 * PI) / 2);
  scale(0.22);
  drawCornerFrame();
  pop();

  // drawing the decorations (half circles) around the window frame
  // number of half circles depend on hour();
  for (i = 0; i < hour(); i++) {
    push();

    fill("beige");
    noStroke();
    translate(50, 30); // center of the month deco
    scale(0.35); // size of the month deco
    rotate((i * 2 * PI) / hour());

    arc(60, 0, 20, 20, PI / 2, -PI / 2, PIE); // draw each half circle

    pop();
  }

  // draw the circle that travels around the frame
  // to symbolize the progression of a day
  push();
  fill("teal");
  circle(50 + 20 * sin(t), abs(-30 + 20 * cos(t)), 3);

  pop();
}

function monthText(m) {
  // Create an array of month abbreviations
  // https://web.library.yale.edu/cataloging/months
  let monthAbbrs = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUNE",
    "JULY",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  return monthAbbrs[m];
}

function drawCornerFrame() {
  fill("rgba(0, 0, 0, 0)");
  stroke("rgba(0,0,0,0)");
  strokeCap(PROJECT);
  strokeJoin(MITER);
  fill("beige");
  beginShape();
  vertex(100, 100);
  vertex(90, 100);
  bezierVertex(90, 50.2944, 49.7056, 10, 0, 10);
  vertex(0, 0);
  vertex(100, 0);
  vertex(100, 100);
  endShape();
}

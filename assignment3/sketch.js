let s; // basic scale unit
let lerpMrAmount = 0; // lerp() increment to spin the month ring/dial
let speed = 0.01; // control how fast the month ring spins
let targetMr = 0; // the rotation angle at which the ring will show the correct month name
// AstralBody
let ms; // globally set this offset variable that will sync millis() and second()

function setup() {
  createCanvas(windowWidth, windowHeight);

  s = min(width, height) / 100;
  scale(s);

  strokeWeight(1 / s); // default stroke weight to 1 px

  noFill(); // default no fill color, I will assign fill colors with `push()` and `pop()` for this assignment

  rectMode(CORNERS); // I prefer using rect(x1, y1, x2, y2)

  // I want to "lerp" the `second()` for smooth astral body movement (the sun & the moon) without actually using the `lerp()` on the coords
  // since the bodies move along an ellipse, `lerp()` won't perform smoothly
  // A friend point me to `Date()` & `getMilliseconds()` from javascript
  // Link: https://www.w3schools.com/jsref/jsref_getmilliseconds.asp
  // Since I still want to use `millis()` instead of rely on the external `getMilliseconds()` function too much
  // Therefore, I am only calling the real-time Milliseconds once here
  // (hence variable `ms` is set globally)
  // And assign the real-time Milliseconds to `ms` as an offset variable
  // that ideally will sync `millis()` and `second()` so they refresh at the same time
  let d = new Date();
  ms = d.getMilliseconds();
}

function draw() {
  background("skyblue");

  scale(s);

  // Zoom, disable the block below to see the entire planning
  // scale(1 / 0.44);
  // translate(-28, -8);

  // the pp block [`push()` … `pop()`] below draws the month ring/dial
  push();
  translate(50, 50);
  // the inner pp block below render the shading of the canopy according to `hour()`
  push();
  if (second() < 30) {
    // for the 1st half the the minute, during the "day"
    noFill();
  } else {
    // during the "night"
    fill("rgba(0,50,80,0.62)");
  }
  arc(0, 0, 100, 100, PI, 0);
  pop();

  // pp block below draws the bottom layer of the month ring beneath the month abbrs
  push();
  strokeWeight(5);
  stroke("white");
  arc(0, 0, 32, 32, (7.5 * PI) / 12, (4.5 * PI) / 12);
  pop();

  // spin the month ring with lerp
  // base on https://openprocessing.org/sketch/2055334
  // page 11, Simple Linear Interpolation
  // so it happen once at the very beginning
  targetMr = -((month() - 1) * 2 * PI) / 12; // negative angles rotate counterclockwise
  lerpMrAmount = lerpMrAmount + speed;
  lerpMrAmount = constrain(lerpMrAmount, 0, 1);
  rotate(lerp(0, targetMr, lerpMrAmount));

  for (i = 0; i < 12; i++) {
    push();
    // translate(50, 30);
    rotate((i * 2 * PI) / 12);

    fill("sienna");

    textFont("Courier New");
    textSize(3);
    textAlign(CENTER);
    text(monthText(i), 0, -15);

    pop();
  }

  pop();

  // below draws the top layer of the month ring that hides the irrelevant month abbrs
  push();
  strokeWeight(5);
  stroke("white");
  arc(50, 50, 32, 32, (-4.5 * PI) / 12, (-7.5 * PI) / 12);
  pop();

  // followings are guides commented out
  // circle(50, 30, 40); // circular window hole guide
  // ellipse(50, 55, 60, 78); // guiding line for the movement of sun/moon
  // rect(28, 8, 72, 52); // bounding box, where the final canvas will crop
  // circle(0, 0, 100); // Largest circle guide

  lerpSec = second() + (((millis() + ms - 1) / 1000) % 1);

  let r2 = map(abs(lerpSec - 30), 0, 30, (5.25 * PI) / 3, (6.75 * PI) / 3);

  // following pp block:
  // draw the circle that stands for sun or moon (red or blue)
  // will travel along the path twice per minute
  // first in red as the sun, then in blue as the moon
  // so it's day and night
  push();
  noStroke();
  if (second() < 30) {
    // for the 1st half the the minute
    fill("orangered"); // the astral circle represents the sun
    r2 = 2 * PI - r2; // this flips the astral movement direction so both sun and moon enter from the left
  } else {
    // for the 2nd half the the minute
    fill("mintcream"); // the astral circle represents the moon
  }
  circle(50 + 30 * sin(r2), abs(-55 + 36 * cos(r2)), 6); // this trace is calculated by getting the parametric coords of the circle function expression and center coords provided from drafting with GeoGebra
  pop();

  // the following four pp blocks draw the foour cornershapes to assemble the frame by calling the `drawCornerFrame()` function
  // 1st, top-right
  push();
  translate(50, 8);
  scale(0.22);
  drawCornerFrame();
  pop();
  // 2nd, bottom-right
  push();
  translate(72, 30);
  rotate(PI / 2);
  scale(0.22);
  drawCornerFrame();
  pop();
  // 3rd, bottom-left
  push();
  translate(50, 52);
  rotate(PI);
  scale(0.22);
  drawCornerFrame();
  pop();
  // 4th, top-left
  push();
  translate(28, 30);
  rotate((3 * PI) / 2);
  scale(0.22);
  drawCornerFrame();
  pop();

  // following two pp block draw coverages beyond the frame drawn above to hide layers beneath
  push();
  fill("beige");
  noStroke();
  beginShape();
  vertex(0, 0);
  vertex(100, 0);
  vertex(100, 52);
  vertex(72, 52);
  vertex(72, 8);
  vertex(28, 8);
  vertex(28, 52);
  vertex(0, 52);
  endShape(CLOSE);
  pop();
  // the 2nd coverage is the 1st one being rotated 180 degrees and extended further below
  push();
  fill("beige");
  noStroke();
  translate(100, 60);
  rotate(PI);
  beginShape();
  vertex(0, -30);
  vertex(100, -30);
  vertex(100, 52);
  vertex(72, 52);
  vertex(72, 8);
  vertex(28, 8);
  vertex(28, 52);
  vertex(0, 52);
  endShape(CLOSE);
  pop();

  // drawing the bumps (half circles) around the window frame to mimic cloud
  // number of half circles depend on hour();
  for (i = 0; i < hour(); i++) {
    push();
    fill("beige");
    noStroke();
    translate(50, 30); // center of the month deco
    scale(0.35); // size of the month deco
    rotate((i * 2 * PI) / hour());
    arc(60, 0, 20, 20, PI / 2, -PI / 2, PIE);
    pop();
  }

  // draw the circle that travels around the frame
  // to symbolize the progression of a day
  // perserving the "discrete" motion so that people could associate the length of a real-life second to the length of a represented day in this composition
  let t = map(second() + 1, 1, 60, PI / 30, 2 * PI);
  push();
  fill("teal");
  stroke("beige");
  circle(50 + 20 * sin(t), abs(-30 + 20 * cos(t)), 5); // this trace is calculated by getting the parametric coords of the circle function expression and center coords provided from drafting with GeoGebra
  pop();
}

// I want the month ring printed with abbreviations of the months
// Using array so I could print all months abbrs on the ring with one `for loop`
// `m` should equal to the `i` operator starting from '0'
// https://web.library.yale.edu/cataloging/months
function monthText(m) {
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

// Since there is no direct pathfinder (subtracting shapes) in p5.JS
// I use the SVG to p5.js code converter, https://svg2p5.com/
// Also dividing the frame into four courner shapes since the converter could not apply to shape paths where the subtracting shapes are fully enclosed
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

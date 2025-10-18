let s; // basic scale unit
let lerpMrAmount = 0; // lerp() increment to spin the month ring/dial
let speed = 0.01; // control how fast the month ring spins
let targetMr = 0; // the rotation angle at which the ring will show the correct month name
let ms; // globally set this offset variable that will sync millis() and second()

function setup() {
  createCanvas(windowWidth, windowHeight);

  s = min(width, height) / 100;

  scale(s);

  strokeWeight(1 / s); // default stroke weight to 1 px

  noFill(); // default no fill color, I will assign fill colors within `push()` and `pop()` for this assignment

  rectMode(CORNERS); // I prefer using rect(x1, y1, x2, y2)

  // I want to "lerp" the `second()` for smooth celestial body movement (the sun & the moon)
  // without actually using the `lerp()` on the coords
  // since the bodies move along an ellipse, `lerp()` in coords won't perform smoothly
  // A friend pointed me to `Date()` & `getMilliseconds()` from JavaScript
  // Link: https://www.w3schools.com/jsref/jsref_getmilliseconds.asp
  // Since I still want to use `millis()` instead of relying heavily on the external `getMilliseconds()` function
  // Therefore, I am only calling the real-time Milliseconds once here
  // (hence variable `ms` is set globally)
  // And assign the real-time Milliseconds to `ms` as an offset variable
  // that ideally will sync `millis()` and `second()` so they refresh at the same time
  let d = new Date();
  ms = d.getMilliseconds();
}

function draw() {
  background("skyblue");

  // using `millis()` and `ms` (offset variable) to smooth `second()`
  // lerpSec, from 0 to 59.999, increment almost continuously by 0.001
  let lerpSec = second() + (((millis() + ms) / 1000) % 1);

  scale(s);

  // Zoom, disable the block below to see the entire planning
  scale(1 / 0.44);
  translate(-28, -8);

  // the pp block [`push()` … `pop()`] below draws the month ring/dial
  // also draws the traveling rabbits along the ring as the bridge
  push();
  translate(50, 50);
  // the inner pp block below render the shading of the sky according to `hour()`
  push();

  // following block of code used to change sky color discretely
  // if (second() < 30) {
  //   // for the 1st half the the minute, during the "day"
  //   noFill();
  // } else {
  //   // during the "night"
  //   fill("rgba(0,50,80,0.6)");
  // }

  // here I try to achieve a gradual change of sky color happening only around sunrise and sunset
  // by changing the capacity of the half circle of the night shade/deepblue
  // at first I considered the `lerp()` function, but later I realized that
  // there is a simpler way by using `sin()`, `constrain()`, and `map()` functions (all introduced in class)
  let a = // [0,1], increment = 0.01
    floor(
      map(constrain(1 - sin((lerpSec * PI) / 30), 0.5, 1.5), 0.5, 1.5, 0, 100)
    ) / 100;
  fill("rgba(0,60,100," + a + ")");
  // fill("rgb(0,60,100)"); // for color testing

  arc(0, 0, 100, 100, PI, 0); // draws the half circle of the night shade/deepblue
  pop();

  // below draws the travelling rabbits along the ring
  // number of rabbits depends on `month()`
  for (i = 0; i < day(); i++) {
    push();
    translate(
      // the below trace is calculated
      // by getting the parametric coords of the circle function expression
      // and center coords provided from drafting with GeoGebra
      20 * cos((i * 2 * PI) / day() - (lerpSec * PI) / 30),
      -20 * sin((i * 2 * PI) / day() - (lerpSec * PI) / 30)
    );
    // following keeps the bottom of rabbits attached to the bridge
    rotate(PI / 2 + (lerpSec * PI) / 30 - (i * 2 * PI) / day());
    scale(0.05);
    if (i === 0) {
      drawRabbit("gold"); // this rabbit will always come out at night
    } else {
      drawRabbit("skyblue"); // so rabbits are only visible at night
    }
    pop();
  }

  // pp block below draws the bottom layer of the month ring beneath the month abbrs
  push();
  strokeWeight(5);
  stroke("sienna");
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

  // print the month abbr texts to the ring
  for (i = 0; i < 12; i++) {
    push();
    rotate((i * 2 * PI) / 12);
    fill("white");
    // Reference link for the following text formatting:
    // https://p5js.org/reference/p5/text/
    textFont("Courier New");
    textSize(3);
    textAlign(CENTER);
    textStyle(BOLD);
    text(monthText(i), 0, -15); // calling the `monthText()` function to turn `month()` into month abbrs
    pop();
  }

  pop();

  // below draws the top layer of the month ring that hides the irrelevant month abbrs
  push();
  strokeWeight(5);
  stroke("sienna");
  arc(50, 50, 32, 32, (-4.5 * PI) / 12, (-7.5 * PI) / 12);
  pop();

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
    fill("orangered"); // the celestial circle represents the sun
    r2 = 2 * PI - r2; // this flips the celestial movement direction so both sun and moon enter from the left
  } else {
    // for the 2nd half the the minute
    fill("mintcream"); // the celestial circle represents the moon
  }
  circle(50 + 30 * sin(r2), abs(-55 + 36 * cos(r2)), 6); // this trace is calculated by getting the parametric coords of the circle function expression and center coords provided from drafting with GeoGebra
  pop();

  // the following four pp blocks draw the four cornershapes to assemble the frame by calling the `drawCornerFrame()` function
  // 1st, top-right
  push();
  translate(50, 8);
  scale(0.22);
  drawCornerFrame("beige");
  pop();
  // 2nd, bottom-right
  push();
  translate(72, 30);
  rotate(PI / 2);
  scale(0.22);
  drawCornerFrame("beige");
  pop();
  // 3rd, bottom-left
  push();
  translate(50, 52);
  rotate(PI);
  scale(0.22);
  drawCornerFrame("beige");
  pop();
  // 4th, top-left
  push();
  translate(28, 30);
  rotate((3 * PI) / 2);
  scale(0.22);
  drawCornerFrame("beige");
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

  // --- following section is no longer necessary ---
  // draw the circle that travels around the frame
  // to symbolize the progression of a day
  // perserving the "discrete" motion so that people could associate the length of a real-life second to the length of a represented day in this composition
  // let t = map(second() + 1, 1, 60, PI / 30, 2 * PI);
  // push();
  // fill("teal");
  // stroke("beige");
  // circle(50 + 20 * sin(t), abs(-30 + 20 * cos(t)), 5); // this trace is calculated by getting the parametric coords of the circle function expression and center coords provided from drafting with GeoGebra
  // pop();

  // followings are guides commented out
  // circle(50, 30, 40); // circular window hole guide
  // ellipse(50, 55, 60, 78); // guiding line for the movement of sun/moon
  // rect(28, 8, 72, 52); // bounding box, where the final canvas will crop
  // circle(50, 50, 100); // Largest circle guide
  // circle(50, 50, 32); // Month ring/dial guide

  // following printed text were used to figure out the night sky shading capacity change (the "a" in "rgba") between 0–1 only when around sunrise and sunset using `constrain()` which was introduced in class
  // push();
  // translate(28, 8);
  // scale(0.2);
  // fill("black");
  // text(second(), 5, 15);
  // text(constrain(1 - sin((lerpSec * PI) / 30), 0.5, 1.5), 5, 25);
  // text(
  //   floor(
  //     map(constrain(1 - sin((lerpSec * PI) / 30), 0.5, 1.5), 0.5, 1.5, 0, 100)
  //   ) / 100,
  //   5,
  //   35
  // );
  // pop();
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

// the following function draw one 100 x 100 corner of the frame shape
// Since there is no direct pathfinder (subtracting shapes) in p5.JS
// I used the SVG to p5.js code converter, https://svg2p5.com/
// Also dividing the frame into four corner shapes since the converter could not apply to shape paths where the subtracting shapes are fully enclosed
function drawCornerFrame(color) {
  fill("rgba(0, 0, 0, 0)");
  stroke("rgba(0,0,0,0)");
  strokeCap(PROJECT);
  strokeJoin(MITER);
  fill(color);
  beginShape();
  vertex(100, 100);
  vertex(90, 100);
  bezierVertex(90, 50.2944, 49.7056, 10, 0, 10);
  vertex(0, 0);
  vertex(100, 0);
  vertex(100, 100);
  endShape();
}

// the following function draw one 96.82 x 100 rabbit
// I also used the SVG to p5.js code converter here
function drawRabbit(color) {
  push();
  // below make sure the "anchor point" is at the center of the rabbit,
  // so the transformations later could be easier
  translate(-48.41, -50);
  fill("rgba(0, 0, 0, 0)");
  stroke("rgba(0,0,0,0)");
  strokeCap(PROJECT);
  strokeJoin(MITER);
  fill(color);
  beginShape();
  vertex(74.1683, 92.2626);
  bezierVertex(74.1683, 92.2626, 81.2781, 96.2958, 78.2016, 98.4189);
  bezierVertex(75.1251, 100.542, 67.3764, 99.0545, 67.3764, 99.0545);
  bezierVertex(67.3764, 99.0545, 63.661, 95.1294, 62.6027, 88.5504);
  vertex(47.7476, 92.1577);
  bezierVertex(47.7476, 92.1577, 62.9238, 91.8137, 61.8623, 99.5623);
  bezierVertex(61.8623, 99.5623, 37.2436, 101.391, 27.1621, 97.5703);
  bezierVertex(13.7093, 92.4722, 6.78632, 83.7734, 12.5167, 64.4624);
  bezierVertex(18.2471, 45.1514, 36.7128, 41.9667, 45.8375, 43.238);
  bezierVertex(54.9622, 44.5125, 59.6343, 44.9352, 58.8906, 40.9019);
  bezierVertex(58.1665, 36.9703, 60.1717, 29.8998, 63.8805, 27.7997);
  bezierVertex(67.9596, 25.4898, 73.2313, 24.6412, 77.7593, 25.8371);
  bezierVertex(82.1824, 27.0035, 86.0682, 29.6803, 89.5018, 32.7077);
  bezierVertex(92.9256, 35.722, 96.1496, 39.4407, 96.7393, 43.9621);
  bezierVertex(96.8737, 45.004, 96.8606, 46.0917, 96.4936, 47.0779);
  bezierVertex(95.7663, 49.0437, 93.8004, 50.2658, 91.8543, 51.0456);
  bezierVertex(89.6853, 51.9171, 87.3722, 52.4282, 85.0394, 52.556);
  bezierVertex(86.3467, 57.9981, 85.5243, 63.9218, 82.7787, 68.7971);
  bezierVertex(80.3345, 73.1416, 77.1957, 76.7947, 75.148, 81.3948);
  bezierVertex(73.6802, 84.6908, 74.2273, 88.7044, 74.1683, 92.2691);
  vertex(74.1683, 92.2626);
  endShape();
  fill(color);
  beginShape();
  vertex(17.8731, 78.8565);
  bezierVertex(17.4635, 76.3369, 14.8949, 74.8527, 12.6047, 73.7257);
  bezierVertex(8.60422, 71.7533, 4.4727, 69.7481, 0.0233765, 69.4336);
  bezierVertex(-0.0847441, 71.8352, 0.167537, 74.2859, 1.0882, 76.504);
  bezierVertex(2.00886, 78.7254, 3.63722, 80.7011, 5.80291, 81.7463);
  bezierVertex(7.14295, 82.395, 8.6337, 82.6669, 10.1114, 82.8635);
  bezierVertex(13.7121, 83.3353, 17.3718, 83.3746, 20.9824, 82.9782);
  endShape();
  fill(color);
  beginShape();
  vertex(74.5676, 32.7573);
  bezierVertex(60.9576, 36.1189, 45.919, 31.7973, 35.5066, 22.4105);
  bezierVertex(34.3632, 21.3817, 33.2721, 20.2939, 32.2696, 19.1243);
  bezierVertex(30.8607, 17.4828, 29.6354, 15.6906, 28.4133, 13.905);
  bezierVertex(26.5326, 11.1528, 24.6487, 8.39738, 22.7681, 5.64521);
  bezierVertex(30.9197, 6.33981, 37.8525, 11.5591, 44.6445, 16.1198);
  bezierVertex(53.3727, 21.9813, 62.6056, 27.04, 71.8286, 32.0889);
  bezierVertex(58.2873, 24.3108, 46.6856, 13.194, 38.3341, 0);
  bezierVertex(45.0606, 2.31968, 51.8984, 4.69834, 57.6582, 8.87573);
  bezierVertex(60.2695, 10.7695, 62.6154, 13.0007, 64.9187, 15.2581);
  bezierVertex(69.083, 19.3372, 73.2276, 23.6359, 75.639, 28.9436);
  endShape();
  pop();
}

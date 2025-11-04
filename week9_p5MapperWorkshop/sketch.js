/*
 * p5.mapper
 * https://github.com/jdeboi/p5.mapper
 *
 * Jenna deBoisblanc
 * jdeboi.com
 *
 */

// yl yh xl var
// yh vars
let yinqiGhostX = 200; // X position of the ghost (center point)
let yinqiGhostY = 200; // Y position of the ghost (center point)
let yinqiGhostNoiseT = 0; // Noise variable

//yl vars
let speed = 0.01;
let noisePosition = 0;
let noiseX = 0;
let noiseY = 0;
let noiseR = 0;
let noiseT = 0;
let radius = 500;

//xl vars
// let d;
// let lerpSec;
// let lerP;

// let colorPairs = [
//   {
//     tone: "#FFD400",
//     accent: "#FF8C1A",
//   },
//   {
//     tone: "#CCF20D",
//     accent: "#0DA540",
//   },
//   {
//     tone: "#47EBEB",
//     accent: "#2060DF",
//   },
//   {
//     tone: "#ff8fc7ff",
//     accent: "#DF3020",
//   },
// ];

let pMapper;
let quadYH1, quadXL1, quadYL1; // my quad surfaces

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // create mapper object
  pMapper = createProjectionMapper(this);
  pMapper.load("map.json");

  // create "quads" for each surface of your projection
  quadYH1 = pMapper.createQuadMap(400, 400);
  // quadXL1 = pMapper.createQuadMap(400, 400);
  quadYL1 = pMapper.createQuadMap(400, 400);
  // quadRight = pMapper.createQuadMap(400, 400);
}

function draw() {
  background(0);

  // display each of the projection surfaces in draw
  // quadLeft.displaySketch(mySketch);
  // quadRight.displaySketch(myOtherSketch);

  quadYH1.displaySketch(yhSketch);
  // quadXL1.displaySketch(xlSketch);
  quadYL1.displaySketch(ylSketch);
}

function yhSketch(pg) {
  // "pg" refers to each canvas "instance"
  pg.clear();
  pg.push();

  angleMode(DEGREES); //
  pg.noStroke(); // remove outlines of the ghost

  pg.background(0); // background black

  yinqiGhostNoiseT += 0.01; // By adding 0.01 each frame, theis will changes gradually,
  // making the ghost’s movement smooth.

  //calculate ghost postion by using cos and sin function, learn this from week 8c.
  //8C is eyemoving, mine see the ghost as the whole eyes position.
  let yinqiGhostTheta = noise(yinqiGhostNoiseT) * 360;
  let yinqiGhostXRadius = noise(yinqiGhostNoiseT + 10) * 40; //x, the original function doesn't add 10, but I tried with some fill number by myself
  //I experimented with adding them and found the movement looks smoother and more natural.
  let yinqiGhostYRadius = noise(yinqiGhostNoiseT + 20) * 30; //y
  let yinqiGhostMoveX = cos(yinqiGhostTheta) * yinqiGhostXRadius;
  let yinqiGhostMoveY = sin(yinqiGhostTheta) * yinqiGhostYRadius;

  //ghost body, one ellipse, and one rect with round coner
  pg.fill(255); // white color of the ghost
  pg.ellipse(
    yinqiGhostX + yinqiGhostMoveX,
    yinqiGhostY + yinqiGhostMoveY,
    100,
    120
  );
  pg.rect(
    yinqiGhostX - 50 + yinqiGhostMoveX,
    yinqiGhostY + yinqiGhostMoveY,
    100,
    80,
    50
  );

  //ghost eyes
  //Two small black ellipses
  pg.fill(0);
  pg.ellipse(
    yinqiGhostX - 15 + yinqiGhostMoveX,
    yinqiGhostY + yinqiGhostMoveY - 20,
    15,
    20
  );
  pg.ellipse(
    yinqiGhostX + 15 + yinqiGhostMoveX,
    yinqiGhostY + yinqiGhostMoveY - 20,
    15,
    20
  );

  //draw ghost mouth
  pg.ellipse(
    yinqiGhostX + yinqiGhostMoveX,
    yinqiGhostY + yinqiGhostMoveY + 10,
    20,
    10
  );

  pg.pop();
}

function ylSketch(pg) {
  pg.clear();
  pg.push();
  // your mini sketch goes here!

  noiseX = random(100);
  noiseY = random(100);
  colorMode(HSB);

  pg.background("#bac4ccff");

  pg.strokeWeight(3);

  let redAmongus = noise(noisePosition);
  console.log("raw perlin noise output: " + redAmongus);
  redAmongus = map(redAmongus, 0, 1, 0, 400);

  pg.fill("#cc1212ff");
  pg.rect(redAmongus, redAmongus, 50, 80, 70);
  pg.fill("rgba(255, 255, 255, 1)");
  pg.rect(redAmongus + 20, redAmongus + 15, 40, 20, 30);

  noisePosition = noisePosition + speed;

  pg.pop();
}

// function Circle(x, y, d) {
//   lerP = pg.constrain(0.5 - 1.5 * cos(((lerpSec % 20) * PI) / 10), 0, 1);
//   pg.circle(lerP * x, lerP * y, d);
// }

// function xlSketch(pg) {
//   pg.clear();
//   pg.push();
//   // your mini sketch goes here!

//   pg.noFill();
//   pg.noStroke();
//   pg.rectMode(CORNERS);

//   d = new Date();
//   ms = d.getMilliseconds();

//   lerpSec = second() + ms / 1000;
//   // lerpSec = (second() + 20 + ((ms / 1000) % 1)) % 60;
//   // lerpSec = (second() + 40 + ((ms / 1000) % 1)) % 60;

//   function Circle(x, y, d) {
//     lerP = pg.constrain(0.5 - 1.5 * cos(((lerpSec % 20) * PI) / 10), 0, 1);
//     pg.circle(lerP * x, lerP * y, d);
//   }

//   pg.translate(200, 200);
//   pg.scale(3);

//   pg.background("white");

//   if (lerpSec >= 0 && lerpSec < 20) {
//     pg.push();
//     pg.noStroke();
//     // translate(200, 200);
//     // bottom circles
//     pg.fill(colorPairs[0].accent);
//     pg.Circle(-25, 20, 50);
//     pg.Circle(25, 20, 50);
//     // face circle
//     pg.fill(colorPairs[0].tone);
//     pg.Circle(0, 0, 50);

//     // expression
//     pg.push();
//     pg.strokeJoin(ROUND);
//     pg.stroke("black");
//     // pointed eyes
//     pg.strokeWeight(5);
//     pg.point(-7, 0);
//     pg.point(7, 0);
//     // smiling mouth
//     pg.strokeWeight(3);
//     pg.noFill();
//     pg.arc(0, 0, 40, 40, PI / 3, (2 * PI) / 3, OPEN);
//     // left facing nose
//     pg.strokeWeight(3);
//     pg.beginShape();
//     pg.vertex(0, 5);
//     pg.vertex(-5, 10);
//     pg.vertex(0, 10);
//     pg.endShape();
//     pg.pop();

//     // top (hair) circles
//     pg.fill(colorPairs[0].accent);
//     pg.Circle(-15, -25, 50);
//     pg.Circle(15, -25, 50);
//     pg.pop();
//   } else if (lerpSec >= 20 && lerpSec < 40) {
//     pg.push();
//     pg.noStroke();
//     // bottom circles
//     pg.fill(colorPairs[1].accent);
//     pg.Circle(-25, 25, 50);
//     pg.Circle(25, 25, 50);
//     // face circle
//     pg.fill(colorPairs[1].tone);
//     pg.Circle(0, 0, 50);

//     // expression
//     pg.push();
//     pg.strokeJoin(ROUND);
//     pg.stroke("black");
//     // dash eyes
//     pg.strokeWeight(3);
//     pg.line(-10, 0, -7, 0);
//     pg.line(7, 0, 10, 0);
//     // neutral mouth
//     pg.strokeWeight(3);
//     pg.noFill();
//     pg.line(-10, 18, 10, 18);
//     // left facing nose
//     pg.strokeWeight(3);
//     pg.beginShape();
//     pg.vertex(0, 5);
//     pg.vertex(-5, 10);
//     pg.vertex(0, 10);
//     pg.endShape();
//     pg.pop();

//     // top (hair) circles
//     pg.fill(colorPairs[1].accent);
//     pg.Circle(-25, -25, 50);
//     pg.Circle(25, -25, 50);
//     pg.Circle(0, -15, 20);
//     pg.pop();
//   } else if (lerpSec >= 40 && lerpSec < 60) {
//     pg.push();
//     pg.noStroke();
//     // middle non-head circles
//     pg.fill(colorPairs[2].accent);
//     pg.Circle(-25, 0, 50);
//     pg.Circle(25, 0, 50);
//     // top and bottom darker circles
//     pg.fill(colorPairs[2].tone);
//     pg.Circle(25, -25, 50);
//     pg.Circle(-25, 25, 50);
//     // top and bottom lighter circles
//     pg.fill(colorPairs[2].accent);
//     pg.Circle(0, -25, 50);
//     pg.Circle(0, 25, 50);
//     pg.Circle(-25, -25, 50);
//     pg.Circle(25, 25, 50);
//     // face circle
//     pg.fill(colorPairs[2].tone);
//     pg.Circle(0, 0, 50);

//     // expression
//     pg.push();
//     pg.strokeJoin(ROUND);
//     pg.stroke("black");
//     // eyes with lashes
//     pg.strokeWeight(5);
//     pg.point(-7, 0);
//     pg.point(7, 0);
//     pg.strokeWeight(3);
//     pg.line(-10, -3, -7, 0);
//     pg.line(4, -3, 7, 0);
//     // smiling mouth
//     pg.strokeWeight(3);
//     pg.noFill();
//     pg.arc(0, 0, 40, 40, PI / 3, (2 * PI) / 3, OPEN);
//     // left facing nose
//     pg.strokeWeight(3);
//     pg.beginShape();
//     pg.vertex(0, 5);
//     pg.vertex(-5, 10);
//     pg.vertex(0, 10);
//     pg.endShape();
//     pg.pop();

//     pg.pop();
//   }

//   if (
//     (lerpSec >= 0 && lerpSec <= 4) ||
//     (lerpSec >= 16 && lerpSec <= 24) ||
//     (lerpSec >= 36 && lerpSec <= 44) ||
//     (lerpSec >= 56 && lerpSec <= 60)
//   ) {
//     pg.push();
//     pg.fill("white");
//     pg.rect(-200, -200, 200, 200);
//     pg.pop();
//   }

//   if (lerpSec >= 0 && lerpSec <= 5) {
//     pg.push();
//     pg.fill(colorPairs[0].accent);
//     pg.circle(400 - 25 * ((lerpSec + 12) % 16), 0, 50);
//     pg.pop();
//   } else if (lerpSec >= 20 && lerpSec <= 25) {
//     pg.push();
//     pg.fill(colorPairs[1].accent);
//     pg.circle(400 - 25 * ((lerpSec + 8) % 16), 0, 50);
//     pg.pop();
//   } else if (lerpSec >= 40 && lerpSec <= 45) {
//     pg.push();
//     pg.fill(colorPairs[2].tone);
//     pg.circle(400 - 25 * ((lerpSec + 4) % 16), 0, 50);
//     pg.translate(400 - 25 * ((lerpSec + 4) % 16), 0);
//     // expression
//     pg.push();
//     pg.strokeJoin(ROUND);
//     pg.stroke("black");
//     // eyes with lashes
//     pg.strokeWeight(5);
//     pg.point(-7, 0);
//     pg.point(7, 0);
//     pg.strokeWeight(3);
//     pg.line(-10, -3, -7, 0);
//     pg.line(4, -3, 7, 0);
//     // smiling mouth
//     pg.strokeWeight(3);
//     pg.noFill();
//     pg.arc(0, 0, 40, 40, PI / 3, (2 * PI) / 3, OPEN);
//     // left facing nose
//     pg.strokeWeight(3);
//     pg.beginShape();
//     pg.vertex(0, 5);
//     pg.vertex(-5, 10);
//     pg.vertex(0, 10);
//     pg.endShape();
//     pg.pop();
//     pg.pop();
//   }

//   if (lerpSec >= 15 && lerpSec <= 20) {
//     pg.push();
//     pg.fill(colorPairs[0].accent);
//     pg.circle(-25 * (lerpSec % 16), 0, 50);
//     pg.pop();
//   } else if (lerpSec >= 35 && lerpSec <= 40) {
//     pg.push();
//     pg.fill(colorPairs[1].accent);
//     pg.circle(-25 * ((lerpSec + 12) % 16), 0, 50);
//     pg.pop();
//   } else if (lerpSec >= 55 && lerpSec <= 60) {
//     pg.push();
//     pg.fill(colorPairs[2].tone);
//     pg.circle(-25 * ((lerpSec + 8) % 16), 0, 50);
//     pg.translate(-25 * ((lerpSec + 8) % 16), 0);
//     // expression
//     pg.push();
//     pg.strokeJoin(ROUND);
//     pg.stroke("black");
//     // eyes with lashes
//     pg.strokeWeight(5);
//     pg.point(-7, 0);
//     pg.point(7, 0);
//     pg.strokeWeight(3);
//     pg.line(-10, -3, -7, 0);
//     pg.line(4, -3, 7, 0);
//     // smiling mouth
//     pg.strokeWeight(3);
//     pg.noFill();
//     pg.arc(0, 0, 40, 40, PI / 3, (2 * PI) / 3, OPEN);
//     // left facing nose
//     pg.strokeWeight(3);
//     pg.beginShape();
//     pg.vertex(0, 5);
//     pg.vertex(-5, 10);
//     pg.vertex(0, 10);
//     pg.endShape();
//     pg.pop();
//     pg.pop();
//   }

//   pg.pop();
// }

function keyPressed() {
  // keypressed toggles different modes
  switch (key) {
    case "c":
      pMapper.toggleCalibration();
      break;
    case "f":
      let fs = fullscreen();
      fullscreen(!fs);
      break;
    case "l":
      pMapper.load("map.json");
      break;

    case "s":
      pMapper.save("map.json");
      break;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

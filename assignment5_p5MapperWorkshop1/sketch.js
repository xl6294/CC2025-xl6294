/*
 * p5.mapper
 * https://github.com/jdeboi/p5.mapper
 *
 * Jenna deBoisblanc
 * jdeboi.com
 *
 */

// var
let d;
let lerpSec;
let lerP;

let colorPairs = [
  {
    tone: "#FFD400",
    accent: "#FF8C1A",
  },
  {
    tone: "#CCF20D",
    accent: "#0DA540",
  },
  {
    tone: "#47EBEB",
    accent: "#2060DF",
  },
  {
    tone: "#ff8fc7ff",
    accent: "#DF3020",
  },
];

let pMapper;
let quadXL1, quadXL2, quadXL3; // my quad surfaces

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // create mapper object
  pMapper = createProjectionMapper(this);
  pMapper.load("map.json");

  // create "quads" for each surface of your projection
  quadXL1 = pMapper.createQuadMap(400, 400);
  quadXL2 = pMapper.createQuadMap(400, 400);
  quadXL3 = pMapper.createQuadMap(400, 400);
}

function draw() {
  background(0);

  // display each of the projection surfaces in draw
  t = 0;
  quadXL1.displaySketch(xlSketch);
  t = 20;
  quadXL2.displaySketch(xlSketch);
  t = 40;
  quadXL3.displaySketch(xlSketch);
}

function mySketch(pg) {
  // "pg" refers to each canvas "instance"
  pg.clear();
  pg.push();
  // your sketch goes between push and pop. remember to use the 'pg.' prefix for all p5 functions
  pg.background(0, 255, 0);
  pg.textAlign(CENTER, CENTER);
  pg.textSize(70);
  pg.fill(color("black"));
  pg.text("hello world", 200, 175);
  // ends here
  pg.pop();
}

function myOtherSketch(pg) {
  pg.clear();
  pg.push();
  // your mini sketch goes here!

  pg.background(255, 0, 0);

  pg.rectMode(CORNERS);
  // and ends here!
  pg.pop();
}

function Circle(pg, x, y, d) {
  lerP = constrain(0.5 - 1.5 * cos(((lerpSec % 20) * PI) / 10), 0, 1);
  pg.circle(lerP * x, lerP * y, d);
}

function xlSketch(pg) {
  pg.clear();
  pg.push();
  // your mini sketch goes here!

  pg.noFill();
  pg.noStroke();
  pg.rectMode(CORNERS);

  d = new Date();
  ms = d.getMilliseconds();

  // lerpSec = second() + ms / 1000;
  // lerpSec = (second() + 20 + ((ms / 1000) % 1)) % 60;
  // lerpSec = (second() + 40 + ((ms / 1000) % 1)) % 60;
  lerpSec = (second() + t + ((ms / 1000) % 1)) % 60;

  pg.translate(200, 200);
  pg.scale(3);

  pg.background("white");

  if (lerpSec >= 0 && lerpSec < 20) {
    pg.push();
    pg.noStroke();
    // translate(200, 200);
    // bottom circles
    pg.fill(colorPairs[0].accent);
    Circle(pg, -25, 20, 50);
    Circle(pg, 25, 20, 50);
    // face circle
    pg.fill(colorPairs[0].tone);
    Circle(pg, 0, 0, 50);

    // expression
    pg.push();
    pg.strokeJoin(ROUND);
    pg.stroke("black");
    // pointed eyes
    pg.strokeWeight(5);
    pg.point(-7, 0);
    pg.point(7, 0);
    // smiling mouth
    pg.strokeWeight(3);
    pg.noFill();
    pg.arc(0, 0, 40, 40, PI / 3, (2 * PI) / 3, OPEN);
    // left facing nose
    pg.strokeWeight(3);
    pg.beginShape();
    pg.vertex(0, 5);
    pg.vertex(-5, 10);
    pg.vertex(0, 10);
    pg.endShape();
    pg.pop();

    // top (hair) circles
    pg.fill(colorPairs[0].accent);
    Circle(pg, -15, -25, 50);
    Circle(pg, 15, -25, 50);
    pg.pop();
  } else if (lerpSec >= 20 && lerpSec < 40) {
    pg.push();
    pg.noStroke();
    // bottom circles
    pg.fill(colorPairs[1].accent);
    Circle(pg, -25, 25, 50);
    Circle(pg, 25, 25, 50);
    // face circle
    pg.fill(colorPairs[1].tone);
    Circle(pg, 0, 0, 50);

    // expression
    pg.push();
    pg.strokeJoin(ROUND);
    pg.stroke("black");
    // dash eyes
    pg.strokeWeight(3);
    pg.line(-10, 0, -7, 0);
    pg.line(7, 0, 10, 0);
    // neutral mouth
    pg.strokeWeight(3);
    pg.noFill();
    pg.line(-10, 18, 10, 18);
    // left facing nose
    pg.strokeWeight(3);
    pg.beginShape();
    pg.vertex(0, 5);
    pg.vertex(-5, 10);
    pg.vertex(0, 10);
    pg.endShape();
    pg.pop();

    // top (hair) circles
    pg.fill(colorPairs[1].accent);
    Circle(pg, -25, -25, 50);
    Circle(pg, 25, -25, 50);
    Circle(pg, 0, -15, 20);
    pg.pop();
  } else if (lerpSec >= 40 && lerpSec < 60) {
    pg.push();
    pg.noStroke();
    // middle non-head circles
    pg.fill(colorPairs[2].accent);
    Circle(pg, -25, 0, 50);
    Circle(pg, 25, 0, 50);
    // top and bottom darker circles
    pg.fill(colorPairs[2].tone);
    Circle(pg, 25, -25, 50);
    Circle(pg, -25, 25, 50);
    // top and bottom lighter circles
    pg.fill(colorPairs[2].accent);
    Circle(pg, 0, -25, 50);
    Circle(pg, 0, 25, 50);
    Circle(pg, -25, -25, 50);
    Circle(pg, 25, 25, 50);
    // face circle
    pg.fill(colorPairs[2].tone);
    Circle(pg, 0, 0, 50);

    // expression
    pg.push();
    pg.strokeJoin(ROUND);
    pg.stroke("black");
    // eyes with lashes
    pg.strokeWeight(5);
    pg.point(-7, 0);
    pg.point(7, 0);
    pg.strokeWeight(3);
    pg.line(-10, -3, -7, 0);
    pg.line(4, -3, 7, 0);
    // smiling mouth
    pg.strokeWeight(3);
    pg.noFill();
    pg.arc(0, 0, 40, 40, PI / 3, (2 * PI) / 3, OPEN);
    // left facing nose
    pg.strokeWeight(3);
    pg.beginShape();
    pg.vertex(0, 5);
    pg.vertex(-5, 10);
    pg.vertex(0, 10);
    pg.endShape();
    pg.pop();

    pg.pop();
  }

  if (
    (lerpSec >= 0 && lerpSec <= 4) ||
    (lerpSec >= 16 && lerpSec <= 24) ||
    (lerpSec >= 36 && lerpSec <= 44) ||
    (lerpSec >= 56 && lerpSec <= 60)
  ) {
    pg.push();
    pg.fill("white");
    pg.rect(-200, -200, 200, 200);
    pg.pop();
  }

  if (lerpSec >= 0 && lerpSec <= 5) {
    pg.push();
    pg.fill(colorPairs[0].accent);
    // Circle(pg, 400 - 25 * ((lerpSec + 12) % 16), 0, 50);
    pg.translate(400 - 25 * ((lerpSec + 12) % 16), 0);
    Circle(pg, 0, 0, 50);
    pg.pop();
  } else if (lerpSec >= 20 && lerpSec <= 25) {
    pg.push();
    pg.fill(colorPairs[1].accent);
    // Circle(pg, 400 - 25 * ((lerpSec + 8) % 16), 0, 50);
    pg.translate(400 - 25 * ((lerpSec + 8) % 16), 0);
    Circle(pg, 0, 0, 50);
    pg.pop();
  } else if (lerpSec >= 40 && lerpSec <= 45) {
    pg.push();
    pg.fill(colorPairs[2].tone);
    // Circle(pg, 400 - 25 * ((lerpSec + 4) % 16), 0, 50);
    pg.translate(400 - 25 * ((lerpSec + 4) % 16), 0);
    Circle(pg, 0, 0, 50);
    // expression
    pg.push();
    pg.strokeJoin(ROUND);
    pg.stroke("black");
    // eyes with lashes
    pg.strokeWeight(5);
    pg.point(-7, 0);
    pg.point(7, 0);
    pg.strokeWeight(3);
    pg.line(-10, -3, -7, 0);
    pg.line(4, -3, 7, 0);
    // smiling mouth
    pg.strokeWeight(3);
    pg.noFill();
    pg.arc(0, 0, 40, 40, PI / 3, (2 * PI) / 3, OPEN);
    // left facing nose
    pg.strokeWeight(3);
    pg.beginShape();
    pg.vertex(0, 5);
    pg.vertex(-5, 10);
    pg.vertex(0, 10);
    pg.endShape();
    pg.pop();
    pg.pop();
  }

  if (lerpSec >= 15 && lerpSec <= 20) {
    pg.push();
    pg.fill(colorPairs[0].accent);
    // Circle(pg, -25 * (lerpSec % 16), 0, 50);
    pg.translate(-25 * ((lerpSec + 16) % 16), 0);
    Circle(pg, 0, 0, 50);
    pg.pop();
  } else if (lerpSec >= 35 && lerpSec <= 40) {
    pg.push();
    pg.fill(colorPairs[1].accent);
    // Circle(pg, -25 * ((lerpSec + 12) % 16), 0, 50);
    pg.translate(-25 * ((lerpSec + 12) % 16), 0);
    Circle(pg, 0, 0, 50);
    pg.pop();
  } else if (lerpSec >= 55 && lerpSec <= 60) {
    pg.push();
    pg.fill(colorPairs[2].tone);
    // Circle(pg, -25 * ((lerpSec + 8) % 16), 0, 50);
    pg.translate(-25 * ((lerpSec + 8) % 16), 0);
    Circle(pg, 0, 0, 50);
    // expression
    pg.push();
    pg.strokeJoin(ROUND);
    pg.stroke("black");
    // eyes with lashes
    pg.strokeWeight(5);
    pg.point(-7, 0);
    pg.point(7, 0);
    pg.strokeWeight(3);
    pg.line(-10, -3, -7, 0);
    pg.line(4, -3, 7, 0);
    // smiling mouth
    pg.strokeWeight(3);
    pg.noFill();
    pg.arc(0, 0, 40, 40, PI / 3, (2 * PI) / 3, OPEN);
    // left facing nose
    pg.strokeWeight(3);
    pg.beginShape();
    pg.vertex(0, 5);
    pg.vertex(-5, 10);
    pg.vertex(0, 10);
    pg.endShape();
    pg.pop();
    pg.pop();
  }

  pg.push();
  lerP = constrain(0.5 - 1.5 * cos(((lerpSec % 20) * PI) / 10), 0, 1);
  pg.fill("black");
  pg.text(lerP, -50, -50);
  pg.text(second(), -50, -40);
  pg.pop();

  pg.pop();
}

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

let d;
let lerpSec;
let lerP;

let xRobotPosX = 200; // center x
let xRobotPosY = 200; // center y
let xRobotFacing = "right"; // "right"
let xRobotType = "a"; // "a"
let xRobotEyes = "points"; // "points"
let xRobotMouth = "smile"; // "smile"
let xRobotTone = "#FFD400"; // main color
let xRobotAccent = "#FF8C1A"; // accent color
let xRobotShadow = "#4F136C"; // shadow color

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

// Robot body drawing data

function setup() {
  createCanvas(400, 400);
  noFill();
  noStroke();
  rectMode(CORNERS);
}

function draw() {
  d = new Date();
  ms = d.getMilliseconds();

  lerpSec = second() + ((ms / 1000) % 1);
  // lerpSec = (second() + 20 + ((ms / 1000) % 1)) % 60;
  // lerpSec = (second() + 40 + ((ms / 1000) % 1)) % 60;

  translate(200, 200);
  scale(3);

  background("white");

  if (lerpSec >= 0 && lerpSec < 20) {
    push();
    noStroke();
    // translate(200, 200);
    // bottom circles
    fill(colorPairs[0].accent);
    Circle(-25, 20, 50);
    Circle(25, 20, 50);
    // face circle
    fill(colorPairs[0].tone);
    Circle(0, 0, 50);
    // top (hair) circles
    fill(colorPairs[0].accent);
    Circle(-15, -25, 50);
    Circle(15, -25, 50);
    pop();
  } else if (lerpSec >= 20 && lerpSec < 40) {
    push();
    noStroke();
    // bottom circles
    fill(colorPairs[1].accent);
    Circle(-25, 25, 50);
    Circle(25, 25, 50);
    // face circle
    fill(colorPairs[1].tone);
    Circle(0, 0, 50);
    // top (hair) circles
    fill(colorPairs[1].accent);
    Circle(-25, -25, 50);
    Circle(25, -25, 50);
    Circle(0, -15, 20);
    pop();
  } else if (lerpSec >= 40 && lerpSec < 60) {
    push();
    noStroke();
    // middle non-head circles
    fill(colorPairs[2].accent);
    Circle(-25, 0, 50);
    Circle(25, 0, 50);
    // top and bottom darker circles
    fill(colorPairs[2].tone);
    Circle(25, -25, 50);
    Circle(-25, 25, 50);
    // top and bottom lighter circles
    fill(colorPairs[2].accent);
    Circle(0, -25, 50);
    Circle(0, 25, 50);
    Circle(-25, -25, 50);
    Circle(25, 25, 50);
    // face circle
    fill(colorPairs[2].tone);
    Circle(0, 0, 50);
    pop();
  }

  if (
    (lerpSec >= 0 && lerpSec <= 4) ||
    (lerpSec >= 16 && lerpSec <= 24) ||
    (lerpSec >= 36 && lerpSec <= 44) ||
    (lerpSec >= 56 && lerpSec <= 60)
  ) {
    push();
    fill("white");
    rect(-200, -200, 200, 200);
    pop();
  }

  if (lerpSec >= 0 && lerpSec <= 5) {
    push();
    fill(colorPairs[0].accent);
    circle(400 - 25 * ((lerpSec + 12) % 16), 0, 50);
    pop();
  } else if (lerpSec >= 20 && lerpSec <= 25) {
    push();
    fill(colorPairs[1].accent);
    circle(400 - 25 * ((lerpSec + 8) % 16), 0, 50);
    pop();
  } else if (lerpSec >= 40 && lerpSec <= 45) {
    push();
    fill(colorPairs[2].tone);
    circle(400 - 25 * ((lerpSec + 4) % 16), 0, 50);
    pop();
  }

  if (lerpSec >= 15 && lerpSec <= 20) {
    push();
    fill(colorPairs[0].accent);
    circle(-25 * (lerpSec % 16), 0, 50);
    pop();
  } else if (lerpSec >= 35 && lerpSec <= 40) {
    push();
    fill(colorPairs[1].accent);
    circle(-25 * ((lerpSec + 12) % 16), 0, 50);
    pop();
  } else if (lerpSec >= 55 && lerpSec <= 60) {
    push();
    fill(colorPairs[2].tone);
    circle(-25 * ((lerpSec + 8) % 16), 0, 50);
    pop();
  }

  //   push();
  //   stroke("red");
  //   circle(400 - 25 * (lerpSec % 16), 0, 50);
  //   circle(-25 * (lerpSec % 16), 0, 50); // 1st
  //   stroke("green");
  //   circle(400 - 25 * ((lerpSec + 4) % 16), 0, 50); // 3rd
  //   circle(-25 * ((lerpSec + 4) % 16), 0, 50);
  //   stroke("blue");
  //   circle(400 - 25 * ((lerpSec + 8) % 16), 0, 50); // 2nd
  //   circle(-25 * ((lerpSec + 8) % 16), 0, 50); // 3rd
  //   stroke("black");
  //   circle(400 - 25 * ((lerpSec + 12) % 16), 0, 50); // 1st
  //   circle(-25 * ((lerpSec + 12) % 16), 0, 50); // 2nd
  //   pop();

  push();
  fill("black");
  text(lerP, -50, -50);
  text(second(), -50, -40);
  pop();

  push();
  stroke("black");
  rect(-200, -200, 200, 200);
  pop();
}

function Circle(x, y, d) {
  lerP = constrain(0.5 - 1.5 * cos(((lerpSec % 20) * PI) / 10), 0, 1);

  circle(lerP * x, lerP * y, d);
}

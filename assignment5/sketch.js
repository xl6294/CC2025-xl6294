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

function setup() {
  createCanvas(400, 400);
  noFill();
  noStroke();
  rectMode(CORNERS);
}

function draw() {
  // I am reusing the method I used in assignment 3
  // since I want to "lerp" the `second()`
  // for smooth and synced movement across all windows
  // using `Date()` & `getMilliseconds()` from JavaScript
  // Link: https://www.w3schools.com/jsref/jsref_getmilliseconds.asp
  // the looping progession of milliseconds is constrained within each second cycle
  d = new Date();
  ms = d.getMilliseconds();
  lerpSec = second() + ms / 1000; // lerpSec, from 0 to 59.999, increment almost continuously by 0.001
  // As there will be three periods of 20s animations within a whole minute
  // For the other two windows I will offset the lerpSec by 20s and 40s (see below)
  // So togther they will create a robot-traveling effect
  // lerpSec = (second() + 20 + ((ms / 1000) % 1)) % 60; // activate for sketch 2
  // lerpSec = (second() + 40 + ((ms / 1000) % 1)) % 60;  // activate for sketch 3

  // translate drawing origin to the center of the canvas
  translate(200, 200);
  // scale up the robots since they are originally 100 x 100
  scale(3);

  background("white");

  // I want the animation to show a robot entering the canvas as a single circle/ball.
  // It would then blooms into its full form and stays like that for a while
  // before shrinking back into a ball and exiting the screen.
  // Basically, the animation will have three stages: entering, blooming-pausing-shrinking, and exiting.

  // The section below draws the blooming-pausing-shrinking stage of the robots
  // using the custom Circle(x, y, d) function
  if (lerpSec >= 0 && lerpSec < 20) {
    // draw the 1st robot within the first 20 sec
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

    // expression
    push();
    strokeJoin(ROUND);
    stroke("black");
    // pointed eyes
    strokeWeight(5);
    point(-7, 0);
    point(7, 0);
    // smiling mouth
    strokeWeight(3);
    noFill();
    arc(0, 0, 40, 40, PI / 3, (2 * PI) / 3, OPEN);
    // left facing nose
    strokeWeight(3);
    beginShape();
    vertex(0, 5);
    vertex(-5, 10);
    vertex(0, 10);
    endShape();
    pop();

    // top (hair) circles
    fill(colorPairs[0].accent);
    Circle(-15, -25, 50);
    Circle(15, -25, 50);
    pop();
  } else if (lerpSec >= 20 && lerpSec < 40) {
    // draw the 2nd robot within the second 20 sec (20–40)
    push();
    noStroke();
    // bottom circles
    fill(colorPairs[1].accent);
    Circle(-25, 25, 50);
    Circle(25, 25, 50);
    // face circle
    fill(colorPairs[1].tone);
    Circle(0, 0, 50);

    // expression
    push();
    strokeJoin(ROUND);
    stroke("black");
    // dash eyes
    strokeWeight(3);
    line(-10, 0, -7, 0);
    line(7, 0, 10, 0);
    // neutral mouth
    strokeWeight(3);
    noFill();
    line(-10, 18, 10, 18);
    // left facing nose
    strokeWeight(3);
    beginShape();
    vertex(0, 5);
    vertex(-5, 10);
    vertex(0, 10);
    endShape();
    pop();

    // top (hair) circles
    fill(colorPairs[1].accent);
    Circle(-25, -25, 50);
    Circle(25, -25, 50);
    Circle(0, -15, 20);
    pop();
  } else if (lerpSec >= 40 && lerpSec < 60) {
    // draw the 3rd robot within the last 20 sec (40–60)
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

    // expression
    push();
    strokeJoin(ROUND);
    stroke("black");
    // eyes with lashes
    strokeWeight(5);
    point(-7, 0);
    point(7, 0);
    strokeWeight(3);
    line(-10, -3, -7, 0);
    line(4, -3, 7, 0);
    // smiling mouth
    strokeWeight(3);
    noFill();
    arc(0, 0, 40, 40, PI / 3, (2 * PI) / 3, OPEN);
    // left facing nose
    strokeWeight(3);
    beginShape();
    vertex(0, 5);
    vertex(-5, 10);
    vertex(0, 10);
    endShape();
    pop();

    pop();
  }

  // I want the animation to show a robot entering the canvas as a single circle/ball.
  // It would then blooms into its full form and stays like that for a while
  // before shrinking back into a ball and exiting the screen.
  // Basically, the animation will have three stages: entering, blooming-pausing-shrinking, and exiting.

  // when the animation is NOT in the blooming-pausing-shrinking stage
  // in either the robot ball entering or exiting stage
  // a white square with the size of the 400x400 canvas
  // would mask the robot layer (the code above)
  // so I can draw the robot moving in ball state separately
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

  // below draws the entering robot balls
  // the circles themselves are in loop every 4 sec
  // so the if statement makes sure
  // that they are only visible during the right time interval
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
    // the 3rd robot will have its expression/face traveling with the robot ball
    push();
    fill(colorPairs[2].tone);
    circle(400 - 25 * ((lerpSec + 4) % 16), 0, 50);
    translate(400 - 25 * ((lerpSec + 4) % 16), 0);
    // expression
    push();
    strokeJoin(ROUND);
    stroke("black");
    // eyes with lashes
    strokeWeight(5);
    point(-7, 0);
    point(7, 0);
    strokeWeight(3);
    line(-10, -3, -7, 0);
    line(4, -3, 7, 0);
    // smiling mouth
    strokeWeight(3);
    noFill();
    arc(0, 0, 40, 40, PI / 3, (2 * PI) / 3, OPEN);
    // left facing nose
    strokeWeight(3);
    beginShape();
    vertex(0, 5);
    vertex(-5, 10);
    vertex(0, 10);
    endShape();
    pop();
    pop();
  }

  // below draws the exiting robot balls
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
    translate(-25 * ((lerpSec + 8) % 16), 0);
    // expression
    push();
    strokeJoin(ROUND);
    stroke("black");
    // eyes with lashes
    strokeWeight(5);
    point(-7, 0);
    point(7, 0);
    strokeWeight(3);
    line(-10, -3, -7, 0);
    line(4, -3, 7, 0);
    // smiling mouth
    strokeWeight(3);
    noFill();
    arc(0, 0, 40, 40, PI / 3, (2 * PI) / 3, OPEN);
    // left facing nose
    strokeWeight(3);
    beginShape();
    vertex(0, 5);
    vertex(-5, 10);
    vertex(0, 10);
    endShape();
    pop();
    pop();
  }

  // the following section is used for determining
  // which period of the looping robot ball/circle
  // is correctly corresponding to
  // the start of blooming action or the end of the shrinking action
  // enable below to check
  // push();
  // stroke("red");
  // circle(400 - 25 * (lerpSec % 16), 0, 50);
  // circle(-25 * (lerpSec % 16), 0, 50); // this is right after the end of the shrinking action of the 1st robot ball
  // stroke("green");
  // circle(400 - 25 * ((lerpSec + 4) % 16), 0, 50); // this is right before the start of blooming action of the 3rd robot ball
  // circle(-25 * ((lerpSec + 4) % 16), 0, 50);
  // stroke("blue");
  // circle(400 - 25 * ((lerpSec + 8) % 16), 0, 50); // this is right before the start of blooming action of the 2nd robot ball
  // circle(-25 * ((lerpSec + 8) % 16), 0, 50); // this is right after the end of the shrinking action of the 3rd robot ball
  // stroke("black");
  // circle(400 - 25 * ((lerpSec + 12) % 16), 0, 50); // this is right before the start of blooming action of the 1st robot ball
  // circle(-25 * ((lerpSec + 12) % 16), 0, 50); // this is right after the end of the shrinking action of the 2nd robot ball
  // pop();

  // the following section is printing the value of some parameters
  // used for checking the animated behaviors
  // determining if they are correctly synced (and with time)
  push();
  fill("black");
  // this will print the lerP value top left of the canvas for reference
  // when lerP = 0,
  // robot should have shrinked into a single circle
  // when lerP = 1,
  // robot should have "bloomed" into its complete form
  text(lerP, -50, -50);
  // this prints the counting seconds number under the lerP value
  text(second(), -50, -40);
  pop();

  // print the canvas border guide
  // push();
  // scale(1 / 3); // countering the scale(3) at the begining of draw function
  // stroke("black");
  // rect(-200, -200, 200, 200);
  // pop();
}

// the function below will render the circles
// (basically circles are only used to draw the robot bodies)
// so that they will travel back and forth
// between the origin (set at center of canvas) and destinated coords (x, y)
// with pauses before switching direction
function Circle(x, y, d) {
  // lerP's behavior:
  // value will change: 0 → 1 → 0, each 20-second period
  // will be static (from constrain):
  //   when during 0.–3.9… s  and 16.1…–20 s, lerP = 0
  //   when during 6.1…–13.9… s, lerP = 1
  // will increase or decrease smoothly:
  //   from 3.9…–6.1… s, lerP: 0 → 1
  //   from 13.9…–16.1… s, lerP: 1 → 0
  lerP = constrain(0.5 - 1.5 * cos(((lerpSec % 20) * PI) / 10), 0, 1);
  circle(lerP * x, lerP * y, d);
}

let s;

let robots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  s = min(width, height) / 100;
  scale(s);

  strokeWeight(1 / s); // default stroke weight to 1 px

  noFill();

  rectMode(CORNERS);
}

function draw() {
  background("#f2dbfeff");

  scale(s);

  // I want to illustrate the bots in a way that
  // the smaller the y coord they have, the earlier they are drawn
  // so on more backward layer
  // basically creating a visual depth where higher characters (smaller y coord value)
  // look more behind
  // so I use `Array.sort` here to rearrange the items in the array
  // everytime before drawing
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  robots.sort((a, b) => a.y - b.y);

  // drawing the shadows below each bot first
  for (let i = 0; i < robots.length; i++) {
    robots[i].move();
    robots[i].drawShadow();
    // robots[i].display();
  }
  // drawing the bodies and then the expressions for each bot here
  for (let i = 0; i < robots.length; i++) {
    robots[i].move();
    // robots[i].drawShadow();
    robots[i].display();
  }
}

function mousePressed() {
  let amIHovering = false;

  for (let i = 0; i < robots.length; i++) {
    if (robots[i].hovering == true) {
      robots.splice(i, 1);
      amIHovering = true;
    }
  }

  if (amIHovering == false) {
    // let types = ["a", "b"];
    let randomType = random(["a", "b", "c", "d"]);
    // let faces = ["left", "right"];
    let randomFacing = random(["left", "right"]);
    let randomEyes = random([1, 2, 3]);
    let randomMouth = random([1, 2]);

    let r = random([0, 1, 2, 3]);

    // when coloring the bots, I want each skin color
    // to have a corresponding accent color
    // therefore I use JavaScript object literal `{key: value}` (from office hours)
    // to set up color pairs
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

    let tempRobot = new Robot(
      mouseX,
      mouseY,
      randomFacing,
      colorPairs[r].tone,
      colorPairs[r].accent,
      randomType,
      randomEyes,
      randomMouth
    );
    robots.push(tempRobot);
  }
}

class Robot {
  constructor(x, y, facing, render, shade, type, eyes, mouth) {
    this.x = x;
    this.y = y;
    this.hovering = false;
    this.facing = facing;
    this.render = render;
    this.shade = shade;
    this.shadow = "#4F136C";
    this.type = type;
    this.speed = 0.5;
    this.eyes = eyes;
    this.mouth = mouth;
  }

  move() {
    // the direction of the bot movement is determined by `facing`
    // (`facing` also determines the direction of the nose)
    // bots move horizontally, left or right
    // when hitting the edge
    // will appear again on the other edge and loop movement
    if (this.facing === "right") {
      this.x = (this.x + this.speed) % width;
    } else if (this.facing === "left") {
      this.x = (this.x - this.speed + width) % width;
    }
  }

  // below draws a shadow below each body of the bots
  drawShadow() {
    push();
    translate(this.x / s, this.y / s);
    scale(0.1);

    if (this.type == "a") {
      push();

      translate(0, 75);

      noStroke();

      fill(this.shadow);
      ellipse(0, 0, 100, 30);

      pop();
    } else {
      push();

      translate(0, 50);

      noStroke();

      fill(this.shadow);
      ellipse(0, 0, 100, 30);

      pop();
    }

    pop();
  }

  drawBody() {
    if (this.type == "a") {
      push();

      translate(0, 25);

      noStroke();

      fill(this.render);
      circle(0, 25, 50);

      fill(this.shade);
      circle(-25, 0, 50);
      circle(0, 0, 50);
      circle(25, 0, 50);

      // head
      fill(this.render);
      circle(0, -25, 50);

      pop();
    } else if (this.type == "b") {
      push();

      noStroke();

      fill(this.shade);
      circle(-25, 20, 50);
      circle(25, 20, 50);

      // head
      fill(this.render);
      circle(0, 0, 50);

      fill(this.shade);
      circle(-15, -25, 50);
      circle(15, -25, 50);

      pop();
    } else if (this.type == "c") {
      push();

      noStroke();

      fill(this.shade);
      circle(-25, 25, 50);
      circle(25, 25, 50);

      // head
      fill(this.render);
      circle(0, 0, 50);

      fill(this.shade);
      circle(-25, -25, 50);
      circle(25, -25, 50);
      circle(0, -15, 20);

      pop();
    } else if (this.type == "d") {
      push();

      noStroke();

      fill(this.shade);
      circle(-25, 0, 50);
      circle(25, 0, 50);

      fill(this.render);
      circle(25, -25, 50);
      circle(-25, 25, 50);

      fill(this.shade);
      circle(0, -25, 50);
      circle(0, 25, 50);
      circle(-25, -25, 50);
      circle(25, 25, 50);

      // head
      fill(this.render);
      circle(0, 0, 50);

      pop();
    }
  }

  drawExpression() {
    push();

    // translate(50, 50);

    // circle(0, 0, 50); // guide

    strokeJoin(ROUND);

    // eyes

    if (this.eyes === 1) {
      // ver 1
      strokeWeight(5);
      point(-7, 0);
      point(7, 0);
    } else if (this.eyes === 2) {
      // ver 2
      strokeWeight(3);
      line(-10, 0, -7, 0);
      line(7, 0, 10, 0);
    } else if (this.eyes === 3) {
      // ver 3
      strokeWeight(5);
      point(-7, 0);
      point(7, 0);
      strokeWeight(3);
      line(-10, -3, -7, 0);
      line(4, -3, 7, 0);
    }

    // mouth

    if (this.mouth === 1) {
      // ver 1
      strokeWeight(3);
      noFill();
      arc(0, 0, 40, 40, PI / 3, (2 * PI) / 3, OPEN);
    } else if (this.mouth === 2) {
      // ver 2
      strokeWeight(3);
      noFill();
      line(-10, 18, 10, 18);
    }

    // nose
    if (this.facing === "right") {
      beginShape();
      vertex(0, 5);
      vertex(5, 10);
      vertex(0, 10);
      endShape();
    } else if (this.facing === "left") {
      beginShape();
      vertex(0, 5);
      vertex(-5, 10);
      vertex(0, 10);
      endShape();
    }

    pop();
  }

  display() {
    if (dist(mouseX, mouseY, this.x, this.y) < 50) {
      this.hovering = true;
      this.shadow = "#8C28BD";
    } else {
      this.hovering = false;
      this.shadow = "#4F136C";
    }

    push();
    translate(this.x / s, this.y / s);
    scale(0.1);
    this.drawBody();
    this.drawExpression();
    pop();
  }
}

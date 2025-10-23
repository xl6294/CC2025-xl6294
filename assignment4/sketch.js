let s;

let robots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  s = min(width, height) / 100;
  scale(s);
  strokeWeight(1 / s);
  noFill();
  rectMode(CORNERS);
}

function draw() {
  background("#f2dbfeff");

  scale(s);

  for (let i = 0; i < robots.length; i++) {
    robots[i].move();
    robots[i].getMidY();
  }

  // I want to illustrate the bots in a way that
  // the smaller the y coord they have, the earlier they are drawn
  // so on more backward layer
  // basically creating a visual depth where higher characters (smaller y coord value)
  // look more behind
  // so I use `Array.sort` here to rearrange the items in the array
  // everytime before drawing
  // I somehow find a line of code from the following webpage and make it work
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#sorting_array_of_objects
  robots.sort((a, b) => a.midY - b.midY);

  // drawing the shadows below each bot first
  for (let i = 0; i < robots.length; i++) {
    // robots[i].move();
    robots[i].drawShadow();
    // robots[i].display();
  }

  // drawing the bodies and then the expressions for each bot here
  for (let i = 0; i < robots.length; i++) {
    // robots[i].move();
    // robots[i].drawShadow();
    robots[i].display();
  }
}

function mousePressed() {
  let amIHovering = false;

  //https://www.w3docs.com/snippets/javascript/how-to-loop-through-array-and-remove-items-without-breaking-the-for-loop.html?utm_source=chatgpt.com
  for (let i = robots.length - 1; i >= 0; i--) {
    if (robots[i].hovering == true) {
      robots.splice(i, 1);
      amIHovering = true;
    }
  }

  if (amIHovering == false) {
    let randomType = random(["a", "b", "c", "d"]);
    let randomFacing = random(["left", "right"]);
    let randomEyes = random(["points", "dashes", "lashes"]);
    let randomMouth = random(["smile", "neutral"]);

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

    let r = floor(random(colorPairs.length));

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

    this.facing = facing;

    this.render = render;
    this.shade = shade;

    this.type = type;

    this.eyes = eyes;
    this.mouth = mouth;

    this.shadow = "#4F136C";
    this.speed = 0.5;
    this.midY;
    this.hovering = false;
  }

  getMidY() {
    if (this.type === "a") {
      this.midY = this.y + 2.5 * s;
    } else if (this.type === "b") {
      this.midY = this.y - 0.25 * s;
    } else if (this.type === "c") {
      this.midY = this.y;
    } else if (this.type === "d") {
      this.midY = this.y;
    }
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
    } else if (this.type == "b") {
      push();

      translate(0, 45);

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

    if (this.eyes === "points") {
      // ver 1
      strokeWeight(5);
      point(-7, 0);
      point(7, 0);
    } else if (this.eyes === "dashes") {
      // ver 2
      strokeWeight(3);
      line(-10, 0, -7, 0);
      line(7, 0, 10, 0);
    } else if (this.eyes === "lashes") {
      // ver 3
      strokeWeight(5);
      point(-7, 0);
      point(7, 0);
      strokeWeight(3);
      line(-10, -3, -7, 0);
      line(4, -3, 7, 0);
    }

    // mouth

    if (this.mouth === "smile") {
      // ver 1
      strokeWeight(3);
      noFill();
      arc(0, 0, 40, 40, PI / 3, (2 * PI) / 3, OPEN);
    } else if (this.mouth === "neutral") {
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
    // hovering over a bot will change its shadow color
    // (the change is set to not very drastic right now)
    if (dist(mouseX, mouseY, this.x, this.midY) < 7 * s) {
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

    // visualize the anchor points for testing
    // https://p5js.org/reference/p5/if/#:~:text=if%20(keyIsPressed%20%3D%3D%3D%20true%20%26%26%20key%20%3D%3D%3D%20%27p%27)%20%7B%0A%20%20text(%27You%20pressed%20the%20%22p%22%20key!%27%2C%2050%2C%2050)%3B%0A%7D
    if (keyIsPressed === true && key === "a") {
      push();
      stroke("white");
      strokeWeight(2);
      point(this.x / s, this.midY / s);
      pop();
    }
  }
}

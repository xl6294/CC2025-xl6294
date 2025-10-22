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

  robots.sort((a, b) => a.y - b.y);

  for (let i = 0; i < robots.length; i++) {
    robots[i].move();
    robots[i].drawShadow();
    // robots[i].display();
  }

  for (let i = 0; i < robots.length; i++) {
    robots[i].move();
    // robots[i].drawShadow();
    robots[i].display();
  }
}

function mousePressed() {
  // let types = ["a", "b"];
  let randomType = random(["a", "b", "c", "d"]);
  // let faces = ["left", "right"];
  let randomFacing = random(["left", "right"]);

  let r = random([0, 1, 2, 3]);

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

  // let render = ["yellow", "pink"];
  // let shade = ["orange", "red"];

  let tempRobot = new Robot(
    mouseX,
    mouseY,
    randomFacing,
    colorPairs[r].tone,
    colorPairs[r].accent,
    randomType
  );
  robots.push(tempRobot);
}

class Robot {
  constructor(x, y, facing, render, shade, type) {
    this.x = x;
    this.y = y;
    this.facing = facing;
    this.render = render;
    this.shade = shade;
    this.type = type;
    this.speed = 0.5;
  }

  move() {
    if (this.facing === "right") {
      this.x = (this.x + this.speed) % width;
    } else if (this.facing === "left") {
      this.x = (this.x - this.speed + width) % width;
    }
  }

  drawShadow() {
    push();
    translate(this.x / s, this.y / s);
    scale(0.1);

    if (this.type == "a") {
      push();

      translate(0, 75);

      noStroke();

      fill("#4F136C");
      ellipse(0, 0, 100, 30);

      pop();
    } else {
      push();

      translate(0, 50);

      noStroke();

      fill("#4F136C");
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

    // noStroke();

    // face
    // circle(0, 0, 50); // guide

    fill("black");
    circle(-7, 0, 5);
    circle(7, 0, 5);

    noFill();
    strokeWeight(3);

    if (this.facing === "right") {
      beginShape();
      vertex(0, 5);
      vertex(5, 10);
      vertex(0, 15);
      endShape();
    } else if (this.facing === "left") {
      beginShape();
      vertex(0, 5);
      vertex(-5, 10);
      vertex(0, 15);
      endShape();
    }

    pop();
  }

  display() {
    push();
    translate(this.x / s, this.y / s);
    scale(0.1);
    this.drawBody();
    this.drawExpression();
    pop();
  }
}

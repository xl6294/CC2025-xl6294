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
    robots[i].move(); // animate the robots
    robots[i].getMidY(); // calculate the y coords of visual center/anchor points of the bots
  }

  // I want to illustrate the robots in a way that
  // the smaller the y coord they have, the earlier they are drawn
  // so on more backward layer
  // basically creating a visual depth where higher robots
  // (with smaller midY coord value) would look more behind
  // so I use `Array.sort` here to rearrange the items in the array
  // everytime before drawing
  // I somehow find a line of code from the following webpage and make it work
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#sorting_array_of_objects
  robots.sort((a, b) => a.midY - b.midY);

  // the two for loops below draw all the shadows before illustrate all the robots
  // I did this so that all the shadows appear "on the ground"
  // (none of the shadows will overlap other robots even if they are right behind)
  // below draws the shadows below each robot first
  for (let i = 0; i < robots.length; i++) {
    robots[i].drawShadow();
  }
  // below draws the bodies and then the expressions for each robot here
  for (let i = 0; i < robots.length; i++) {
    robots[i].display();
  }
}

// when mouse is pressed,
// if the cursor hovers over any robot, the robot will be deleted using Array.splice()
// if the cursor does not hover over any robot,
// all the random class parameters will be assigned a random value
// a new robot object will be created and push to the `robots` array
function mousePressed() {
  let amIHovering = false;

  // when loop through the array and removing items
  // I found the forward iteration sometimes misses when clicking at two robots at the same time
  // from the link below, I realized that I should do the operation backwards
  // so no item will be skipped when the array updates after one splice()
  // https://www.w3docs.com/snippets/javascript/how-to-loop-through-array-and-remove-items-without-breaking-the-for-loop.html?utm_source=chatgpt.com
  for (let i = robots.length - 1; i >= 0; i--) {
    if (robots[i].hovering == true) {
      robots.splice(i, 1);
      amIHovering = true;
    }
  }

  if (amIHovering == false) {
    // using random() and mini arrays to assign types, etc.
    let randomType = random(["a", "b", "c", "d"]);
    let randomFacing = random(["left", "right"]);
    let randomEyes = random(["points", "dashes", "lashes"]);
    let randomMouth = random(["smile", "neutral"]);

    // when coloring the robots, I want each skin color
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

    // create a new robot object (at mouse position)
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
    // add the new robot to the `robots` array
    robots.push(tempRobot);
  }
}

class Robot {
  constructor(x, y, facing, render, shade, type, eyes, mouth) {
    // coords mainly used in translate()
    this.x = x;
    this.y = y;

    this.facing = facing; // determines the direction of the nose and movement for each robot

    this.render = render; // robot main/face color
    this.shade = shade; // robot accent/shade color

    this.type = type; // body shapes/compositions

    this.eyes = eyes; // eye shapes
    this.mouth = mouth; // mouth shapes

    this.shadow = "#4F136C"; // shadow color
    this.speed = 0.5;
    this.midY; // will calculate and store the y coords of visual center/anchor points of the robots
    this.hovering = false; // default
  }

  // the method below will calculate the y coords of visual center/anchor points of the robots
  // and store in this.midY
  // since the face circle of type "a" robots are at top,
  // and the type "b" robots are shorter,
  // their `this.midY` are corrected
  getMidY() {
    if (this.type === "a") {
      this.midY = this.y + 2.5 * s;
    } else if (this.type === "b") {
      this.midY = this.y - 0.25 * s;
    } else {
      this.midY = this.y;
    }
  }

  move() {
    // the direction of the robot movement is determined by `facing`
    // (`facing` also determines the direction of the nose)
    // robots move horizontally, left or right
    // when hitting the edge
    // robots will appear again on the other edge and loop movement
    // (wonder if there is a function specifically for wrapped movement)
    if (this.facing === "right") {
      this.x = (this.x + this.speed) % width;
    } else if (this.facing === "left") {
      this.x = (this.x - this.speed + width) % width;
    }
  }

  // below draws a shadow below each body of the robots
  drawShadow() {
    push();
    translate(this.x / s, this.y / s);
    scale(0.1);

    // since the face circle of type "a" robots are at top,
    // and the type "b" robots are shorter,
    // their "translate()" values are different
    // when drawing the shadow circles
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

  // below draws the body of the robots
  // where center of the face circles is the mouse position when clicked
  // depending on `randomType` => `this.type`
  drawBody() {
    if (this.type == "a") {
      push();
      translate(0, 25);
      noStroke();
      // bottom circle
      fill(this.render);
      circle(0, 25, 50);
      // middle circles (body and arms)
      fill(this.shade);
      circle(-25, 0, 50);
      circle(0, 0, 50);
      circle(25, 0, 50);
      // face circle
      fill(this.render);
      circle(0, -25, 50);
      pop();
    } else if (this.type == "b") {
      push();
      noStroke();
      // bottom circles
      fill(this.shade);
      circle(-25, 20, 50);
      circle(25, 20, 50);
      // face circle
      fill(this.render);
      circle(0, 0, 50);
      // top (hair) circles
      fill(this.shade);
      circle(-15, -25, 50);
      circle(15, -25, 50);
      pop();
    } else if (this.type == "c") {
      push();
      noStroke();
      // bottom circles
      fill(this.shade);
      circle(-25, 25, 50);
      circle(25, 25, 50);
      // face circle
      fill(this.render);
      circle(0, 0, 50);
      // top (hair) circles
      fill(this.shade);
      circle(-25, -25, 50);
      circle(25, -25, 50);
      circle(0, -15, 20);
      pop();
    } else if (this.type == "d") {
      push();
      noStroke();
      // middle non-head circles
      fill(this.shade);
      circle(-25, 0, 50);
      circle(25, 0, 50);
      // top and bottom darker circles
      fill(this.render);
      circle(25, -25, 50);
      circle(-25, 25, 50);
      // top and bottom lighter circles
      fill(this.shade);
      circle(0, -25, 50);
      circle(0, 25, 50);
      circle(-25, -25, 50);
      circle(25, 25, 50);
      // face circle
      fill(this.render);
      circle(0, 0, 50);
      pop();
    }
  }

  // below draws the expression of the robots
  // over the the face circles
  // (the eyes are at the middle level of the face circles)
  // using `point()`, `line()`,
  // `arc()`, `beginShape()` and `endShape()` with `noFill()`
  // so they are mainly controlled by `stroke()` and `strokeWeight()`
  // different from the body circles
  drawExpression() {
    push();

    // below is the drawing testing guide
    // which draws the circle at the face circle
    // circle(0, 0, 50);

    // I do not want the nose corners to be sharp
    // so below I use `strokeJoin(ROUND)`
    // from https://p5js.org/reference/p5/strokeJoin/
    strokeJoin(ROUND);

    // below draws the eyes of the robot
    // depending on `randomEyes` => `this.eyes`
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

    // below draws the mouth of the robot
    // depending on `randomMouth` => `this.mouth`
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

    // below draws the nose of the robot
    // depending on `randomFacing` => `this.facing`
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
    // hovering over a robot will change its shadow color
    // (the change is set to be not very drastic right now)
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

// Sketch1.js — instance mode conversion (logic unchanged)
const sketch1 = (p) => {
  let d;
  let lerpSec;
  let lerP;
  let ms; // keep ms local to this instance

  let colorPairs = [
    { tone: "#FFD400", accent: "#FF8C1A" },
    { tone: "#CCF20D", accent: "#0DA540" },
    { tone: "#47EBEB", accent: "#2060DF" },
    { tone: "#ff8fc7ff", accent: "#DF3020" },
  ];

  // Robot body drawing data

  p.setup = function () {
    p.createCanvas(400, 400);
    p.noFill();
    p.noStroke();
    p.rectMode(p.CORNERS);
  };

  p.draw = function () {
    d = new Date();
    ms = d.getMilliseconds();

    lerpSec = p.second() + ms / 1000;
    // lerpSec = (p.second() + 20 + ((ms / 1000) % 1)) % 60;
    // lerpSec = (p.second() + 40 + ((ms / 1000) % 1)) % 60;

    p.translate(200, 200);
    p.scale(3);

    p.background("white");

    if (lerpSec >= 0 && lerpSec < 20) {
      p.push();
      p.noStroke();
      // bottom circles
      p.fill(colorPairs[0].accent);
      Circle(-25, 20, 50);
      Circle(25, 20, 50);
      // face circle
      p.fill(colorPairs[0].tone);
      Circle(0, 0, 50);

      // expression
      p.push();
      p.strokeJoin(p.ROUND);
      p.stroke("black");
      // pointed eyes
      p.strokeWeight(5);
      p.point(-7, 0);
      p.point(7, 0);
      // smiling mouth
      p.strokeWeight(3);
      p.noFill();
      p.arc(0, 0, 40, 40, p.PI / 3, (2 * p.PI) / 3, p.OPEN);
      // left facing nose
      p.strokeWeight(3);
      p.beginShape();
      p.vertex(0, 5);
      p.vertex(-5, 10);
      p.vertex(0, 10);
      p.endShape();
      p.pop();

      // top (hair) circles
      p.fill(colorPairs[0].accent);
      Circle(-15, -25, 50);
      Circle(15, -25, 50);
      p.pop();
    } else if (lerpSec >= 20 && lerpSec < 40) {
      p.push();
      p.noStroke();
      // bottom circles
      p.fill(colorPairs[1].accent);
      Circle(-25, 25, 50);
      Circle(25, 25, 50);
      // face circle
      p.fill(colorPairs[1].tone);
      Circle(0, 0, 50);

      // expression
      p.push();
      p.strokeJoin(p.ROUND);
      p.stroke("black");
      // dash eyes
      p.strokeWeight(3);
      p.line(-10, 0, -7, 0);
      p.line(7, 0, 10, 0);
      // neutral mouth
      p.strokeWeight(3);
      p.noFill();
      p.line(-10, 18, 10, 18);
      // left facing nose
      p.strokeWeight(3);
      p.beginShape();
      p.vertex(0, 5);
      p.vertex(-5, 10);
      p.vertex(0, 10);
      p.endShape();
      p.pop();

      // top (hair) circles
      p.fill(colorPairs[1].accent);
      Circle(-25, -25, 50);
      Circle(25, -25, 50);
      Circle(0, -15, 20);
      p.pop();
    } else if (lerpSec >= 40 && lerpSec < 60) {
      p.push();
      p.noStroke();
      // middle non-head circles
      p.fill(colorPairs[2].accent);
      Circle(-25, 0, 50);
      Circle(25, 0, 50);
      // top and bottom darker circles
      p.fill(colorPairs[2].tone);
      Circle(25, -25, 50);
      Circle(-25, 25, 50);
      // top and bottom lighter circles
      p.fill(colorPairs[2].accent);
      Circle(0, -25, 50);
      Circle(0, 25, 50);
      Circle(-25, -25, 50);
      Circle(25, 25, 50);
      // face circle
      p.fill(colorPairs[2].tone);
      Circle(0, 0, 50);

      // expression
      p.push();
      p.strokeJoin(p.ROUND);
      p.stroke("black");
      // eyes with lashes
      p.strokeWeight(5);
      p.point(-7, 0);
      p.point(7, 0);
      p.strokeWeight(3);
      p.line(-10, -3, -7, 0);
      p.line(4, -3, 7, 0);
      // smiling mouth
      p.strokeWeight(3);
      p.noFill();
      p.arc(0, 0, 40, 40, p.PI / 3, (2 * p.PI) / 3, p.OPEN);
      // left facing nose
      p.strokeWeight(3);
      p.beginShape();
      p.vertex(0, 5);
      p.vertex(-5, 10);
      p.vertex(0, 10);
      p.endShape();
      p.pop();

      p.pop();
    }

    if (
      (lerpSec >= 0 && lerpSec <= 4) ||
      (lerpSec >= 16 && lerpSec <= 24) ||
      (lerpSec >= 36 && lerpSec <= 44) ||
      (lerpSec >= 56 && lerpSec <= 60)
    ) {
      p.push();
      p.fill("white");
      p.rect(-200, -200, 200, 200);
      p.pop();
    }

    if (lerpSec >= 0 && lerpSec <= 5) {
      p.push();
      p.fill(colorPairs[0].accent);
      p.circle(400 - 25 * ((lerpSec + 12) % 16), 0, 50);
      p.pop();
    } else if (lerpSec >= 20 && lerpSec <= 25) {
      p.push();
      p.fill(colorPairs[1].accent);
      p.circle(400 - 25 * ((lerpSec + 8) % 16), 0, 50);
      p.pop();
    } else if (lerpSec >= 40 && lerpSec <= 45) {
      p.push();
      p.fill(colorPairs[2].tone);
      p.circle(400 - 25 * ((lerpSec + 4) % 16), 0, 50);
      p.translate(400 - 25 * ((lerpSec + 4) % 16), 0);
      // expression
      p.push();
      p.strokeJoin(p.ROUND);
      p.stroke("black");
      // eyes with lashes
      p.strokeWeight(5);
      p.point(-7, 0);
      p.point(7, 0);
      p.strokeWeight(3);
      p.line(-10, -3, -7, 0);
      p.line(4, -3, 7, 0);
      // smiling mouth
      p.strokeWeight(3);
      p.noFill();
      p.arc(0, 0, 40, 40, p.PI / 3, (2 * p.PI) / 3, p.OPEN);
      // left facing nose
      p.strokeWeight(3);
      p.beginShape();
      p.vertex(0, 5);
      p.vertex(-5, 10);
      p.vertex(0, 10);
      p.endShape();
      p.pop();
      p.pop();
    }

    if (lerpSec >= 15 && lerpSec <= 20) {
      p.push();
      p.fill(colorPairs[0].accent);
      p.circle(-25 * (lerpSec % 16), 0, 50);
      p.pop();
    } else if (lerpSec >= 35 && lerpSec <= 40) {
      p.push();
      p.fill(colorPairs[1].accent);
      p.circle(-25 * ((lerpSec + 12) % 16), 0, 50);
      p.pop();
    } else if (lerpSec >= 55 && lerpSec <= 60) {
      p.push();
      p.fill(colorPairs[2].tone);
      p.circle(-25 * ((lerpSec + 8) % 16), 0, 50);
      p.translate(-25 * ((lerpSec + 8) % 16), 0);
      // expression
      p.push();
      p.strokeJoin(p.ROUND);
      p.stroke("black");
      // eyes with lashes
      p.strokeWeight(5);
      p.point(-7, 0);
      p.point(7, 0);
      p.strokeWeight(3);
      p.line(-10, -3, -7, 0);
      p.line(4, -3, 7, 0);
      // smiling mouth
      p.strokeWeight(3);
      p.noFill();
      p.arc(0, 0, 40, 40, p.PI / 3, (2 * p.PI) / 3, p.OPEN);
      // left facing nose
      p.strokeWeight(3);
      p.beginShape();
      p.vertex(0, 5);
      p.vertex(-5, 10);
      p.vertex(0, 10);
      p.endShape();
      p.pop();
      p.pop();
    }

    //   p.push();
    //   p.stroke("red");
    //   p.circle(400 - 25 * (lerpSec % 16), 0, 50);
    //   p.circle(-25 * (lerpSec % 16), 0, 50); // 1st
    //   p.stroke("green");
    //   p.circle(400 - 25 * ((lerpSec + 4) % 16), 0, 50); // 3rd
    //   p.circle(-25 * ((lerpSec + 4) % 16), 0, 50);
    //   p.stroke("blue");
    //   p.circle(400 - 25 * ((lerpSec + 8) % 16), 0, 50); // 2nd
    //   p.circle(-25 * ((lerpSec + 8) % 16), 0, 50); // 3rd
    //   p.stroke("black");
    //   p.circle(400 - 25 * ((lerpSec + 12) % 16), 0, 50); // 1st
    //   p.circle(-25 * ((lerpSec + 12) % 16), 0, 50); // 2nd
    //   p.pop();

    // p.push();
    // p.fill("black");
    // p.text(lerP, -50, -50);
    // p.text(p.second(), -50, -40);
    // p.pop();

    // p.push();
    // p.stroke("black");
    // p.rect(-200, -200, 200, 200);
    // p.pop();
  };

  function Circle(x, y, d) {
    lerP = p.constrain(0.5 - 1.5 * p.cos(((lerpSec % 20) * p.PI) / 10), 0, 1);
    p.circle(lerP * x, lerP * y, d);
  }
};

// Mount this sketch into the div with id="sketch1"
new p5(sketch1, "sketch1");

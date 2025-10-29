// Sketch2.js — instance mode
const sketch2 = (p) => {
  let d, lerpSec, lerP, ms;

  let colorPairs = [
    { tone: "#FFD400", accent: "#FF8C1A" },
    { tone: "#CCF20D", accent: "#0DA540" },
    { tone: "#47EBEB", accent: "#2060DF" },
    { tone: "#ff8fc7ff", accent: "#DF3020" },
  ];

  p.setup = function () {
    p.createCanvas(400, 400);
    p.noFill();
    p.noStroke();
    p.rectMode(p.CORNERS);
  };

  p.draw = function () {
    d = new Date();
    ms = d.getMilliseconds();

    lerpSec = (p.second() + 20 + ms / 1000) % 60;

    p.translate(200, 200);
    p.scale(3);
    p.background("white");

    if (lerpSec >= 0 && lerpSec < 20) {
      p.push();
      p.noStroke();
      p.fill(colorPairs[0].accent);
      Circle(-25, 20, 50);
      Circle(25, 20, 50);
      p.fill(colorPairs[0].tone);
      Circle(0, 0, 50);

      p.push();
      p.strokeJoin(p.ROUND);
      p.stroke("black");
      p.strokeWeight(5);
      p.point(-7, 0);
      p.point(7, 0);
      p.strokeWeight(3);
      p.noFill();
      p.arc(0, 0, 40, 40, p.PI / 3, (2 * p.PI) / 3, p.OPEN);
      p.strokeWeight(3);
      p.beginShape();
      p.vertex(0, 5);
      p.vertex(-5, 10);
      p.vertex(0, 10);
      p.endShape();
      p.pop();

      p.fill(colorPairs[0].accent);
      Circle(-15, -25, 50);
      Circle(15, -25, 50);
      p.pop();
    } else if (lerpSec >= 20 && lerpSec < 40) {
      p.push();
      p.noStroke();
      p.fill(colorPairs[1].accent);
      Circle(-25, 25, 50);
      Circle(25, 25, 50);
      p.fill(colorPairs[1].tone);
      Circle(0, 0, 50);

      p.push();
      p.strokeJoin(p.ROUND);
      p.stroke("black");
      p.strokeWeight(3);
      p.line(-10, 0, -7, 0);
      p.line(7, 0, 10, 0);
      p.strokeWeight(3);
      p.noFill();
      p.line(-10, 18, 10, 18);
      p.strokeWeight(3);
      p.beginShape();
      p.vertex(0, 5);
      p.vertex(-5, 10);
      p.vertex(0, 10);
      p.endShape();
      p.pop();

      p.fill(colorPairs[1].accent);
      Circle(-25, -25, 50);
      Circle(25, -25, 50);
      Circle(0, -15, 20);
      p.pop();
    } else if (lerpSec >= 40 && lerpSec < 60) {
      p.push();
      p.noStroke();
      p.fill(colorPairs[2].accent);
      Circle(-25, 0, 50);
      Circle(25, 0, 50);
      p.fill(colorPairs[2].tone);
      Circle(25, -25, 50);
      Circle(-25, 25, 50);
      p.fill(colorPairs[2].accent);
      Circle(0, -25, 50);
      Circle(0, 25, 50);
      Circle(-25, -25, 50);
      Circle(25, 25, 50);
      p.fill(colorPairs[2].tone);
      Circle(0, 0, 50);

      p.push();
      p.strokeJoin(p.ROUND);
      p.stroke("black");
      p.strokeWeight(5);
      p.point(-7, 0);
      p.point(7, 0);
      p.strokeWeight(3);
      p.line(-10, -3, -7, 0);
      p.line(4, -3, 7, 0);
      p.strokeWeight(3);
      p.noFill();
      p.arc(0, 0, 40, 40, p.PI / 3, (2 * p.PI) / 3, p.OPEN);
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
      p.push();
      p.strokeJoin(p.ROUND);
      p.stroke("black");
      p.strokeWeight(5);
      p.point(-7, 0);
      p.point(7, 0);
      p.strokeWeight(3);
      p.line(-10, -3, -7, 0);
      p.line(4, -3, 7, 0);
      p.strokeWeight(3);
      p.noFill();
      p.arc(0, 0, 40, 40, p.PI / 3, (2 * p.PI) / 3, p.OPEN);
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
      p.push();
      p.strokeJoin(p.ROUND);
      p.stroke("black");
      p.strokeWeight(5);
      p.point(-7, 0);
      p.point(7, 0);
      p.strokeWeight(3);
      p.line(-10, -3, -7, 0);
      p.line(4, -3, 7, 0);
      p.strokeWeight(3);
      p.noFill();
      p.arc(0, 0, 40, 40, p.PI / 3, (2 * p.PI) / 3, p.OPEN);
      p.strokeWeight(3);
      p.beginShape();
      p.vertex(0, 5);
      p.vertex(-5, 10);
      p.vertex(0, 10);
      p.endShape();
      p.pop();
      p.pop();
    }

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

new p5(sketch2, "sketch2");

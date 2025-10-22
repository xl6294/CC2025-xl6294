let eye1;

let pX = 0;
let pY = 0;

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;

let lerpAmount = 1;
let speed = 0.05;

let prevS = 0;

function setup() {
  // runs once at the start
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);

  eye1 = new EyeBall(200, 200, 100, 150, 0, 100);
}

function draw() {
  background(0);
  currentX = lerp(pX, targetX, lerpAmount);
  currentY = lerp(pY, targetY, lerpAmount);

  eye1.x = currentX;
  eye1.y = currentY;
  eye1.display();

  lerpAmount += speed;
  lerpAmount = constrain(lerpAmount, 0, 1);

  if (second() != prevS) {
    prevS = second();
    pX = currentX;
    pY = currentY;
    targetX = random(width);
    targetY = random(height);
    lerpAmount = 0;
  }
}

function mousePressed() {
  pX = currentX;
  pY = currentY;
  targetX = mouseX;
  targetY = mouseY;
  lerpAmount = 0;
}

class EyeBall {
  constructor(x, y, w, h, r, t) {
    this.x = x;
    this.y = y;

    this.w = w; // width
    this.h = h; // height

    this.speed = 0.005;
    this.noiseR = r;
    this.noiseT = t;
  }
  display() {
    push();
    translate(this.x, this.y);

    fill(255);
    ellipse(0, 0, this.w, this.h);

    let eyeTheta = noise(this.noiseT) * 360;
    let eyeXRadius = (noise(this.noiseR) * this.w) / 2;
    let eyeYRadius = (noise(this.noiseR) * this.h) / 2;

    let eyeX = cos(eyeTheta) * eyeXRadius;
    let eyeY = sin(eyeTheta) * eyeYRadius;

    fill(0);
    ellipse(eyeX, eyeY, this.w / 2, this.h / 2);

    this.noiseR += this.speed;
    this.noiseT += this.speed;
    pop();
  }
}

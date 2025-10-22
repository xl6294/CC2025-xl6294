let points = [];
let lineStart = 0;
let lineEnd = 0;

// Object Literal
let otherPoints = [
  { x: 0, y: 0 }, // center
  { x: 0, y: -100 },
  { x: 85, y: 50 },
  { x: -85, y: 50 },
  { x: 0, y: 100 },
  { x: -85, y: -50 },
  { x: 85, y: -50 },
];

function setup() {
  // runs once at the start
  createCanvas(windowWidth, windowHeight);

  points = [
    createVector(0, 0), // center
    createVector(0, -100),
    createVector(85, 50),
    createVector(-85, 50),
    createVector(0, 100),
    createVector(-85, -50),
    createVector(85, -50),
  ];
}

function draw() {
  noLoop();
  // runs in a loop after setup
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  strokeWeight(5);

  for (let i = 0; i < points.length; i++) {
    point(points[i].x, points[i].y);
  }

  stroke("red");
  line(
    points[lineStart].x,
    points[lineStart].y,
    points[lineEnd].x,
    points[lineEnd].y
  );

  // console.log(random(1, 9));
  // console.log(floor(random(1, 9)));

  let lineAmount = floor(random(1, 9));
  for (let i = 0; i < lineAmount; i++) {
    let start = floor(random(points.length));
    let end = floor(random(points.length));
    line(points[start].x, points[start].y, points[end].x, points[end].y);
  }
}

function mousePressed() {
  lineStart = floor(random(points.length));
  lineEnd = floor(random(points.length));
}

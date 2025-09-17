// variable declaration:
// "let" is a keyword that allows you to declare a variable
// in the below example, a new variable is being created
// called "circleSize" which is storing a number

let circleSize;

function setup() { // runs once at the start
  // createCanvas(windowWidth, windowHeight);
  createCanvas(windowWidth,windowHeight); // set a 400 px by 400 px canvas
  // background("rgba(235, 153, 123, 1)"); // color picker function

  circleSize = width * 0.25; // "=" sets the value circleSize

}

function draw() { // runs in a loop after setup
  console.log(mouseX / width + " " + mouseY / height)
  // a grayscale color is denoted as a number 0-255
  // an rgb color is denoted as 3 numbers (red green blue)
  // background(127, 54, 200);
  // we can use the name of a color like "black" or "olive"
  // background("olivedrab");
  background("rgba(235, 153, 123, 1)"); // color picker function

  noStroke();
  fill("#e2d02dff");

  rect(0, 0, width / 2, height / 2); // a rect in top left corner

  rect(width / 2, height / 2, width, height);


  // stroke() and fill() change the color of drawn shapes
  stroke("rgba(107, 181, 33, 1)");
  fill("rgba(50, 81, 191, 1)");

  strokeWeight(5);
  // noStroke(); // gets rid of the stroke completely
  // noFill(); // gets rid of the fill completely

  // circle taks 3 parameters: x, y and d:
  circle(200, 100, circleSize); // circle(x, y, d)

  // setting a new fill for my rectangle
  fill("rgba(191, 50, 106, 1)");
  // rect() takes 4 parameters:
  // x coord of top left, y coord of top left, width and height
  rect(100, 80, 100, 15);

  // ellipse takes 4 parameters:
  // x coord of center, y coord of center, width and height
  ellipse(250, 80, 10, 20);

  // line connects two coords: x1, y1, x2, y2
  line(250, 130, 260, 130);

  // to draw complex polygons (more than 2 coords):
  // create a beginShape(); function and an endShape(); function
  // any vertex(x, y); functions you place inbetween beginShape and endShape
  //will be rendered as points in a complete polygon

  // strokeJoin(ROUND)
  beginShape();
  vertex(100, 100); // left-most coord
  vertex(200, 100); // top-right coord
  vertex(200, 150); // bottom-most coord
  endShape(CLOSE); // CLOSE parameter closes the polygon

  // system variables:
  // width
  // height
  // mouseX
  // mouseY

  fill("rgba(232, 230, 129, 1)");
  // circle(width / 2, height * 0.75, circleSize);

  // ellipse(mouseX, mouseY, mouseX / 3, 30)

  // arcs are like ellipses, except they have two extra parameters;
  // START and END, which are provided in RADIANS format
  // you can convert degrees to radians using the radians(); function
  arc(width / 2, height * 0.75, 100, 100, radians(30), radians(330), PIE);

  // curve
  // quadraticVertex()

}

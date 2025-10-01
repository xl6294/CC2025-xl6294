

function setup() { // runs once at the start
  createCanvas(windowWidth, windowHeight);
  
}

function draw() { // runs in a loop after setup
  // Any translations are reset
  // at the beginning of draw
  background('#caf6aaff');
  circle(100, 100, 100);
  circle(85, 90, 5);
  circle(115, 90, 5);
  arc(100, 100, 60, 60, 0, PI)

  // push and pop ISOLATE a transformation
  // anything enclosed within push and pop only applies
  // within that enclosure

  // push();
  // rotate(radians(mouseX));
  // stroke("white");
  // strokeWeight(5);
  // line(0, 0, 300, 0);
  // pop();

  push(); // push indicates the beginning of an isolated block

  //&& both meet; || or one meets
  if (mouseX > width / 2 && mouseY > height / 2) {
    fill('pink'); // runs this code
  } else if (mouseX < width / 2 && mouseY < height / 2) { 
    fill('orange');
  } else if (mouseX < width / 2 && mouseY < height / 2) {
       // otherwise
    fill('yellow'); // run this other code
  }

    // mouseIsPressed is a system variable that switches
    // from false to true when pressed
  if (mouseIsPressed == true) {
    fill('red');
  }


  // transformation system
  // translate is a TRANSFORMATION function
  // it moves the coords matrix according to
  // a new set of coords, which become
  // the  "new" 0,0
  translate(width / 2, height / 2);

  let angle;

  //map is a function that scales numbers proportionately
  //parameters:
  //1: input variable to scale
  //2: low end of input range
  //3: HIGH END of input range
  //4: low end of the output range
  //5: high end of the output range
  angle = map(mouseX,0,width,0,360)

  rotate(radians(angle));

  let scaleFactor; // making a variable to hold scale ammount
  scaleFactor = map(mouseX, 0, height,0.1, 3);

  //scale makes the coordinate system larger or smaller
  //it takes a "factor" as a parameter
  //if you supply two parameters, it scales differently on x and y axes
  scale(scaleFactor);

  circle(0, 0, 100);
  circle(-15, -10, 5);
  circle(15, -10, 5);
  arc(0, 0, 60, 60, 0, PI)

  pop(); // pop indicates the end of an isolated block

  // text function: text, x, y of top left corner
  text(mouseX + ", " + mouseY, 5, 15)
  // Anything drawn last will show on top

}

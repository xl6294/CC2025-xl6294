

function setup() { // runs once at the start
  createCanvas(windowWidth, windowHeight);
  
  // iteration operations:
  // i ++
  // i += 10
  // i --
  // i -= 5

  // for (let i = 0; i < 10; i ++) {
  //   console.log(i);
  // }


}

function draw() { // runs in a loop after setup
  background('#efd4afff');

  for (let x = 50; x < width - 50; x += 100) {

  push();

  translate(x, 50);
  // everythingwithin this push/pop block
  // will be centered, with 0, 0 as the center point

  strokeWeight(3);
  fill('#efd65bff');
  circle(0, 0, 100);
  circle(-15, -10, 10);
  circle(15, -10, 10);
  arc(0, 0, 60, 60, radians(30), radians(150));

  pop();

  }


}

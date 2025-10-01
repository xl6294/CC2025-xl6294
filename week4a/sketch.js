function setup() {
  // runs once at the start
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

function draw() {
  // runs in a loop after setup
  background("#efd4afff");
  //noLoop(); //prevents from looping

  // for (let x = 50; x < width - 50; x += 100) {
  //   push();

  //   translate(x, 50);
  //   // everythingwithin this push/pop block
  //   // will be centered, with 0, 0 as the center point

  //   strokeWeight(3);
  //   fill("#efd65bff");
  //   let happiness = map(x, 0, width, 0, 1);
  //   circle(0, 0, 100);
  //   circle(-15, -10, 10);
  //   circle(15, -10, 10);
  //   arc(0, 0, 60, 60, sin(x), cos(x)); // ???

  //   pop();
  // }

  for (let y = 50; y < height - 50; y += 100){
    
    for (let x = 50; x < width - 50; x += 100) {
      //circle(x, 50, 100);
      push();
      translate(x, y);
      let rotation = map(y, 50, height-50, 0, 2 * PI);
      rotate(rotation);
      //everything within this push/pop block will be centered, with 0, 0 as the center point
      let randomRotation;
      let randomAmount = 0.075;
      let randomXDisp;
      let randomYDisp;

      //let scaleFactor = y / height;
      //scale(scaleFactor);

      randomXDisp = random(-y * randomAmount, y * randomAmount);
      randomYDisp = random(-y * randomAmount, y * randomAmount);
      if (mouseIsPressed == true) {
        translate(randomXDisp, randomYDisp);
      }

      strokeWeight(3);
      fill("#ecfac1ff");
      circle(0, 0, 100);
      circle(-15, -10, 10);
      circle(15, -10, 10);
      let happiness;
      happiness = map(x, 0, width, -25, 25);
      noFill();
      arc(0, 0, 60, 60, radians(0 - happiness), radians(180 + happiness));
      pop();
    }
  }

  
}

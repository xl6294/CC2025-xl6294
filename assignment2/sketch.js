let eW; // ellipse width (used for petal arc thickness)
let eH; // ellipse height (used for petal arc length)

let numP; // number of petal arcs drawn per grid cell

let windSpeed = 0; // assign this variable for rotation animation speed to '0' globally so the animation will pause instead of resetting when mouse is released
let a; // variable altering eH when mouse is pressed/released

function setup() {
  createCanvas(windowWidth, windowHeight); // full window canvas
  noStroke(); // no stroke on shapes
  colorMode(HSB); // use HSB color space
}

function draw() {
  background(60, 20, 100, 1); // set background color

  a = 0; // reset control variable each loop in case mouse is released
  b = 1; // so pistils are opaque

  // when mouse is pressed, start animating rotation + alter composition
  if (mouseIsPressed == true) {
    windSpeed = frameCount / 30; // continuous increase over time/loops
    a = 50; // offset eH from [0~50] to [-50~0]
    b = 0; // hide the pistils
  }

  // two dimensional for loop
  for (let y = 0; y < height - 50; y += 100) {
    for (let x = 0; x < width - 50; x += 100) {
      push();
      translate(x, y); // shift origin to top-left of current grid cell

      numP = 3 + floor(y / 100); // number of petals increase by row

      eW = map(x, 0, windowWidth, 10, 75); // map x-position to petal arc width

      // petal arc height (thickness) depends on the distance between cursor and the grid cell center
      // maps distance [0~100√2] within range [0~50], min() function makes sure there is no exceeding
      // When mouse is pressed, a = 50, rang of eH will offset from [0~50] to [-50~0], no exceeding
      eH = min(
        50 - a,
        map(
          // formatted by Prettier
          dist(mouseX, mouseY, x + 50, y + 50), // note that the coords of the grid cell center is (x + 50, y + 50)
          0,
          100 * sqrt(2), // this value controls the effective range of the cursor
          0 - a,
          50 - a
        )
      );

      // change the fill color and opacity diagonally
      fill(
        // formatted by Prettier
        map(abs(x - y), 0, max(windowWidth, windowHeight), 0, 360), // hue changes from bottom-left to top-right
        100,
        100,
        map(x + y, 0, windowWidth + windowHeight, 1, 0) //opacity decreases from top-left to bottom-right
      );

      // enable the section below will show the hidden flower when the mouse is pressed
      if (eH == 0) {
        // stroke(1); // optional outline if enabled
        fill("rgba(181,181,181,0.1)"); // when the flower is invisible, draw a faint placeholder
        eH = min(
          50,
          map(dist(mouseX, mouseY, x + 50, y + 50), 0, 100 * sqrt(2), 0, 50)
        );
      }

      push();

      fill(60, 100, 100, b);
      circle(50, 50, 100 - 2 * eH); // illustrate the pistils where the flowers have a central hole

      pop();

      // this for loop draw the individual petal arcs repeatedly in each cell through rotation
      for (i = 0; i < numP; i++) {
        push();

        translate(50, 50); // move origin to cell center
        // scale(0.8); // enable if to shrink each flower
        rotate((i * 2 * PI) / numP + windSpeed); // when windSpeed is relative to frameCount, spinning animation will occur
        arc(0, eH / 2 - 50, eW, eH, -PI / 2, PI / 2, PIE); // arc(x, y, w, h, start, stop, [mode], [detail])

        pop();
      }
      pop();
    }
  }
}

let overlay;
let frame;

let items = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // find html elements
  overlay = document.getElementById("overlay");
  frame = document.getElementById("myFrame");

  for (let i = 0; i < gameObjects.exhibits.length; i++) {
    let exhibit = gameObjects.exhibits[i];

    let x = exhibit.tileX;
    let y = exhibit.tileY;

    if (y < floorplan.length && x < floorplan[0].length) {
      floorplan[y][x] = 1;
    }
  }
}

function draw() {
  background(100);

  // draw the wall
  fill("beige");
  rect(50, 50, columns * tileSize, wH);
  translate(50, 50 + wH);

  // this updates the position of player
  playerMovement();

  // this empties the items list
  items = [];

  push();

  scale(1, vs);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      // draw the tiles
      push();

      if (floorplan[i][j] === 1) {
        fill(120); // occupied shadow

        // Find which gameObject is at this tile
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        let theExhibit = gameObjects.exhibits.find(
          (element) => element.tileX === j && element.tileY === i
        );
        let name = theExhibit.name;
        let h = theExhibit.height;

        let tempItem = new Item(
          (j + 0.5) * tileSize,
          (i + 0.5) * tileSize * vs,
          "object",
          name,
          h
        );
        items.push(tempItem);
      } else {
        fill(255); // floor
      }

      stroke(0);
      rect(j * tileSize, i * tileSize, tileSize, tileSize);

      pop();
    }
  }

  // draw the player circle here
  push();
  fill(120);
  circle(player.x, player.y, player.d);

  // draw collision guiding points
  strokeWeight(3);
  stroke("red");
  point(leftX, topY);
  point(rightX, topY);
  point(leftX, bottomY);
  point(rightX, bottomY);
  pop();

  pop();

  playerPosition = createVector(player.x, player.y * vs);
  push();
  strokeWeight(3);
  stroke("green");
  point(playerPosition.x, playerPosition.y);
  pop();

  let tempItem = new Item(playerPosition.x, playerPosition.y, "player");
  items.push(tempItem);

  items.sort((a, b) => a.y - b.y);

  for (let i = 0; i < items.length; i++) {
    items[i].display();
  }

  // DRAW THE INFO BOX
  if (itemActivated && selectedExhibit) {
    push();
    resetMatrix(); // https://p5js.org/reference/p5/resetMatrix/

    translate(420, 50);

    fill(255);
    stroke(0);
    strokeWeight(1);
    rect(0, 0, 350, 380);

    noStroke();
    fill(0);
    // textAlign(LEFT);
    textSize(16);

    // Simple list of data
    text("Name: " + selectedExhibit.name, 20, 40);

    pop();
  }
}

function mousePressed() {
  // overcome translate()
  let mx = mouseX - 50;
  let my = mouseY - (50 + wH);

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    // Check if this item was clicked
    if (item.type === "object" && item.isTouchPointClicked(mx, my)) {
      // html
      if (item.name === "mini-lawn" || item.name === "micro-view") {
        itemActivated = false;
        selectedExhibit = null;

        // Display HTML overlay
        overlay.style.display = "block";

        if (item.name === "mini-lawn") {
          frame.src = "https://xl6294.github.io/CC2025-xl6294/assignment2/";
        } else if (item.name === "micro-view") {
          frame.src = "https://xl6294.github.io/CC2025-xl6294/assignment3/";
        }
        // End the function
        return;
      }

      // p5 Info Boxes
      else {
        // make sure html does not show
        overlay.style.display = "none";

        // Enable p5 info box
        selectedExhibit = item;
        itemActivated = true;
        return;
      }
    }
  }

  closeDetailPanel();
}

function closeDetailPanel() {
  itemActivated = false;
  selectedExhibit = null;

  overlay.style.display = "none";

  // window.focus(); // advice from friend, will verify
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // bgmSong.loop();

  // find html elements from index.html
  overlay = document.getElementById("overlay");
  frame = document.getElementById("myFrame");

  // mark the tiles with entities as "occupied" (1) in the floorplan matrix
  for (let i = 0; i < gameObjects.entities.length; i++) {
    let entity = gameObjects.entities[i];

    // tile coordinates ftom json
    let x = entity.tileX;
    let y = entity.tileY;

    // if (y < floorplan.length && x < floorplan[0].length) { // only marks if the tile is inside the floorplan bounds
    floorplan[y][x] = 1;
    // }
  }
}

function draw() {
  background(100);

  // draw the wall
  fill("beige");
  rect(50, 50, columns * tileSize, wH); // hard-coded value, will change later ////////////////////
  translate(50, 50 + wH);

  // this updates the position of player and check collision
  playerMovement();

  // this empties the items list each frame
  items = [];

  push();

  // squash y to fake top down perspective
  scale(1, vs);

  // draw the tiles below
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      push();

      if (floorplan[i][j] === 1) {
        // below finds which entity is at this tile
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        let theEntity = gameObjects.entities.find(
          (element) => element.tileX === j && element.tileY === i
        );
        let name = theEntity.name;
        let h = theEntity.height;

        // below creates an “Item” for render at the center of the tile
        let tempItem = new Item(
          (j + 0.5) * tileSize,
          (i + 0.5) * tileSize * vs,
          "object",
          name,
          h
        );
        items.push(tempItem);

        fill(120); // occupied shadow color
      } else {
        fill(255); // floor color
      }

      stroke(0);
      rect(j * tileSize, i * tileSize, tileSize, tileSize);

      pop();
    }
  }

  // draw the player shadow circle here
  push();
  noStroke();
  fill(120); // shadow color
  circle(player.x, player.y, player.d);

  // draw collision guiding points
  // un-comment-out to see
  // strokeWeight(3);
  // stroke("red");
  // point(leftX, topY);
  // point(rightX, topY);
  // point(leftX, bottomY);
  // point(rightX, bottomY);
  pop();

  pop(); // scale(1, vs) ended

  // compute player position with vs
  playerPosition = createVector(player.x, player.y * vs);

  // below draws the player position point
  // un-comment-out to see
  // push();
  // strokeWeight(3);
  // stroke("green");
  // point(playerPosition.x, playerPosition.y);
  // pop();

  // below adds player as an (incomplete) Item so it will be y-sorting with other objects
  let tempItem = new Item(playerPosition.x, playerPosition.y, "player");
  items.push(tempItem);

  // from assignment 4,
  // using sorting algorithm on y to draw from back to front
  // to fake depth
  items.sort((a, b) => a.y - b.y);

  for (let i = 0; i < items.length; i++) {
    items[i].display();
  }

  // below draws the detail panel (or info box)
  if (itemActivated && selectedEntity) {
    // if (itemActivated === true && selectedEntity !== null)
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
    text("Name: " + selectedEntity.name, 20, 40);

    pop();
  }
}

function mousePressed() {
  if (bgmSong.isLoaded() && !bgmSong.isPlaying()) {
    userStartAudio(); // Explicitly ensures audio context is running
    bgmSong.loop();
  }

  // overcome translate()
  let mx = mouseX - 50;
  let my = mouseY - (50 + wH);

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    // Check if this item was clicked (exclude the player)
    if (item.type === "object" && item.isTouchPointClicked(mx, my)) {
      // certain objects will open an HTML overlay with an iframe
      if (item.name === "mini-lawn" || item.name === "micro-view") {
        itemActivated = false;
        selectedEntity = null;

        // display HTML overlay
        overlay.style.display = "block";

        if (item.name === "mini-lawn") {
          frame.src = "https://xl6294.github.io/CC2025-xl6294/assignment2/";
        } else if (item.name === "micro-view") {
          frame.src = "https://xl6294.github.io/CC2025-xl6294/assignment3/";
        }

        // if (item.name === "mini-lawn") {
        //   frame.src = "./assignment4/index.html";
        // } else if (item.name === "micro-view") {
        //   frame.src = "./assignment3/index.html";
        // }

        // below ends the function
        return;
      }

      // p5 Info Boxes
      else {
        // make sure html does not show
        overlay.style.display = "none";

        // Enable p5 info box
        selectedEntity = item;
        itemActivated = true;
        return;
      }
    }
  }

  closeDetailPanel();
}

function closeDetailPanel() {
  itemActivated = false;
  selectedEntity = null;

  // hide overlay if it was open
  overlay.style.display = "none";

  // window.focus(); // advice from friend, will verify
}

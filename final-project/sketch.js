function setup() {
  createCanvas(windowWidth, windowHeight);

  // if (!bgmSong.isPlaying()) bgmSong.play();

  sW = width / 1500; // strokeWeight
  strokeWeight(sW);

  tileSize = min(width / 17, height / 9.6);
  thisUnit = tileSize / 6;

  // Pixel dimensions of the map
  // before any drawing transforms like translate, scale, etc.
  mapWidth = columns * tileSize;
  mapHeight = rows * tileSize;

  // creating the player profile
  player = {
    x: mapWidth / 2,
    y: mapHeight / 2,
    xd: 0, // direction indicator // from the python game workshop
    yd: 0,
    speed: 0.3 * thisUnit,
    d: 4 * thisUnit, // diameter
  };

  wH = 2 * tileSize; // wall height

  // find html elements from index.html
  overlay = document.getElementById("overlay");
  frame = document.getElementById("myFrame");

  overlay.style.left = `${9 * tileSize}px`;
  overlay.style.top = `${tileSize}px`;
  overlay.style.width = `${7 * tileSize}px`;
  overlay.style.height = `${7.6 * tileSize}px`;

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
  background(255);

  push();
  noFill();
  strokeWeight(5 * sW);
  rect(tileSize, tileSize, mapWidth, mapHeight * vs + wH);
  pop();

  // draw the wall
  fill("beige");
  rect(tileSize, tileSize, mapWidth, wH); // hard-coded value, will change later ////////////////////
  translate(tileSize, tileSize + wH);

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

        push();
        blendMode(MULTIPLY);
        fill(120); // occupied shadow color
        stroke(0);
        rect(j * tileSize, i * tileSize, tileSize, tileSize);
        pop();
      } else {
        fill(255); // floor color
        stroke(0);
        rect(j * tileSize, i * tileSize, tileSize, tileSize);
      }
      pop();
    }
  }

  // draw the player shadow circle here
  push();
  noStroke();
  push();
  blendMode(MULTIPLY);
  fill(120); // shadow color
  circle(player.x, player.y, player.d);
  pop();

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

    translate(9 * tileSize, tileSize);

    fill(255);
    stroke(0);
    strokeWeight(1);
    rect(0, 0, 7 * tileSize, 7.6 * tileSize);

    noStroke();
    fill(0);
    // textAlign(LEFT);
    textSize(3 * thisUnit);

    // Simple list of data
    text("Name: " + selectedEntity.name, 4 * thisUnit, 8 * thisUnit);

    pop();
  }

  push();
  fill(0);
  textSize(2 * thisUnit);
  // textWrap(WORD);
  text(
    "Press 🄼 to play or pause background music. Use arrow keys (← ↑ ↓ →) to move around.", // 🅼 🄼 ↑↓←→
    thisUnit,
    thisUnit - wH,
    mapWidth - thisUnit
  );
  text(
    "BGM: “Gymnopédie No. 1” by Kevin MacLeod, Free Music Archive, CC BY",
    0,
    mapHeight * vs + thisUnit,
    mapWidth
  );
  pop();
}

function mousePressed() {
  // overcome translate()
  let mx = mouseX - tileSize;
  let my = mouseY - (tileSize + wH);

  for (let i = 0; i < items.length; i++) {
    let item = items[i];

    // Check if this item was clicked (exclude the player)
    if (item.type === "object" && item.isTouchPointClicked(mx, my)) {
      // certain objects will open an HTML overlay with an iframe
      if (
        item.name === "mini-lawn" ||
        item.name === "micro-view" ||
        item.name === "puzzle-pad"
      ) {
        itemActivated = false;
        selectedEntity = null;

        // display HTML overlay
        overlay.style.display = "block";

        // if (item.name === "mini-lawn") {
        //   frame.src = "https://xl6294.github.io/CC2025-xl6294/assignment2/";
        // } else if (item.name === "micro-view") {
        //   frame.src = "https://xl6294.github.io/CC2025-xl6294/assignment3/";
        // }

        if (item.name === "mini-lawn") {
          frame.src = "./assignment2/index.html";
        } else if (item.name === "micro-view") {
          frame.src = "./assignment3/index.html";
        } else if (item.name === "puzzle-pad") {
          frame.src = "./assignment4/index.html";
        }

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
}

function keyPressed() {
  if (key === "m" || key === "M") {
    if (!bgmSong.isPlaying()) {
      bgmSong.loop();
    } else if (bgmSong.isPlaying()) {
      bgmSong.pause();
    }
  }
}

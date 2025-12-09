let items = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
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
        let tempItem = new Item(
          (j + 0.5) * tileSize,
          (i + 0.5) * tileSize * vs,
          "object"
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
}

function playerMovement() {
  // reset the movement direction in x/y axis each frame
  // so movement only happens while keys are pressed,
  player.xd = 0;
  player.yd = 0;

  // https://p5js.org/reference/p5/keyIsDown/
  // Update direction indicators (xd and yd) if an arrow key is pressed.
  if (keyIsDown(LEFT_ARROW) === true) {
    player.xd = -1;
  }
  if (keyIsDown(RIGHT_ARROW) === true) {
    player.xd = 1;
  }
  if (keyIsDown(UP_ARROW) === true) {
    player.yd = -1;
  }
  if (keyIsDown(DOWN_ARROW) === true) {
    player.yd = 1;
  }

  // predict next player position in physical space/pixels
  let nextX = player.x + player.xd * player.speed;
  let nextY = player.y + player.yd * player.speed;

  // the bounding values of the player at the next position
  // used for collision checking
  // set globally
  leftX = nextX - player.d / 2;
  rightX = nextX + player.d / 2;
  topY = nextY - player.d / 2;
  bottomY = nextY + player.d / 2;

  // current bounding values (before movement)
  // used to separate X-direction and Y-direction collision tests
  let leftXCurrent = player.x - player.d / 2;
  let rightXCurrent = player.x + player.d / 2;
  let topYCurrent = player.y - player.d / 2;
  let bottomYCurrent = player.y + player.d / 2;

  // X-direction checking collision and bounds
  if (
    // first, here is to prevent crashing when the predicted tile is out of bound (range of the floorplan)
    floor(leftX / tileSize) < 0 ||
    floor(rightX / tileSize) >= columns ||
    floor(topY / tileSize) < 0 ||
    floor(bottomY / tileSize) >= rows
  ) {
    player.xd = 0;
  } else if (
    // check if all next four collision probe points
    // (only moved vertically)
    // will land on walkable tiles
    floorplan[floor(topYCurrent / tileSize)][floor(leftX / tileSize)] === 0 &&
    floorplan[floor(topYCurrent / tileSize)][floor(rightX / tileSize)] === 0 &&
    floorplan[floor(bottomYCurrent / tileSize)][floor(leftX / tileSize)] ===
      0 &&
    floorplan[floor(bottomYCurrent / tileSize)][floor(rightX / tileSize)] === 0
  ) {
    // allow X movement only if no collision happens next
    player.x = nextX;
  }

  // Y-direction checking collision and bounds
  if (
    floor(leftX / tileSize) < 0 ||
    floor(rightX / tileSize) >= columns ||
    floor(topY / tileSize) < 0 ||
    floor(bottomY / tileSize) >= rows
  ) {
    player.yd = 0;
  } else if (
    floorplan[floor(topY / tileSize)][floor(leftXCurrent / tileSize)] === 0 &&
    floorplan[floor(topY / tileSize)][floor(rightXCurrent / tileSize)] === 0 &&
    floorplan[floor(bottomY / tileSize)][floor(leftXCurrent / tileSize)] ===
      0 &&
    floorplan[floor(bottomY / tileSize)][floor(rightXCurrent / tileSize)] === 0
  ) {
    player.y = nextY;
  }

  // below limit the player circle inside the range of the map (map bounds) in pixels
  player.x = constrain(player.x, player.d / 2, mapWidth - player.d / 2);
  player.y = constrain(player.y, player.d / 2, mapHeight - player.d / 2);
}

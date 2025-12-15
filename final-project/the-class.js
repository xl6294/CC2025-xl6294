class Item {
  constructor(x, y, type, name, h) {
    this.x = x; // physical/pixel x position
    this.y = y; // physical/pixel y position, but at the ground/tile level, so kind of like the y position of shadows
    this.type = type;
    this.name = name;
    this.h = h; // height of the object to locate the touchpoint
  }

  // below checks if a touchpoint is clicked
  isTouchPointClicked(mx, my) {
    // below is to compute the center of the touch point (and the object itself)
    let centerX = this.x;
    let centerY = this.y - (tileSize * vs) / 2 - this.h / 2;

    // touchpoint is considered clicked
    // if distance from its center to the mouse position is less than touchpoint circle radius
    // hard-coded value here, need to change later
    if (dist(mx, my, centerX, centerY) < 25) {
      return true;
    } else {
      return false;
    }
  }

  // below draws a translucent circle at touchpoints
  drawTouchPoint() {
    // object distance from player (kind of calculating the distance between their shadows)
    let objectDist = dist(playerPosition.x, playerPosition.y, this.x, this.y);

    // draw the touchpoint if the player is within 1 tile distance
    if (objectDist < tileSize) {
      push();

      noStroke();
      fill("rgba(255, 200, 0, 0.5)"); // maybe different color later

      let centerOffset = -((tileSize * vs) / 2) - this.h / 2;

      circle(0, centerOffset, 50); // hard-coded value here, need to change later
      pop();
    }
  }

  drawPlayer() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill("chocolate");
    triangle(-player.d / 3, -tileSize / 2, player.d / 3, -tileSize / 2, 0, 0);
    fill("coral");
    triangle(
      -player.d / 3,
      -tileSize / 2,
      player.d / 3,
      -tileSize / 2,
      0,
      -tileSize
    );
    circle(0, -tileSize, tileSize / 2);
    ellipse(0, -tileSize / 2, (2 * player.d) / 3, tileSize / 3);

    pop();
  }

  drawTable() {
    push();
    translate(this.x, this.y);
    // fill("yellow");
    // triangle(-tileSize / 2, 0, tileSize / 2, 0, 0, -tileSize);
    fill("BurlyWood");
    rect(-tileSize / 2, -tileSize * vs, tileSize, tileSize * vs); // tabletop
    rect(
      tileSize / 6 - tileSize / 2,
      tileSize / 6,
      (2 * tileSize) / 3,
      (tileSize * vs) / 8
    ); // vertical support
    rect(tileSize / 12 - tileSize / 2, 0, tileSize / 6, (tileSize * vs) / 2); // left leg
    rect(
      tileSize / 2 - tileSize / 6 - tileSize / 12,
      0,
      tileSize / 6,
      (tileSize * vs) / 2
    ); // right leg

    rect(-tileSize / 2, 0, tileSize, (tileSize * vs) / 8);

    push();
    // draw object on the table

    translate(0, -(tileSize * vs) / 2);
    rectMode(CORNERS);

    // https://www.w3schools.com/Js/js_switch.asp
    switch (this.name) {
      case "note":
        this.drawNote();
        break;
      case "micro-view":
        this.drawView();
        break;
      case "mini-lawn":
        this.drawLawn();
        break;
      case "puzzle-pad":
        this.drawPuzzle();
        break;
    }
    pop();

    // Draw the touchpoints here
    this.drawTouchPoint();

    pop();
  }

  drawNote() {
    fill(255);
    rect(-15, -10, 15, 10);
  }

  drawView() {
    fill(255);
    rect(-15, -10, 15, 10);
  }

  drawLawn() {
    fill("green");
    ellipse(0, 0, 30, 10);
  }

  drawPuzzle() {
    fill(255);
    rect(-15, -10, 15, 10);
  }

  display() {
    if (this.type === "object") {
      this.drawTable();
    } else if (this.type === "player") {
      this.drawPlayer();
    }
  }
}

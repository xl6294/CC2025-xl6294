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
    let centerY = this.y - 3 * thisUnit * vs - this.h / 2;

    // touchpoint is considered clicked
    // if distance from its center to the mouse position is less than touchpoint circle radius
    // hard-coded value here, need to change later ///////////////
    if (dist(mx, my, centerX, centerY) < thisUnit * 3) {
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
    if (objectDist < thisUnit * 6) {
      push();

      noStroke();
      fill("rgba(255, 200, 0, 0.5)"); // maybe different color later

      let centerOffset = -3 * thisUnit * vs - this.h / 2; // should correspond with centerY from isTouchPointClicked() above

      // draw the touchpoint circle
      circle(0, centerOffset, thisUnit * 6); // hard-coded value here, need to change later ///////////////
      pop();
    }
  }

  // below draws the player
  drawPlayer() {
    push();
    translate(this.x, this.y);
    noStroke();

    // // lower body: up-side-down shaded triangle
    // fill("chocolate");
    // triangle(-player.d / 3, -3 * thisUnit, player.d / 3, -3 * thisUnit, 0, 0);
    // fill("coral");

    // // upper body triangle
    // triangle(
    //   -player.d / 3,
    //   -3 * thisUnit,
    //   player.d / 3,
    //   -3 * thisUnit,
    //   0,
    //   -6 * thisUnit
    // );

    // // belly / torso base ellipse
    // ellipse(0, -3 * thisUnit, (2 * player.d) / 3, thisUnit);

    // // body outline
    // strokeJoin(ROUND); // right now only applies to the player
    // stroke(0);
    // push();
    // noFill();
    // quad(
    //   -player.d / 3,
    //   -3 * thisUnit,
    //   0,
    //   0,
    //   player.d / 3,
    //   -3 * thisUnit,
    //   0,
    //   -6 * thisUnit
    // );
    // pop();

    // // head
    // circle(0, -6 * thisUnit, 3 * thisUnit);

    // loading a player image for now
    image(
      playerIMG,
      -7.5 * thisUnit,
      -9.25 * thisUnit,
      15 * thisUnit,
      (15 * thisUnit) / vs
    );

    pop();
  }

  // below first draws a table at this.x/this.y
  // then draws the game object on the tabletop
  // lastly draws the touchpoint if any
  // may wanna lay touchpoint under the object /////////////////////
  drawTable() {
    push();
    translate(this.x, this.y);

    fill("BurlyWood");

    // vertical support?
    rect(-2 * thisUnit, thisUnit, 4 * thisUnit, 0.75 * thisUnit * vs);

    // legs
    rect(-2.5 * thisUnit, 0, thisUnit, 3 * thisUnit * vs); // left leg
    rect(1.5 * thisUnit, 0, thisUnit, 3 * thisUnit * vs); // right leg

    // tabletop slab thickness
    rect(-3 * thisUnit, 0, 6 * thisUnit, 0.75 * thisUnit * vs);

    // tabletop slab, squished by vs
    rect(-3 * thisUnit, -6 * thisUnit * vs, 6 * thisUnit, 6 * thisUnit * vs); // tabletop

    push();

    // below moves origin to the tabletop surface area
    translate(0, -3 * thisUnit * vs);

    rectMode(CORNERS);

    // draw object on the table
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

    // draw the touchpoints here ///...////////// will move up later
    this.drawTouchPoint();

    pop();
  }

  drawNote() {
    image(noteIMG, -2 * thisUnit, -2 * thisUnit, 4 * thisUnit, 4 * thisUnit);
  }

  drawView() {
    translate(0, 0.5 * thisUnit);
    image(
      viewIMG,
      -2 * thisUnit,
      -2 * thisUnit,
      4 * thisUnit,
      4 * thisUnit * vs
    );
  }

  drawLawn() {
    image(lawnIMG, -2 * thisUnit, -2.5 * thisUnit, 4 * thisUnit, 4 * thisUnit);
  }

  drawPuzzle() {
    image(
      microscopeIMG,
      -2 * thisUnit,
      -6.5 * thisUnit,
      4 * thisUnit,
      8 * thisUnit
    );
  }

  display() {
    if (this.type === "object") {
      this.drawTable();
    } else if (this.type === "player") {
      this.drawPlayer();
    }
  }
}

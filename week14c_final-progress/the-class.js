class Item {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
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
    pop();
  }

  display() {
    if (this.type === "object") {
      this.drawTable();
    } else if (this.type === "player") {
      this.drawPlayer();
    }
  }
}

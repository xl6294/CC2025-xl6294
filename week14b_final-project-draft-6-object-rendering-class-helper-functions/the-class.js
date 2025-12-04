class Item {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
  drawPlayer() {
    push();
    translate(this.x, this.y);
    fill("blue");
    triangle(-player.d / 2, 0, player.d / 2, 0, 0, -tileSize);
    pop();
  }

  drawTable() {
    push();
    translate(this.x, this.y);
    fill("yellow");
    triangle(-tileSize / 2, 0, tileSize / 2, 0, 0, -tileSize);
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

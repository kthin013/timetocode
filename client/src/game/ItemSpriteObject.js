class ItemSpriteObject {
  constructor(startPos, endPos, currentPos, name) {
    this.startPos = startPos;
    this.endPos = endPos;
    this.currentPos = currentPos;
    this.name = name;
    this.isPickUp = false;
  }

  resetStatus() {
    this.currentPos.x = this.startPos.x;
    this.currentPos.y = this.startPos.y;
    this.isPickUp = false;
  }

  setCurrentPos(x, y) {
    this.currentPos.x = x;
    this.currentPos.y = y;
  }

  getIsInPosition() {
    return (
      (this.currentPos.x === this.endPos.x) && (this.currentPos.y === this.endPos.y)
    );
  }
}

export default ItemSpriteObject;
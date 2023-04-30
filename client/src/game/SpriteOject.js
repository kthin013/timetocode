import GAMECONSTANT from "../GameConstant";

class SpriteObject {
  constructor(x, y, f, level, gameState, setGameState) {
    this.x = x;
    this.y = y;
    this.level = level;
    // this.gameState = "Running";
    this.isReset = false;
    this.isOnGoal = false;
    this.isForward = false;
    this.isBackward = false;
    this.isUpward = false;
    this.isDownward = false;
    this.isTurnLeft = false;
    this.isTurnRight = false;
    this.facing = f;
    this.gameState = gameState;
    this.setGameState = setGameState;

    this.isTake = false;
    this.isDrop = false;
    this.isHandFull = false;
    this.holdingItem = "";

    this.isOn = "";
  }

  getGameState() {
    return this.gameState;
  }

  resetStatus() {
    this.isReset = true;

    this.x = GAMECONSTANT[`LEVEL_${this.level}_START`].x + GAMECONSTANT.SPRITE_SIZE / 2;
    this.y = GAMECONSTANT[`LEVEL_${this.level}_START`].y + GAMECONSTANT.SPRITE_SIZE / 2;
    // this.gameState = "Running";
    this.setGameState("Running");
    this.isOnGoal = false;
    this.isForward = false;
    this.isBackward = false;
    this.isUpward = false;
    this.isDownward = false;
    this.isTurnLeft = false;
    this.isTurnRight = false;
    this.facing = eval(`this.GET_LEVEL_${this.level}_FACING();`);

    this.isTake = false;
    this.isDrop = false;
    this.isHandFull = false;
    this.holdingItem = "";

    this.isOn = "";
  }

  handleForward() {
    // console.log("handleForward!");

    this.isForward = true;
    setTimeout(() => {
      this.isForward = false;
    }, 200);
  }
  handleBackward() {
    // console.log("handleBackward!");

    this.isBackward = true;
    setTimeout(() => {
      this.isBackward = false;
    }, 200);
  }
  handleUpward() {
    // console.log("handleUpward!");

    this.isUpward = true;
    setTimeout(() => {
      this.isUpward = false;
    }, 200);
  }
  handleDownward() {
    // console.log("handleDownward!");

    this.isDownward = true;
    setTimeout(() => {
      this.isDownward = false;
    }, 200);
  }
  handleTurnLeft() {
    // console.log("handleTurnLeft!");
    this.isTurnLeft = true;
    if (this.facing.direction === "down") {
      this.facing.direction = "right";
      this.facing.position = [1, 0];
    } else if (this.facing.direction === "right") {
      this.facing.direction = "up";
      this.facing.position = [0, -1];
    } else if (this.facing.direction === "up") {
      this.facing.direction = "left";
      this.facing.position = [-1, 0];
    } else if (this.facing.direction === "left") {
      this.facing.direction = "down";
      this.facing.position = [0, 1];
    }
  }
  handleTurnRight() {
    // console.log("handleTurnRight!");
    this.isTurnRight = true;
    if (this.facing.direction === "down") {
      this.facing.direction = "left";
      this.facing.position = [-1, 0];
    } else if (this.facing.direction === "left") {
      this.facing.direction = "up";
      this.facing.position = [0, -1];
    } else if (this.facing.direction === "up") {
      this.facing.direction = "right";
      this.facing.position = [1, 0];
    } else if (this.facing.direction === "right") {
      this.facing.direction = "down";
      this.facing.position = [0, 1];
    }
  }

  handleTake() {
    // console.log("handleTake!");

    this.isTake = true;
    setTimeout(() => {
      this.isTake = false;
    }, 200);
  }
  handleDrop() {
    // console.log("handleDrop!");

    this.isDrop = true;
    setTimeout(() => {
      this.isDrop = false;
    }, 200);
  }

  handleIsOn(colour) {
    if (this.isOn === colour) {
      // console.log("handleIsOn!", colour, this.isOn);
      return true;
    } else {
      // console.log("handleIsOn!", colour, this.isOn);
      return false;
    }
  }

  GET_LEVEL_1_1_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_1_2_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_1_3_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_1_4_FACING() {
    return ({ direction: "down", position: [0, 1] });
  }
  GET_LEVEL_1_5_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_1_6_FACING() {
    return ({ direction: "down", position: [0, 1] });
  }
  GET_LEVEL_1_7_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_1_8_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_1_9_FACING() {
    return ({ direction: "down", position: [0, 1] });
  }
  GET_LEVEL_1_10_FACING() {
    return ({ direction: "left", position: [-1, 0] });
  }
  GET_LEVEL_2_1_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_2_2_FACING() {
    return ({ direction: "down", position: [0, 1] });
  }
  GET_LEVEL_2_3_FACING() {
    return ({ direction: "left", position: [-1, 0] });
  }
  GET_LEVEL_2_4_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_2_5_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_2_6_FACING() {
    return ({ direction: "left", position: [-1, 0] });
  }
  GET_LEVEL_2_7_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_2_8_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_2_9_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_2_10_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_3_1_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_3_2_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_3_3_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_3_4_FACING() {
    return ({ direction: "up", position: [0, -1] });
  }
  GET_LEVEL_3_5_FACING() {
    return ({ direction: "left", position: [-1, 0] });
  }
  GET_LEVEL_3_6_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_3_7_FACING() {
    return ({ direction: "down", position: [0, 1] });
  }
  GET_LEVEL_3_8_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_3_9_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_3_10_FACING() {
    return ({ direction: "up", position: [0, -1] });
  }
  GET_LEVEL_4_1_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_4_2_FACING() {
    return ({ direction: "left", position: [-1, 0] });
  }
  GET_LEVEL_4_3_FACING() {
    return ({ direction: "right", position: [1, 0] });
  }
  GET_LEVEL_4_4_FACING() {
    return ({ direction: "up", position: [0, -1] });
  }
  GET_LEVEL_4_5_FACING() {
    return ({ direction: "up", position: [0, -1] });
  }
}

export default SpriteObject;
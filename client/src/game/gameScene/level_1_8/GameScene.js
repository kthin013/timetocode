// @ts-check
import Phaser from "phaser";
import _ from "lodash";
import { debugDraw } from "../../utils/Debug";
import { createCharacterAnims, createAppleAnims, createStartAnims, createEndAnims, createSmokeAnims } from "../../utils/CreateCharacterAnims"
import GAMECONSTANT from "../../../GameConstant";
import ItemSpriteObject from "../../ItemSpriteObject";
import SpriteObject from "../../SpriteOject";
class GameScene extends Phaser.Scene {
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  cursors
  /** @type {Phaser.Physics.Arcade.Sprite} */
  player
  /** @type {Phaser.Physics.Arcade.Sprite} */
  apple
  /** @type {Phaser.Physics.Arcade.Sprite} */
  smoke
  /** @type {SpriteObject} **/
  playerObject
  /** @type {ItemSpriteObject} **/
  appleObject

  constructor(playerObject, appleObject) {
    super("gameScene");
    this.playerObject = playerObject;
    this.appleObject = appleObject;
    // console.log("testing >>>>>>>>>>", this.playerObject, appleObject);
  }

  init() {
    // this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() { }

  createAnims() {
    this.start = this.physics.add.sprite(GAMECONSTANT.LEVEL_1_8_START.x + GAMECONSTANT.SPRITE_SIZE / 2, GAMECONSTANT.LEVEL_1_8_START.y + GAMECONSTANT.SPRITE_SIZE / 2, "start_anim");
    createStartAnims(this.anims);
    this.start.play(`start_idle`);

    this.end = this.physics.add.sprite(GAMECONSTANT.LEVEL_1_8_END.x + GAMECONSTANT.SPRITE_SIZE / 2, GAMECONSTANT.LEVEL_1_8_END.y + GAMECONSTANT.SPRITE_SIZE / 2, "end_anim");
    createEndAnims(this.anims);
    this.end.play(`end_idle`);

    this.player = this.physics.add.sprite(this.playerObject.x, this.playerObject.y, "player_anim");
    createCharacterAnims(this.anims);
    this.player.play(`player_idle_${this.playerObject.facing.direction}`);

    this.apple = this.physics.add.sprite(this.appleObject.startPos.x, this.appleObject.startPos.y, "apple_anim");
    createAppleAnims(this.anims);
    this.apple.play(`apple_idle`);

    this.smoke = this.physics.add.sprite(0, 0, "smoke_anim");
    createSmokeAnims(this.anims);
    this.smoke.play(`smoke_play`)
  }

  create() {
    // Define and Create Layers
    const map = this.make.tilemap({ key: "tilemap" });
    const tilesetForest = map.addTilesetImage("Forest_Tileset_64", "tileset_Forest");
    const tilesetForestLight = map.addTilesetImage("Forest_Tileset_64_Light", "tileset_Forest_Light");
    const tilesetUI = map.addTilesetImage("UI_Tileset", "tileset_UI");
    const tilesetApple = map.addTilesetImage("Apple_Tileset", "tileset_Apple");

    const baseGroundLayer = map.createLayer("BaseGround", tilesetForest);
    const secondGroundLayer = map.createLayer("SecondGround", tilesetForest);
    const gameBoard1Layer = map.createLayer("GameBoard1", tilesetForest);
    const gameBoard2Layer = map.createLayer("GameBoard2", tilesetForestLight);
    const propsLayer = map.createLayer("Props", tilesetForest);
    const itemUILayer = map.createLayer("ItemUI", tilesetUI);
    const itemLayer = map.createLayer("Item", tilesetApple);

    const layerArray = [baseGroundLayer, secondGroundLayer, gameBoard1Layer, gameBoard2Layer, propsLayer, itemUILayer, itemLayer];
    const gameLogo = this.add.image(650, 720, "gameLogo");
    gameLogo.setScale(0.6);
    // Define and Create Character Animations
    this.createAnims();

    // Add collision
    this.physics.add.collider(this.player, layerArray);

    _.map(layerArray, (layer) => {
      layer.setCollisionByProperty({ collide: true });
      // debugDraw(layer, this);    // debug for collision
    })
  }

  endCheck() {
    var isAllItemInPos = true;
    _.map([this.appleObject], (item) => {
      isAllItemInPos = isAllItemInPos && item.getIsInPosition()
    });

    (
      this.player.x >= GAMECONSTANT.LEVEL_1_8_END.x &&
      this.player.y >= GAMECONSTANT.LEVEL_1_8_END.y &&
      this.player.x < GAMECONSTANT.LEVEL_1_8_END.x + GAMECONSTANT.SPRITE_SIZE &&
      this.player.y < GAMECONSTANT.LEVEL_1_8_END.y + GAMECONSTANT.SPRITE_SIZE && isAllItemInPos
    ) ? this.playerObject.isOnGoal = true : this.playerObject.isOnGoal = false;
  }

  resetState() {
    //Reset Game status
    if (this.playerObject.isReset) {
      this.player.x = this.playerObject.x;
      this.player.y = this.playerObject.y;
      this.smoke.x = this.player.x;
      this.smoke.y = this.player.y;
      this.playerObject.isReset = false;

      _.map([this.appleObject], (item) => {
        item.resetStatus();
        eval(`this.${item.name}.x = item.startPos.x`);
        eval(`this.${item.name}.y = item.startPos.y`);
      })
      // console.log(this.appleObject, this.apple.x, this.apple.y);
    }
  }

  fixCharacterPos() {
    if ((this.player.x - GAMECONSTANT.SPRITE_SIZE / 2) % 64 !== 0) {
      // console.log("moveOutofBound", this.player.x, this.player.y);
      var tempX = _.toNumber(((this.player.x - GAMECONSTANT.SPRITE_SIZE / 2) / GAMECONSTANT.SPRITE_SIZE).toFixed(0));
      this.player.x = GAMECONSTANT.SPRITE_SIZE * tempX + (GAMECONSTANT.SPRITE_SIZE / 2);
      // console.log("fixOutofBound", this.player.x, this.player.y);
    }
    if ((this.player.y - GAMECONSTANT.SPRITE_SIZE / 2) % 64 !== 0) {
      // console.log("moveOutofBound", this.player.x, this.player.y);
      var tempY = _.toNumber(((this.player.y - GAMECONSTANT.SPRITE_SIZE / 2) / GAMECONSTANT.SPRITE_SIZE).toFixed(0));
      this.player.y = GAMECONSTANT.SPRITE_SIZE * tempY + (GAMECONSTANT.SPRITE_SIZE / 2);
      // console.log("fixOutofBound", this.player.x, this.player.y);
    }
  }

  handleItemsTakeAndDrop() {
    if (this.playerObject.isTake) {
      this.smoke.x = this.player.x;
      this.smoke.y = this.player.y;
      this.smoke.play(`smoke_play`);
      _.map([this.appleObject], (item) => {
        if (
          !item.isPickUp &&
          !this.playerObject.isHandFull &&
          item.currentPos.x === this.player.x &&
          item.currentPos.y === this.player.y
        ) {
          item.isPickUp = true;
          this.playerObject.isHandFull = true;
          this.playerObject.holdingItem = item.name;
          eval(`this.${item.name}.x = 736`);
          eval(`this.${item.name}.y = 32`);
        }
      })
    } else if (this.playerObject.isDrop) {
      this.smoke.x = this.player.x;
      this.smoke.y = this.player.y;
      this.smoke.play(`smoke_play`);
      _.map([this.appleObject], (item) => {
        if (
          item.isPickUp &&
          this.playerObject.isHandFull &&
          item.currentPos.x === this.player.x &&
          item.currentPos.y === this.player.y
          // need handle items on same block
        ) {
          eval(`this.${item.name}.x = ${this.player.x}`);
          eval(`this.${item.name}.y = ${this.player.y}`);
          item.isPickUp = false;
          this.playerObject.isHandFull = false;
          this.playerObject.holdingItem = "";
        }
      })
    }
  }

  handleItemsPosition() {
    _.map([this.appleObject], (item) => {
      if (item.isPickUp && this.playerObject.isHandFull) {
        item.setCurrentPos(this.player.x, this.player.y);
      }
    })
    // console.log(this.appleObject, this.playerObject);
  }

  update(t, dt) {
    const speed = 320;

    this.resetState();
    this.endCheck();

    if (this.playerObject.isForward) {
      this.player.play(`player_walk_${this.playerObject.facing.direction}`);
      this.physics.moveTo(
        this.player,
        this.player.x + (GAMECONSTANT.SPRITE_SIZE * this.playerObject.facing.position[0]),
        this.player.y + (GAMECONSTANT.SPRITE_SIZE * this.playerObject.facing.position[1]),
        speed,
        200
      );
    } else if (this.playerObject.isBackward) {
      this.player.play(`player_walk_${this.playerObject.facing.direction}`);
      this.physics.moveTo(
        this.player,
        this.player.x - (GAMECONSTANT.SPRITE_SIZE * this.playerObject.facing.position[0]),
        this.player.y - (GAMECONSTANT.SPRITE_SIZE * this.playerObject.facing.position[1]),
        speed,
        200
      );
    } else if (this.playerObject.isTurnLeft) {
      this.player.play(`player_idle_${this.playerObject.facing.direction}`);
      this.playerObject.isTurnLeft = false;
    } else if (this.playerObject.isTurnRight) {
      this.player.play(`player_idle_${this.playerObject.facing.direction}`);
      this.playerObject.isTurnRight = false;
    } else {
      this.player.play(`player_idle_${this.playerObject.facing.direction}`);
      this.player.setVelocity(0, 0);
      this.player.x = _.toNumber(this.player.x.toFixed(0));
      this.player.y = _.toNumber(this.player.y.toFixed(0));

      this.fixCharacterPos();
      this.handleItemsTakeAndDrop();
    }
    this.playerObject.x = this.player.x;
    this.playerObject.y = this.player.y;
    this.handleItemsPosition();
    // console.log(this.playerObject.isOnGoal, this.playerObject.gameState, this.player.x, this.player.y, this.playerObject.x, this.playerObject.y);
  }
}

export default GameScene;
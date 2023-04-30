// @ts-check
import Phaser from "phaser";
import _ from "lodash";
import { debugDraw } from "../../utils/Debug";
import { createCharacterAnims, createStartAnims, createEndAnims, createMelonAnims, createSmokeAnims } from "../../utils/CreateCharacterAnims"
import GAMECONSTANT from "../../../GameConstant";
import ItemSpriteObject from "../../ItemSpriteObject";
import SpriteObject from "../../SpriteOject";
class GameScene extends Phaser.Scene {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  player
  /** @type {Phaser.Physics.Arcade.Sprite} */
  melon
  /** @type {Phaser.Physics.Arcade.Sprite} */
  smoke
  /** @type {SpriteObject} **/
  playerObject
  /** @type {ItemSpriteObject} **/
  melonObject

  /**
   * @param {SpriteObject} playerObject
   * @param {ItemSpriteObject} melonObject
   */
  constructor(playerObject, melonObject) {
    super("gameScene");
    this.playerObject = playerObject;
    this.melonObject = melonObject;
  }

  init() { }

  preload() { }

  createAnims() {
    this.start = this.physics.add.sprite(GAMECONSTANT.LEVEL_2_10_START.x + GAMECONSTANT.SPRITE_SIZE / 2, GAMECONSTANT.LEVEL_2_10_START.y + GAMECONSTANT.SPRITE_SIZE / 4, "start_anim");
    createStartAnims(this.anims);
    this.start.play(`start_idle`);

    this.end = this.physics.add.sprite(GAMECONSTANT.LEVEL_2_10_END.x + GAMECONSTANT.SPRITE_SIZE / 2, GAMECONSTANT.LEVEL_2_10_END.y + GAMECONSTANT.SPRITE_SIZE / 4, "end_anim");
    createEndAnims(this.anims);
    this.end.play(`end_idle`);

    this.player = this.physics.add.sprite(this.playerObject.x, this.playerObject.y, "player_anim");
    createCharacterAnims(this.anims);
    this.player.play(`player_idle_${this.playerObject.facing.direction}`);

    this.melon = this.physics.add.sprite(this.melonObject.startPos.x, this.melonObject.startPos.y, "melon_anim");
    createMelonAnims(this.anims);
    this.melon.play(`melon_idle`);

    this.smoke = this.physics.add.sprite(0, 0, "smoke_anim");
    createSmokeAnims(this.anims);
    this.smoke.play(`smoke_play`);
  }

  create() {
    // Define and Create Layers
    const map = this.make.tilemap({ key: "tilemap" });
    const tilesetDesert = map.addTilesetImage("Desert_Tileset", "tileset_Desert");
    const tilesetDesertLight = map.addTilesetImage("Desert_Tileset_Light", "tileset_Desert_Light");
    const tilesetUI = map.addTilesetImage("UI_Tileset", "tileset_UI");
    const tilesetMelon = map.addTilesetImage("Melon_Tileset", "tileset_Melon");

    const baseGroundLayer = map.createLayer("BaseGround", [tilesetDesert, tilesetDesertLight]);
    const secondGroundLayer = map.createLayer("SecondGround", tilesetDesert);
    const gameBoard1Layer = map.createLayer("GameBoard1", tilesetDesert);
    const gameBoard2Layer = map.createLayer("GameBoard2", tilesetDesertLight);
    const propsLayer = map.createLayer("Props", tilesetDesert);
    const props2Layer = map.createLayer("Props2", tilesetDesert);
    const itemUILayer = map.createLayer("ItemUI", tilesetUI);
    const itemLayer = map.createLayer("Item", tilesetMelon);

    const layerArray = [baseGroundLayer, secondGroundLayer, gameBoard1Layer, gameBoard2Layer, propsLayer, props2Layer, itemUILayer, itemLayer];
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
    _.map([this.melonObject], (item) => {
      isAllItemInPos = isAllItemInPos && item.getIsInPosition()
    });
    (
      this.player.x >= GAMECONSTANT.LEVEL_2_10_END.x &&
      this.player.y >= GAMECONSTANT.LEVEL_2_10_END.y &&
      this.player.x < GAMECONSTANT.LEVEL_2_10_END.x + GAMECONSTANT.SPRITE_SIZE &&
      this.player.y < GAMECONSTANT.LEVEL_2_10_END.y + GAMECONSTANT.SPRITE_SIZE && isAllItemInPos
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

      _.map([this.melonObject], (item) => {
        item.resetStatus();
        eval(`this.${item.name}.x = item.startPos.x`);
        eval(`this.${item.name}.y = item.startPos.y`);
      })
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
      _.map([this.melonObject], (item) => {
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
      _.map([this.melonObject], (item) => {
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
    _.map([this.melonObject], (item) => {
      if (item.isPickUp && this.playerObject.isHandFull) {
        item.setCurrentPos(this.player.x, this.player.y);
      }
    })
  }

  handleIsOnPosition() {
    if ((this.player.x === (256 + GAMECONSTANT.SPRITE_SIZE / 2) && this.player.y === (256 + GAMECONSTANT.SPRITE_SIZE / 2)) ||
      (this.player.x === (384 + GAMECONSTANT.SPRITE_SIZE / 2) && this.player.y === (256 + GAMECONSTANT.SPRITE_SIZE / 2))) {
      this.playerObject.isOn = "blue";
    } else if ((this.player.x === (256 + GAMECONSTANT.SPRITE_SIZE / 2) && this.player.y === (384 + GAMECONSTANT.SPRITE_SIZE / 2)) ||
      (this.player.x === (384 + GAMECONSTANT.SPRITE_SIZE / 2) && this.player.y === (384 + GAMECONSTANT.SPRITE_SIZE / 2))) {
      this.playerObject.isOn = "green";
    } else {
      this.playerObject.isOn = "";
    }
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
    this.handleIsOnPosition();
    // console.log(this.playerObject.isOnGoal, this.playerObject.gameState, this.player.x, this.player.y, this.playerObject.x, this.playerObject.y);
  }
}

export default GameScene;
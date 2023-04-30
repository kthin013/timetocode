// @ts-check
import Phaser from "phaser";
import _ from "lodash";
import { debugDraw } from "../../utils/Debug";
import { createCharacterAnims, createStartAnims, createEndAnims, } from "../../utils/CreateCharacterAnims"
import GAMECONSTANT from "../../../GameConstant";
import SpriteObject from "../../SpriteOject";
class GameScene extends Phaser.Scene {
  /** @type {Phaser.Physics.Arcade.Sprite} */
  player
  /** @type {SpriteObject} **/
  playerObject

  /**
   * @param {SpriteObject} playerObject
   */
  constructor(playerObject) {
    super("gameScene");
    this.playerObject = playerObject;
  }

  init() { }

  preload() { }

  createAnims() {
    this.start = this.physics.add.sprite(GAMECONSTANT.LEVEL_3_2_START.x + GAMECONSTANT.SPRITE_SIZE / 2, GAMECONSTANT.LEVEL_3_2_START.y + GAMECONSTANT.SPRITE_SIZE / 4, "start_anim");
    createStartAnims(this.anims);
    this.start.play(`start_idle`);

    this.end = this.physics.add.sprite(GAMECONSTANT.LEVEL_3_2_END.x + GAMECONSTANT.SPRITE_SIZE / 2, GAMECONSTANT.LEVEL_3_2_END.y + GAMECONSTANT.SPRITE_SIZE / 4, "end_anim");
    createEndAnims(this.anims);
    this.end.play(`end_idle`);

    this.player = this.physics.add.sprite(this.playerObject.x, this.playerObject.y, "player_anim");
    createCharacterAnims(this.anims);
    this.player.play(`player_idle_${this.playerObject.facing.direction}`);
  }

  create() {
    // Define and Create Layers
    const map = this.make.tilemap({ key: "tilemap" });
    const tilesetGround = map.addTilesetImage("Ground_Tileset", "tileset_Ground");
    const tilesetGroundLight = map.addTilesetImage("Ground_Light_Tileset", "tileset_Ground_Light");
    const tilesetUI = map.addTilesetImage("UI_Tileset", "tileset_UI");
    const tilesetProps = map.addTilesetImage("Dun_Props_Tileset", "tileset_Props");
    const tilesetWall = map.addTilesetImage("Wall_Tileset", "tileset_Wall");

    const baseGroundLayer = map.createLayer("BaseGround", tilesetGround);
    const secondGroundLayer = map.createLayer("SecondGround", tilesetGround);
    const gameBoard1Layer = map.createLayer("GameBoard1", tilesetGround);
    const gameBoard2Layer = map.createLayer("GameBoard2", tilesetGroundLight);
    const propsLayer = map.createLayer("Props", [tilesetGround, tilesetProps]);
    const props2Layer = map.createLayer("Props2", tilesetGround);
    const wallILayer = map.createLayer("Wall", tilesetWall);
    const itemUILayer = map.createLayer("ItemUI", tilesetUI);

    const layerArray = [baseGroundLayer, secondGroundLayer, gameBoard1Layer, gameBoard2Layer, wallILayer, propsLayer, props2Layer, itemUILayer];
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
    (
      this.player.x >= GAMECONSTANT.LEVEL_3_2_END.x &&
      this.player.y >= GAMECONSTANT.LEVEL_3_2_END.y &&
      this.player.x < GAMECONSTANT.LEVEL_3_2_END.x + GAMECONSTANT.SPRITE_SIZE &&
      this.player.y < GAMECONSTANT.LEVEL_3_2_END.y + GAMECONSTANT.SPRITE_SIZE
    ) ? this.playerObject.isOnGoal = true : this.playerObject.isOnGoal = false;
  }

  resetState() {
    //Reset Game status
    if (this.playerObject.isReset) {
      this.player.x = this.playerObject.x;
      this.player.y = this.playerObject.y;
      this.playerObject.isReset = false;
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

  handleIsOnPosition() {
    if ((this.player.x === (384 + GAMECONSTANT.SPRITE_SIZE / 2) && this.player.y === (320 + GAMECONSTANT.SPRITE_SIZE / 2))) {
      this.playerObject.isOn = "red";
    } else if ((this.player.x === (512 + GAMECONSTANT.SPRITE_SIZE / 2) && this.player.y === (320 + GAMECONSTANT.SPRITE_SIZE / 2)) ||
      (this.player.x === (512 + GAMECONSTANT.SPRITE_SIZE / 2) && this.player.y === (448 + GAMECONSTANT.SPRITE_SIZE / 2))
    ) {
      this.playerObject.isOn = "blue";
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
    }
    this.playerObject.x = this.player.x;
    this.playerObject.y = this.player.y;
    this.handleIsOnPosition();
    // console.log(this.playerObject.isOnGoal, this.playerObject.gameState, this.player.x, this.player.y, this.playerObject.x, this.playerObject.y);
  }
}

export default GameScene;
// @ts-check
import Phaser from "phaser";
import _ from "lodash";
import { debugDraw } from "../../utils/Debug";
import { createCharacterAnims, createStartAnims, createEndAnims } from "../../utils/CreateCharacterAnims"
import GAMECONSTANT from "../../../GameConstant";
class GameScene extends Phaser.Scene {
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  cursors
  /** @type {Phaser.Physics.Arcade.Sprite} */
  player
  /** @type {Phaser.Physics.Arcade.Sprite} */
  start
  /** @type {Phaser.Physics.Arcade.Sprite} */
  end

  constructor(spriteObject) {
    super("gameScene");
    this.playerObject = spriteObject;
    // console.log("testing >>>>>>>>>>", this.playerObject);
  }

  init() {
    // this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() { }

  createAnims() {
    this.start = this.physics.add.sprite(GAMECONSTANT.LEVEL_1_1_START.x + GAMECONSTANT.SPRITE_SIZE / 2, GAMECONSTANT.LEVEL_1_1_START.y + GAMECONSTANT.SPRITE_SIZE / 2, "start_anim");
    createStartAnims(this.anims);
    this.start.play(`start_idle`);

    this.end = this.physics.add.sprite(GAMECONSTANT.LEVEL_1_1_END.x + GAMECONSTANT.SPRITE_SIZE / 2, GAMECONSTANT.LEVEL_1_1_END.y + GAMECONSTANT.SPRITE_SIZE / 2, "end_anim");
    createEndAnims(this.anims);
    this.end.play(`end_idle`);

    this.player = this.physics.add.sprite(this.playerObject.x, this.playerObject.y, "player_anim");
    createCharacterAnims(this.anims);
    this.player.play(`player_idle_${this.playerObject.facing.direction}`);
  }

  create() {
    // Define and Create Layers
    const map = this.make.tilemap({ key: "tilemap" });
    const tilesetForest = map.addTilesetImage("Forest_Tileset_64", "tileset_Forest");
    const tilesetForestLight = map.addTilesetImage("Forest_Tileset_64_Light", "tileset_Forest_Light");

    const baseGroundLayer = map.createLayer("BaseGround", tilesetForest);
    const secondGroundLayer = map.createLayer("SecondGround", tilesetForest);
    const gameBoard1Layer = map.createLayer("GameBoard1", tilesetForest);
    const gameBoard2Layer = map.createLayer("GameBoard2", tilesetForestLight);
    const propsLayer = map.createLayer("Props", tilesetForest);
    const props2Layer = map.createLayer("Props2", tilesetForest);

    const layerArray = [baseGroundLayer, secondGroundLayer, gameBoard1Layer, gameBoard2Layer, propsLayer, props2Layer];
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

  resetState() {
    if (this.playerObject.isReset) {
      this.player.x = this.playerObject.x;
      this.player.y = this.playerObject.y;
      this.playerObject.isReset = false;
    }
  }

  endCheck() {
    (
      this.player.x >= GAMECONSTANT.LEVEL_1_1_END.x
      && this.player.y >= GAMECONSTANT.LEVEL_1_1_END.y
      && this.player.x < GAMECONSTANT.LEVEL_1_1_END.x + GAMECONSTANT.SPRITE_SIZE
      && this.player.y < GAMECONSTANT.LEVEL_1_1_END.y + GAMECONSTANT.SPRITE_SIZE
    ) ? this.playerObject.isOnGoal = true : this.playerObject.isOnGoal = false;
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

  update(t, dt) {
    const speed = 320;

    //Reset Game status
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
    // console.log(this.playerObject.isOnGoal, this.playerObject.gameState, this.player.x, this.player.y, this.playerObject.x, this.playerObject.y);
  }
}

export default GameScene;
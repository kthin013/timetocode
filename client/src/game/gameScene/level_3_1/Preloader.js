// @ts-check
import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.image("tileset_Ground", "assets/tileset/level_3/Ground_Tileset.png");
    this.load.image("tileset_Ground_Light", "assets/tileset/level_3/Ground_Light_Tileset.png");
    this.load.image("tileset_UI", "assets/tileset/level_3/UI_Tileset.png");
    this.load.image("tileset_Wall", "assets/tileset/level_3/Wall_Tileset.png");
    this.load.image("tileset_Props", "assets/tileset/level_3/Dun_Props_Tileset.png");
    this.load.tilemapTiledJSON("tilemap", "assets/level/level_3_1.json");

    this.load.atlas(
      "player",
      "assets/sprites/player.png",
      "assets/sprites/player_atlas.json"
    );
    this.load.atlas(
      "player_anim",
      "assets/sprites/player.png",
      "assets/sprites/player_atlas.json"
    );
    this.load.atlas(
      "start",
      "assets/sprites/start.png",
      "assets/sprites/start_atlas.json"
    );
    this.load.atlas(
      "start_anim",
      "assets/sprites/start.png",
      "assets/sprites/start_atlas.json"
    );
    this.load.atlas(
      "end",
      "assets/sprites/end.png",
      "assets/sprites/end_atlas.json"
    );
    this.load.atlas(
      "end_anim",
      "assets/sprites/end.png",
      "assets/sprites/end_atlas.json"
    );
    this.load.image("gameLogo", "assets/GameLogo.png");
  }

  create() {
    this.scene.start("gameScene");
  }
}

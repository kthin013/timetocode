// @ts-check
import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.image("tileset_Forest", "assets/tileset/level_1/Forest_Tileset_64.png");
    this.load.image("tileset_Forest_Light", "assets/tileset/level_1/Forest_Tileset_64_Light.png");
    this.load.image("tileset_UI", "assets/tileset/level_1/UI.png");
    this.load.image("tileset_Apple", "assets/tileset/level_1/Apple.png");
    this.load.tilemapTiledJSON("tilemap", "assets/level/level_1_9.json");

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
      "apple",
      "assets/sprites/apple.png",
      "assets/sprites/apple_atlas.json"
    );
    this.load.atlas(
      "apple_anim",
      "assets/sprites/apple.png",
      "assets/sprites/apple_atlas.json"
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
    this.load.atlas(
      "smoke",
      "assets/sprites/smoke.png",
      "assets/sprites/smoke_atlas.json"
    );
    this.load.atlas(
      "smoke_anim",
      "assets/sprites/smoke.png",
      "assets/sprites/smoke_atlas.json"
    );
    this.load.image("gameLogo", "assets/GameLogo.png");
  }

  create() {
    this.scene.start("gameScene");
  }
}

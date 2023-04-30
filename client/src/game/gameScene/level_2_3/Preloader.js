// @ts-check
import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.image("tileset_Desert", "assets/tileset/level_2/Desert_Tileset.png");
    this.load.image("tileset_Desert_Light", "assets/tileset/level_2/Desert_Tileset_Light.png");
    this.load.image("tileset_UI", "assets/tileset/level_2/UI_Tileset.png");
    this.load.image("tileset_Melon", "assets/tileset/level_2/Melon_Tileset.png");
    this.load.tilemapTiledJSON("tilemap", "assets/level/level_2_3.json");

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
      "melon",
      "assets/sprites/melon.png",
      "assets/sprites/melon_atlas.json"
    );
    this.load.atlas(
      "melon_anim",
      "assets/sprites/melon.png",
      "assets/sprites/melon_atlas.json"
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

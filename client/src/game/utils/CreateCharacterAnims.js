import { playerCharacterAnims, appleAnims, melonAnims, startAnims, endAnims, smokeAnims, bananaAnims, orangeAnims } from "./CharacterAnims";

const createCharacterAnims = (anims) => {
  anims.create(playerCharacterAnims.playerIdleLeft);
  anims.create(playerCharacterAnims.playerIdleRight);
  anims.create(playerCharacterAnims.playerIdleUp);
  anims.create(playerCharacterAnims.playerIdleDown);
  anims.create(playerCharacterAnims.playerWalkLeft);
  anims.create(playerCharacterAnims.playerWalkRight);
  anims.create(playerCharacterAnims.playerWalkUp);
  anims.create(playerCharacterAnims.playerWalkDown);
}

const createStartAnims = anims => {
  anims.create(startAnims.startIdle);
}

const createEndAnims = anims => {
  anims.create(endAnims.endIdle);
}

const createSmokeAnims = anims => {
  anims.create(smokeAnims.smokePlay);
}

const createAppleAnims = anims => {
  anims.create(appleAnims.appleIdle);
}

const createMelonAnims = anims => {
  anims.create(melonAnims.melonIdle);
}

const createBananaAnims = anims => {
  anims.create(bananaAnims.bananaIdle);
}

const createOrangeAnims = anims => {
  anims.create(orangeAnims.orangeIdle);
}

export { createCharacterAnims, createAppleAnims, createMelonAnims, createBananaAnims, createOrangeAnims, createStartAnims, createEndAnims, createSmokeAnims }
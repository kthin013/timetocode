import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Phaser from "phaser";
import * as Blockly from "blockly";
import CustomModal from "../../component/CustomModal";
import BlocklyConfig from "../../blockly/BlocklyConfig";
import Preloader from "../../game/gameScene/level_4_5/Preloader";
import GameScene from "../../game/gameScene/level_4_5/GameScene";
import GAMECONSTANT from "../../GameConstant";
import {
  loadCode, resetCode, stepCode, playCode, initBlocklyUtils,
  returnIsLoadDisable, returnIsAutoStepDisable, returnIsStepDisable
} from "../../blockly/Utils";
import SpriteObject from "../../game/SpriteOject";
import ItemSpriteObject from "../../game/ItemSpriteObject";
import ButtonSet from "../../component/ButtonSet";
import TryModal from "../../component/TryModal";
import AudioModal from '../../component/AudioModal';
import bgm from "../../asset/bgm/Volcano.mp3";
import UserContext from '../../UserContext';

const Level_4_5 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if(location.state == undefined || location.state == null || location.state == '')
      navigate("/");
  });
  const { user } = useContext(UserContext);
  const phaserGameRef = useRef(null);
  const blocklyWorkspaceRef = useRef(null);
  const startBlockRef = useRef(null);

  const [isLoadDisable, setIsLoadDisable] = useState(returnIsLoadDisable);
  const [isStepDisable, setIsStepDisable] = useState(returnIsStepDisable);
  const [isAutoStepDisable, setIsAutoStepDisable] = useState(returnIsAutoStepDisable);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [isResultModalVisible, setIsResultModalVisible] = useState(false);
  const [gameState, setGameState] = useState("Running");
  const [winOrLose, setWinOrLose] = useState("");
  const [starNum, setStarNum] = useState(0);
  const [playerObject, setPlayerObject] = useState(new SpriteObject(
    GAMECONSTANT.LEVEL_4_5_START.x + GAMECONSTANT.SPRITE_SIZE / 2,
    GAMECONSTANT.LEVEL_4_5_START.y + GAMECONSTANT.SPRITE_SIZE / 2,
    GAMECONSTANT.LEVEL_4_5_FACING, "4_5", gameState, setGameState
  ));
  const [orangeObject, setOrangeObject] = useState(new ItemSpriteObject(
    { x: 384 + GAMECONSTANT.SPRITE_SIZE / 2, y: 448 + GAMECONSTANT.SPRITE_SIZE / 2 },
    { x: 256 + GAMECONSTANT.SPRITE_SIZE / 2, y: 256 + GAMECONSTANT.SPRITE_SIZE / 2 },
    { x: 384 + GAMECONSTANT.SPRITE_SIZE / 2, y: 448 + GAMECONSTANT.SPRITE_SIZE / 2 },
    "orange"
  ));

  const handleBtnState = () => {
    setIsLoadDisable(returnIsLoadDisable());
    setIsStepDisable(returnIsStepDisable());
    setIsAutoStepDisable(returnIsAutoStepDisable());
  }

  const handlePlay = () => {
    if (startBlockRef.current.getNextBlock() != null) {
      playCode();
      handleBtnState();
    } else {
      setIsErrorModalVisible(true);
    }
  }

  const handleStep = () => {
    if (startBlockRef.current.getNextBlock() != null) {
      stepCode();
      setIsStepDisable(true);
      setTimeout(() => {
        setIsStepDisable(false);
        handleBtnState();
      }, 250);
    } else {
      setIsErrorModalVisible(true);
    }
  }

  const handleLoad = () => {
    if (startBlockRef.current.getNextBlock() != null) {
      loadCode();
      handleBtnState();
    } else {
      setIsErrorModalVisible(true);
    }
  }

  const handleStop = () => {
    resetCode();
    handleBtnState();
  }

  useEffect(() => {
    // console.log(">>>>>>>>", gameState);
    if (gameState === "End") {
      setTimeout(() => {
        var blockNum = blocklyWorkspaceRef.current.getAllBlocks(false).length - 1;
        if (playerObject.isOnGoal) {
          setWinOrLose("Win");
          if (blockNum <= 14) {
            setStarNum(3);
          } else if (blockNum <= 25) {
            setStarNum(2);
          } else {
            setStarNum(1);
          }
        } else {
          setWinOrLose("Lose");
          setStarNum(0);
        }
        setIsResultModalVisible(true);
      }, 300);
    }
  }, [gameState, playerObject.isOnGoal]);


  useEffect(() => {
    if (phaserGameRef.current && blocklyWorkspaceRef.current) {
      return;
    }

    Blockly.common.defineBlocks(BlocklyConfig.CUSTOMBLOCKS);

    phaserGameRef.current = new Phaser.Game({
      ...GAMECONSTANT.GAME_SETTING,
      scene: [Preloader, new GameScene(playerObject, orangeObject)]
    });
    blocklyWorkspaceRef.current = Blockly.inject("blocklyDiv", {
      toolbox: BlocklyConfig.TOOLBOX_LEVEL_4_5,
      ...BlocklyConfig.WORKSPACE,
      maxInstances: { "movement": 4, "turn": 4 }
    });
    initBlocklyUtils(blocklyWorkspaceRef.current, phaserGameRef.current, playerObject);
    Blockly.serialization.workspaces.load(BlocklyConfig.CUSTOMBLOCKS, blocklyWorkspaceRef.current); //Highlight and Step

    startBlockRef.current = blocklyWorkspaceRef.current.newBlock("start");
    startBlockRef.current.setDeletable(false);
    startBlockRef.current.setMovable(false);
    startBlockRef.current.moveTo(GAMECONSTANT.START_BLOCK_POSITION);
    startBlockRef.current.initSvg();
    blocklyWorkspaceRef.current.render();
  }, []);

  return (
    <>
      <div style={CustomStyle.row}>
        <AudioModal audio={bgm} volume={user.musicVolume} />
        <ButtonSet
          isAutoStepDisable={isAutoStepDisable}
          isStepDisable={isStepDisable}
          isLoadDisable={isLoadDisable}
          handleStop={handleStop}
          handleLoad={handleLoad}
          handlePlay={handlePlay}
          handleStep={handleStep}
          stageNumber={35}
        />
        <div id="blocklyDiv" style={CustomStyle.codeArea}></div>
        <div id="game-container" style={CustomStyle.gameArea} />
      </div>
      <CustomModal isModalVisible={isErrorModalVisible} setIsModalVisible={setIsErrorModalVisible} type="Error" />
      <TryModal
        isModalVisible={isResultModalVisible}
        setIsModalVisible={setIsResultModalVisible}
        stage_star={starNum}
        stage_number={35}
        type={winOrLose}
      />
    </>
  );
};

const CustomStyle = {
  row: {
    minWidth: "1216px",
    height: "768px",
    padding: "40px 20px 40px 20px",
    display: "flex",
    justifyContent: "center",
  },
  gameArea: {
    minWidth: "768px",
    minHeight: "768px",
    // backgroundColor: "green",
  },
  codeArea: {
    minWidth: "448px",
    minHeight: "768px",
    // backgroundColor: "yellow",
  },
};

export default Level_4_5;

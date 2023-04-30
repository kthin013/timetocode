import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Phaser from "phaser";
import * as Blockly from "blockly";
import { RestartAlt, Stop, FastForward, PlayArrow } from '@mui/icons-material';
import { Tooltip, IconButton } from '@mui/material';
import CustomModal from "../../component/CustomModal";
import BlocklyConfig from "../../blockly/BlocklyConfig";
import Preloader from "../../game/gameScene/level_1_4/Preloader";
import GameScene from "../../game/gameScene/level_1_4/GameScene";
import GAMECONSTANT from "../../GameConstant";
import {
  loadCode, resetCode, stepCode, playCode, initBlocklyUtils,
  returnIsLoadDisable, returnIsAutoStepDisable, returnIsStepDisable
} from "../../blockly/Utils";
import SpriteObject from "../../game/SpriteOject";
import TryModal from "../../component/TryModal";
import AudioModal from '../../component/AudioModal';
import bgm from "../../asset/bgm/Forrest.mp3";
import ButtonSet from "../../component/ButtonSet";
import UserContext from '../../UserContext';

const Level_1_4 = () => {
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
  const [playerObject, setPlayerObject] = useState(new SpriteObject(
    GAMECONSTANT.LEVEL_1_4_START.x + GAMECONSTANT.SPRITE_SIZE / 2,
    GAMECONSTANT.LEVEL_1_4_START.y + GAMECONSTANT.SPRITE_SIZE / 2,
    GAMECONSTANT.LEVEL_1_4_FACING, "1_4", gameState, setGameState
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
        // console.log(">>>>>>>>", gameState);
        (playerObject.isOnGoal) ? setWinOrLose("Win") : setWinOrLose("Lose");
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
      scene: [Preloader, new GameScene(playerObject)]
    });
    blocklyWorkspaceRef.current = Blockly.inject("blocklyDiv", {
      toolbox: BlocklyConfig.TOOLBOX_LEVEL_1_3$4$6,
      ...BlocklyConfig.WORKSPACE,
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
          stageNumber={4}
        />
        <div id="blocklyDiv" style={CustomStyle.codeArea}></div>
        <div id="game-container" style={CustomStyle.gameArea} />
      </div>
      <CustomModal isModalVisible={isErrorModalVisible} setIsModalVisible={setIsErrorModalVisible} type="Error" />
      <TryModal
        isModalVisible={isResultModalVisible}
        setIsModalVisible={setIsResultModalVisible}
        stage_star={3}
        stage_number={4}
        type={winOrLose}
      /> </>
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
  buttonContainer: {
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    zIndex: 71,
    left: "72px",
    top: "350px",
  },
  buttonStyle: {
    borderRadius: "10px",
    border: "3px solid #d4d4d4",
    height: "40px",
    width: "40px",
    marginTop: "30px",
    padding: "20px",
    "& .MuiButton-startIcon": { margin: 0 }
  }
};

export default Level_1_4;

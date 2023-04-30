import React, { useState } from "react";
import { RestartAlt, Stop, FastForward, PlayArrow, Home, Settings } from '@mui/icons-material';
import { Tooltip, IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import SettingModal from '../component/SettingModal';

const ButtonSet = (props) => {
  const {
    isAutoStepDisable,
    isStepDisable,
    isLoadDisable,
    handleStop,
    handleLoad,
    handlePlay,
    handleStep,
    stageNumber
  } = props;
  const navigate = useNavigate();
  const [isSettingVisible, setIsSettingVisible] = useState(false);

  const handleHomePressed = () => {
    if (stageNumber <= 10) {
      navigate(`/island1menu`, {state:true});
      return;
    } else if (stageNumber <= 20) {
      navigate(`/island2menu`, {state:true});
      return;
    } else if (stageNumber <= 30) {
      navigate(`/island3menu`, {state:true});
      return;
    } else if (stageNumber <= 35) {
      navigate(`/island4menu`, {state:true});
      return;
    }
  };


  return (
    <div style={CustomStyle.buttonContainer}>

      <IconButton
        aria-label="Play"
        size="large"
        sx={CustomStyle.buttonStyle}
        disabled={isAutoStepDisable}
        onClick={() => { handlePlay() }}
      >
        <Tooltip
          title={<span style={{ fontWeight: 800 }}>Play</span>}
          arrow
          placement="top"
        >
          <PlayArrow fontSize="large" sx={{ color: isAutoStepDisable ? "grey" : "green" }} />
        </Tooltip>
      </IconButton>

      <IconButton
        aria-label="Step Code"
        size="large"
        sx={CustomStyle.buttonStyle}
        disabled={isStepDisable}
        onClick={() => { handleStep() }}
      >
        <Tooltip
          title={<span style={{ fontWeight: 800 }}>Forward</span>}
          arrow
          placement="top"
        >
          <FastForward fontSize="large" sx={{ color: isStepDisable ? "grey" : "green" }} />
        </Tooltip>
      </IconButton>

      <IconButton
        aria-label="Load Code"
        size="large"
        sx={CustomStyle.buttonStyle}
        disabled={isLoadDisable}
        onClick={() => { handleLoad() }}
      >
        <Tooltip
          title={<span style={{ fontWeight: 800 }}>Load Code</span>}
          arrow
          placement="top"
        >
          <RestartAlt fontSize="large" sx={{ color: isLoadDisable ? "grey" : "green", }} />
        </Tooltip>
      </IconButton>

      <IconButton
        aria-label="Reset/Stop Code"
        size="large"
        sx={CustomStyle.buttonStyle}
        onClick={() => { handleStop() }}
      >
        <Tooltip
          title={<span style={{ fontWeight: 800 }}>Reset / Stop</span>}
          arrow
          placement="top"
        >
          <Stop fontSize="large" sx={{ color: "red" }} />
        </Tooltip>
      </IconButton>


      <IconButton
        aria-label="Back to Menu"
        size="large"
        sx={CustomStyle.buttonStyle}
        onClick={() => { handleHomePressed() }}
      >
        <Tooltip
          title={<span style={{ fontWeight: 800 }}>Back to Menu</span>}
          arrow
          placement="top"
        >
          <Home fontSize="large" sx={{ color: "green" }} />
        </Tooltip>
      </IconButton>

      <IconButton
        aria-label="Setting"
        size="large"
        sx={CustomStyle.buttonStyle}
        onClick={() => { setIsSettingVisible(true) }}
      >
        <Tooltip
          title={<span style={{ fontWeight: 800 }}>Settings</span>}
          arrow
          placement="top"
        >
          <Settings fontSize="large" sx={{ color: "green" }} />
        </Tooltip>
      </IconButton>

      <SettingModal
        isModalVisible={isSettingVisible}
        setIsModalVisible={setIsSettingVisible}
      />
    </div>
  );
}

const CustomStyle = {
  buttonContainer: {
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    zIndex: 71,
    left: "72px",
    top: "250px",
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

export default ButtonSet;

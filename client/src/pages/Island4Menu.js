import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom"; // import Link

import axios from "axios";
import ReminderModal from "../component/ReminderModal";
import AudioModal from '../component/AudioModal';
import SettingModal from '../component/SettingModal';
import UserContext from '../UserContext';


import settingBtn from "../asset/SettingBtn.png";
import homeBtn from "../asset/HomeBtn.png";

import island4_BG from "../asset/StageMode/Island4/Island4_BG.png";

import bgm from "../asset/bgm/Volcano.mp3";

const allImage = [island4_BG, homeBtn, settingBtn];


const baseurl = "http://localhost:3003";

const Island4Menu = () => {
  const { user } = useContext(UserContext);
  const island = "island4"
  const [isSettingVisible, setIsSettingVisible] = useState(false);

  const [stageProgress, setStageProgress] = useState([]);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [playedLevelStar, setPlayedLevelStar] = useState([]);
  const [unlockedlevel, setUnlockedLevel] = useState([31]);
  const [stage30Completed, setStage30Completed] = useState(false);
  const [allLoadedImages, setAllLoadedImages] = useState([]);
  const [isReminderVisible, setIsReminderVisible] = useState(false);
  const [reminderText, setReminderText] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    if(location.state == undefined || location.state == null || location.state == '')
      navigate("/");
  });

  useEffect(() => {
    // Preload the images
    const images = allImage.map((imageSrc) => {
      const image = new Image();
      image.src = imageSrc;
      return new Promise((resolve) => {
        image.addEventListener("load", () => {
          resolve(image);
        });
      });
    });

    Promise.all(images).then((loadedImages) => {
      setAllLoadedImages(true);
    });
  }, []);

  useEffect(() => {
    async function fetchStageProgress() {
      try {
        const island3Response = await axios.get(`${baseurl}/stage_progress/${user.user_id}/island3`);
        const island4Response = await axios.get(`${baseurl}/stage_progress/${user.user_id}/island4`);

        const island3Progress = island3Response.data.find(stage => stage.stage_number === 30);
        const island4Progress = island4Response.data.sort((a, b) => a.stage_number - b.stage_number);

        island3Progress ? setStage30Completed(true) : setStage30Completed(false)

        setStageProgress(island4Progress);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStageProgress();
  }, [user.user_id, island]);

  // console.log(stage30Completed, "island3Progress")

  useEffect(() => {
    // Unlock levels up to the user's current stage

    const unlocked = stageProgress.reduce((acc, stage) => {
      const { stage_number, stage_star } = stage;
      if (!acc.includes(stage_number)) {
        acc.push(stage_number);
        setPlayedLevelStar(prevState => {
          const newState = [...prevState];
          newState[stage_number - 1] = stage_star;
          return newState;
        });
      }
      setUnlockedLevel(stage_number + 1);
      return acc;
    }, []);
    setCompletedLevels(unlocked);

  }, [stageProgress]);

  const handleLockedLevelClick = () => {
    setReminderText("Please finish the current level. This level is not yet unlocked.")
    setIsReminderVisible(true)
  };

  const handleLevelClick = (level) => {
    level = level - 30;
    const path = level ? `/level_4_${level}` : "";
    navigate(path, {state:true});
  };

  const handleSettingClick = () => {
    setIsSettingVisible(true);
    // console.log("Setting clicked");
  };


  const handleHomeClick = () => {
    navigate("/stagemenu", {state:true})
  };

  // console.log(unlockedlevel, "unlockedlevel")

  const levelPositions = [
    { top: "55%", left: "11%" },
    { top: "84%", left: "40%" },
    { top: "50%", left: "51%" },
    { top: "7.5%", left: "62%" },
    { top: "54%", left: "89%" }
  ];



  return (
    <>
      {allLoadedImages && true}
      <PageContainer>
        <BackgroundImageContainer>
          <ReminderModal
            isModalVisible={isReminderVisible}
            setIsModalVisible={setIsReminderVisible}
            text={reminderText}
          />
          <SettingModal
            isModalVisible={isSettingVisible}
            setIsModalVisible={setIsSettingVisible}
          />
          <AudioModal audio={bgm} volume={user.musicVolume} />

          <BackgroundImage src={island4_BG} alt="island4_BG" />
          <SettingButton onClick={handleSettingClick}>
            <img src={settingBtn} alt="setting" />
          </SettingButton>

          <SettingButton onClick={handleHomeClick} style={{ position: "absolute", top: "8.5%", left: "84%" }}>
            <img src={homeBtn} alt="homeBtn" />
          </SettingButton>

          {[...Array(5)].map((_, index) => {
            const levelNumber = index + 30 + 1;
            return (
              <React.Fragment key={`level-button-${levelNumber}`}>
                {completedLevels.map((levelNumber, index) =>
                  playedLevelStar[levelNumber - 1] === 3 ? (
                    <LevelButton style={{ position: "absolute", ...levelPositions[levelNumber - 30 - 1] }} key={levelNumber} onClick={() => handleLevelClick(levelNumber)}>
                      <img src={require(`../asset/StageMode/Island4/level${levelNumber}_3stars.png`)} alt={`level${levelNumber}_3stars`} />
                    </LevelButton>
                  ) : playedLevelStar[levelNumber - 1] === 2 ? (
                    <LevelButton style={{ position: "absolute", ...levelPositions[levelNumber - 30 - 1] }} key={levelNumber} onClick={() => handleLevelClick(levelNumber)}>
                      <img src={require(`../asset/StageMode/Island4/level${levelNumber}_2stars.png`)} alt={`level${levelNumber}_2stars`} />
                    </LevelButton>
                  ) : (
                    <LevelButton style={{ position: "absolute", ...levelPositions[levelNumber - 30 - 1] }} key={levelNumber} onClick={() => handleLevelClick(levelNumber)}>
                      <img src={require(`../asset/StageMode/Island4/level${levelNumber}_1stars.png`)} alt={`level${levelNumber}_1stars`} />
                    </LevelButton>
                  )
                )}
                {[31, 32, 33, 34, 35].map((levelNumber) =>
                  completedLevels.includes(levelNumber) ? null : (
                    <LevelButton style={{ position: "absolute", ...levelPositions[levelNumber - 30 - 1] }} key={levelNumber} onClick={() => handleLockedLevelClick()}>
                      <img src={require(`../asset/StageMode/Island4/level${levelNumber}_grey.png`)} alt={`level${levelNumber}_grey`} />
                    </LevelButton>
                  )
                )}
                {stage30Completed && unlockedlevel <= 35 && (
                  <LevelButton
                    style={{ position: "absolute", ...levelPositions[unlockedlevel - 30 - 1] }}
                    key={unlockedlevel}
                    onClick={() => handleLevelClick(unlockedlevel)}
                  >
                    <img src={require(`../asset/StageMode/Island4/level${unlockedlevel}_unlock.png`)} alt={`level${unlockedlevel}_unlock`} />
                  </LevelButton>
                )}

              </React.Fragment>

            );
          })}
        </BackgroundImageContainer>
      </PageContainer>
    </>
  )
};

const LevelButton = styled.button`
  position: absolute;
  top: 55%;
  left: 11%;
  transform: translate(-50%, -50%);
  width: 14%;
  height: 14%;
  border: none;
  cursor: pointer;
  background-color: transparent;
  padding: 0;

  img {
    display: block;
    width: 110%;
    height: 110%;
    object-fit: contain;
    border-radius: 40px;
  }

  :hover {
    filter: brightness(1.1);
  }

  :active {
    transform: translate(-50%, -50%) scale(0.95);
  }
`;

const SettingButton = styled.button`
  position: absolute;
  top: 8.5%;
  left: 92.5%;
  transform: translate(-50%, -50%);
  width: 10%;
  height: 10%;
  border: none;
  cursor: pointer;
  background-color: transparent;
  padding: 0;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 40px;
  }

  :hover {
    filter: brightness(1.1);
  }

  :active {
    transform: translate(-50%, -50%) scale(0.95);
  }
`;


const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 40px;
  position: relative;
  
  & > * {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

const BackgroundImageContainer = styled.div`
  position: relative;
  width: 80%;
  height: 90%;
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Island4Menu;
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
import island2_BG from "../asset/StageMode/Island2/Island2_BG.png";

import bgm from "../asset/bgm/Desert.mp3";
const baseurl = "http://localhost:3003";

const allImage = [island2_BG, homeBtn, settingBtn];


const Island2Menu = () => {
  const { user } = useContext(UserContext);
  const island = "island2"
  const [isSettingVisible, setIsSettingVisible] = useState(false);

  const [stageProgress, setStageProgress] = useState([]);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [playedLevelStar, setPlayedLevelStar] = useState([]);
  const [unlockedlevel, setUnlockedLevel] = useState([11]);
  const [stage10Completed, setStage10Completed] = useState(false);
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
        const island1Response = await axios.get(`${baseurl}/stage_progress/${user.user_id}/island1`);
        const island2Response = await axios.get(`${baseurl}/stage_progress/${user.user_id}/island2`);

        const island1Progress = island1Response.data.find(stage => stage.stage_number === 10);
        const island2Progress = island2Response.data.sort((a, b) => a.stage_number - b.stage_number);

        island1Progress ? setStage10Completed(true) : setStage10Completed(false)

        setStageProgress(island2Progress);
      } catch (error) {
        console.error(error);
      }
    }

    fetchStageProgress();
  }, [user.user_id, island]);


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
    level = level - 10;
    const path = level ? `/level_2_${level}` : "";
    navigate(path,{state:true});
  };

  const handleSettingClick = () => {
    setIsSettingVisible(true);
    // console.log("Setting clicked");
  };


  const handleHomeClick = () => {
    navigate("/stagemenu",{state:true})
  };

  // console.log(unlockedlevel, "unlockedlevel")

  const levelPositions = [
    { top: "55%", left: "11%" },
    { top: "36%", left: "18%" },
    { top: "8%", left: "22%" },
    { top: "7%", left: "59%" },
    { top: "25%", left: "69%" },
    { top: "42%", left: "54%" },
    { top: "70%", left: "36%" },
    { top: "86%", left: "55%" },
    { top: "74%", left: "76.5%" },
    { top: "55%", left: "93%" },
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

          <BackgroundImage src={island2_BG} alt="island2_BG" />
          <SettingButton onClick={handleSettingClick}>
            <img src={settingBtn} alt="setting" />
          </SettingButton>

          <SettingButton onClick={handleHomeClick} style={{ position: "absolute", top: "8.5%", left: "84%" }}>
            <img src={homeBtn} alt="homeBtn" />
          </SettingButton>

          {[...Array(10)].map((_, index) => {
            const levelNumber = index + 10 + 1;
            return (
              <React.Fragment key={`level-button-${levelNumber}`}>
                {completedLevels.map((levelNumber, index) =>
                  playedLevelStar[levelNumber - 1] === 3 ? (
                    <LevelButton style={{ position: "absolute", ...levelPositions[levelNumber - 10 - 1] }} key={levelNumber} onClick={() => handleLevelClick(levelNumber)}>
                      <img src={require(`../asset/StageMode/Island2/level${levelNumber}_3stars.png`)} alt={`level${levelNumber}_3stars`} />
                    </LevelButton>
                  ) : playedLevelStar[levelNumber - 1] === 2 ? (
                    <LevelButton style={{ position: "absolute", ...levelPositions[levelNumber - 10 - 1] }} key={levelNumber} onClick={() => handleLevelClick(levelNumber)}>
                      <img src={require(`../asset/StageMode/Island2/level${levelNumber}_2stars.png`)} alt={`level${levelNumber}_2stars`} />
                    </LevelButton>
                  ) : (
                    <LevelButton style={{ position: "absolute", ...levelPositions[levelNumber - 10 - 1] }} key={levelNumber} onClick={() => handleLevelClick(levelNumber)}>
                      <img src={require(`../asset/StageMode/Island2/level${levelNumber}_1stars.png`)} alt={`level${levelNumber}_1stars`} />
                    </LevelButton>
                  )
                )}
                {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((levelNumber) =>
                  completedLevels.includes(levelNumber) ? null : (
                    <LevelButton style={{ position: "absolute", ...levelPositions[levelNumber - 10 - 1] }} key={levelNumber} onClick={() => handleLockedLevelClick()}>
                      <img src={require(`../asset/StageMode/Island2/level${levelNumber}_grey.png`)} alt={`level${levelNumber}_grey`} />
                    </LevelButton>
                  )
                )}
                {stage10Completed && unlockedlevel <= 20 && (
                  <LevelButton
                    style={{ position: "absolute", ...levelPositions[unlockedlevel - 10 - 1] }}
                    key={unlockedlevel}
                    onClick={() => handleLevelClick(unlockedlevel)}
                  >
                    <img src={require(`../asset/StageMode/Island2/level${unlockedlevel}_unlock.png`)} alt={`level${unlockedlevel}_unlock`} />
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

export default Island2Menu;
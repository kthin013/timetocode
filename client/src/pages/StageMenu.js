import React, { useState, useEffect, useContext, useRef } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom"; // import Link
import axios from "axios";

import UserContext from '../UserContext';

import settingBtn from "../asset/SettingBtn.png";
import homeBtn from "../asset/HomeBtn.png"

import stageMenu from "../asset/StageMode/StageMenu.png";

import island1_grey from "../asset/StageMode/Island1_grey.png";
import island2_grey from "../asset/StageMode/Island2_grey.png";
import island3_grey from "../asset/StageMode/Island3_grey.png";
import island4_grey from "../asset/StageMode/Island4_grey.png";

import island1_color from "../asset/StageMode/Island1_color.png";
import island2_color from "../asset/StageMode/Island2_color.png";
import island3_color from "../asset/StageMode/Island3_color.png";
import island4_color from "../asset/StageMode/Island4_color.png";

import bgm from "../asset/bgm/Background.mp3";

import ReminderModal from "../component/ReminderModal";
import SettingModal from '../component/SettingModal';
import AudioModal from '../component/AudioModal';

const allImage = [settingBtn, homeBtn, stageMenu, island1_grey, island2_grey, island3_grey, island4_grey, island1_color, island2_color, island3_color, island4_color]

const chapterRequirements = [
  { chapter: 1, section: 3 }, // chapter 1, section 3
  { chapter: 2, section: 3 }, // chapter 2, section 3
  { chapter: 3, section: 3 }, // chapter 3, section 3
  { chapter: 4, section: 3 }, // chapter 3, section 3
];
const baseurl = "http://localhost:3003";


const StageMenu = () => {
  const { user } = useContext(UserContext);
  const [isSettingVisible, setIsSettingVisible] = useState(false);

  const audioRef = useRef(null);

  const [unlocked1, setUnlocked1] = useState("");
  const [unlocked2, setUnlocked2] = useState("");
  const [unlocked3, setUnlocked3] = useState("");
  const [unlocked4, setUnlocked4] = useState("");
  const [allLoadedImages, setAllLoadedImages] = useState([]);
  const [isReminderVisible, setIsReminderVisible] = useState(false);
  const [reminderText, setReminderText] = useState("");


  const [chapterProgress, setChapterProgress] = useState({});
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
    getUserTutorialProgress(user.user_id).then((progress) => {
      const chapterProgressArray = Object.values(progress).flat();
      const lastProgress = chapterProgressArray[chapterProgressArray.length - 1];
      if (lastProgress) {
        let unlocked = 0; // the first island is unlocked by default
        for (let i = 1; i <= 4; i++) {
          const chapter = chapterRequirements.find((req) => req.chapter === i);
          if (!chapter) {
            // if there are no requirements for this chapter, skip it
            continue;
          }
          const chapterProgress = chapterProgressArray.filter(
            (p) => p.chapter_number === i
          );
          if (chapterProgress.length >= chapter.section) {
            // if the user has completed the required sections for this chapter, unlock the island
            unlocked = i;
            // console.log(unlocked, "unlocked")
          } else {
            // if the user has not completed the required sections for this chapter, break out of the loop
            break;
          }
        }
        setUnlocked1(unlocked >= 1);
        setUnlocked2(unlocked >= 2);
        setUnlocked3(unlocked >= 3);
        setUnlocked4(unlocked >= 4);
      }
    });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play();
      return () => {
        audio.pause();
      };
    }
  }, []);

  const getUserTutorialProgress = async (user_id) => {
    try {
      const response = await axios.get(`${baseurl}/tutorial_progress/${user_id}`);
      // console.log(response.data, "SEe progress>>>")
      const progress = {};
      response.data.sort((a, b) => {
        if (a.chapter_number === b.chapter_number) {
          return a.section_number - b.section_number;
        }
        return a.chapter_number - b.chapter_number;
      }).forEach((item) => {
        if (!progress[item.chapter_number]) {
          progress[item.chapter_number] = [];
        }
        progress[item.chapter_number].push(item);
      });
      setChapterProgress(progress);

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleIsland1Click = () => {
    if (unlocked1) {
      navigate("/island1menu", {state:true});
    }
    else {
      setReminderText("Please finish tutorial Chapter 1 to unlock the stages.");
      setIsReminderVisible(true);
    }
  };

  const handleIsland2Click = () => {
    if (unlocked2) {
      navigate("/island2menu", {state:true});
    } else {
      setReminderText("Please finish tutorial Chapter 2 to unlock the stages.");
      setIsReminderVisible(true);
    }
  };

  const handleIsland3Click = () => {
    if (unlocked3) {
      navigate("/island3menu", {state:true});
    } else {
      setReminderText("Please finish tutorial Chapter 3 to unlock the stages.");
      setIsReminderVisible(true);
    }
  };

  const handleIsland4Click = () => {
    if (unlocked4) {
      navigate("/island4menu", {state:true});
    } else {
      setReminderText("Please finish tutorial Chapter 4 to unlock the stages.");
      setIsReminderVisible(true);
    }
  };

  const handleSettingClick = () => {
    setIsSettingVisible(true);
  };

  const handleHomeClick = () => {
    navigate("/menu", {state:true});
  };

  return (
    <>
      {allLoadedImages && true}
      <PageContainer>
        <BackgroundImageContainer>
          <SettingModal
            isModalVisible={isSettingVisible}
            setIsModalVisible={setIsSettingVisible}
          />
          <AudioModal audio={bgm} volume={user.musicVolume} />

          <BackgroundImage src={stageMenu} alt="Login" />
          <SettingButton onClick={handleSettingClick}>
            <img src={settingBtn} alt="setting" />
          </SettingButton>

          <SettingButton onClick={handleHomeClick} style={{ position: "absolute", top: "8.5%", left: "84%" }}>
            <img src={homeBtn} alt="homeBtn" />
          </SettingButton>


          <IslandButton onClick={handleIsland1Click}>
            <img src={unlocked1 ? island1_color : island1_grey} alt="island1" />
          </IslandButton>

          <IslandButton style={{ position: "absolute", top: "70%", left: "40%" }} onClick={handleIsland2Click}>
            <img src={unlocked2 ? island2_color : island2_grey} alt="island2" />
          </IslandButton>

          <IslandButton style={{ position: "absolute", top: "30%", left: "60%" }} onClick={handleIsland3Click}>
            <img src={unlocked3 ? island3_color : island3_grey} alt="island3" />
          </IslandButton>

          <IslandButton style={{ position: "absolute", top: "70%", left: "80%" }} onClick={handleIsland4Click}>
            <img src={unlocked4 ? island4_color : island4_grey} alt="island4" />
          </IslandButton>

          <ReminderModal
            isModalVisible={isReminderVisible}
            setIsModalVisible={setIsReminderVisible}
            text={reminderText}
          />

        </BackgroundImageContainer>
      </PageContainer>
    </>
  )
};

const IslandButton = styled.button`
  position: absolute;
  top: 35%;
  left: 16%;
  transform: translate(-50%, -50%);
  width: 35%;
  height: 45%;
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

export default StageMenu;
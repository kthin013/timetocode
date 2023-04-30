import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom"; // import Link
import axios from "axios";

import ReminderModal from "../component/ReminderModal";
import SettingModal from '../component/SettingModal';
import AudioModal from '../component/AudioModal';

import UserContext from '../UserContext';


import stageBtn from "../asset/StageBtn.png";
import tutorialBtn from "../asset/TutorialBtn.png";
import menuPage from "../asset/MenuPage.png";
import settingBtn from "../asset/SettingBtn.png";

import ch0_popup from "../asset/Ch0_popup.png";
import ch1_popup from "../asset/Ch1_popup.png";
import ch2_popup from "../asset/Ch2_popup.png";
import ch3_popup from "../asset/Ch3_popup.png";
import ch4_popup from "../asset/Ch4_popup.png";

import okBtn from "../asset/OKbtn.png";
import closeBtn from "../asset/CloseBtn.png";
import nextChBtn from "../asset/NextChBtn.png";
import disabledNextChBtn from "../asset/NextDisabledBtn.png";
import backChBtn from "../asset/BackChBtn.png";
import popup_BG from "../asset/popup_BG.png";

import bgm from "../asset/bgm/Background.mp3";

const baseurl = "http://localhost:3003";

const allImages = [stageBtn, tutorialBtn, menuPage, ch0_popup, ch1_popup, ch2_popup, ch3_popup, ch4_popup, okBtn, closeBtn, nextChBtn, backChBtn, popup_BG]

const PopupImages = [ch0_popup, ch1_popup, ch2_popup, ch3_popup, ch4_popup];
const chapterRequirements = [
  { chapter: 0, section: 0 }, // chapter 0
  { chapter: 1, section: 3 }, // chapter 1, section 3
  { chapter: 2, section: 3 }, // chapter 2, section 3
  { chapter: 3, section: 3 }, // chapter 3, section 3
  { chapter: 4, section: 3 }, // chapter 4, section 3
];



const MenuPage = () => {
  const { user } = useContext(UserContext);
  const [isSettingVisible, setIsSettingVisible] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [popupIndex, setPopupIndex] = useState(0);
  const [allLoadedImages, setAllLoadedImages] = useState([]);
  const [chapterProgress, setChapterProgress] = useState({});
  const [isReminderVisible, setIsReminderVisible] = useState(false);
  const [reminderMode, setReminderMode] = useState("");
  const [reminderText, setReminderText] = useState("");

  const prevChapter = chapterProgress[popupIndex];
  const nextChapter = chapterRequirements[popupIndex];
  const isNextDisabled =
    prevChapter === undefined
    || // previous chapter not completed
    (prevChapter.chapter_number === nextChapter.chapter &&
      prevChapter.section_number < nextChapter.section); // previous chapter not fully completed

  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    if(location.state == undefined || location.state == null || location.state == '')
      navigate("/");
  });

  useEffect(() => {
    // Preload the images
    getUserTutorialProgress(user.user_id)
    const images = allImages.map((imageSrc) => {
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
        progress[item.chapter_number] = item;
      });
      setChapterProgress(progress);

      if (response.data.length === 0) {
        setReminderMode("menuGuide");
        setReminderText("")
        setIsReminderVisible(true);
      }

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleTutorialClick = () => {
    setShowTutorial(true);
  };

  const handleStageClick = () => {
    navigate("/stagemenu",{state:true})
  };

  const handleSettingClick = () => {
    setIsSettingVisible(true);
  };

  const handleCloseClick = () => {
    setShowTutorial(false);
  };

  const handleNextClick = () => {
    if (isNextDisabled) {
      setReminderMode("");
      setReminderText("Please finish the current Chapter.")
      setIsReminderVisible(true);
    } else {
      setPopupIndex(popupIndex + 1);
    }
  };

  const handleBackClick = () => {
    if (popupIndex === 0) {
      return;
    } else {
      setPopupIndex(popupIndex - 1);
    }
  };

  const PopupComponent = () => {
    const currentPopup = PopupImages[popupIndex];

    const handleOKClick = () => {
      if (currentPopup === ch0_popup) {
        navigate("/chapter0",{state:true});
      } else if (currentPopup === ch1_popup) {
        navigate("/chapter1",{state:true});
      } else if (currentPopup === ch2_popup) {
        navigate("/chapter2",{state:true});
      } else if (currentPopup === ch3_popup) {
        navigate("/chapter3",{state:true});
      } else if (currentPopup === ch4_popup) {
        navigate("/chapter4",{state:true});
      }
    };

    let nextButton = (
      <NextButton onClick={handleNextClick}>
        <img src={nextChBtn} alt="nextChBtn" />
      </NextButton>
    );
    let backButton = (
      <NextButton
        onClick={handleBackClick}
        style={{ position: "absolute", left: "38%" }}
      >
        <img src={backChBtn} alt="backChBtn" />
      </NextButton>
    );

    if (currentPopup === ch0_popup) {
      backButton = null;
    } else if (currentPopup === ch4_popup) {
      nextButton = null;
    }


    return (
      <PopupContainer>
        <PopupImage src={popup_BG} alt="Tutorial Popup" />
        <OverlayImage src={currentPopup} alt="Overlay Image" />
        <OKButton onClick={handleOKClick}>
          <img src={okBtn} alt="okBtn" />
        </OKButton>
        <CloseButton onClick={handleCloseClick}>
          <img src={closeBtn} alt="closeBtn" />
        </CloseButton>

        {backButton}
        {currentPopup !== ch4_popup && (
          <>
            {isNextDisabled ? (

              <NextButton onClick={handleNextClick} style={{ height: "15.5%" }}>
                <img src={disabledNextChBtn} alt="nextChBtn" />
              </NextButton>

            ) : (nextButton)}
          </>
        )}

      </PopupContainer>
    );
  };



  return (
    <>
      <PageContainer>
        <BackgroundImageContainer>

          <SettingModal
            isModalVisible={isSettingVisible}
            setIsModalVisible={setIsSettingVisible}
          />
          <AudioModal audio={bgm} volume={user.musicVolume} />

          <BackgroundImage src={menuPage} alt="menuPage" />
          <SettingButton onClick={handleSettingClick}>
            <img src={settingBtn} alt="settingBtn" />
          </SettingButton>
          <ModeButton onClick={handleTutorialClick}>
            <img src={tutorialBtn} alt="tutorialBtn" />
          </ModeButton>

          <ModeButton style={{ position: "absolute", left: "74%" }} onClick={handleStageClick}>
            <img src={stageBtn} alt="stageBtn" />
          </ModeButton>
          {allLoadedImages && showTutorial && <PopupComponent />}

          <ReminderModal
            isModalVisible={isReminderVisible}
            setIsModalVisible={setIsReminderVisible}
            text={reminderText}
            mode={reminderMode}
          >
          </ReminderModal>

        </BackgroundImageContainer>

      </PageContainer>
    </>
  )
};

const ModeButton = styled.button`
  position: absolute;
  top: 55%;
  left: 26%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 75%;
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

const PopupContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const PopupImage = styled.img`
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
`;

const OverlayImage = styled.img`
  position: absolute;
  top: 42.64%;
  left: 50%;
  width: 50%;
  height: 50%;
  transform: translate(-50%, -50%);
  object-fit: contain;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 13%;
  left: 67%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transform: translate(-50%, -50%);

  img {
    width: 75%;
    height: 60%;
    object-fit: contain;
  }

  :hover {
    filter: brightness(1.1);
  }

  :active {
    transform: translate(-50%, -50%) scale(0.95);
  }
`;

const OKButton = styled.button`
  position: absolute;
  top: 77%;
  left: 50%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transform: translate(-50%, -50%);

  img {
    width: 75%;
    height: 60%;
    object-fit: contain;
  }

  :hover {
    filter: brightness(1.1);
  }

  :active {
    transform: translate(-50%, -50%) scale(0.95);
  }
`;

const NextButton = styled.button`
  position: absolute;
  top: 52%;
  left: 62%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transform: translate(-50%, -50%);

  img {
    width: 75%;
    height: 60%;
    object-fit: contain;
  }

  :hover {
    filter: brightness(1.1);
  }

  :active {
    transform: translate(-50%, -50%) scale(0.95);
  }

  &[disabled] {
    filter: brightness(0.7);
    cursor: not-allowed;
  }
`;

export default MenuPage;
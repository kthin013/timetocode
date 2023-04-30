import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom"; // import Link
import { useNavigate, useLocation } from "react-router-dom"; // import Link
import axios from "axios";
import UserContext from '../UserContext';

import SettingModal from '../component/SettingModal';
import AudioModal from '../component/AudioModal';

import settingBtn from "../asset/SettingBtn.png";
import homeBtn from "../asset/HomeBtn.png";

import nextBtn from "../asset/TutorialMode/Chapter0/NextBtn.png";
import backBtn from "../asset/TutorialMode/Chapter0/BackBtn.png";

import StartBtn from "../asset/TutorialMode/Chapter0/StartBtn.png";
import T0P1 from "../asset/TutorialMode/Chapter0/T0P1.png";
import T0P2 from "../asset/TutorialMode/Chapter0/T0P2.png";
import T0P3 from "../asset/TutorialMode/Chapter0/T0P3.png";
import T0P4 from "../asset/TutorialMode/Chapter0/T0P4.png";
import T0P5 from "../asset/TutorialMode/Chapter0/T0P5.png";
import T0P6 from "../asset/TutorialMode/Chapter0/T0P6.png";
import T0P7 from "../asset/TutorialMode/Chapter0/T0P7.png";
import T0P8 from "../asset/TutorialMode/Chapter0/T0P8.png";
import T0P9 from "../asset/TutorialMode/Chapter0/T0P9.png";
import T0P10 from "../asset/TutorialMode/Chapter0/T0P10.png";
import T0P11 from "../asset/TutorialMode/Chapter0/T0P11.png";
import T0P12 from "../asset/TutorialMode/Chapter0/T0P12.png";
import T0P13 from "../asset/TutorialMode/Chapter0/T0P13.png";
import T0P14 from "../asset/TutorialMode/Chapter0/T0P14.png";

import sessionBtn from "../asset/TutorialMode/Chapter0/SessionBtn.png";
import endChBtn from "../asset/TutorialMode/Chapter0/EndChBtn.png";

import bgm from "../asset/bgm/Tutorial.mp3";
import T0S1 from "../asset/bgm/Chapter0/T0S1.mp3";
import empty from "../asset/bgm/Empty.mp3";
import T0S3 from "../asset/bgm/Chapter0/T0S3.mp3";
import T0S4 from "../asset/bgm/Chapter0/T0S4.mp3";
import T0S5 from "../asset/bgm/Chapter0/T0S5.mp3";
import T0S6 from "../asset/bgm/Chapter0/T0S6.mp3";
import T0S7 from "../asset/bgm/Chapter0/T0S7.mp3";
import T0S8 from "../asset/bgm/Chapter0/T0S8.mp3";
import T0S9 from "../asset/bgm/Chapter0/T0S9.mp3";
import T0S10 from "../asset/bgm/Chapter0/T0S10.mp3";
import T0S11 from "../asset/bgm/Chapter0/T0S11.mp3";
import T0S12 from "../asset/bgm/Chapter0/T0S12.mp3";
import T0S13 from "../asset/bgm/Chapter0/T0S13.mp3";

const baseurl = "http://localhost:3003";

const tutorialPage = [T0P1, T0P2, T0P3, T0P4, T0P5, T0P6, T0P7, T0P8, T0P9, T0P10, T0P11, T0P12, T0P13, T0P14];
const dialogue = [T0S1, empty, T0S3, T0S4, T0S5, T0S6, T0S7, T0S8, T0S9, T0S10, T0S11, T0S12, T0S13, empty]

const Chapter0 = () => {
  const { user } = useContext(UserContext);
  const [pageIndex, setPageIndex] = useState(0);
  const [allLoadedImages, setAllLoadedImages] = useState([]);
  const [isSettingVisible, setIsSettingVisible] = useState(false);
  const currentPage = tutorialPage[pageIndex];

  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    if(location.state == undefined || location.state == null || location.state == '')
      navigate("/");
  });

  useEffect(() => {
    // Preload the images
    const images = tutorialPage.map((imageSrc) => {
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

  const handleSettingClick = () => {
    setIsSettingVisible(true);
  };

  const handleHomeClick = () => {
    navigate("/menu", {state:true});
  };

  const handleNextClick = () => {
    if (pageIndex === tutorialPage.length - 1) {
      return;
    } else {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleBackClick = () => {
    if (pageIndex === 0) {
      return;
    } else {
      setPageIndex(pageIndex - 1);
    }
  };

  const handleStartClick = () => {
    if (pageIndex === tutorialPage.length - 1) {
      return;
    } else {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleEndOfChClick = async () => {
    try {
      const user_id = user.user_id;
      const chapter_number = 0;
      const section_number = 1;
      const response = await axios.post(`${baseurl}/tutorial_progress`, {
        user_id,
        chapter_number,
        section_number,
      });
      // console.log(response, "response>>>!")
      navigate("/menu", {state:true});
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {allLoadedImages && true}
      <PageContainer>
        <BackgroundImageContainer>

          <SettingModal
            isModalVisible={isSettingVisible}
            setIsModalVisible={setIsSettingVisible}
            mode="dialogue"
          />

          <AudioModal audio={dialogue[pageIndex]} mode="dialogue" volume={user.dialogueVolume} />
          <AudioModal audio={bgm} volume={user.musicVolume} mode="music" />
          <BackgroundImage src={currentPage} alt="menuPage" />
          <SettingButton onClick={handleSettingClick}>
            <img src={settingBtn} alt="settingBtn" />
          </SettingButton>

          <SettingButton onClick={handleHomeClick} style={{ position: "absolute", top: "8.5%", left: "84%" }}>
            <img src={homeBtn} alt="homeBtn" />
          </SettingButton>

          {currentPage === T0P1 ? (
            <OKButton onClick={handleStartClick} style={{ position: "absolute", top: "85%" }}>
              <img src={StartBtn} alt="StartBtn" />
            </OKButton>
          ) : null}

          {currentPage !== T0P1 ?
            <>
              <OKButton onClick={handleBackClick} style={{ position: "absolute", top: "95%", left: "5%" }}>
                <img src={backBtn} alt="backBtn" />
              </OKButton>
              {currentPage === T0P2 ? (
                <>
                  <DimBackground>
                    <OKButton onClick={handleNextClick} style={{ position: "absolute", top: "50%", left: "50%" }}>
                      <img src={sessionBtn} alt="sessionBtn" style={{ width: "100%", height: "30%" }} />
                    </OKButton>
                  </DimBackground>
                </>
              ) : null}

              {currentPage === T0P14 ? (
                <>
                  <DimBackground>
                    <OKButton onClick={handleEndOfChClick} style={{ position: "absolute", top: "50%", left: "50%" }}>
                      <img src={endChBtn} alt="endChBtn" style={{ width: "100%", height: "30%" }} />
                    </OKButton>
                  </DimBackground>
                </>
              ) : null}
              <OKButton onClick={handleNextClick} style={{ position: "absolute", top: "95%", left: "93%" }}>
                <img src={nextBtn} alt="nextBtn" style={{ width: "160%", height: "80%" }} />
              </OKButton>
            </> : null}

        </BackgroundImageContainer>
      </PageContainer>
    </>
  )
};

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

const DimBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;


export default Chapter0;
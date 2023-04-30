import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom"; // import Link
import { useNavigate, useLocation } from "react-router-dom"; // import Link
import axios from "axios";
import UserContext from '../UserContext';

import QuestionModal from '../component/QuestionModal';
import SettingModal from '../component/SettingModal';
import AudioModal from '../component/AudioModal';

import settingBtn from "../asset/SettingBtn.png";
import homeBtn from "../asset/HomeBtn.png";


import nextBtn from "../asset/TutorialMode/Chapter0/NextBtn.png";
import backBtn from "../asset/TutorialMode/Chapter0/BackBtn.png";

import StartBtn from "../asset/TutorialMode/Chapter0/StartBtn.png";
import T1P1 from "../asset/TutorialMode/Chapter1/T1P1.png";
import T1P2 from "../asset/TutorialMode/Chapter1/T1P2.png";
import T1P3 from "../asset/TutorialMode/Chapter1/T1P3.png";
import T1P4 from "../asset/TutorialMode/Chapter1/T1P4.png";
import T1P5 from "../asset/TutorialMode/Chapter1/T1P5.png";
import T1P6 from "../asset/TutorialMode/Chapter1/T1P6.png";
import T1P7 from "../asset/TutorialMode/Chapter1/T1P7.png";


import T1P1_2 from "../asset/TutorialMode/Chapter1/T1P1_2.png";
import T1P1_3 from "../asset/TutorialMode/Chapter1/T1P1_3.png";

import T1P8 from "../asset/TutorialMode/Chapter1/T1P8.png";
import T1P9 from "../asset/TutorialMode/Chapter1/T1P9.png";
import T1P10 from "../asset/TutorialMode/Chapter1/T1P10.png";
import T1P11 from "../asset/TutorialMode/Chapter1/T1P11.png";
import T1P12 from "../asset/TutorialMode/Chapter1/T1P12.png";
import T1P13 from "../asset/TutorialMode/Chapter1/T1P13.png";
import T1P14 from "../asset/TutorialMode/Chapter1/T1P14.png";
import T1P15 from "../asset/TutorialMode/Chapter1/T1P15.png";
import T1P16 from "../asset/TutorialMode/Chapter1/T1P16.png";
import T1P17 from "../asset/TutorialMode/Chapter1/T1P17.png";
import T1P18 from "../asset/TutorialMode/Chapter1/T1P18.png";

import section1_1Btn from "../asset/TutorialMode/Chapter1/Section1_1Btn.png";
import section1_2Btn from "../asset/TutorialMode/Chapter1/Section1_2Btn.png";
import section1_3Btn from "../asset/TutorialMode/Chapter1/Section1_3Btn.png";

import endChBtn from "../asset/TutorialMode/Chapter0/EndChBtn.png";

import bgm from "../asset/bgm/Tutorial.mp3";
import empty from "../asset/bgm/Empty.mp3";
import T1S2 from "../asset/bgm/Chapter1/T1S2.mp3";
import T1S3 from "../asset/bgm/Chapter1/T1S3.mp3";
import T1S4 from "../asset/bgm/Chapter1/T1S4.mp3";
import T1S5 from "../asset/bgm/Chapter1/T1S5.mp3";
import T1S6 from "../asset/bgm/Chapter1/T1S6.mp3";
import T1S7 from "../asset/bgm/Chapter1/T1S7.mp3";
import T1S8 from "../asset/bgm/Chapter1/T1S8.mp3";
import T1S9 from "../asset/bgm/Chapter1/T1S9.mp3";
import T1S10 from "../asset/bgm/Chapter1/T1S10.mp3";
import T1S11 from "../asset/bgm/Chapter1/T1S11.mp3";
import T1S12 from "../asset/bgm/Chapter1/T1S12.mp3";
import T1S13 from "../asset/bgm/Chapter1/T1S13.mp3";
import T1S14 from "../asset/bgm/Chapter1/T1S14.mp3";
import T1S15 from "../asset/bgm/Chapter1/T1S15.mp3";
import T1Q1 from "../asset/bgm/Chapter1/T1Q1.mp3";
import T1Q2 from "../asset/bgm/Chapter1/T1Q2.mp3";


const baseurl = "http://localhost:3003";

const tutorialPage = [T1P1, T1P2, T1P3, T1P4, T1P5, T1P1_2, T1P6, T1P7, T1P8, T1P9, T1P10, T1P1_3, T1P11, T1P12, T1P13, T1P14, T1P15, T1P16, T1P17, T1P18];
const dialogue = [empty, T1S2, T1S3, T1S4, T1S5, empty, T1S6, T1S7, T1S8, T1S9, T1S10, empty, T1S11, T1S12, T1S13, T1S14, T1S15, T1Q1, T1Q2, empty]

const Chapter1 = () => {
  const { user } = useContext(UserContext);
  const [pageIndex, setPageIndex] = useState(0);
  const [allLoadedImages, setAllLoadedImages] = useState([]);
  const [isSettingVisible, setIsSettingVisible] = useState(false);
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);

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

  useEffect(() => {
    if (currentPage === T1P16 || currentPage === T1P17) {
      setIsQuestionVisible(true);
    }
  }, [currentPage]);

  const handleSettingClick = () => {
    setIsSettingVisible(true);
  };

  const handleHomeClick = () => {
    navigate("/menu",{state:true});
  };


  const handleNextClick = () => {
    if (pageIndex === tutorialPage.length - 1) {
      return;
    } else {
      setPageIndex(pageIndex + 1);
    }
  };


  const handleSection1Click = () => {
    setPageIndex(1);
  };

  const handleSection2Click = async () => {
    setPageIndex(6);
    try {
      const user_id = user.user_id;
      const chapter_number = 1;
      const section_number = 1;
      const response = await axios.post(`${baseurl}/tutorial_progress`, {
        user_id,
        chapter_number,
        section_number,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSection3Click = async () => {
    setPageIndex(12);
    try {
      const user_id = user.user_id;
      const chapter_number = 1;
      const section_number = 2;
      const response = await axios.post(`${baseurl}/tutorial_progress`, {
        user_id,
        chapter_number,
        section_number,
      });
    } catch (error) {
      console.error(error);
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
      const chapter_number = 1;
      const section_number = 3;
      const response = await axios.post(`${baseurl}/tutorial_progress`, {
        user_id,
        chapter_number,
        section_number,
      });
      // console.log(response, "response>>>!")
      navigate("/menu",{state:true});
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


          <OKButton onClick={handleBackClick} style={{ position: "absolute", top: "95%", left: "5%" }}>
            <img src={backBtn} alt="backBtn" />
          </OKButton>
          {currentPage === T1P1 ? (
            <>
              <DimBackground>
                <OKButton onClick={handleNextClick} style={{ position: "absolute", top: "80%", left: "50%" }} disabled>
                  <img src={section1_3Btn} alt="section1_3Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>

                <OKButton onClick={handleNextClick} style={{ position: "absolute", top: "52.5%", left: "50%" }} disabled>
                  <img src={section1_2Btn} alt="section1_2Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>
                <OKButton onClick={handleSection1Click} style={{ position: "absolute", top: "25%", left: "50%" }}>
                  <img src={section1_1Btn} alt="section1_1Btn" style={{ width: "90%", height: "20%" }} />
                </OKButton>

              </DimBackground>
            </>
          ) : null}

          {currentPage === T1P1_2 ? (
            <>
              <DimBackground>
                <OKButton onClick={handleNextClick} style={{ position: "absolute", top: "80%", left: "50%" }} disabled>
                  <img src={section1_3Btn} alt="section1_3Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>

                <OKButton onClick={handleSection2Click} style={{ position: "absolute", top: "52.5%", left: "50%" }}>
                  <img src={section1_2Btn} alt="section1_2Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>
                <OKButton onClick={handleSection1Click} style={{ position: "absolute", top: "25%", left: "50%" }}>
                  <img src={section1_1Btn} alt="section1_1Btn" style={{ width: "90%", height: "20%" }} />
                </OKButton>

              </DimBackground>
            </>
          ) : null}

          {currentPage === T1P1_3 ? (
            <>
              <DimBackground>
                <OKButton onClick={handleSection3Click} style={{ position: "absolute", top: "80%", left: "50%" }}>
                  <img src={section1_3Btn} alt="section1_3Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>

                <OKButton onClick={handleSection2Click} style={{ position: "absolute", top: "52.5%", left: "50%" }}>
                  <img src={section1_2Btn} alt="section1_2Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>
                <OKButton onClick={handleSection1Click} style={{ position: "absolute", top: "25%", left: "50%" }}>
                  <img src={section1_1Btn} alt="section1_1Btn" style={{ width: "90%", height: "20%" }} />
                </OKButton>

              </DimBackground>
            </>
          ) : null}

          <QuestionModal
            isModalVisible={isQuestionVisible}
            setIsModalVisible={setIsQuestionVisible}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            questionNum={0}
          >
          </QuestionModal>

          {currentPage === T1P18 ? (
            <>
              <DimBackground>
                <OKButton onClick={handleEndOfChClick} style={{ position: "absolute", top: "50%", left: "50%" }}>
                  <img src={endChBtn} alt="endChBtn" style={{ width: "100%", height: "30%" }} />
                </OKButton>
              </DimBackground>
            </>
          ) : null}

          <OKButton onClick={handleNextClick} style={{ position: "absolute", top: "95%", left: "93%" }}>
            <img src={nextBtn} alt="okBtn" style={{ width: "160%", height: "80%" }} />
          </OKButton>


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


  &[disabled] {
    filter: brightness(0.7);
    cursor: not-allowed;
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


export default Chapter1;
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

import okBtn from "../asset/OKbtn.png";
import closeBtn from "../asset/CloseBtn.png";

import nextBtn from "../asset/TutorialMode/Chapter0/NextBtn.png";
import backBtn from "../asset/TutorialMode/Chapter0/BackBtn.png";

import StartBtn from "../asset/TutorialMode/Chapter0/StartBtn.png";
import T3P1 from "../asset/TutorialMode/Chapter3/T3P1.png";
import T3P2 from "../asset/TutorialMode/Chapter3/T3P2.png";
import T3P3 from "../asset/TutorialMode/Chapter3/T3P3.png";
import T3P4 from "../asset/TutorialMode/Chapter3/T3P4.png";
import T3P5 from "../asset/TutorialMode/Chapter3/T3P5.png";
import T3P6 from "../asset/TutorialMode/Chapter3/T3P6.png";
import T3P7 from "../asset/TutorialMode/Chapter3/T3P7.png";


import T3P1_2 from "../asset/TutorialMode/Chapter3/T3P1_2.png";
import T3P1_3 from "../asset/TutorialMode/Chapter3/T3P1_3.png";

import T3P8 from "../asset/TutorialMode/Chapter3/T3P8.png";
import T3P9 from "../asset/TutorialMode/Chapter3/T3P9.png";
import T3P10 from "../asset/TutorialMode/Chapter3/T3P10.png";
import T3P11 from "../asset/TutorialMode/Chapter3/T3P11.png";
import T3P12 from "../asset/TutorialMode/Chapter3/T3P12.png";
import T3P13 from "../asset/TutorialMode/Chapter3/T3P13.png";
import T3P14 from "../asset/TutorialMode/Chapter3/T3P14.png";
import T3P15 from "../asset/TutorialMode/Chapter3/T3P15.png";
import T3P16 from "../asset/TutorialMode/Chapter3/T3P16.png";
import T3P17 from "../asset/TutorialMode/Chapter3/T3P17.png";
import T3P18 from "../asset/TutorialMode/Chapter3/T3P18.png";
import T3P19 from "../asset/TutorialMode/Chapter3/T3P19.png";
import T3P20 from "../asset/TutorialMode/Chapter3/T3P20.png";
import T3P21 from "../asset/TutorialMode/Chapter3/T3P21.png";
import T3P22 from "../asset/TutorialMode/Chapter3/T3P22.png";
import T3P23 from "../asset/TutorialMode/Chapter3/T3P23.png";
import T3P24 from "../asset/TutorialMode/Chapter3/T3P24.png";
import T3P25 from "../asset/TutorialMode/Chapter3/T3P25.png";


import section3_1Btn from "../asset/TutorialMode/Chapter3/Section3_1Btn.png";
import section3_2Btn from "../asset/TutorialMode/Chapter3/Section3_2Btn.png";
import section3_3Btn from "../asset/TutorialMode/Chapter3/Section3_3Btn.png";

import endChBtn from "../asset/TutorialMode/Chapter0/EndChBtn.png";

import bgm from "../asset/bgm/Tutorial.mp3";
import empty from "../asset/bgm/Empty.mp3";
import T3S2 from "../asset/bgm/Chapter3/T3S2.mp3";
import T3S3 from "../asset/bgm/Chapter3/T3S3.mp3";
import T3S4 from "../asset/bgm/Chapter3/T3S4.mp3";
import T3S5 from "../asset/bgm/Chapter3/T3S5.mp3";
import T3S6 from "../asset/bgm/Chapter3/T3S6.mp3";
import T3S7 from "../asset/bgm/Chapter3/T3S7.mp3";
import T3S8 from "../asset/bgm/Chapter3/T3S8.mp3";
import T3S9 from "../asset/bgm/Chapter3/T3S9.mp3";
import T3S10 from "../asset/bgm/Chapter3/T3S10.mp3";
import T3S11 from "../asset/bgm/Chapter3/T3S11.mp3";
import T3S12 from "../asset/bgm/Chapter3/T3S12.mp3";
import T3S13 from "../asset/bgm/Chapter3/T3S13.mp3";
import T3S14 from "../asset/bgm/Chapter3/T3S14.mp3";
import T3S15 from "../asset/bgm/Chapter3/T3S15.mp3";
import T3S16 from "../asset/bgm/Chapter3/T3S16.mp3";
import T3S17 from "../asset/bgm/Chapter3/T3S17.mp3";
import T3S18 from "../asset/bgm/Chapter3/T3S18.mp3";
import T3S19 from "../asset/bgm/Chapter3/T3S19.mp3";
import T3S20 from "../asset/bgm/Chapter3/T3S20.mp3";
import T3S21 from "../asset/bgm/Chapter3/T3S21.mp3";
import T3S22 from "../asset/bgm/Chapter3/T3S22.mp3";
import T3Q1 from "../asset/bgm/Chapter3/T3Q1.mp3";
import T3Q2 from "../asset/bgm/Chapter3/T3Q2.mp3";

const baseurl = "http://localhost:3003";

const tutorialPage = [T3P1, T3P2, T3P3, T3P4, T3P5, T3P6, T3P1_2, T3P7, T3P8, T3P9, T3P10, T3P11, T3P12, T3P13, T3P14, T3P15, T3P1_3, T3P16, T3P17, T3P18, T3P19, T3P20, T3P21, T3P22, T3P23, T3P24, T3P25];
const dialogue = [empty, T3S2, T3S3, T3S4, T3S5, T3S6, empty, T3S7, T3S8, T3S9, T3S10, T3S11, T3S12, T3S13, T3S14, T3S15, empty, T3S16, T3S17, T3S18, T3S19, T3S20, T3S21, T3S22, T3Q1, T3Q2, empty];


const Chapter3 = () => {
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
    if (currentPage === T3P23 || currentPage === T3P24) {
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
    setPageIndex(7);
    try {
      const user_id = user.user_id;
      const chapter_number = 3;
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
    setPageIndex(17);
    try {
      const user_id = user.user_id;
      const chapter_number = 3;
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
      const chapter_number = 3;
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
          {currentPage === T3P1 ? (
            <>
              <DimBackground>
                <OKButton onClick={handleNextClick} style={{ position: "absolute", top: "80%", left: "50%" }} disabled>
                  <img src={section3_3Btn} alt="section3_3Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>

                <OKButton onClick={handleNextClick} style={{ position: "absolute", top: "52.5%", left: "50%" }} disabled>
                  <img src={section3_2Btn} alt="section3_2Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>
                <OKButton onClick={handleSection1Click} style={{ position: "absolute", top: "25%", left: "50%" }}>
                  <img src={section3_1Btn} alt="section3_1Btn" style={{ width: "90%", height: "20%" }} />
                </OKButton>

              </DimBackground>
            </>
          ) : null}

          {currentPage === T3P1_2 ? (
            <>
              <DimBackground>
                <OKButton onClick={handleNextClick} style={{ position: "absolute", top: "80%", left: "50%" }} disabled>
                  <img src={section3_3Btn} alt="section3_3Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>

                <OKButton onClick={handleSection2Click} style={{ position: "absolute", top: "52.5%", left: "50%" }}>
                  <img src={section3_2Btn} alt="section3_2Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>
                <OKButton onClick={handleSection1Click} style={{ position: "absolute", top: "25%", left: "50%" }}>
                  <img src={section3_1Btn} alt="section3_1Btn" style={{ width: "90%", height: "20%" }} />
                </OKButton>

              </DimBackground>
            </>
          ) : null}

          {currentPage === T3P1_3 ? (
            <>
              <DimBackground>
                <OKButton onClick={handleSection3Click} style={{ position: "absolute", top: "80%", left: "50%" }}>
                  <img src={section3_3Btn} alt="section3_3Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>

                <OKButton onClick={handleSection2Click} style={{ position: "absolute", top: "52.5%", left: "50%" }}>
                  <img src={section3_2Btn} alt="section3_2Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>
                <OKButton onClick={handleSection1Click} style={{ position: "absolute", top: "25%", left: "50%" }}>
                  <img src={section3_1Btn} alt="section3_1Btn" style={{ width: "90%", height: "20%" }} />
                </OKButton>

              </DimBackground>
            </>
          ) : null}

          <QuestionModal
            isModalVisible={isQuestionVisible}
            setIsModalVisible={setIsQuestionVisible}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            questionNum={4}
          >
          </QuestionModal>

          {currentPage === T3P25 ? (
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


export default Chapter3;
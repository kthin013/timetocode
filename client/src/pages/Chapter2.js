import React, { useState, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom"; // import Link
import { useNavigate, useLocation } from "react-router-dom"; // import Link
import axios from "axios";
import UserContext from '../UserContext';

import SettingModal from '../component/SettingModal';
import AudioModal from '../component/AudioModal';

import QuestionModal from '../component/QuestionModal';
import settingBtn from "../asset/SettingBtn.png";
import homeBtn from "../asset/HomeBtn.png";

import okBtn from "../asset/OKbtn.png";
import closeBtn from "../asset/CloseBtn.png";

import nextBtn from "../asset/TutorialMode/Chapter0/NextBtn.png";
import backBtn from "../asset/TutorialMode/Chapter0/BackBtn.png";

import StartBtn from "../asset/TutorialMode/Chapter0/StartBtn.png";
import T2P1 from "../asset/TutorialMode/Chapter2/T2P1.png";
import T2P2 from "../asset/TutorialMode/Chapter2/T2P2.png";
import T2P3 from "../asset/TutorialMode/Chapter2/T2P3.png";
import T2P4 from "../asset/TutorialMode/Chapter2/T2P4.png";
import T2P5 from "../asset/TutorialMode/Chapter2/T2P5.png";
import T2P6 from "../asset/TutorialMode/Chapter2/T2P6.png";
import T2P7 from "../asset/TutorialMode/Chapter2/T2P7.png";


import T2P1_2 from "../asset/TutorialMode/Chapter2/T2P1_2.png";
import T2P1_3 from "../asset/TutorialMode/Chapter2/T2P1_3.png";

import T2P8 from "../asset/TutorialMode/Chapter2/T2P8.png";
import T2P9 from "../asset/TutorialMode/Chapter2/T2P9.png";
import T2P10 from "../asset/TutorialMode/Chapter2/T2P10.png";
import T2P11 from "../asset/TutorialMode/Chapter2/T2P11.png";
import T2P12 from "../asset/TutorialMode/Chapter2/T2P12.png";
import T2P13 from "../asset/TutorialMode/Chapter2/T2P13.png";
import T2P14 from "../asset/TutorialMode/Chapter2/T2P14.png";
import T2P15 from "../asset/TutorialMode/Chapter2/T2P15.png";
import T2P16 from "../asset/TutorialMode/Chapter2/T2P16.png";
import T2P17 from "../asset/TutorialMode/Chapter2/T2P17.png";
import T2P18 from "../asset/TutorialMode/Chapter2/T2P18.png";
import T2P19 from "../asset/TutorialMode/Chapter2/T2P19.png";
import T2P20 from "../asset/TutorialMode/Chapter2/T2P20.png";

import section2_1Btn from "../asset/TutorialMode/Chapter2/Section2_1Btn.png";
import section2_2Btn from "../asset/TutorialMode/Chapter2/Section2_2Btn.png";
import section2_3Btn from "../asset/TutorialMode/Chapter2/Section2_3Btn.png";

import endChBtn from "../asset/TutorialMode/Chapter0/EndChBtn.png";

import bgm from "../asset/bgm/Tutorial.mp3";
import empty from "../asset/bgm/Empty.mp3";
import T2S2 from "../asset/bgm/Chapter2/T2S2.mp3";
import T2S3 from "../asset/bgm/Chapter2/T2S3.mp3";
import T2S4 from "../asset/bgm/Chapter2/T2S4.mp3";
import T2S5 from "../asset/bgm/Chapter2/T2S5.mp3";
import T2S6 from "../asset/bgm/Chapter2/T2S6.mp3";
import T2S7 from "../asset/bgm/Chapter2/T2S7.mp3";
import T2S8 from "../asset/bgm/Chapter2/T2S8.mp3";
import T2S9 from "../asset/bgm/Chapter2/T2S9.mp3";
import T2S10 from "../asset/bgm/Chapter2/T2S10.mp3";
import T2S11 from "../asset/bgm/Chapter2/T2S11.mp3";
import T2S12 from "../asset/bgm/Chapter2/T2S12.mp3";
import T2S13 from "../asset/bgm/Chapter2/T2S13.mp3";
import T2S14 from "../asset/bgm/Chapter2/T2S14.mp3";
import T2S15 from "../asset/bgm/Chapter2/T2S15.mp3";
import T2S16 from "../asset/bgm/Chapter2/T2S16.mp3";
import T2S17 from "../asset/bgm/Chapter2/T2S17.mp3";
import T2Q1 from "../asset/bgm/Chapter2/T2Q1.mp3";
import T2Q2 from "../asset/bgm/Chapter2/T2Q2.mp3";

const baseurl = "http://localhost:3003";

const tutorialPage = [T2P1, T2P2, T2P3, T2P4, T2P5, T2P6, T2P7, T2P1_2, T2P8, T2P9, T2P10, T2P11, T2P12, T2P13, T2P14, T2P15, T2P1_3, T2P16, T2P17, T2P18, T2P19, T2P20];
const dialogue = [empty, T2S2, T2S3, T2S4, T2S5, T2S6, T2S7, empty, T2S8, T2S9, T2S10, T2S11, T2S12, T2S13, T2S14, T2S15, empty, T2S16, T2S17, T2Q1, T2Q2, empty]


const Chapter2 = () => {
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
    if (currentPage === T2P18 || currentPage === T2P19) {
      setIsQuestionVisible(true);
    }
  }, [currentPage]);

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


  const handleSection1Click = () => {
    setPageIndex(1);
  };

  const handleSection2Click = async () => {
    setPageIndex(8);
    try {
      const user_id = user.user_id;
      const chapter_number = 2;
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
      const chapter_number = 2;
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
      const chapter_number = 2;
      const section_number = 3;
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


          <OKButton onClick={handleBackClick} style={{ position: "absolute", top: "95%", left: "5%" }}>
            <img src={backBtn} alt="backBtn" />
          </OKButton>
          {currentPage === T2P1 ? (
            <>
              <DimBackground>
                <OKButton onClick={handleNextClick} style={{ position: "absolute", top: "80%", left: "50%" }} disabled>
                  <img src={section2_3Btn} alt="section2_3Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>

                <OKButton onClick={handleNextClick} style={{ position: "absolute", top: "52.5%", left: "50%" }} disabled>
                  <img src={section2_2Btn} alt="section2_2Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>
                <OKButton onClick={handleSection1Click} style={{ position: "absolute", top: "25%", left: "50%" }}>
                  <img src={section2_1Btn} alt="section2_1Btn" style={{ width: "90%", height: "20%" }} />
                </OKButton>

              </DimBackground>
            </>
          ) : null}

          {currentPage === T2P1_2 ? (
            <>
              <DimBackground>
                <OKButton onClick={handleNextClick} style={{ position: "absolute", top: "80%", left: "50%" }} disabled>
                  <img src={section2_3Btn} alt="section2_3Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>

                <OKButton onClick={handleSection2Click} style={{ position: "absolute", top: "52.5%", left: "50%" }}>
                  <img src={section2_2Btn} alt="section2_2Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>
                <OKButton onClick={handleSection1Click} style={{ position: "absolute", top: "25%", left: "50%" }}>
                  <img src={section2_1Btn} alt="section2_1Btn" style={{ width: "90%", height: "20%" }} />
                </OKButton>

              </DimBackground>
            </>
          ) : null}

          {currentPage === T2P1_3 ? (
            <>
              <DimBackground>
                <OKButton onClick={handleSection3Click} style={{ position: "absolute", top: "80%", left: "50%" }}>
                  <img src={section2_3Btn} alt="section2_3Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>

                <OKButton onClick={handleSection2Click} style={{ position: "absolute", top: "52.5%", left: "50%" }}>
                  <img src={section2_2Btn} alt="section2_2Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>
                <OKButton onClick={handleSection1Click} style={{ position: "absolute", top: "25%", left: "50%" }}>
                  <img src={section2_1Btn} alt="section2_1Btn" style={{ width: "90%", height: "20%" }} />
                </OKButton>

              </DimBackground>
            </>
          ) : null}

          <QuestionModal
            isModalVisible={isQuestionVisible}
            setIsModalVisible={setIsQuestionVisible}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            questionNum={2}
          >
          </QuestionModal>

          {currentPage === T2P20 ? (
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


export default Chapter2;
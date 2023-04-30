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
import T4P1 from "../asset/TutorialMode/Chapter4/T4P1.png";
import T4P2 from "../asset/TutorialMode/Chapter4/T4P2.png";
import T4P3 from "../asset/TutorialMode/Chapter4/T4P3.png";
import T4P4 from "../asset/TutorialMode/Chapter4/T4P4.png";
import T4P5 from "../asset/TutorialMode/Chapter4/T4P5.png";
import T4P6 from "../asset/TutorialMode/Chapter4/T4P6.png";
import T4P7 from "../asset/TutorialMode/Chapter4/T4P7.png";


import T4P1_2 from "../asset/TutorialMode/Chapter4/T4P1_2.png";
import T4P1_3 from "../asset/TutorialMode/Chapter4/T4P1_3.png";

import T4P8 from "../asset/TutorialMode/Chapter4/T4P8.png";
import T4P9 from "../asset/TutorialMode/Chapter4/T4P9.png";
import T4P10 from "../asset/TutorialMode/Chapter4/T4P10.png";
import T4P11 from "../asset/TutorialMode/Chapter4/T4P11.png";
import T4P12 from "../asset/TutorialMode/Chapter4/T4P12.png";
import T4P13 from "../asset/TutorialMode/Chapter4/T4P13.png";
import T4P14 from "../asset/TutorialMode/Chapter4/T4P14.png";
import T4P15 from "../asset/TutorialMode/Chapter4/T4P15.png";
import T4P16 from "../asset/TutorialMode/Chapter4/T4P16.png";
import T4P17 from "../asset/TutorialMode/Chapter4/T4P17.png";
import T4P18 from "../asset/TutorialMode/Chapter4/T4P18.png";
import T4P19 from "../asset/TutorialMode/Chapter4/T4P19.png";
import T4P20 from "../asset/TutorialMode/Chapter4/T4P20.png";
import T4P21 from "../asset/TutorialMode/Chapter4/T4P21.png";
import T4P22 from "../asset/TutorialMode/Chapter4/T4P22.png";
import T4P23 from "../asset/TutorialMode/Chapter4/T4P23.png";
import T4P24 from "../asset/TutorialMode/Chapter4/T4P24.png";
import T4P25 from "../asset/TutorialMode/Chapter4/T4P25.png";

import section4_1Btn from "../asset/TutorialMode/Chapter4/Section4_1Btn.png";
import section4_2Btn from "../asset/TutorialMode/Chapter4/Section4_2Btn.png";
import section4_3Btn from "../asset/TutorialMode/Chapter4/Section4_3Btn.png";

import endChBtn from "../asset/TutorialMode/Chapter0/EndChBtn.png";

import bgm from "../asset/bgm/Tutorial.mp3";
import empty from "../asset/bgm/Empty.mp3";
import T4Q1 from "../asset/bgm/Chapter4/T4Q1.mp3";
import T4Q2 from "../asset/bgm/Chapter4/T4Q2.mp3";
import T4S2 from "../asset/bgm/Chapter4/T4S2.mp3";
import T4S3 from "../asset/bgm/Chapter4/T4S3.mp3";
import T4S4 from "../asset/bgm/Chapter4/T4S4.mp3";
import T4S5 from "../asset/bgm/Chapter4/T4S5.mp3";
import T4S6 from "../asset/bgm/Chapter4/T4S6.mp3";
import T4S7 from "../asset/bgm/Chapter4/T4S7.mp3";
import T4S8 from "../asset/bgm/Chapter4/T4S8.mp3";
import T4S9 from "../asset/bgm/Chapter4/T4S9.mp3";
import T4S10 from "../asset/bgm/Chapter4/T4S10.mp3";
import T4S11 from "../asset/bgm/Chapter4/T4S11.mp3";
import T4S12 from "../asset/bgm/Chapter4/T4S12.mp3";
import T4S13 from "../asset/bgm/Chapter4/T4S13.mp3";
import T4S14 from "../asset/bgm/Chapter4/T4S14.mp3";
import T4S15 from "../asset/bgm/Chapter4/T4S15.mp3";
import T4S16 from "../asset/bgm/Chapter4/T4S16.mp3";
import T4S17 from "../asset/bgm/Chapter4/T4S17.mp3";
import T4S18 from "../asset/bgm/Chapter4/T4S18.mp3";
import T4S19 from "../asset/bgm/Chapter4/T4S19.mp3";
import T4S20 from "../asset/bgm/Chapter4/T4S20.mp3";
import T4S21 from "../asset/bgm/Chapter4/T4S21.mp3";
import T4S22 from "../asset/bgm/Chapter4/T4S22.mp3";

const baseurl = "http://localhost:3003";

const tutorialPage = [T4P1, T4P2, T4P3, T4P4, T4P5, T4P6, T4P7, T4P1_2, T4P8, T4P9, T4P10, T4P11, T4P12, T4P13, T4P14, T4P15, T4P16, T4P17, T4P18, T4P1_3, T4P19, T4P20, T4P21, T4P22, T4P23, T4P24, T4P25];
const dialogue = [empty, T4S2, T4S3, T4S4, T4S5, T4S6, T4S7, empty, T4S8, T4S9, T4S10, T4S11, T4S12, T4S13, T4S14, T4S15, T4S16, T4S17, T4S18, empty, T4S19, T4S20, T4S21, T4S22,T4Q1, T4Q2, empty];


const Chapter4 = () => {
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
    if (currentPage === T4P23 || currentPage === T4P24) {
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
    setPageIndex(8);
    try {
      const user_id = user.user_id;
      const chapter_number = 4;
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
    setPageIndex(20);
    try {
      const user_id = user.user_id;
      const chapter_number = 4;
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
      const chapter_number = 4;
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
          {currentPage === T4P1 ? (
            <>
              <DimBackground>
                <OKButton onClick={handleNextClick} style={{ position: "absolute", top: "80%", left: "50%" }} disabled>
                  <img src={section4_3Btn} alt="section4_3Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>

                <OKButton onClick={handleNextClick} style={{ position: "absolute", top: "52.5%", left: "50%" }} disabled>
                  <img src={section4_2Btn} alt="section4_2Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>
                <OKButton onClick={handleSection1Click} style={{ position: "absolute", top: "25%", left: "50%" }}>
                  <img src={section4_1Btn} alt="section4_1Btn" style={{ width: "90%", height: "20%" }} />
                </OKButton>

              </DimBackground>
            </>
          ) : null}

          {currentPage === T4P1_2 ? (
            <>
              <DimBackground>
                <OKButton onClick={handleNextClick} style={{ position: "absolute", top: "80%", left: "50%" }} disabled>
                  <img src={section4_3Btn} alt="section4_3Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>

                <OKButton onClick={handleSection2Click} style={{ position: "absolute", top: "52.5%", left: "50%" }}>
                  <img src={section4_2Btn} alt="section4_2Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>
                <OKButton onClick={handleSection1Click} style={{ position: "absolute", top: "25%", left: "50%" }}>
                  <img src={section4_1Btn} alt="section4_1Btn" style={{ width: "90%", height: "20%" }} />
                </OKButton>

              </DimBackground>
            </>
          ) : null}

          {currentPage === T4P1_3 ? (
            <>
              <DimBackground>
                <OKButton onClick={handleSection3Click} style={{ position: "absolute", top: "80%", left: "50%" }}>
                  <img src={section4_3Btn} alt="section4_3Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>

                <OKButton onClick={handleSection2Click} style={{ position: "absolute", top: "52.5%", left: "50%" }}>
                  <img src={section4_2Btn} alt="section4_2Btn" style={{ width: "90%", height: "30%" }} />
                </OKButton>
                <OKButton onClick={handleSection1Click} style={{ position: "absolute", top: "25%", left: "50%" }}>
                  <img src={section4_1Btn} alt="section4_1Btn" style={{ width: "90%", height: "20%" }} />
                </OKButton>

              </DimBackground>
            </>
          ) : null}

          <QuestionModal
            isModalVisible={isQuestionVisible}
            setIsModalVisible={setIsQuestionVisible}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            questionNum={6}
          >
          </QuestionModal>

          {currentPage === T4P25 ? (
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


export default Chapter4;
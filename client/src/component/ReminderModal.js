import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { Modal } from '@mui/material';

import UserContext from '../UserContext';

import reminderBackground from '../asset/ReminderBG.png';

import AudioModal from '../component/AudioModal';


import menuGuide1 from '../asset/MenuGuide1.png';
import menuGuide2 from '../asset/MenuGuide2.png';
import menuGuide3 from '../asset/MenuGuide3.png';
import menuGuide4 from '../asset/MenuGuide4.png';

import levelGuide1 from '../asset/StageMode/Island1/LevelGuide1.png';
import levelGuide2 from '../asset/StageMode/Island1/LevelGuide2.png';
import levelGuide3 from '../asset/StageMode/Island1/LevelGuide3.png';
import levelGuide4 from '../asset/StageMode/Island1/LevelGuide4.png';
import levelGuide5 from '../asset/StageMode/Island1/LevelGuide5.png';
import levelGuide6 from '../asset/StageMode/Island1/LevelGuide6.png';

import closeBtn from '../asset/CloseBtn.png';
import okBtn from "../asset/OKbtn.png";
import MG1 from "../asset/bgm/Guide/MG1.mp3";
import MG2 from "../asset/bgm/Guide/MG2.mp3";
import MG3 from "../asset/bgm/Guide/MG3.mp3";
import MG4 from "../asset/bgm/Guide/MG4.mp3";

import LG1 from "../asset/bgm/Guide/LG1.mp3";
import LG2 from "../asset/bgm/Guide/LG2.mp3";
import LG3 from "../asset/bgm/Guide/LG3.mp3";
import LG4 from "../asset/bgm/Guide/LG4.mp3";
import LG5 from "../asset/bgm/Guide/LG5.mp3";
import LG6 from "../asset/bgm/Guide/LG6.mp3";

const menuUserGuide = [menuGuide1, menuGuide2, menuGuide3, menuGuide4];
const menuGuideSound = [MG1, MG2, MG3, MG4];

const levelUserGuide = [levelGuide1, levelGuide2, levelGuide3, levelGuide4, levelGuide5, levelGuide6];
const levelGuideSound = [LG1, LG2, LG3, LG4, LG5, LG6];

const ReminderModal = ({ isModalVisible, setIsModalVisible, text = "hello world", mode = "Reminder", setConfirmExit = () => { } }) => {
  const { user, setUser } = useContext(UserContext);
  const [allLoadedImages, setAllLoadedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    const images = mode === "menuGuide" ? menuUserGuide : levelUserGuide;
    if (currentImageIndex === images.length - 1) {
      setIsModalVisible(false);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handleCloseClick = () => {
    setIsModalVisible(false);
  }

  if (mode === "menuGuide") {
    return (
      <Modal
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        closeAfterTransition
        BackdropProps={{ style: { backgroundColor: 'transparent', border: 'none', cursor: "pointer !important" } }}
      >
        <BackgroundImageContainer onClick={handleNextImage} style={{ position: "absolute", top: "39px", left: "158px" }} >
        <AudioModal audio={menuGuideSound[currentImageIndex]} mode="dialogue" volume={1} />
          <img src={menuUserGuide[currentImageIndex]} alt="userMenuGuide" />
        </BackgroundImageContainer>
      </Modal>
    )
  }
  else if (mode === "levelGuide") {
    return (
      <Modal
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        closeAfterTransition
        BackdropProps={{ style: { backgroundColor: 'transparent', border: 'none' } }}
      >
        <ModalContainer style={{ position: 'absolute', top: "21.3%", left: "26.5%" }}>
        <AudioModal audio={levelGuideSound[currentImageIndex]} mode="dialogue" volume={1} />
          <img onClick={handleNextImage} src={levelUserGuide[currentImageIndex]} alt="levelUserGuide" style={{ top: "29.5%", left: "19%", minWidth: "1216px", height: "768px", border: 'none' }} />
        </ModalContainer>
      </Modal>
    )
  }
  else {
    return (
      <Modal
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        closeAfterTransition
        BackdropProps={{ style: { backgroundColor: 'transparent' } }}
      >
        <>
          {allLoadedImages && true}
          <ModalContainer>
            <div >
              <BackgroundImage src={reminderBackground} alt="reminderBackground" />
              <ReminderText style={{ position: "absolute", top: "87%", left: "70%" }}>
                {text}
              </ReminderText>

              <ModalButtons style={{ position: "absolute" }}>
                <img src={closeBtn} alt="closeBtn" onClick={handleCloseClick} />
              </ModalButtons>
            </div>
          </ModalContainer>
        </>
      </Modal>

    );
  }
};

const BackgroundImageContainer = styled.div`
  position: relative;
  width: 80%;
  height: 90%;
`;

const BackgroundImage = styled.img`
  width: 70%;
  position: absolute;
  top: 50%;
  left: 65%;
  object-fit: contain;
`;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 1;
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const ModalButtons = styled.button`
  position: absolute;
  top: 82%;
  left: 133%;
  transform: translate(-50%, -50%);
  width: 15%;
  height: 15%;
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

const ReminderText = styled.div`
  height: 30%;
  width: 60%;
  font-family: 'Inter';
  font-style: italic;
  font-size: 28px;
  font-weight: bold;
  text-align: justify;
  color: #645959;
`;

export default ReminderModal;
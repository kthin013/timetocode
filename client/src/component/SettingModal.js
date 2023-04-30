import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { Modal } from '@mui/material';

import UserContext from '../UserContext';

import normalSetting from '../asset/Setting_popup.png';
import tutorialSetting from '../asset/Tutorial_Setting.png';
import closeBtn from '../asset/CloseBtn.png';
import logoutBtn from '../asset/LogoutBtn.png';
import volume0 from '../asset/Volume0.png';
import volume1 from '../asset/Volume1.png';
import volume2 from '../asset/Volume2.png';
import volume3 from '../asset/Volume3.png';
import volume4 from '../asset/Volume4.png';
import volume5 from '../asset/Volume5.png';

import addBtn from '../asset/AddBtn.png';
import minusBtn from '../asset/MinusBtn.png';
import AudioModal from "./AudioModal";

const allImage = [normalSetting, tutorialSetting, closeBtn, logoutBtn, volume0, volume1, volume2, volume3, volume4, volume5, addBtn, minusBtn]

const SettingModal = ({ isModalVisible, setIsModalVisible, mode = "normal" }) => {
  const { user, setUser } = useContext(UserContext);
  const volumeIndex = [0, 1, 2, 3, 4, 5];
  const indexV = volumeIndex[Math.round(user.musicVolume * 5)];
  const indexS = volumeIndex[Math.round(user.soundVolume * 5)];
  const indexD = volumeIndex[Math.round(user.dialogueVolume * 5)];

  const [musicVolumeImg, setMusicVolumeImg] = useState(indexV);
  const [soundVolumeImg, setSoundVolumeImg] = useState(indexS);
  const [dialogueVolumeImg, setDialogueVolumeImg] = useState(indexD);
  const [allLoadedImages, setAllLoadedImages] = useState([]);

  const navigate = useNavigate();

  const handleCloseClick = () => {
    setIsModalVisible(false);
  }

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



  const handleSoundAddClick = () => {
    if (soundVolumeImg < 5 && user.soundVolume < 1) {
      setSoundVolumeImg(soundVolumeImg + 1);
      const newVolume = (parseFloat(user.soundVolume) + 0.2).toFixed(1);
      const updatedUser = {
        ...user,
        soundVolume: newVolume
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser)); // save updated user in local storage
      // console.log(updatedUser, "see updated user");
    }

  }

  const handleSoundMinusClick = () => {
    if (soundVolumeImg > 0 && user.soundVolume > 0) {
      setSoundVolumeImg(soundVolumeImg - 1);
      const newVolume = (parseFloat(user.soundVolume) - 0.2).toFixed(1);
      const updatedUser = {
        ...user,
        soundVolume: newVolume
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser)); // save updated user in local storage
      // console.log(updatedUser, "see updated user");
    }
  };


  const handleMusicAddClick = () => {
    if (musicVolumeImg < 5 && user.musicVolume < 1) {
      // console.log(user.musicVolume, "add")
      setMusicVolumeImg(musicVolumeImg + 1);
      const newVolume = (parseFloat(user.musicVolume) + 0.2).toFixed(1);
      const updatedUser = {
        ...user,
        musicVolume: newVolume
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      // console.log(updatedUser, "see updated user")
    }
  }


  const handleMusicMinusClick = () => {
    if (musicVolumeImg > 0 && user.musicVolume > 0) {
      // console.log(user.musicVolume, "add")
      setMusicVolumeImg(musicVolumeImg - 1);
      const newVolume = (parseFloat(user.musicVolume) - 0.2).toFixed(1);
      const updatedUser = {
        ...user,
        musicVolume: newVolume
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      // console.log(updatedUser, "see updated user")
    }
  }

  const handleDialogueAddClick = () => {
    if (dialogueVolumeImg < 5 && user.dialogueVolume < 1) {
      // console.log(user.dialogueVolume, "dialogue add")
      setDialogueVolumeImg(dialogueVolumeImg + 1);
      const newVolume = (parseFloat(user.dialogueVolume) + 0.2).toFixed(1);
      const updatedUser = {
        ...user,
        dialogueVolume: newVolume
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      // console.log(updatedUser, "see updated user")
    }
  }

  const handleDialogueMinusClick = () => {
    if (dialogueVolumeImg > 0 && user.dialogueVolume > 0) {
      // console.log(user.dialogueVolume, "add")
      setDialogueVolumeImg(dialogueVolumeImg - 1);
      const newVolume = (parseFloat(user.dialogueVolume) - 0.2).toFixed(1);
      const updatedUser = {
        ...user,
        dialogueVolume: newVolume
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      // console.log(updatedUser, "see updated user")
    }
  }



  const handleLogout = () => {
    // setUser({});
    localStorage.clear();
    // Redirect the user to the login page
    navigate('/login',{state:true});
  };



  const getVolumeImage = (level) => {
    switch (level) {
      case 0:
        return volume0;
      case 1:
        return volume1;
      case 2:
        return volume2;
      case 3:
        return volume3;
      case 4:
        return volume4;
      case 5:
        return volume5;
      default:
        return volume3;
    }
  }

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
          {mode === "dialogue" ? (
            <div>
              <BackgroundImage src={tutorialSetting} alt="normalSetting" />
              <ModalButtons style={{ position: "absolute" }}>
                <img src={closeBtn} alt="closeBtn" onClick={handleCloseClick} />
              </ModalButtons>

              <VolumeImage src={getVolumeImage(musicVolumeImg)} alt="musicVolumeImg" style={{ position: "absolute", top: "68%", left: "85.5%", width: "30%" }} />
              <ModalButtons style={{ position: "absolute", top: "74%", left: "115.5%", width: "7%" }}>
                <img src={addBtn} alt="closeBtn" onClick={handleMusicAddClick} />
              </ModalButtons>
              <ModalButtons style={{ position: "absolute", top: "74%", left: "85%", width: "7%" }}>
                <img src={minusBtn} alt="closeBtn" onClick={handleMusicMinusClick} />
              </ModalButtons>

              <VolumeImage src={getVolumeImage(soundVolumeImg)} alt="soundVolumeImg" style={{ position: "absolute", top: "92.5%", left: "85.5%", width: "30%" }} />
              <ModalButtons style={{ position: "absolute", top: "98.5%", left: "115.5%", width: "7%" }}>
                <img src={addBtn} alt="closeBtn" onClick={handleSoundAddClick} />
              </ModalButtons>
              <ModalButtons style={{ position: "absolute", top: "98.5%", left: "85%", width: "7%" }}>
                <img src={minusBtn} alt="closeBtn" onClick={handleSoundMinusClick} />
              </ModalButtons>

              <VolumeImage src={getVolumeImage(dialogueVolumeImg)} alt="dialogueVolumeImg" style={{ position: "absolute", top: "116.5%", left: "85.5%", width: "30%" }} />
              <ModalButtons style={{ position: "absolute", top: "122.5%", left: "115.5%", width: "7%" }}>
                <img src={addBtn} alt="closeBtn" onClick={handleDialogueAddClick} />
              </ModalButtons>
              <ModalButtons style={{ position: "absolute", top: "122.5%", left: "85%", width: "7%" }}>
                <img src={minusBtn} alt="closeBtn" onClick={handleDialogueMinusClick} />
              </ModalButtons>
            </div>
          ) : (
            <div> <BackgroundImage src={normalSetting} alt="normalSetting" />

              <ModalButtons style={{ position: "absolute" }}>
                <img src={closeBtn} alt="closeBtn" onClick={handleCloseClick} />
              </ModalButtons>

              <VolumeImage src={getVolumeImage(musicVolumeImg)} alt="normalSetting" />
              <ModalButtons style={{ position: "absolute", top: "77.5%", left: "116.5%", width: "8%" }}>
                <img src={addBtn} alt="closeBtn" onClick={handleMusicAddClick} />
              </ModalButtons>
              <ModalButtons style={{ position: "absolute", top: "77.5%", left: "83%", width: "8%" }}>
                <img src={minusBtn} alt="closeBtn" onClick={handleMusicMinusClick} />
              </ModalButtons>

              <VolumeImage src={getVolumeImage(soundVolumeImg)} alt="normalSetting" style={{ position: "absolute", top: "98%" }} />
              <ModalButtons style={{ position: "absolute", top: "104.5%", left: "116.5%", width: "8%" }}>
                <img src={addBtn} alt="closeBtn" onClick={handleSoundAddClick} />
              </ModalButtons>
              <ModalButtons style={{ position: "absolute", top: "104.5%", left: "83%", width: "8%" }}>
                <img src={minusBtn} alt="closeBtn" onClick={handleSoundMinusClick} />
              </ModalButtons>

              <ModalButtons style={{ position: "absolute", top: "123%", left: "100%" }}>
                <img src={logoutBtn} alt="closeBtn" onClick={handleLogout} />
              </ModalButtons>
            </div>
          )}
        </ModalContainer>
      </>
    </Modal>

  );
};

const BackgroundImage = styled.img`
  width: 70%;
  position: absolute;
  top: 50%;
  left: 65%;
  object-fit: contain;
`;

const VolumeImage = styled.img`
  width: 33%;
  position: absolute;
  top: 71%;
  left: 83.5%;
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

const ModalContent = styled.div`
  width: 80%;
  height: 80%;
`;


const ModalButtons = styled.button`
  position: absolute;
  top: 57%;
  left: 130%;
  transform: translate(-50%, -50%);
  width: 20%;
  height: 20%;
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

export default SettingModal;
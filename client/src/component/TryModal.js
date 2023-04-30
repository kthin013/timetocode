import React, { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import styled, { css } from "styled-components";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Slide, Modal, Box, Backdrop, Typography, Button } from '@mui/material';

import win_popup from '../asset/StageMode/win_popup.png';
import lose_popup from '../asset/StageMode/lose_popup.png';

import home_btn from "../asset/StageMode/home_btn.png";
import retry_btn from "../asset/StageMode/retry_btn.png";
import next_btn from "../asset/StageMode/next_btn.png";
import hint_btn from "../asset/StageMode/hint_btn.png";
import stage_3star from "../asset/StageMode/stage_3star.png";
import stage_2star from "../asset/StageMode/stage_2star.png";
import stage_1star from "../asset/StageMode/stage_1star.png";
import stage_0star from "../asset/StageMode/stage_0star.png";

import hints_1 from "../asset/hints/1.png";
import hints_2 from "../asset/hints/2.png";
import hints_3 from "../asset/hints/3.png";
import hints_4 from "../asset/hints/4.png";
import hints_5 from "../asset/hints/5.png";
import hints_6 from "../asset/hints/6.png";
import hints_7 from "../asset/hints/7.png";
import hints_8 from "../asset/hints/8.png";
import hints_9 from "../asset/hints/9.png";
import hints_10 from "../asset/hints/10.png";
import hints_11 from "../asset/hints/11.png";
import hints_12 from "../asset/hints/12.png";
import hints_13 from "../asset/hints/13.png";
import hints_14 from "../asset/hints/14.png";
import hints_15 from "../asset/hints/15.png";
import hints_16 from "../asset/hints/16.png";
import hints_17 from "../asset/hints/17.png";
import hints_18 from "../asset/hints/18.png";
import hints_19 from "../asset/hints/19.png";
import hints_20 from "../asset/hints/20.png";
import hints_21 from "../asset/hints/21.png";
import hints_22 from "../asset/hints/22.png";
import hints_23 from "../asset/hints/23.png";
import hints_24 from "../asset/hints/24.png";
import hints_25 from "../asset/hints/25.png";
import hints_26 from "../asset/hints/26.png";
import hints_27 from "../asset/hints/27.png";
import hints_28 from "../asset/hints/28.png";
import hints_29 from "../asset/hints/29.png";
import hints_30 from "../asset/hints/30.png";
import hints_31 from "../asset/hints/31.png";
import hints_32 from "../asset/hints/32.png";
import hints_33 from "../asset/hints/33.png";
import hints_34 from "../asset/hints/34.png";
import hints_35 from "../asset/hints/35.png";

import UserContext from '../UserContext';
const baseurl = "http://localhost:3003";

const TryModal = ({ isModalVisible, setIsModalVisible, stage_number, stage_star, type, setTimer = null }) => {
  const [hintsModalVisible, setHintsModalVisible] = useState(false);
  const [imageList, setImageList] = useState([
    hints_1, hints_2, hints_3, hints_4, hints_5, hints_6, hints_7, hints_8, hints_9, hints_10,
    hints_11, hints_12, hints_13, hints_14, hints_15, hints_16, hints_17, hints_18, hints_19, hints_20,
    hints_21, hints_22, hints_23, hints_24, hints_25, hints_26, hints_27, hints_28, hints_29, hints_30,
    hints_31, hints_32, hints_33, hints_34, hints_35]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  let star_img = stage_0star;

  if (stage_star === 3) {
    star_img = stage_3star;
  } else if (stage_star === 2) {
    star_img = stage_2star;
  } else if (stage_star === 1) {
    star_img = stage_1star;
  }

  const handleNextClick = () => {
    if (stage_number === 10 || stage_number === 20 || stage_number === 30 || stage_number === 35) {
      handleHomeClick();
      return;
    }
    const nextStageNumber = stage_number + 1;
    if (stage_number <= 10) {
      navigate(`/level_1_${nextStageNumber}`,{state:true});
      return;
    } else if (stage_number <= 20) {
      navigate(`/level_2_${nextStageNumber - 10}`,{state:true});
      return;
    } else if (stage_number <= 30) {
      navigate(`/level_3_${nextStageNumber - 20}`,{state:true});
      return;
    } else if (stage_number <= 35) {
      navigate(`/level_4_${nextStageNumber - 30}`,{state:true});
      return;
    }

  };

  const handleHomeClick = () => {
    if (stage_number <= 10) {
      navigate(`/island1menu`,{state:true});
      return;
    } else if (stage_number <= 20) {
      navigate(`/island2menu`,{state:true});
      return;
    } else if (stage_number <= 30) {
      navigate(`/island3menu`,{state:true});
      return;
    } else if (stage_number <= 35) {
      navigate(`/island4menu`,{state:true});
      return;
    }
  };

  const handleRetryClick = () => {
    setIsModalVisible(false);
  }

  const handleHintClick = () => {
    // setIsModalVisible(false);
    setHintsModalVisible(true);
  }

  const returnHintsModal = () => {
    return (
      <Modal
        open={hintsModalVisible}
        closeAfterTransition
        onClose={() => setHintsModalVisible(false)}
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500, } }}
      >
        <Slide direction="up" in={hintsModalVisible}>
          <Box
            id="hints-modal"
            sx={hintsModalStyle}
          >
            <Typography sx={{ fontWeight: 800, textAlign: "center", marginBottom: "10px" }}>
              ⚠️ Solution for reference only ⚠️
            </Typography>
            <Typography sx={{ fontWeight: 800, textAlign: "center", marginBottom: "10px" }}>
              There can be more than one way to solve the puzzle
            </Typography>
            <div style={{ display: "flex", justifyContent: "center", padding: "20px 10px" }}>
              <img src={imageList[stage_number - 1]} alt="" style={{ maxWidth: "300px" }} height="auto"></img>
            </div>
          </Box>
        </Slide>
      </Modal>
    );
  }

  const postStageProgress = async (user_id, stage_number, stage_star) => {
    try {
      const data = {
        user_id: user_id,
        stage_number: stage_number,
        stage_star: stage_star
      };
      // console.log(data)

      const response = await axios.post(`${baseurl}/stage_progress`, data);

      // console.log(response.data);
      // Do something with the response data, e.g. display a success message to the user
    } catch (error) {
      console.error(error);
      // Handle the error, e.g. display an error message to the user
    }
  };

  if (type === "Win") {

    postStageProgress(user.user_id, stage_number, stage_star);

    return (
      <Modal
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        closeAfterTransition
      >
        <>
          <ModalContainer>
            <ModalContent>
              <BackgroundImage src={win_popup} alt="win_popup" />
              <img
                src={star_img}
                alt={`Stage ${stage_star} Star`}
                style={{ position: "relative", top: "4%", left: "4%", zIndex: "2", width: "70%", height: "auto" }}
              />

              <ModalText style={{ top: "70%", left: "40%" }}>
                <p style={{ position: "absolute", top: "46.5%", left: "29%" }}>LEVEL {stage_number} </p>
              </ModalText>

              <ModalButtons>
                <img src={next_btn} alt="Next" onClick={handleNextClick} />
              </ModalButtons>
              <ModalButtons style={{ position: "absolute", left: "54.5%" }}>
                <img src={home_btn} alt="Home" onClick={handleHomeClick} />
              </ModalButtons>
              <ModalButtons style={{ position: "absolute", left: "24%" }}>
                <img src={retry_btn} alt="Retry" onClick={
                  () => {
                    if (setTimer != null) {
                      setTimer(Date.now());
                    }
                    handleRetryClick();
                  }
                } />
              </ModalButtons>
            </ModalContent>
          </ModalContainer>
        </>
      </Modal>
    );
  } else if (type === "Lose") {
    return (
      <>
        {returnHintsModal()}
        <Modal
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          closeAfterTransition
        >
          <>
            <ModalContainer>
              <ModalContent>
                <BackgroundImage src={lose_popup} alt="lose_popup" />
                <img
                  src={stage_0star}
                  alt={`Stage ${stage_star} Star`}
                  style={{ position: "relative", top: "4%", left: "4%", zIndex: "2", width: "70%", height: "auto" }}
                />

                <ModalText style={{ top: "70%", left: "40%" }}>
                  <p style={{ position: "absolute", top: "46.5%", left: "29%" }}>LEVEL {stage_number} </p>
                </ModalText>

                <ModalButtons>
                  <img src={retry_btn} alt="Next" onClick={
                    () => {
                      if (setTimer != null) {
                        setTimer(Date.now());
                      }
                      handleRetryClick();
                    }
                  } />
                </ModalButtons>
                <ModalButtons style={{ position: "absolute", left: "54.5%" }}>
                  <img src={home_btn} alt="Home" onClick={handleHomeClick} />
                </ModalButtons>
                <ModalButtons style={{ position: "absolute", left: "24%" }}>
                  <img src={hint_btn} alt="Retry" onClick={() => handleHintClick()} />
                </ModalButtons>
              </ModalContent>
            </ModalContainer>
          </>
        </Modal>
      </>
    );
  };
};

const BackgroundImage = styled.img`
  width: 150%;
  position: absolute;
  top: 25%;
  left: -22.5%;
  object-fit: cover;
`;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
  bgcolor: 'background.paper';
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
`;



const ModalText = styled.div`
  font-family: 'Inter';
  font-style: italic;
  font-size: 45px;
  font-weight: bold;
  color: #645959;
  width: 60%;
  height: 20%;
`;

const ModalButtons = styled.button`
  position: absolute;
  top: 61%;
  left: 85%;
  transform: translate(-50%, -50%);
  width: 20%;
  height: 12%;
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


const ModalButtonImg = styled.img`
  margin: 0 10px;
  cursor: pointer;
`;

const hintsModalStyle = {
  position: 'relative',
  top: '5%',
  left: '35%',
  width: "500px",
  maxHeight: "700px",
  bgcolor: 'background.paper',
  boxShadow: 10,
  p: 4,
  overflowY: 'auto'
}

export default TryModal;

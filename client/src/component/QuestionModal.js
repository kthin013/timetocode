import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { Modal } from '@mui/material';

import UserContext from '../UserContext';

import questionBackground from '../asset/Question_BG.png';

import closeBtn from '../asset/CloseBtn.png';

import ReminderModal from '../component/ReminderModal';
import submitBtn from "../asset/TutorialMode/Chapter0/SubmitBtn.png";

const questionData = [
  {
    question: "1. What is sequencing?",
    options: [
      { answer: "A series of actions completed in any order", isCorrect: false },
      { answer: "A series of actions completed in specific order", isCorrect: true },
      { answer: "A list of words", isCorrect: false },
      { answer: "A type of music", isCorrect: false }
    ]
  },
  {
    question: "2. What is the first step in building a house?",
    options: [
      { answer: "Find a place to build your house", isCorrect: true },
      { answer: "Buy bricks", isCorrect: false },
      { answer: "Put a roof on the house", isCorrect: false },
      { answer: "Paint the walls", isCorrect: false }
    ]
  },
  {
    question: "1. What is a selection?",
    options: [
      { answer: "A type of flower", isCorrect: false },
      { answer: "A type of food", isCorrect: false },
      { answer: "A programming statement for decision-making", isCorrect: true },
      { answer: "A type of animal", isCorrect: false }
    ]
  },
  {
    question: "2. If you use bricks to build your house, \n what is the result?", //break into two lines to show
    options: [
      { answer: "Your house will be strong", isCorrect: true },
      { answer: "Your house will be made of straw", isCorrect: false },
      { answer: "Your house will be made of sticks", isCorrect: false },
      { answer: "Your house will fall apart easily", isCorrect: false }
    ]
  },
  {
    question: "1. What is a loop?",
    options: [
      { answer: "A type of animal", isCorrect: false },
      { answer: "Programming statement for repeating instructions", isCorrect: true },
      { answer: "A type of flower", isCorrect: false },
      { answer: "A type of music", isCorrect: false }
    ]
  },
  {
    question: "2. How do the two elder pigs build their houses?",
    options: [
      { answer: "They build their houses all at once", isCorrect: false },
      { answer: "They use magic to build their houses", isCorrect: false },
      { answer: "They use a loop to build their houses brick by brick", isCorrect: true },
      { answer: "They hire someone else to build their houses", isCorrect: false }
    ]
  },
  {
    question: "1. What are the three programming principles \n taught in the previous chapters?",
    options: [
      { answer: "Sorting, Filtering, and Searching", isCorrect: false },
      { answer: "Drawing, Painting, and Sculpting", isCorrect: false },
      { answer: "Multiplying, Dividing, and Subtracting", isCorrect: false },
      { answer: "Loops, Selections, and Sequences", isCorrect: true }
    ]
  },
  {
    question: "2. Which of the following is an example of \n a loop in programming?",
    options: [
      { answer: "A sequence of ordered actions.", isCorrect: false },
      { answer: "Making a decision based on a certain condition", isCorrect: false },
      { answer: "Repeating a set of instructions multiple times", isCorrect: true },
      { answer: "None of the above", isCorrect: false }
    ]
  },
];


const allImage = [questionBackground, closeBtn]
const QuestionModal = ({ isModalVisible, setIsModalVisible, pageIndex, setPageIndex, questionNum = 0 }) => {
  const { user, setUser } = useContext(UserContext);
  const [allLoadedImages, setAllLoadedImages] = useState([]);
  const [isReminderVisible, setIsReminderVisible] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [reminderText, setReminderText] = useState(null);
  const [currentQuestionData, setCurrentQuestionData] = useState(questionData[questionNum]);

  useEffect(() => {
    if (typeof setPageIndex === 'function' && !isReminderVisible && reminderText === "Correct!") {
      setPageIndex(pageIndex + 1);
      setCurrentQuestionData(questionData[questionNum + 1]);
      setIsModalVisible(false);
    }
  }, [isReminderVisible]);


  const handleSubmit = () => {
    const selectedOption = currentQuestionData.options[userAnswer].isCorrect;

    if (selectedOption) {
      setReminderText("Correct!")
      setIsReminderVisible(true);
      setUserAnswer(null);
      return;
    } else {
      setReminderText("Oops! Please try again!")
      setIsReminderVisible(true);
      setUserAnswer(null);
    }
  };

  const handleAnswerSelect = (answer) => {
    setUserAnswer(answer);
  };



  return (
    <Modal
      open={isModalVisible}
      closeAfterTransition
      disableEnforceFocus={true}
      BackdropProps={{ style: { backgroundColor: 'transparent' } }}
    >
      <>
        {allLoadedImages && true}
        <DimBackground>
          <ReminderModal
            isModalVisible={isReminderVisible}
            setIsModalVisible={setIsReminderVisible}
            text={reminderText}>
          </ReminderModal>


          <ModalContainer>
            <div>
              <BackgroundImage src={questionBackground} alt="reminderBackground" />
              <>
                <OKButton onClick={handleSubmit} style={{ position: "absolute", top: "100%", left: "80%", width: "120px" }}>
                  <img src={submitBtn} alt="submitBtn" style={{ width: "100%", height: "100%" }} />
                </OKButton>
                <MCText>
                  <span style={{
                    position: "absolute",
                    top: "18%",
                    left: "9%",
                    width: "100%"
                  }}>
                    {currentQuestionData.question.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </span>
                </MCText>


                {currentQuestionData.options.map((optionObj, index) => {
                  const optionTop = 38 + index * 12;
                  return (
                    <MCText key={index}>
                      <span
                        style={{
                          position: "absolute",
                          width: "100%",
                          top: `${optionTop}%`,
                          left: "10%",
                          fontSize: "23px",
                          cursor: "pointer",
                          textDecoration: userAnswer === index ? "underline" : "none",
                        }}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={userAnswer !== null}
                      >
                        {String.fromCharCode(65 + index)} {optionObj.answer}
                      </span>
                    </MCText>
                  );
                })}

              </>
            </div>

          </ModalContainer>
        </DimBackground>
      </>
    </Modal>

  );
};

const BackgroundImage = styled.img`
  width: 100%;
  position: absolute;
  top: -10%;
  left: 0%;
  object-fit: contain;
`;


const ModalContainer = styled.div`
  position: fixed;
  z-index: 99;
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MCText = styled.div`
  font-family: 'Inter';
  font-style: italic;
  font-size: 26px;
  font-weight: bold;
  text-align: justify;
  color: #645959;
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


export default QuestionModal;
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import UserContext from '../UserContext';

import loginImage from "../asset/LoginPage.png";
import userIcon from "../asset/UserIcon.png";
import passwordIcon from "../asset/PasswordIcon.png";
import loginBtn from "../asset/LoginBtn.png";
import regBtn from "../asset/RegisterBtn.png";

const baseurl = "http://localhost:3003";
const backgroundImage = [loginImage, userIcon, passwordIcon, loginBtn, regBtn]

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const [allLoadedImages, setAllLoadedImages] = useState([]);

  useEffect(() => {
    // Preload the images
    const images = backgroundImage.map((imageSrc) => {
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


  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const handleLoginClick = async () => {
    try {
      if (username === "" || password === "") {
        setError("Please enter a valid username and password");
        return;
      }
      const response = await axios.post(`${baseurl}/login` , {
        username,
        password,
      });
      // console.log(response, "response>>>!")
  
      response.data.user = {
        ...response.data.user,
        musicVolume: '0.2',
        soundVolume: '0.2',
        dialogueVolume: '1'
      }
  
      if (response.data.success) {
        setUser(response.data.user);
        // console.log(response.data.user, "See what is inside>>>!!!")
        localStorage.setItem('user', JSON.stringify(response.data.user)); // save user information in local storage
        navigate("/menu", {state:true});
      }
  
      else {
        setError(response.data.error);
      }
    } catch (error) {
      setError(error);
    }
  };
  

  return (
    <>
      {allLoadedImages && true}
      <PageContainer>
        <BackgroundImageContainer>
          <BackgroundImage src={loginImage} alt="Login" />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Textbox
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            icon={userIcon}
          />
          <Textbox
            style={{ position: "absolute", top: "65%"}}
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            icon={passwordIcon}
          />
          <LoginButton onClick={handleLoginClick}>
            <img src={loginBtn} alt="loginBtn" />
          </LoginButton>
          <Link to="/register" state="true">
            <LoginButton style={{ position: "absolute", left: "62.5%" }}>
              <img src={regBtn} alt="registerBtn" />
            </LoginButton>
          </Link>
        </BackgroundImageContainer>
      </PageContainer>
    </>
  );
};

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

const Textbox = styled.input`
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 12.5%;
  border: 3px solid #FFFFFF;
  border-radius: 40px;
  font-family: 'Inter';
  font-style: italic;
  font-size: 30px;
  font-weight: bold;
  text-align: justify;
  color: #000000;
  padding: 0 55px;
  autocomplete: off;
  background-image: url(${props => props.icon});
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 35px 35px;


  ::placeholder {
    color: #645959;
    opacity: 0.5;
  }

`;

const LoginButton = styled.button`
  position: absolute;
  top: 87.5%;
  left: 37.5%;
  transform: translate(-50%, -50%);
  width: 25%;
  height: 17.5%;
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

  &[disabled] {
    filter: brightness(0.6);
    cursor: not-allowed;
  }
`;
// if disable button!!!!!>>>>

const ErrorMessage = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Inter';
  font-style: italic;
  font-size: 20px;
  font-weight: bold;
  color: #FF0000;
`;


export default LoginPage;
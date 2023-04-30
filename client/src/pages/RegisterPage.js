import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom"; // import Link

import loginImage from "../asset/LoginPage.png";
import enterBtn from "../asset/EnterBtn.png";
import axios from "axios";

const baseurl = "http://localhost:3003";

const RegisterPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");;

  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    if(location.state == undefined || location.state == null || location.state == '')
      navigate("/");
  });

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };



  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!firstname || !lastname || !username || !password) {
      setError("Please fill in all required fields");
      return;
    }

    try { 
      const response = await axios.post(`${baseurl}/register`, {
        firstname,
        lastname,
        username,
        password,
      });
      if (response.data.success) {
        navigate("/login", {state:true});
      } else if (response.data.error) {
        // console.log(response.data.error)
        setError(response.data.error);
      }
      
    } catch (error) {
      setError(error);
    }
  };
  
  return (
    <>
        <PageContainer>
          <BackgroundImageContainer>
            <BackgroundImage src={loginImage} alt="Register" />
            <form onSubmit={handleFormSubmit}>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Textbox
                style={{ position: "absolute", left: "40%", top: "41%", width: "15%" }}
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={handleLastNameChange}
              />
              <Textbox
                style={{ position: "absolute", left: "60%", top: "41%", width: "15%" }}
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={handleFirstNameChange}
              />
              <Textbox
                style={{ position: "absolute", top: "51%" }}
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
              <Textbox
                style={{ position: "absolute", top: "62.25%" }}
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Textbox
                style={{ position: "absolute", top: "73.5%" }}
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <LoginButton type="submit">
                <img src={enterBtn} alt="Reg" />
              </LoginButton>
            </form>
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
  width: 35%;
  height: 7.5%;
  border: 3px solid #FFFFFF;
  border-radius: 40px;
  font-family: 'Inter';
  font-style: italic;
  font-size: 30px; /* Updated font size */
  font-weight: bold;
  text-align: justify;
  color: #000000;
  padding: 0 20px;
  autocomplete: off;

  ::placeholder {
    color: #645959;
    opacity: 0.5;
  }

`;

const LoginButton = styled.button`
  position: absolute;
  top: 87.5%;
  left: 50%;
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
`;

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


export default RegisterPage;

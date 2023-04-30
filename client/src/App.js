import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoute from "./AppRoute";
import "./App.css";
import UserContext from './UserContext';
import clickSound from './asset/bgm/clickSound.wav';

function App() {
  // const [backendData, setBackendData] = useState({});
  const [clickCount, setClickCount] = useState(0);

  const [user, setUser] = useState({
    userId: '',
    name: '',
    musicVolume: 0.2,
    soundVolume: 0.2,
    dialogueVolume: 1
  });

  // useEffect(() => {
  //   fetch("/api")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBackendData(data);
  //     });
  // }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClick = () => {
      setClickCount(count => count + 1);
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (clickCount > 0) {
      setClickCount(0);
      const clickSoundAudio = new Audio(clickSound);
      clickSoundAudio.volume = user.soundVolume;
      clickSoundAudio.play();
    }
  }, [clickCount, user.soundVolume]);


  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
      </UserContext.Provider>

    </>
  );
}

export default App;
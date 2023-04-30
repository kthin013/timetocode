import React, { useEffect, useRef, useContext } from 'react';
import UserContext from '../UserContext';

function AudioModal(props) {
  const { audio, mode, volume = 0.2 } = props;
  const { user } = useContext(UserContext);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (mode === "dialogue") {
        audioRef.current.volume = user.dialogueVolume;
      } else {
        audioRef.current.volume = user.musicVolume;
      }
    }
  }, [mode, user.dialogueVolume, user.musicVolume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play();
      if (!isNaN(volume) && volume >= 0 && volume <= 1) {
        audio.volume = volume;
      }
      return () => {
        audio.pause();
      };
    }
  }, [audio, volume]);

  return (
    <div className="modal">
      {mode === "dialogue" ? (<audio ref={audioRef} src={audio} />
      ) : (<audio ref={audioRef} src={audio} loop />
      )
      }
    </div>
  );
}

export default AudioModal;

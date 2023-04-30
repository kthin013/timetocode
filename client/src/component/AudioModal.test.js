import { render } from '@testing-library/react';
import React, {useContext} from 'react';
import AudioModal from './AudioModal';
import bgm from "../asset/bgm/Tutorial.mp3";
import UserContext from '../UserContext';

window.HTMLMediaElement.prototype.play = () => {}
window.HTMLMediaElement.prototype.pause = () => {}

describe('AudioModal', () => {
  it('Renders AudioModal component', ()=> {
    const test = () => {
      const { user } = useContext(UserContext);
      render(<AudioModal audio={bgm} volume={user.musicVolume} mode="music" />);
    }
  });
});
import { render } from '@testing-library/react';
import React, { useState } from 'react';
import SettingModal from './SettingModal';

describe('CustomModal', () => {
  it('Renders CustomModal component', ()=> {
    const test = () => {
      const [isSettingVisible, setIsSettingVisible] = useState(true);
      
      render(<SettingModal
        isModalVisible={isSettingVisible}
        setIsModalVisible={setIsSettingVisible}
        mode="dialogue"
      />);
    }
  });
});
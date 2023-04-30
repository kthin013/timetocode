import { render } from '@testing-library/react';
import React, { useState } from 'react';
import CustomModal from './CustomModal';

describe('CustomModal', () => {
  it('Renders CustomModal component', ()=> {
    const test = () => {
      const [isResultModalVisible, setIsResultModalVisible] = useState(false);
      setIsResultModalVisible(true);
      render(<CustomModal isModalVisible={isResultModalVisible} setIsModalVisible={setIsResultModalVisible} type="Win" />);
      render(<CustomModal isModalVisible={isResultModalVisible} setIsModalVisible={setIsResultModalVisible} type="Lose" />);
    }
  });
});
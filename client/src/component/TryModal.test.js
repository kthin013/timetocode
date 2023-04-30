import { render } from '@testing-library/react';
import React, {useState} from 'react';
import TryModal from './TryModal';

describe('TryModal', () => {
  it('Renders TryModal component', ()=> {
    const test = () => {
      const [isResultModalVisible, setIsResultModalVisible] = useState(false);
      setIsResultModalVisible(true);
      render(<TryModal
        isModalVisible={isResultModalVisible}
        setIsModalVisible={setIsResultModalVisible}
        stage_star={3}
        stage_number={1}
        type={winOrLose}
      />);
    }
  });
});
import { render } from '@testing-library/react';
import React, { useState } from 'react';
import ReminderModal from './ReminderModal';

describe('CustomModal', () => {
  it('Renders CustomModal component', ()=> {
    const test = () => {
      const [isReminderVisible, setIsReminderVisible] = useState(true);
      
      render(<ReminderModal
        isModalVisible={isReminderVisible}
        setIsModalVisible={setIsReminderVisible}
        text={""}
        mode={"levelGuide"}
      />);
    }
  });
});
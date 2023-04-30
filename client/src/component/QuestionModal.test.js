import { render } from '@testing-library/react';
import React, { useState } from 'react';
import QuestionModal from './QuestionModal';

describe('CustomModal', () => {
  it('Renders CustomModal component', ()=> {
    const test = () => {
      const [pageIndex, setPageIndex] = useState(0);
      const [isQuestionVisible, setIsQuestionVisible] = useState(true);

      render(<QuestionModal
        isModalVisible={isQuestionVisible}
        setIsModalVisible={setIsQuestionVisible}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        questionNum={0}
      ></QuestionModal>);
    }
  });
});
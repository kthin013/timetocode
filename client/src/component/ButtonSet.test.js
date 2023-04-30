import { render } from '@testing-library/react';
import React, { useState } from 'react';
import ButtonSet from './ButtonSet';
import {
  loadCode, resetCode, stepCode, playCode, initBlocklyUtils,
  returnIsLoadDisable, returnIsAutoStepDisable, returnIsStepDisable
} from "../blockly/Utils";

describe('ButtonSet', () => {
  it('Renders ButtonSet component', ()=> {
    const test = () => {
      const [isLoadDisable, setIsLoadDisable] = useState(returnIsLoadDisable);
      const [isAutoStepDisable, setIsAutoStepDisable] = useState(returnIsAutoStepDisable);
      const [isStepDisable, setIsStepDisable] = useState(returnIsStepDisable);

      const handleBtnState = () => {
        setIsLoadDisable(returnIsLoadDisable());
        setIsStepDisable(returnIsStepDisable());
        setIsAutoStepDisable(returnIsAutoStepDisable());
      }

      const handlePlay = () => {
        if (startBlockRef.current.getNextBlock() != null) {
          playCode();
          handleBtnState();
        } else {
          setIsErrorModalVisible(true);
        }
      }
      
      const handleStep = () => {
        if (startBlockRef.current.getNextBlock() != null) {
          stepCode();
          setIsStepDisable(true);
          setTimeout(() => {
            setIsStepDisable(false);
            handleBtnState();
          }, 250);
        } else {
          setIsErrorModalVisible(true);
        }
      }
      
      const handleLoad = () => {
        if (startBlockRef.current.getNextBlock() != null) {
          loadCode();
          handleBtnState();
        } else {
          setIsErrorModalVisible(true);
        }
      }
      
      const handleStop = () => {
        resetCode();
        handleBtnState();
      }

      render(<ButtonSet
        isAutoStepDisable={isAutoStepDisable}
        isStepDisable={isStepDisable}
        isLoadDisable={isLoadDisable}
        handleStop={handleStop}
        handleLoad={handleLoad}
        handlePlay={handlePlay}
        handleStep={handleStep}
        stageNumber={1}
      />);
    }
  });
});
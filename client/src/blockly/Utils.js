import { javascriptGenerator, } from 'blockly/javascript';
import Interpreter from "js-interpreter";

var workspaceManger = null;
var sceneManger = null;
var playerObject = null;
let myInterpreter = null;
let highlightPause = false;
let code = "";

class btnControl {
  constructor() {
    this.isLoad = false;
    this.isStepping = false;
    this.isAutoStepping = false;
    this.isLoadDisable = this.isLoad || this.isStepping || this.isAutoStepping;
    this.isStepDisable = !this.isLoad || this.isAutoStepping;
    this.isAutoStepDisable = !this.isLoad || this.isAutoStepping || this.isStepping;
  }
  setIsLoad(value) { this.isLoad = value };
  setIsStepping(value) { this.isStepping = value };
  setIsAutoStepping(value) { this.isAutoStepping = value };
}
var btnControlObj = new btnControl();

const returnIsLoadDisable = () => { return (btnControlObj.isLoad || btnControlObj.isStepping || btnControlObj.isAutoStepping) };
const returnIsStepDisable = () => { return (!btnControlObj.isLoad || btnControlObj.isAutoStepping) };
const returnIsAutoStepDisable = () => { return (!btnControlObj.isLoad || btnControlObj.isAutoStepping || btnControlObj.isStepping) };

const initBlocklyUtils = async (w, s, obj) => {
  workspaceManger = await w;
  sceneManger = await s;
  playerObject = await obj;

  javascriptGenerator.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
  javascriptGenerator.addReservedWords('highlightBlock');
}

const initFunction = function (interpreter, globalObject) {
  const wrapperHighlight = function (id) {
    id = String(id || '');
    return highlightBlock(id);
  };
  interpreter.setProperty(globalObject, 'highlightBlock',
    interpreter.createNativeFunction(wrapperHighlight));

  interpreter.setProperty(
    globalObject,
    "handleForward",
    interpreter.createNativeFunction(handleForward)
  );

  interpreter.setProperty(
    globalObject,
    "handleBackward",
    interpreter.createNativeFunction(handleBackward)
  );

  interpreter.setProperty(
    globalObject,
    "handleTurnLeft",
    interpreter.createNativeFunction(handleTurnLeft)
  );

  interpreter.setProperty(
    globalObject,
    "handleTurnRight",
    interpreter.createNativeFunction(handleTurnRight)
  );

  interpreter.setProperty(
    globalObject,
    "handleTake",
    interpreter.createNativeFunction(handleTake)
  );

  interpreter.setProperty(
    globalObject,
    "handleDrop",
    interpreter.createNativeFunction(handleDrop)
  );

  interpreter.setProperty(
    globalObject,
    "handleEnd",
    interpreter.createNativeFunction(handleEnd)
  );

  interpreter.setProperty(
    globalObject,
    "handleIsOn",
    interpreter.createNativeFunction(handleIsOn)
  );

  interpreter.setProperty(
    globalObject,
    "handleIsHold",
    interpreter.createNativeFunction(handleIsHold)
  );
};

const highlightBlock = (id) => {
  workspaceManger.highlightBlock(id);
  highlightPause = true;
}

const resetStepUi = () => {
  workspaceManger.highlightBlock(null);
  highlightPause = false;
  myInterpreter = null;
}

const loadCode = () => {
  // console.log(btnControlObj.isLoad, btnControlObj.isStepping, btnControlObj.isAutoStepping);
  if (myInterpreter || btnControlObj.isLoad || btnControlObj.isStepping) {
    // console.log("Not Entering loadCode");
    return;
  }
  if (!myInterpreter && !btnControlObj.isLoad) {
    playerObject.resetStatus();
    btnControlObj.setIsLoad(true);
    code = javascriptGenerator.workspaceToCode(workspaceManger);
    myInterpreter = new Interpreter(code, initFunction);
    highlightPause = true;
    // console.log("loadCode >>> ", code);
  }
}

const resetCode = () => {
  // console.log(btnControlObj);
  // console.log("resetCode");
  if (btnControlObj.isLoad)
    workspaceManger.highlightBlock(null);
  myInterpreter = null;
  btnControlObj.setIsLoad(false);
  btnControlObj.setIsStepping(false);
  btnControlObj.setIsAutoStepping(false);
  code = "";
}

const stepCode = () => {
  if (!myInterpreter || !btnControlObj.isLoad) {
    // console.log("Not Entering stepCode");
    return;
  }
  btnControlObj.setIsStepping(true);
  highlightPause = false;
  let hasMoreCode;
  // console.log("stepCode");
  do {
    try {
      hasMoreCode = myInterpreter.step();
    } finally {
      if (!hasMoreCode) {
        // resetStepUi();
        resetCode();
        handleEnd();
        return "CODE_END";
      }
    }
  } while (hasMoreCode && !highlightPause);
  workspaceManger.addChangeListener((event) => {
    if (!event.isUiEvent) {
      // resetStepUi();
      resetCode();
    }
  });
  return "STEP_END";
}

const playCode = () => {
  if (!myInterpreter || !btnControlObj.isLoad || btnControlObj.isStepping) {
    // console.log("Not Entering playCode");
    return;
  }
  // console.log("playCode");
  btnControlObj.setIsAutoStepping(true);
  var codeState = "";
  var myInterval = setInterval(() => {
    if (!btnControlObj.isAutoStepping || !myInterpreter || !btnControlObj.isLoad) {
      clearInterval(myInterval);
      return;
    }
    codeState = stepCode();
    if (codeState === "CODE_END") {
      clearInterval(myInterval);
    }
  }, 1000);
}

const handleEnd = () => {
  // playerObject.gameState = "End";
  playerObject.setGameState("End");
  // console.log("Ending", playerObject, playerObject.isOnGoal);
}

const handleForward = () => {
  playerObject.handleForward();
}
const handleBackward = () => {
  playerObject.handleBackward();
}

const handleTurnLeft = () => {
  playerObject.handleTurnLeft();
}

const handleTurnRight = () => {
  playerObject.handleTurnRight();
}

const handleTake = () => {
  playerObject.handleTake();
}
const handleDrop = () => {
  playerObject.handleDrop();
}
const handleIsOn = (colour) => {
  // eslint-disable-next-line default-case
  switch (colour) {
    case "#c0b284":
      return playerObject.handleIsOn("wheat");
    case "#46ad40":
      return playerObject.handleIsOn("green");
    case "#ac3f3c":
      return playerObject.handleIsOn("red");
    case "#5b80a5":
      return playerObject.handleIsOn("blue");
  }
}
const handleIsHold = () => {
  if (playerObject.isHandFull && playerObject.holdingItem !== "") {
    return true;
  } else return false;
}

const handleError = (errorText) => {
  // console.log(errorText);
}

export {
  loadCode,
  resetCode,
  stepCode,
  playCode,
  returnIsLoadDisable,
  returnIsAutoStepDisable,
  returnIsStepDisable,
  initBlocklyUtils
};
import * as Blockly from "blockly";
import { javascriptGenerator } from "blockly/javascript";

const MOVEMENTBLOCK = {
  "type": "movement",
  "message0": "Moving %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "Movement",
      "options": [
        [
          "Forward",
          "FORWARD"
        ],
        [
          "Backward",
          "BACKWARD"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#ac3c71",
  "tooltip": "Character Movements: Forward, Backward",
  "helpUrl": ""
}

const TURNBLOCK = {
  "type": "turn",
  "message0": "Turning %1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "Turn",
      "options": [
        [
          "Left",
          "LEFT"
        ],
        [
          "Right",
          "RIGHT"
        ]
      ]
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#ac3f3c",
  "tooltip": "Character Movements: Forward, Backward",
  "helpUrl": ""
}

const TAKEBLOCK = {
  "type": "take",
  "message0": "Take 👏",
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#ac773c",
  "tooltip": "Pick up an item",
  "helpUrl": ""
}

const DROPBLOCK = {
  "type": "drop",
  "message0": "Drop 🙌",
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#ac773c",
  "tooltip": "Drop down an item",
  "helpUrl": ""
}

const STARTBLOCK = {
  "type": "start",
  "message0": "Start 🚩",
  "nextStatement": null,
  "colour": "#903ec1",
  "tooltip": "Start Block",
  "helpUrl": ""
}

const ISONBLOCK = {
  "type": "isOn",
  "message0": "On? 🎨 %1",
  "args0": [{
    "type": "field_colour",
    "name": "ISONCOLOUR",
    "colour": "#5b80a5",
    "colourOptions":
      ['#C0B284', '#46AD40', '#5b80a5', '#AC3F3C'],
    "colourTitles":
      ['wheat', 'green', 'blue', 'red'],
    "columns": 4
  }],
  "output": "Boolean",
  "tooltip": "",
  "helpUrl": ""
}

const ISHOLDBLOCK = {
  "type": "isHold",
  "message0": "Holding ? 👏",
  "output": "Boolean",
  "colour": "#5b80a5",
  "tooltip": "",
  "helpUrl": ""
}

const NUMBLOCK = {
  "type": "num",
  "message0": "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "TIMES",
      "options": [
        ["1", '1'],
        ["2", '2'],
        ["3", '3'],
        ["4", '4'],
        ["5", '5'],
        ["6", '6'],
        ["7", '7'],
        ["8", '8'],
        ["9", '9'],
        ['10', '10']
      ]
    }
  ],
  "output": "Number",
  "colour": "#63A689",
  "tooltip": "",
  "helpUrl": ""
}

javascriptGenerator['movement'] = function (block) {
  const result = block.getFieldValue("Movement");
  if (result === "FORWARD")
    return 'handleForward();';
  if (result === 'BACKWARD')
    return 'handleBackward();';
  return `handleError(' Error >>>>>>>>>>> javascriptGenerator['movement']')`;
}

javascriptGenerator['turn'] = function (block) {
  const result = block.getFieldValue('Turn');
  // TODO: Assemble JavaScript into code variable.
  if (result === "LEFT")
    return 'handleTurnLeft();';
  if (result === 'RIGHT')
    return 'handleTurnRight();';
  return `handleError(' Error >>>>>>>>>>> javascriptGenerator['turn']')`;
};

javascriptGenerator['take'] = function (block) {
  return 'handleTake();';
};

javascriptGenerator['drop'] = function (block) {
  return 'handleDrop();';
};

javascriptGenerator['start'] = function (block) {
  // console.log("Start Block");
  return ``;
};

javascriptGenerator['isOn'] = function (block) {
  const result = block.getFieldValue("ISONCOLOUR");
  return [`handleIsOn('${result}')`, javascriptGenerator.ORDER_NONE];
};

javascriptGenerator['isHold'] = function (block) {
  return [`handleIsHold()`, javascriptGenerator.ORDER_NONE];
};

javascriptGenerator['num'] = function (block) {
  const result = block.getFieldValue("TIMES");
  return [`${result}`, javascriptGenerator.ORDER_NONE];;
};

const CustomBlocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  MOVEMENTBLOCK,
  TURNBLOCK,
  TAKEBLOCK,
  DROPBLOCK,
  STARTBLOCK,
  ISONBLOCK,
  ISHOLDBLOCK,
  NUMBLOCK
]);
export default CustomBlocks;
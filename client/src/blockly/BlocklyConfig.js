import CustomBlocks from "./CustomBlock";

const Style = {
  actionCats: {
    kind: "category",
    name: "Action",
    colour: "#ac3c71",
  },
  logicCats: {
    kind: "category",
    name: "Logic",
    colour: "#4973A3",
  },
  loopCats: {
    kind: "category",
    name: "Loop",
    colour: "#85B65F",
  },
}

const WORKSPACE = {
  grid: {
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true
  },
  renderer: 'zelos',
  trashcan: true
}

const BLOCKLIMITS = {
  "kind": "label",
  "text": "Block Usage Limits:",
  "web-class": "LabelStyle"
}

const BLOCKTYPE = {
  REPEAT: {
    'type': 'controls_repeat_ext',
    'kind': 'block',
    'inputs': {
      'TIMES': {
        'shadow': {
          'type': 'math_number',
          'fields': {
            'NUM': 5,
          },
        },
        "block": {
          kind: "block",
          type: "num",
        }
      },
    },
  },
  WHILE: {
    'type': 'controls_whileUntil',
    'kind': 'block',
    'fields': {
      'MODE': 'WHILE',
    },
  },
  BREAK: {
    'type': 'controls_flow_statements',
    'kind': 'block',
    'fields': {
      'FLOW': 'BREAK',
    },
  },
  NUM: {
    kind: "block",
    type: "num",
  },
  IF: {
    kind: "block",
    type: "controls_if",
    colour: 230,
  },
  OPERATION: {
    kind: "block",
    type: "logic_operation",
  },
  BOOLEAN: {
    kind: "block",
    type: "logic_boolean",
  },
  NEGATE: {
    kind: "block",
    type: "logic_negate",
  },
  ISON: {
    kind: "block",
    type: "isOn",
  },
  ISHOLD: {
    kind: "block",
    type: "isHold",
  },
  MOVEMENT: {
    kind: "block",
    type: "movement",
  },
  TURN: {
    kind: "block",
    type: "turn",
  },
  TAKE: {
    kind: "block",
    type: "take",
  },
  DROP: {
    kind: "block",
    type: "drop",
  },
}

const TOOLBOX = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [BLOCKTYPE.MOVEMENT, BLOCKTYPE.TURN, BLOCKTYPE.TAKE, BLOCKTYPE.DROP,]
    },
    {
      ...Style.loopCats,
      contents: [BLOCKTYPE.REPEAT, BLOCKTYPE.NUM, BLOCKTYPE.WHILE, BLOCKTYPE.BREAK],
    },
    {
      ...Style.logicCats,
      contents: [BLOCKTYPE.IF, BLOCKTYPE.ISON, BLOCKTYPE.ISHOLD, BLOCKTYPE.NEGATE, BLOCKTYPE.OPERATION, BLOCKTYPE.BOOLEAN,],
    },
  ],
};

const TOOLBOX_LEVEL_1_1$2$5 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [BLOCKTYPE.MOVEMENT]
    },
  ],
};

const TOOLBOX_LEVEL_1_3$4$6 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN
      ]
    },
  ],
};

const TOOLBOX_LEVEL_1_7$8$9$10 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKTYPE.TAKE,
        BLOCKTYPE.DROP,
      ]
    },
  ],
};

const TOOLBOX_LEVEL_2_1 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 1️⃣",
          "web-class": "LabelStyle1"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.REPEAT,
        BLOCKTYPE.NUM,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Repeat ... times 1️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Number 1️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
  ],
};

const TOOLBOX_LEVEL_2_2 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 5️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Turn 1️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [

        BLOCKTYPE.REPEAT,
        BLOCKTYPE.NUM,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Repeat ... times 1️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Number 1️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
  ],
};

const TOOLBOX_LEVEL_2_3 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKTYPE.TAKE,
        BLOCKTYPE.DROP,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 5️⃣ ",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Turn 1️⃣",
          "web-class": "LabelStyle2"
        },
        {
          "kind": "label",
          "text": "Take 1️⃣",
          "web-class": "LabelStyle3"
        },
        {
          "kind": "label",
          "text": "Drop 1️⃣",
          "web-class": "LabelStyle4"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.REPEAT,
        BLOCKTYPE.NUM,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Repeat ... times 1️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Number 1️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
  ],
};

const TOOLBOX_LEVEL_2_4 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKTYPE.TAKE,
        BLOCKTYPE.DROP,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 5️⃣ ",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Turn 1️⃣",
          "web-class": "LabelStyle2"
        },
        {
          "kind": "label",
          "text": "Take 1️⃣",
          "web-class": "LabelStyle3"
        },
        {
          "kind": "label",
          "text": "Drop 1️⃣",
          "web-class": "LabelStyle4"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.REPEAT,
        BLOCKTYPE.NUM,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Repeat ... times 1️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Number 1️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
  ],
};

const TOOLBOX_LEVEL_2_5 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TAKE,
        BLOCKTYPE.DROP,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 1️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Take 1️⃣",
          "web-class": "LabelStyle2"
        },
        {
          "kind": "label",
          "text": "Drop 1️⃣",
          "web-class": "LabelStyle3"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.REPEAT,
        BLOCKTYPE.NUM,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Repeat ... times 1️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Number 1️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
    {
      ...Style.logicCats,
      contents: [
        BLOCKTYPE.IF,
        BLOCKTYPE.ISON,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "If 1️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Is ON? 1️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
  ],
};

const TOOLBOX_LEVEL_2_6 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TAKE,
        BLOCKTYPE.DROP,
        BLOCKTYPE.TURN,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 5️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Take 1️⃣",
          "web-class": "LabelStyle2"
        },
        {
          "kind": "label",
          "text": "Drop 1️⃣",
          "web-class": "LabelStyle3"
        },
        {
          "kind": "label",
          "text": "Turn 1️⃣",
          "web-class": "LabelStyle4"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.REPEAT,
        BLOCKTYPE.NUM,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Repeat ... times 1️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Number 1️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
    {
      ...Style.logicCats,
      contents: [
        BLOCKTYPE.IF,
        BLOCKTYPE.ISON,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "If 2️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Is ON? 2️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
  ],
};

const TOOLBOX_LEVEL_2_7 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 5️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Turn 2️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.REPEAT,
        BLOCKTYPE.NUM,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Repeat ... times 1️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Number 1️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
    {
      ...Style.logicCats,
      contents: [
        BLOCKTYPE.IF,
        BLOCKTYPE.ISON,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "If 1️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Is ON? 2️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
  ],
};

const TOOLBOX_LEVEL_2_8 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 5️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Turn 2️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.REPEAT,
        BLOCKTYPE.NUM,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Repeat ... times 1️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Number 1️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
    {
      ...Style.logicCats,
      contents: [
        BLOCKTYPE.IF,
        BLOCKTYPE.ISON,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "If 2️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Is ON? 2️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
  ],
};

const TOOLBOX_LEVEL_2_9 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKTYPE.TAKE,
        BLOCKTYPE.DROP,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 3️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Turn 1️⃣",
          "web-class": "LabelStyle2"
        },
        {
          "kind": "label",
          "text": "Take 1️⃣",
          "web-class": "LabelStyle3"
        },
        {
          "kind": "label",
          "text": "Drop 1️⃣",
          "web-class": "LabelStyle4"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.REPEAT,
        BLOCKTYPE.NUM,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Repeat ... times 1️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Number 1️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
    {
      ...Style.logicCats,
      contents: [
        BLOCKTYPE.IF,
        BLOCKTYPE.ISON,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "If 2️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Is ON? 2️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
  ],
};

const TOOLBOX_LEVEL_2_10 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKTYPE.TAKE,
        BLOCKTYPE.DROP,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 2️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Turn 2️⃣",
          "web-class": "LabelStyle2"
        },
        {
          "kind": "label",
          "text": "Take 1️⃣",
          "web-class": "LabelStyle3"
        },
        {
          "kind": "label",
          "text": "Drop 1️⃣",
          "web-class": "LabelStyle4"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.REPEAT,
        BLOCKTYPE.NUM,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Repeat ... times 1️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Number 1️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
    {
      ...Style.logicCats,
      contents: [
        BLOCKTYPE.IF,
        BLOCKTYPE.ISON,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "If 2️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Is ON? 2️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
  ],
};

const TOOLBOX_LEVEL_3_1 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 2️⃣",
          "web-class": "LabelStyle1"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.WHILE,
        BLOCKTYPE.BREAK,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "While 1️⃣",
          "web-class": "LabelStyle1"
        },
      ]
    },
    {
      ...Style.logicCats,
      contents: [
        BLOCKTYPE.NEGATE,
        BLOCKTYPE.ISON,
      ]
    },
  ],
};

const TOOLBOX_LEVEL_3_2 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 2️⃣",
          "web-class": "LabelStyle1"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.WHILE,
        BLOCKTYPE.BREAK,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "While 1️⃣",
          "web-class": "LabelStyle1"
        },
      ]
    },
    {
      ...Style.logicCats,
      contents: [
        BLOCKTYPE.IF,
        BLOCKTYPE.NEGATE,
        BLOCKTYPE.ISON,
      ]
    },
  ],
};

const TOOLBOX_LEVEL_3_3 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TAKE,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 2️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Take 1️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.WHILE,
        BLOCKTYPE.BREAK,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "While 1️⃣",
          "web-class": "LabelStyle1"
        },
      ]
    },
    {
      ...Style.logicCats,
      contents: [
        BLOCKTYPE.IF,
        BLOCKTYPE.BOOLEAN,
        BLOCKTYPE.NEGATE,
        BLOCKTYPE.ISON,
        BLOCKTYPE.ISHOLD,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "If 1️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Is ON? 1️⃣",
          "web-class": "LabelStyle2"
        },
        {
          "kind": "label",
          "text": "Is Holding? 1️⃣",
          "web-class": "LabelStyle3"
        },
      ]
    },
  ],
};

const TOOLBOX_LEVEL_3_4 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKTYPE.TAKE,
        BLOCKTYPE.DROP,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 5️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Turn 3️⃣",
          "web-class": "LabelStyle2"
        },
        {
          "kind": "label",
          "text": "Take 1️⃣",
          "web-class": "LabelStyle3"
        },
        {
          "kind": "label",
          "text": "Drop 1️⃣",
          "web-class": "LabelStyle4"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.WHILE,
        BLOCKTYPE.BREAK,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "While 1️⃣",
          "web-class": "LabelStyle1"
        },
      ]
    },
    {
      ...Style.logicCats,
      contents: [
        BLOCKTYPE.IF,
        BLOCKTYPE.OPERATION,
        BLOCKTYPE.BOOLEAN,
        BLOCKTYPE.NEGATE,
        BLOCKTYPE.ISON,
        BLOCKTYPE.ISHOLD,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Is ON? 4️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Is Holding? 4️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
  ],
};

const TOOLBOX_LEVEL_3_5 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKTYPE.TAKE,
        BLOCKTYPE.DROP,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 5️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Turn 3️⃣",
          "web-class": "LabelStyle2"
        },
        {
          "kind": "label",
          "text": "Take 1️⃣",
          "web-class": "LabelStyle3"
        },
        {
          "kind": "label",
          "text": "Drop 1️⃣",
          "web-class": "LabelStyle4"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.WHILE,
        BLOCKTYPE.BREAK,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "While 1️⃣",
          "web-class": "LabelStyle1"
        },
      ]
    },
    {
      ...Style.logicCats,
      contents: [
        BLOCKTYPE.IF,
        BLOCKTYPE.OPERATION,
        BLOCKTYPE.BOOLEAN,
        BLOCKTYPE.NEGATE,
        BLOCKTYPE.ISON,
        BLOCKTYPE.ISHOLD,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Is ON? 4️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Is Holding? 4️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
  ],
};

const TOOLBOX_LEVEL_3_6 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKTYPE.TAKE,
        BLOCKTYPE.DROP,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 2️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Turn 3️⃣",
          "web-class": "LabelStyle2"
        },
        {
          "kind": "label",
          "text": "Take 1️⃣",
          "web-class": "LabelStyle3"
        },
        {
          "kind": "label",
          "text": "Drop 1️⃣",
          "web-class": "LabelStyle4"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.WHILE,
        BLOCKTYPE.BREAK,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "While 1️⃣",
          "web-class": "LabelStyle1"
        },
      ]
    },
    {
      ...Style.logicCats,
      contents: [
        BLOCKTYPE.IF,
        BLOCKTYPE.BOOLEAN,
        BLOCKTYPE.NEGATE,
        BLOCKTYPE.ISON,
        BLOCKTYPE.ISHOLD,
      ]
    },
  ],
};

const TOOLBOX_LEVEL_3_7 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKTYPE.TAKE,
        BLOCKTYPE.DROP,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 2️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Turn 4️⃣",
          "web-class": "LabelStyle2"
        },
        {
          "kind": "label",
          "text": "Take 1️⃣",
          "web-class": "LabelStyle3"
        },
        {
          "kind": "label",
          "text": "Drop 1️⃣",
          "web-class": "LabelStyle4"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.WHILE,
        BLOCKTYPE.BREAK,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "While 1️⃣",
          "web-class": "LabelStyle1"
        },
      ]
    },
    {
      ...Style.logicCats,
      contents: [
        BLOCKTYPE.IF,
        BLOCKTYPE.BOOLEAN,
        BLOCKTYPE.NEGATE,
        BLOCKTYPE.ISON,
        BLOCKTYPE.ISHOLD,
      ]
    },
  ],
};

const TOOLBOX_LEVEL_3_8 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKTYPE.TAKE,
        BLOCKTYPE.DROP,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 2️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Turn 4️⃣",
          "web-class": "LabelStyle2"
        },
        {
          "kind": "label",
          "text": "Take 1️⃣",
          "web-class": "LabelStyle3"
        },
        {
          "kind": "label",
          "text": "Drop 1️⃣",
          "web-class": "LabelStyle4"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.WHILE,
        BLOCKTYPE.BREAK,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "While 1️⃣",
          "web-class": "LabelStyle1"
        },
      ]
    },
    {
      ...Style.logicCats,
      contents: [
        BLOCKTYPE.IF,
        BLOCKTYPE.BOOLEAN,
        BLOCKTYPE.NEGATE,
        BLOCKTYPE.ISON,
        BLOCKTYPE.ISHOLD,
      ]
    },
  ],
};

const TOOLBOX_LEVEL_3_10 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKTYPE.TAKE,
        BLOCKTYPE.DROP,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 4️⃣",
          "web-class": "LabelStyle1"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [
        BLOCKTYPE.WHILE,
        BLOCKTYPE.BREAK,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "While 3️⃣",
          "web-class": "LabelStyle1"
        },
      ]
    },
    {
      ...Style.logicCats,
      contents: [
        BLOCKTYPE.IF,
        BLOCKTYPE.BOOLEAN,
        BLOCKTYPE.NEGATE,
        BLOCKTYPE.ISON,
        BLOCKTYPE.ISHOLD,
      ]
    },
  ],
};

const TOOLBOX_LEVEL_4_3 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKTYPE.TAKE,
        BLOCKTYPE.DROP,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 5️⃣",
          "web-class": "LabelStyle1"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [BLOCKTYPE.REPEAT, BLOCKTYPE.NUM, BLOCKTYPE.WHILE, BLOCKTYPE.BREAK],
    },
    {
      ...Style.logicCats,
      contents: [BLOCKTYPE.IF, BLOCKTYPE.ISON, BLOCKTYPE.ISHOLD, BLOCKTYPE.NEGATE, BLOCKTYPE.OPERATION, BLOCKTYPE.BOOLEAN,],
    },
  ],
};


const TOOLBOX_LEVEL_4_5 = {
  kind: "categoryToolbox",
  contents: [
    {
      ...Style.actionCats,
      contents: [
        BLOCKTYPE.MOVEMENT,
        BLOCKTYPE.TURN,
        BLOCKTYPE.TAKE,
        BLOCKTYPE.DROP,
        BLOCKLIMITS,
        {
          "kind": "label",
          "text": "Moving 4️⃣",
          "web-class": "LabelStyle1"
        },
        {
          "kind": "label",
          "text": "Turn 4️⃣",
          "web-class": "LabelStyle2"
        },
      ]
    },
    {
      ...Style.loopCats,
      contents: [BLOCKTYPE.REPEAT, BLOCKTYPE.NUM, BLOCKTYPE.WHILE, BLOCKTYPE.BREAK],
    },
    {
      ...Style.logicCats,
      contents: [BLOCKTYPE.IF, BLOCKTYPE.ISON, BLOCKTYPE.ISHOLD, BLOCKTYPE.NEGATE, BLOCKTYPE.OPERATION, BLOCKTYPE.BOOLEAN,],
    },
  ],
};

const BlocklyConfig = {
  WORKSPACE: WORKSPACE,
  TOOLBOX: TOOLBOX,
  CUSTOMBLOCKS: CustomBlocks,
  TOOLBOX_LEVEL_1_1$2$5: TOOLBOX_LEVEL_1_1$2$5,
  TOOLBOX_LEVEL_1_3$4$6: TOOLBOX_LEVEL_1_3$4$6,
  TOOLBOX_LEVEL_1_7$8$9$10: TOOLBOX_LEVEL_1_7$8$9$10,
  TOOLBOX_LEVEL_2_1: TOOLBOX_LEVEL_2_1,
  TOOLBOX_LEVEL_2_2: TOOLBOX_LEVEL_2_2,
  TOOLBOX_LEVEL_2_3: TOOLBOX_LEVEL_2_3,
  TOOLBOX_LEVEL_2_4: TOOLBOX_LEVEL_2_4,
  TOOLBOX_LEVEL_2_5: TOOLBOX_LEVEL_2_5,
  TOOLBOX_LEVEL_2_6: TOOLBOX_LEVEL_2_6,
  TOOLBOX_LEVEL_2_7: TOOLBOX_LEVEL_2_7,
  TOOLBOX_LEVEL_2_8: TOOLBOX_LEVEL_2_8,
  TOOLBOX_LEVEL_2_9: TOOLBOX_LEVEL_2_9,
  TOOLBOX_LEVEL_2_10: TOOLBOX_LEVEL_2_10,
  TOOLBOX_LEVEL_3_1: TOOLBOX_LEVEL_3_1,
  TOOLBOX_LEVEL_3_2: TOOLBOX_LEVEL_3_2,
  TOOLBOX_LEVEL_3_3: TOOLBOX_LEVEL_3_3,
  TOOLBOX_LEVEL_3_4: TOOLBOX_LEVEL_3_4,
  TOOLBOX_LEVEL_3_5: TOOLBOX_LEVEL_3_5,
  TOOLBOX_LEVEL_3_6: TOOLBOX_LEVEL_3_6,
  TOOLBOX_LEVEL_3_7: TOOLBOX_LEVEL_3_7,
  TOOLBOX_LEVEL_3_8: TOOLBOX_LEVEL_3_8,
  TOOLBOX_LEVEL_3_9: TOOLBOX_LEVEL_3_8,
  TOOLBOX_LEVEL_3_10: TOOLBOX_LEVEL_3_10,
  TOOLBOX_LEVEL_4_1: TOOLBOX,
  TOOLBOX_LEVEL_4_2: TOOLBOX,
  TOOLBOX_LEVEL_4_3: TOOLBOX_LEVEL_4_3,
  TOOLBOX_LEVEL_4_4: TOOLBOX,
  TOOLBOX_LEVEL_4_5: TOOLBOX_LEVEL_4_5,
}

export default BlocklyConfig;

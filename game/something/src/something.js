// const reyalp = {
//   r1: 0,
//   r2: 0,
//   r3: 0,
//   r4: 0,
//   r5: 0,
//   p: [],
// };

// const map = [];

const drawMap = () => {
  const template = `
      🟩🟩🟫🟫🟩🟩
      🟩🟩🟫🟫🟩🟩
    🟫🟫🟩🟩🟫🟫🟩🟩
    🟫🟫🟩🟩🟫🟫🟩🟩
  🟩🟩🟫🟫🟩🟩🟫🟫🟩🟩
  🟩🟩🟫🟫🟩🟩🟫🟫🟩🟩
    🟫🟫🟩🟩🟫🟫🟩🟩
    🟫🟫🟩🟩🟫🟫🟩🟩
      🟩🟩🟫🟫🟩🟩
      🟩🟩🟫🟫🟩🟩

        A   B   C
      D   E   F   G
    H   I   J   K   L
      M   N   O   P
        Q   R   S

  `;
  console.log(template);
};

export const something = () => {
  const resources = {
    "r1": { type: "ORE", dieId: 10 },
    "r2": { type: "ORE", dieId: 10 },
    "r3": { type: "ORE", dieId: 10 },

    "r4": { type: "BRICK", dieId: 10 },
    "r5": { type: "BRICK", dieId: 10 },
    "r6": { type: "BRICK", dieId: 10 },

    "r7": { type: "WHEAT", dieId: 10 },
    "r8": { type: "WHEAT", dieId: 10 },
    "r9": { type: "WHEAT", dieId: 10 },

    "r10": { type: "SHEEP", dieId: 10 },
    "r11": { type: "SHEEP", dieId: 10 },
    "r12": { type: "SHEEP", dieId: 10 },

    "r13": { type: "LOG", dieId: 10 },
    "r14": { type: "LOG", dieId: 10 },
    "r15": { type: "LOG", dieId: 10 },
  };

  const playerPos = {
    "p1": {
      city: [
        { posId: 1, resources: ["r1", "r2", "r3"] },
        { posId: 2, resources: ["r2", "r3", "r4"] },
      ],
      road: [
        { posId: "p1" },
        { posId: "p2" },
      ],
    },
  };

  drawMap();
};

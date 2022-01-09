const BOARD_SIZE = 8;
const SHIP_SIZE = 3;

const columns = {
  0: " ",
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
};

/**
 * Create a ship for a player
 * Each player has one ship that is 3 grid units in length.
 * Ship can be placed on the board either vertically ("V") or horizontally ("H").
 * @returns an object stores the information of a ship
 */
const makeShip = () => {
  return {
    size: SHIP_SIZE,
    position: [],
    hits: 0,
  };
};

/**
 * Generate a board for a player
 * Board status: label or grid
 * Board label: _(whitespace), S, X
 * @returns an array stores the information of a board
 */
const boardGenerator = () => {
  let board = [];
  let length = BOARD_SIZE + 1;
  for (let i = 0; i < length; i++) {
    let row = [];
    for (let j = 0; j < length; j++) {
      if (i === 0) {
        row.push({ status: "label", label: columns[j] });
      } else if (i !== 0 && j === 0) {
        row.push({ status: "label", label: i });
      } else {
        row.push({ status: "grid", label: " " });
      }
    }
    board.push(row);
  }
  return board;
};

/**
 * Create a player
 * @returns an object stores the information of a player
 */
const createPlayer = () => {
  return {
    board: boardGenerator(),
    ship: makeShip(),
    shipSet: false,
  };
};

/**
 * @param {*} player
 * @returns the opponent name of the current player
 */
const whoIsOpponent = (player) => {
  return player === "player1" ? "player2" : "player1";
};

/**
 * Validate the location of ship
 * @param {*} row
 * @param {*} col
 * @param {*} isHorizontal
 * @returns true if location is valid (the ship can be placed inside the board)
 */
const validateLocation = (row, col, isHorizontal) => {
  if (isHorizontal) {
    return col + SHIP_SIZE - 1 < BOARD_SIZE + 1;
  } else {
    return row + SHIP_SIZE - 1 < BOARD_SIZE + 1;
  }
};

module.exports = {
  createPlayer,
  whoIsOpponent,
  validateLocation,
};

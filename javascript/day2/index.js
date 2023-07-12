const { readFile } = require("fs/promises");

async function main() {
  const text = await readFile("../input.txt", { encoding: "utf-8" });
  const matches = text.split("\n");

  const points = {
    rock: 1,
    paper: 2,
    scissors: 3,
  };

  const matchPoints = {
    loss: 0,
    draw: 3,
    win: 6,
  };

  const opponentMoves = {
    A: "rock",
    B: "paper",
    C: "scissors",
  };

  const myMoves = {
    X: "rock",
    Y: "paper",
    Z: "scissors",
  };

  const beats = {
    rock: "scissors",
    scissors: "paper",
    paper: "rock",
  };

  let myPoints = 0;

  for (const match of matches) {
    if (match.length === 0) continue;
    const [oppCode, myCode] = match.split(" ");
    const oppMove = opponentMoves[oppCode];
    const myMove = myMoves[myCode];

    myPoints += points[myMove];

    if (oppMove === myMove) myPoints += matchPoints.draw;
    else if (beats[myMove] === oppMove) myPoints += matchPoints.win;
  }

  console.log(myPoints);
}

main();

/**
 * Answer is 12535
 */

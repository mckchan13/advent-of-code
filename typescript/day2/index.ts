import { readFile } from "fs/promises";
import path from "path";

async function main(): Promise<void> {
  const text = await readFile(path.resolve(__dirname, "input.txt"), {
    encoding: "utf-8",
  });
  const matches: (oppMoveCode | myMoveCode | string)[] = text.split("\n");

  type moves = "rock" | "paper" | "scissors";
  type outcome = "win" | "loss" | "draw";
  type oppMoveCode = "A" | "B" | "C";
  type myMoveCode = "X" | "Y" | "Z";

  const points: Record<moves, number> = {
    rock: 1,
    paper: 2,
    scissors: 3,
  };

  const matchPoints: Record<outcome, number> = {
    loss: 0,
    draw: 3,
    win: 6,
  };

  const opponentMoves: Record<oppMoveCode, moves> = {
    A: "rock",
    B: "paper",
    C: "scissors",
  };

  const myMoves: Record<myMoveCode, moves> = {
    X: "rock",
    Y: "paper",
    Z: "scissors",
  };

  const beats: Record<moves, moves> = {
    rock: "scissors",
    scissors: "paper",
    paper: "rock",
  };

  let myPoints = 0;

  for (const match of matches) {
    if (match.length === 0) continue;
    const [oppCode, myCode] = match.split(" ") as [oppMoveCode, myMoveCode];
    const oppMove: moves = opponentMoves[oppCode];
    const myMove: moves = myMoves[myCode];

    myPoints += points[myMove];

    if (oppMove === myMove) myPoints += matchPoints.draw;
    else if (beats[myMove] === oppMove) myPoints += matchPoints.win;
  }

  console.log("Part 1 Answer:", myPoints);

  let myPointsPart2 = 0;

  for (const match of matches) {
    if (match.length === 0) continue;
    const [oppCode, myCode] = match.split(" ") as [oppMoveCode, myMoveCode];
    const oppMove: moves = opponentMoves[oppCode];
    // X means I need to lose => myMove = beats[oppMove]
    // Y means I need a draw => need to play the same move
    // Z means I need to win => myMove = beats[beats[oppMove]]

    if (myCode === "Y") {
      // draw scenario
      myPointsPart2 += points[oppMove] + matchPoints.draw;
    } else if (myCode === "Z") {
      const myMove = beats[beats[oppMove]];
      myPointsPart2 += points[myMove] + matchPoints.win;
    } else {
      myPointsPart2 += points[beats[oppMove]];
    }
  }
  console.log("Part 2 Answer: ", myPointsPart2);
}
main();

/**
 * Answer is 12535
 */

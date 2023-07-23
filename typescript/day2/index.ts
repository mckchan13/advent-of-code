import { readFile } from "fs/promises";

async function main(): Promise<void> {
  const text = await readFile("../input.txt", { encoding: "utf-8" });
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

  console.log(myPoints);
}

main();

/**
 * Answer is 12535
 */

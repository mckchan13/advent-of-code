import { readFile } from "fs/promises";

async function part1(): Promise<void> {
  const text = await readFile(`${__dirname}/input.txt`, { encoding: "utf-8" });
  const listOfCalories = text.split("\n");

  let cumulativeCalories = 0;
  let maxCalories = -Infinity;

  for (let i = 0; i < listOfCalories.length; i++) {
    const currentItemCalories = listOfCalories[i];
    if (currentItemCalories === "") {
      maxCalories = Math.max(maxCalories, cumulativeCalories);
      cumulativeCalories = 0;
    } else {
      cumulativeCalories += parseInt(currentItemCalories);
    }
  }

  console.log(maxCalories);
}

async function part2(): Promise<void> {
  const meals = [] as number[];
  const text = await readFile(`${__dirname}/input.txt`, { encoding: "utf-8" });
  const listOfCalories = text.split("\n");

  let cumulativeCalories = 0;

  for (let i = 0; i < listOfCalories.length; i++) {
    const currentItemCalories = listOfCalories[i];
    if (currentItemCalories === "" && cumulativeCalories > 0) {
      meals.push(cumulativeCalories);
      cumulativeCalories = 0;
    } else {
      cumulativeCalories += parseInt(currentItemCalories);
    }
  }

  meals.sort((a, b) => b - a);
  console.log(meals.slice(0, 3).reduce((acc, val) => (acc += val)));
}

part1();
part2();

/**
 * Part 1 Answer is 71934
 * Part 2 Answer is 211447
 */

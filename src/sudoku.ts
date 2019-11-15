import * as Logic from "logic-solver";
import { iterateSolution, range as _range } from "./helpers";

const range = (size: number) => _range(size, 1);

const size = 9;
const boxSize = Math.sqrt(size);

let cnt = 0;
const solver = new Logic.Solver();
const getCellVariable = (x: number, y: number, z: number) => {
  cnt++;
  return `C${x}-${y}:${z}`;
};
const getCellNumber = (cellVariable: string) => Number.parseInt(cellVariable.split(":")[1], 10);

const boardVariables = range(size).map(y => range(size).map(x => range(size).map(num => getCellVariable(x, y, num))));

for (const a of range(size)) {
  for (const b of range(size)) {
    // num in cell
    const cellVariables = range(size).map(num => getCellVariable(a, b, num));
    solver.require(Logic.exactlyOne(...cellVariables));

    // num in row
    const rowVariables = range(size).map(x => getCellVariable(x, a, b));
    solver.require(Logic.exactlyOne(...rowVariables));

    // // num in col
    const colVariables = range(size).map(y => getCellVariable(a, y, b));
    solver.require(Logic.exactlyOne(...colVariables));
  }
}
// num in block
for (const boxY of range(boxSize)) {
  const boxOffsetY = (boxY - 1) * boxSize;
  for (const boxX of range(boxSize)) {
    const boxOffsetX = (boxX - 1) * boxX;
    const boxCells = range(boxSize).flatMap(y => range(boxSize). flatMap(x => ({ x: boxOffsetX + x, y: boxOffsetY + y })));

    for (const num of range(size)) {
      solver.require(Logic.exactlyOne(...boxCells.map(({ x, y }) => getCellVariable(x, y, num))));
    }
  }
}

// problem
// solver.require(
//   "1-1:9",
//   "3-1:6",
//   "4-1:7",
//   "6-1:5",
//   "7-1:4",
//   "9-1:2",
//   "4-2:6",
//   "5-2:9",
//   "6-2:4",
//   "1-3:4",
//   "3-3:7",
//   "5-3:3",
//   "7-3:5",
//   "9-3:9",
//   "1-4:2",
//   "2-4:5",
//   "4-4:3",
//   "5-4:7",
//   "6-4:1",
//   "8-4:8",
//   "9-4:6",
//   "2-5:7",
//   "3-5:3",
//   "4-5:5",
//   "5-5:6",
//   "6-5:9",
//   "7-5:1",
//   "8-5:2",
//   "1-6:1",
//   "2-6:6",
//   "4-6:4",
//   "5-6:8",
//   "6-6:2",
//   "8-6:5",
//   "9-6:7",
//   "1-7:7",
//   "3-7:1",
//   "5-7:2",
//   "7-7:6",
//   "9-7:5",
//   "4-8:1",
//   "5-8:4",
//   "6-8:6",
//   "1-9:6",
//   "3-9:8",
//   "4-9:9",
//   "6-9:7",
//   "7-9:2",
//   "9-9:1"
// );
// solver.require(
//   "1-1:4",
//   "3-1:3",
//   "2-2:3",
//   "3-3:2",
//   "2-4:2",
//   "4-4:3"
// );
solver.require(
  "C3-3:3",
  "C6-6:3",
);
// solver.require(
//   "1-1:8",
//   "3-2:3",
//   "4-2:6",
//   "2-3:7",
//   "5-3:9",
//   "7-3:2",
//   "2-4:5",
//   "6-4:7",
//   "5-5:4",
//   "6-5:5",
//   "7-5:7",
//   "4-6:1",
//   "8-6:3",
//   "3-7:1",
//   "8-7:6",
//   "9-7:8",
//   "3-8:8",
//   "4-8:5",
//   "8-8:1",
//   "2-9:9",
//   "7-9:4"
// );

for (const solution of iterateSolution(solver)) {
  const boardSolution = boardVariables.map(
    rowVariables => rowVariables.map(
      variablesInCell => variablesInCell.find(cellVariable => solution.evaluate(cellVariable)) as string
    ).map(getCellNumber)
  );
  console.log(boardSolution.map(row => row.join(" ")).join("\n") + "\n\n");
}

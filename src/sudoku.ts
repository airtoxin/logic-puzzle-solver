import * as Logic from "logic-solver";
import { iterateSolution, range as _range } from "./helpers";

export interface Cell {
  x: number;
  y: number;
  num: number;
}

const getCellVariable = (cell: Cell) => `C${cell.x}-${cell.y}:${cell.num}`;
const getCellNumber = (cellVariable: string) => Number.parseInt(cellVariable.split(":")[1], 10);

export function *solve(size: number, filledCells: Cell[]): IterableIterator<number[][]> {
  const boxSize = Math.sqrt(size);
  const solver = new Logic.Solver();

  const boardVariables = range(size).map(y => range(size).map(x => range(size).map(num => getCellVariable({x, y, num}))));

  for (const a of range(size)) {
    for (const b of range(size)) {
      // num in cell
      const cellVariables = range(size).map(num => getCellVariable({ x: a, y: b, num }));
      solver.require(Logic.exactlyOne(...cellVariables));

      // num in row
      const rowVariables = range(size).map(x => getCellVariable({x, y: a, num: b}));
      solver.require(Logic.exactlyOne(...rowVariables));

      // // num in col
      const colVariables = range(size).map(y => getCellVariable({x: a, y, num: b}));
      solver.require(Logic.exactlyOne(...colVariables));
    }
  }
  // num in block
  // for (const boxY of range(boxSize)) {
  //   const boxOffsetY = (boxY - 1) * boxSize;
  //   for (const boxX of range(boxSize)) {
  //     const boxOffsetX = (boxX - 1) * boxX;
  //     const boxCells = range(boxSize).flatMap(y => range(boxSize). flatMap(x => ({ x: boxOffsetX + x, y: boxOffsetY + y })));
  //
  //     for (const num of range(size)) {
  //       solver.require(Logic.exactlyOne(...boxCells.map(({ x, y }) => getCellVariable({x, y, num}))));
  //     }
  //   }
  // }

  for (const filledCell of filledCells) {
    solver.require(getCellVariable(filledCell));
  }

  for (const solution of iterateSolution(solver)) {
    const boardSolution = boardVariables.map(
      rowVariables => rowVariables.map(
        variablesInCell => variablesInCell.find(cellVariable => solution.evaluate(cellVariable)) as string
      ).map(getCellNumber)
    );
    solver.forbid(solution.getFormula());
    yield boardSolution;
  }
}

const range = (size: number) => _range(size, 1);

import * as Logic from "logic-solver";
import * as Combinatorics from "js-combinatorics";
import { consumeSolution } from "./helpers";

const allVariables: string[][] = [
  ["明", "晋", "保", "友"],
  ["白", "赤", "青", "緑"],
  ["１", "２", "３", "４"]
];

interface Matrix {
  columnVariables: string[];
  rowVariables: string[];
  allCells: string[];
  rowCells: {
    [rowVariable: string]: string[]
  };
  columnCells: {
    [columnVariable: string]: string[]
  };
}

const cell = (rowVariable: string, columnVariable: string): string => `Cell(${rowVariable},${columnVariable})`

const createMatrix = (allVariables: string[][]): Matrix[] =>
  Combinatorics.combination(allVariables, 2).map(([rowVariables, columnVariables]) => {
    const allCells = rowVariables.flatMap(rv => columnVariables.map(cv => cell(rv, cv)));
    const rowCells = rowVariables.reduce((o, rv) => ({...o, [rv]: columnVariables.map(cv => cell(rv, cv))}), {});
    const columnCells = columnVariables.reduce((o, cv) => ({...o, [cv]: rowVariables.map(rv => cell(rv, cv))}), {});

    return {
      rowVariables,
      columnVariables,
      allCells,
      rowCells,
      columnCells,
    };
  });

export function solve() {
  const solver = new Logic.Solver();

  createMatrix(allVariables).forEach(matrix => {
    Object.values(matrix.rowCells).forEach(cells => {
      solver.require(Logic.exactlyOne(cells));
    });
    Object.values(matrix.columnCells).forEach(cells => {
      solver.require(Logic.exactlyOne(cells));
    });
  });

  solver.require(cell("明", "青"));
  solver.require(Logic.not(cell("明", "１")));
  solver.require(Logic.not(cell("晋", "緑")));
  solver.require(Logic.not(cell("晋", "４")));
  solver.require(cell("赤", "２"));
  solver.require(Logic.not(cell("保", "白")));
  solver.require(Logic.not(cell("保", "４")));
  solver.require(Logic.not(cell("白", "１")));

  consumeSolution(solver).forEach(solution => {
    console.log(solution.getTrueVars());
  });
}

solve();

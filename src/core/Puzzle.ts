import { Matrix } from "./Matrix";
import * as Combinatorics from "js-combinatorics";
import { createBooleanVariable, createNumberVariable, Variable } from "./Variable";
import { getCell } from "./Cell";

export const createPuzzleMatrix = (variablesRaw: Variable[][]): Matrix[] => {
  return Combinatorics.combination(variablesRaw, 2).map(([rowVariables, columnVariables]) => {
    const rowCells = rowVariables.map(rv => columnVariables.map(cv => getCell(rv, cv)));
    const columnCells = columnVariables.map(cv => rowVariables.map(rv => getCell(rv, cv)));

    return {
      rowVariables,
      columnVariables,
      rowCells,
      columnCells
    };
  });
};

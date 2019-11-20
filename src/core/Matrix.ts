import { Variable } from "./Variable";

export interface Matrix {
  rowVariables: Variable[];
  columnVariables: Variable[];
  rowCells: string[][];
  columnCells: string[][];
}

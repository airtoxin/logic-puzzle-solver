import { Variable } from "./Variable";

export const getCell = (rowVariable: Variable, columnVariable: Variable): string => {
  const rv = rowVariable.type === "boolean" ? rowVariable.name : `N(${rowVariable.num})`;
  const cv = columnVariable.type === "boolean" ? columnVariable.name : `N(${columnVariable.num})`;

  return `C(${rv},${cv})`;
};

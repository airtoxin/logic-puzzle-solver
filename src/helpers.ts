import { Solution, Solver } from "logic-solver";

export function* iterateSolution(solver: Solver ): Iterable<Solution> {
  let sol = null;
  while ((sol = solver.solve())) {
    solver.forbid(sol.getFormula());
    yield sol;
  }
}

export const consumeSolution = (solver: Solver): Solution[] => {
  const solutions: Solution[] = [];
  for (const sol of iterateSolution(solver)) {
    solutions.push(sol);
  }

  return solutions;
};

export const range = (size: number, offset: number = 0): number[] =>
  [...Array(size)].map((_, i) => i + offset);

import {Solution, Solver} from "logic-solver";

export const consumeSolve = (solver: Solver): Solution[] => {
    const solutions: Solution[] = [];
    let sol = null;
    while ((sol = solver.solve())) {
        solutions.push(sol);
        solver.forbid(sol.getFormula());
    }

    return solutions
};

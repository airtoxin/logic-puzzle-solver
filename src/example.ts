import * as Logic from "logic-solver";
import { consumeSolution } from "./helpers";

const solver = new Logic.Solver();

solver.require(Logic.exactlyOne("-Alice", "Charlie", "Bob"));
solver.require(Logic.exactlyOne("Alice", "Bob", "Dave"));
solver.require(Logic.or("Bob", "Charlie"));

consumeSolution(solver).forEach(solution => {
  console.log(solution.getTrueVars());
});

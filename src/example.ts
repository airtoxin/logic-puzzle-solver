import * as Logic from "logic-solver";
import { consumeSolve } from "./helpers";

const solver = new Logic.Solver();

solver.require(Logic.atMostOne("Alice", "Bob"));
solver.require(Logic.or("Bob", "Charlie"));

consumeSolve(solver).forEach(solution => {
  console.log(solution.getTrueVars());
});

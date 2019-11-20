import * as Logic from "logic-solver";
import { consumeSolution } from "./helpers";
import * as Combinatorics from "js-combinatorics";

const solver = new Logic.Solver();

const A = Logic.variableBits("A", 4);
const B = Logic.variableBits("B", 4);
const C = Logic.variableBits("C", 4);
const D = Logic.variableBits("D", 4);
const E = Logic.variableBits("E", 4);
const F = Logic.variableBits("F", 4);
const G = Logic.variableBits("G", 4);
const H = Logic.variableBits("H", 4);
const I = Logic.variableBits("I", 4);

const locations = [A, B, C, D, E, F, G, H, I];
const fifteen = Logic.constantBits(15);

// every location contains number that be in range 1 to 9
locations.forEach(l => {
  solver.require(Logic.greaterThanOrEqual(l, Logic.constantBits(1)));
  solver.require(Logic.lessThanOrEqual(l, Logic.constantBits(9)));
});

// every location contains different number
Combinatorics.combination(locations, 2).forEach(([l1, l2]) => {
  solver.require(Logic.not(Logic.equalBits(l1, l2)));
});

// every sum in line are equal to 15
[
  [A, B, C],
  [D, E, F],
  [G, H, I],
  [A, D, G],
  [B, E, H],
  [C, F, I],
  [A, E, I],
  [G, E, C]
].forEach(locs => {
  solver.require(Logic.equalBits(Logic.sum(locs), fifteen));
});

consumeSolution(solver).forEach(solution => {
  console.log(locations.map(l => solution.evaluate(l)));
});

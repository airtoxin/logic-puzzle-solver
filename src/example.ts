import * as Logic from "logic-solver";
import { consumeSolution } from "./helpers";
import { Bits } from "logic-solver";
import * as Combinatorics from "js-combinatorics";

const solver = new Logic.Solver();

const Alice = Logic.variableBits("Alice", 2);
const Bob = Logic.variableBits("Bob", 2);
const Charlie = Logic.variableBits("Charlie", 2);
const Dave = Logic.variableBits("Dave", 2);

const characters = [Alice, Bob, Charlie, Dave];

solver.require(Logic.exactlyOne(...Combinatorics.combination(characters, 3).map(cs =>
  Logic.and(...cs.map(c => Logic.equalBits(c, Logic.constantBits(0)))))));
//
// const NotAlice = Logic.variableBits("NotAlice", 1);
// solver.require(Logic.not(Logic.equalBits(Alice, NotAlice)));
// const NotBob = Logic.variableBits("NotBob", 1);
// solver.require(Logic.not(Logic.equalBits(Bob, NotBob)));
// const NotCharlie = Logic.variableBits("NotCharlie", 1);
// solver.require(Logic.not(Logic.equalBits(Charlie, NotCharlie)));
// const NotDave = Logic.variableBits("NotDave", 1);
// solver.require(Logic.not(Logic.equalBits(Dave, NotDave)));
//
// solver.require(
//   Logic.equalBits(Logic.sum(NotAlice, Charlie, Bob), Logic.constantBits(1))
// );
// solver.require(
//   Logic.equalBits(Logic.sum(Alice, Bob, Dave), Logic.constantBits(1))
// );
// solver.require(
//   Logic.greaterThanOrEqual(Logic.sum(Bob, Charlie), Logic.constantBits(1))
// );
//
const getNameOfBits = (bits: Bits): string => {
  if (bits.bits.length === 0) return "";
  return bits.bits[0].split("$")[0];
};

consumeSolution(solver).forEach(solution => {
  console.log(
    characters.map(c => `${getNameOfBits(c)}=${solution.evaluate(c)}`)
  );
});

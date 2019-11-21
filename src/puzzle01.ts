import * as Logic from "logic-solver";
import * as Combinatorics from "js-combinatorics";
import { zip } from "lodash";
import { iterateSolution, range } from "./helpers";
import { Bits } from "logic-solver";

const BIT_SIZE = 2;

const attributes: (string | number)[][] = [
  ["明", "晋", "保", "友"],
  ["白", "赤", "青", "緑"],
];
const allVariables: { attr1: string | number, attr2: string | number, bits: Bits }[] = [];

const findVariable = (attr1: string | number, attr2: string | number): Bits | undefined => {
  const found = allVariables.find(av => av.attr1 === attr1 && av.attr2 === attr2 || av.attr1 === attr2 && av.attr2 == attr1);
  return found?.bits;
};

const solver = new Logic.Solver();

const transpose = <T>(matrix: T[][]): T[][] => zip(...matrix) as any;

Combinatorics.combination(attributes, 2).forEach(([rowAttributes, columnAttributes]) => {
  const variables = rowAttributes.map(ra => columnAttributes.map(ca => {
    const bits = Logic.variableBits(`C(${ra},${ca})`, BIT_SIZE);
    allVariables.push({ attr1: ra, attr2: ca, bits });
    return bits;
  }));

  // row constraints
  variables.forEach(rowVariables => {
    const orClauses = Combinatorics.combination(rowVariables, rowVariables.length - 1).map(variables => {
      return Logic.and(...variables.map(v => Logic.equalBits(v, Logic.constantBits(0))));
    });

    console.log("@orClauses", orClauses);

    solver.require(Logic.exactlyOne(orClauses));
  });

  // // column constraints
  // transpose(variables).forEach(columnVariables => {
  //   solver.require(Logic.greaterThan(Logic.sum(columnVariables), Logic.constantBits(0)));
  //   Combinatorics.combination(columnVariables, columnVariables.length - 1).forEach(variables => {
  //     solver.require(Logic.and(...variables.map(v => Logic.equalBits(v, Logic.constantBits(0)))));
  //   });
  // });

  // // numerical row attribute constraints
  // if (typeof rowAttributes[0] === "number") {
  //   transpose(variables).forEach(columnVariables => {
  //     for (const i of range(columnVariables.length - 1)) {
  //       solver.require(Logic.greaterThan(columnVariables[i + 1], columnVariables[i]));
  //     }
  //   });
  // }
  // // numerical column attribute constraints
  // if (typeof columnAttributes[0] === "number") {
  //   variables.forEach(rowVariables => {
  //     for (const i of range(rowVariables.length - 1)) {
  //       solver.require(Logic.greaterThan(rowVariables[i + 1], rowVariables[i]));
  //     }
  //   });
  // }
});

//
// createMatrix(allVariables).forEach(matrix => {
//   Object.values(matrix.rowCells).forEach(cells => {
//     solver.require(Logic.exactlyOne(cells));
//   });
//   Object.values(matrix.columnCells).forEach(cells => {
//     solver.require(Logic.exactlyOne(cells));
//   });
// });
//
// solver.require(cell("明", "青"));
// solver.require(Logic.not(cell("明", "１")));
// solver.require(Logic.not(cell("晋", "緑")));
// solver.require(Logic.not(cell("晋", "４")));
// solver.require(cell("赤", "２"));
// solver.require(Logic.not(cell("保", "白")));
// solver.require(Logic.not(cell("保", "４")));
// solver.require(Logic.not(cell("白", "１")));
//

const getVariableName = (bits: Bits): string => bits.bits.length === 0 ? "" : bits.bits[0].split("$")[0];

for (const solution of iterateSolution(solver)) {
  allVariables.map(v => `${getVariableName(v.bits)}=${solution.evaluate(v.bits)}`);
}

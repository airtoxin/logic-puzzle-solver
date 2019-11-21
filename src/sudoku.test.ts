import "jest";
import { solve } from "./sudoku";

describe("sudoku", () => {
  it("1x1 minimal", () => {
    const solutions = solve(1, []);

    let sol = solutions.next();
    expect(sol.value).toEqual([[1]]);

    sol = solutions.next();
    expect(sol.done).toBe(true);
  });

  it("4x4", () => {
    const puzzle = [
      { x: 1, y: 1, num: 4 },
      { x: 3, y: 1, num: 3 },
      { x: 2, y: 2, num: 3 },
      { x: 3, y: 3, num: 2 },
      { x: 2, y: 4, num: 2 },
      { x: 4, y: 4, num: 3 }
    ];
    const solutions = solve(4, puzzle);
    expect(solutions.next().done).toEqual(false);
  });

  it("9x9", () => {
    const puzzle = [
      { x: 1, y: 1, num: 9 },
      { x: 3, y: 1, num: 6 },
      { x: 4, y: 1, num: 7 },
      { x: 6, y: 1, num: 5 },
      { x: 7, y: 1, num: 4 },
      { x: 9, y: 1, num: 2 },
      { x: 4, y: 2, num: 6 },
      { x: 5, y: 2, num: 9 },
      { x: 6, y: 2, num: 4 },
      { x: 1, y: 3, num: 4 },
      { x: 3, y: 3, num: 7 },
      { x: 5, y: 3, num: 3 },
      { x: 7, y: 3, num: 5 },
      { x: 9, y: 3, num: 9 },
      { x: 1, y: 4, num: 2 },
      { x: 2, y: 4, num: 5 },
      { x: 4, y: 4, num: 3 },
      { x: 5, y: 4, num: 7 },
      { x: 6, y: 4, num: 1 },
      { x: 8, y: 4, num: 8 },
      { x: 9, y: 4, num: 6 },
      { x: 2, y: 5, num: 7 },
      { x: 3, y: 5, num: 3 },
      { x: 4, y: 5, num: 5 },
      { x: 5, y: 5, num: 6 },
      { x: 6, y: 5, num: 9 },
      { x: 7, y: 5, num: 1 },
      { x: 8, y: 5, num: 2 },
      { x: 1, y: 6, num: 1 },
      { x: 2, y: 6, num: 6 },
      { x: 4, y: 6, num: 4 },
      { x: 5, y: 6, num: 8 },
      { x: 6, y: 6, num: 2 },
      { x: 8, y: 6, num: 5 },
      { x: 9, y: 6, num: 7 },
      { x: 1, y: 7, num: 7 },
      { x: 3, y: 7, num: 1 },
      { x: 5, y: 7, num: 2 },
      { x: 7, y: 7, num: 6 },
      { x: 9, y: 7, num: 5 },
      { x: 4, y: 8, num: 1 },
      { x: 5, y: 8, num: 4 },
      { x: 6, y: 8, num: 6 },
      { x: 1, y: 9, num: 6 },
      { x: 3, y: 9, num: 8 },
      { x: 4, y: 9, num: 9 },
      { x: 6, y: 9, num: 7 },
      { x: 7, y: 9, num: 2 },
      { x: 9, y: 9, num: 1 }
    ];
    const solutions = solve(9, puzzle);
    expect(solutions.next().done).toEqual(false);
    expect(solutions.next().done).toEqual(true);
  });
});

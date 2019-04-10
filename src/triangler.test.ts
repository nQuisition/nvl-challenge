import { Color, TriangleComputationResult } from "./types";
import { triangleWithComputation } from "./triangler";

import rewire = require("rewire");

describe("color adder", (): void => {
  const trianglerModule = rewire("../dist-test/triangler.js");
  const getResultingColor = trianglerModule.__get__("getResultingColor"); // eslint-disable-line no-underscore-dangle
  const allColors: Color[] = trianglerModule.__get__("allColors"); // eslint-disable-line no-underscore-dangle

  it("returns the same color if colors are identical", (): void => {
    allColors.forEach(
      (color): void => {
        expect(getResultingColor(color, color)).toBe(color);
      }
    );
  });

  it("return remaining color if colors are not identical", (): void => {
    expect(getResultingColor("R", "G")).toBe("B");
    expect(getResultingColor("G", "B")).toBe("R");
    expect(getResultingColor("B", "R")).toBe("G");
  });
});

describe("triangler computation", (): void => {
  const testCases: { [testCase: string]: Color } = {
    GB: "R",
    RRR: "R",
    RGBG: "B",
    RBRGBRB: "G",
    RBRGBRBGGRRRBGBBBGG: "G",
    B: "B"
  };
  const computationTestCase = "RRGBRGBB";
  const computationTestCaseAnswer = "G";

  it("returns null result if the string is empty", (): void => {
    expect(triangleWithComputation("").result).toBeNull();
  });

  it("returns correct results for test cases", (): void => {
    Object.keys(testCases).forEach(
      (testString): void => {
        const { result } = triangleWithComputation(testString);
        expect(typeof result).toBe("string");
        expect(result).toBe(testCases[testString]);
      }
    );
  });

  it("returns full computation", (): void => {
    const { computation } = triangleWithComputation(computationTestCase);
    expect(Array.isArray(computation)).toBe(true);
    expect(computation.length).toBe(computationTestCase.length);
    computation.forEach(
      (row, i): void => {
        expect(row.length).toBe(computationTestCase.length - i);
      }
    );
    expect(computation[computation.length - 1][0]).toBe(
      computationTestCaseAnswer
    );
  });
});

describe("triangler", (): void => {
  const trianglerModule = rewire("../dist-test/triangler.js");
  const { triangle } = trianglerModule;

  it("uses the triangle computation function", (): void => {
    const mockTriangleComputer = jest.fn(
      (): TriangleComputationResult => ({ result: "G", computation: [["G"]] })
    );
    /* eslint-disable no-underscore-dangle */
    trianglerModule.__set__(
      "exports.triangleWithComputation",
      mockTriangleComputer
    );
    /* eslint-enable no-underscore-dangle */
    const result: Color = triangle("G");
    expect(mockTriangleComputer.mock.calls.length).toBe(1);
    expect(mockTriangleComputer.mock.calls[0]).toEqual(["G"]);
    expect(result).toBe("G");
  });
});

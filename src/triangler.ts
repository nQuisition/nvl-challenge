import {
  Color,
  ColorsByMask,
  MasksByColor,
  TriangleComputationResult
} from "./types";

const allColors = ["R", "G", "B"] as Color[];

const consoleColors = {
  R: "\x1b[31m",
  G: "\x1b[32m",
  B: "\x1b[34m"
};

// To determine the resulting color, instead of using lots of ifs use some basic bitwise operations
/* const masksByColor = {
  R: 0b001,
  G: 0b010,
  B: 0b100
}; */

/* eslint-disable @typescript-eslint/explicit-function-return-type */
// ...or generate dynamically
const masksByColor = allColors.reduce((res: MasksByColor, color: Color, i) => {
  res[color] = 2 ** i;
  return res;
}, {}) as MasksByColor; // have to cast since the initial object does not have all Colors

// Inverse of masksByColor
const colorsByMask: ColorsByMask = Object.keys(masksByColor).reduce(
  (res: ColorsByMask, color: Color) => {
    res[masksByColor[color]] = color;
    return res;
  },
  {}
);
/* eslint-enable @typescript-eslint/explicit-function-return-type */

// Can also do in one reduce (but typescript doesn't like it)
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* const { masksByColor, colorsByMask } = allColors.reduce(
  (res, color, i) => {
    const mask = 2 ** i;
    res.masksByColor[color] = mask;
    res.colorsByMask[mask] = color;
    return res;
  },
  { masksByColor: {} as MasksByColor, colorsByMask: {} as ColorsByMask }
); */
/* eslint-enable @typescript-eslint/explicit-function-return-type */

const getResultingColor = (color1: Color, color2: Color): Color => {
  if (color1 === color2) {
    return color1;
  }
  // Gets the bit that is not set in either of color masks
  const resultingMask = (masksByColor[color1] | masksByColor[color2]) ^ 0b111; // eslint-disable-line no-bitwise
  return colorsByMask[resultingMask];
};

// This looks like a classical recursion problem, but it is easy to unroll it into a loop here
export const triangleWithComputation = (
  startingRowString: string
): TriangleComputationResult => {
  if (startingRowString.length <= 0) {
    return { result: null, computation: null };
  }
  let row = [...startingRowString] as Color[];
  const computation = [[...row]];
  while (row.length > 1) {
    const nextRow: Color[] = [];
    for (let i = 0; i < row.length - 1; i += 1) {
      nextRow.push(getResultingColor(row[i], row[i + 1]));
    }
    computation.push(nextRow);
    row = nextRow;
  }
  return {
    result: row[0],
    computation
  };
};

export const triangle = (startingRowString: string): Color =>
  triangleWithComputation(startingRowString).result;

// Just for fun
export const prettyPrintTriangleComputation = (
  computation: Color[][],
  spacer = " ",
  colorize = true
): void => {
  computation.forEach(
    (row, i): void => {
      const indent = " ".repeat((i * (spacer.length + 1)) / 2);
      const processedRow = row
        .map(
          (color): string => `${colorize ? consoleColors[color] : ""}${color}`
        )
        .join(spacer);
      console.log(`${indent}${processedRow}`); // eslint-disable-line no-console
    }
  );
};

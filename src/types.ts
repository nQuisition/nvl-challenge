export interface Person {
  name: string;
  age: number;
}

export type Color = "R" | "G" | "B";

export interface ColorsByMask {
  [mask: number]: Color;
}

export type MasksByColor = { [color in Color]: number };

export interface TriangleComputationResult {
  result: Color;
  computation: Color[][];
}

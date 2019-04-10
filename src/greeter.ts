import { Person } from "./types";

// Specification states that there must be a comma before the "and".
// I've actually thought that that is grammatically incorrect, hence the option to omit it.
// However, upon researching this, it seems both approaches are correct,
// so might as well disregard this
const enumeratePeople = (names: string[], trailingComma = true): string => {
  const totalLength = names.length;
  if (totalLength <= 1) {
    return names.join("");
  }
  const commaList = names.slice(0, totalLength - 1).join(", ");
  return `${commaList}${trailingComma ? "," : ""} and ${
    names[totalLength - 1]
  }`;
};

/* eslint-disable import/prefer-default-export */
export const greet = (people: Person[], minAge: number): string => {
  const namesToGreet = people
    .filter((person): boolean => person.age >= minAge)
    .sort((p1, p2): number => p1.age - p2.age)
    .map((person): string => person.name);
  const total = namesToGreet.length;
  if (total <= 0) {
    // Not specified in the challenge, so use something that I deem fitting!
    return "Hello to noone!";
  }

  return `Hello ${enumeratePeople(namesToGreet)}!`;
};
/* eslint-enable import/prefer-default-export */

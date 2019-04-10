import { Person } from "./types";
import { greet } from "./greeter";

import rewire = require("rewire");

describe("people enumerator", (): void => {
  const greetModule = rewire("../dist-test/greeter.js");
  const enumeratePeople = greetModule.__get__("enumeratePeople"); // eslint-disable-line no-underscore-dangle

  const singleName = "Alex";
  const singleNameArray = [singleName];
  const multiNameArray = ["Alex", "Bob", "Harvey"];
  const multiNameWithComma = "Alex, Bob, and Harvey";
  const multiNameWithoutComma = "Alex, Bob and Harvey";

  it("returns empty string when the supplied array is empty", (): void => {
    expect(enumeratePeople([])).toBe("");
  });

  it("returns back the string when it is the only one in array", (): void => {
    expect(enumeratePeople(singleNameArray)).toBe(singleName);
  });

  it("returns comma separated list of names with last 2 being separated by and", (): void => {
    expect(enumeratePeople(multiNameArray)).toBe(multiNameWithComma);
  });

  it('doesn\'t add a comma before "and" if second param is false', (): void => {
    expect(enumeratePeople(multiNameArray, false)).toBe(multiNameWithoutComma);
  });
});

describe("greeting module", (): void => {
  const nooneGreeted = "Hello to noone!";
  const people: Person[] = [
    {
      name: "Alex",
      age: 27
    },
    {
      name: "Bob",
      age: 35
    },
    {
      name: "Carl",
      age: 17
    },
    {
      name: "Dave",
      age: 20
    },
    {
      name: "Emily",
      age: 22
    },
    {
      name: "Fred",
      age: 19
    }
  ];
  const minAge = 20;
  const expectedGreeting = "Hello Dave, Emily, Alex, and Bob!";

  it("greets noone when there are no people", (): void => {
    expect(greet([], 0)).toBe(nooneGreeted);
  });

  it("greets all people at or above minAge, ordered by age asc", (): void => {
    expect(greet(people, minAge)).toBe(expectedGreeting);
  });

  it("greets noone when noone is at or above minAge", (): void => {
    const youngPeople = people.filter((person): boolean => person.age < minAge);
    expect(youngPeople.length).toBeGreaterThan(0);
    expect(greet(youngPeople, minAge)).toBe(nooneGreeted);
  });
});

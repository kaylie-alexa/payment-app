import { makeMaxChar, makeMax, makeDigitsOnly, makeBreaks } from "./autofixers";

describe("makeMaxChar", () => {
  it("return original value if value is less than or equal to max char", () => {
    const value = "puppies";

    const autofixer = makeMaxChar(10);

    expect(autofixer(value)).toEqual(value);
  });

  it("trims the value if value is more than max char", () => {
    const value = "puppies";

    const autofixer = makeMaxChar(3);

    expect(autofixer(value)).toEqual("pup");
  });

  it("ignores white space", () => {
    const value = "1234 7890";

    const autofixer = makeMaxChar(8);

    expect(autofixer(value)).toEqual(value);
  });
});

describe("makeMax", () => {
  it("return original value if value is less than or equal to max", () => {
    const value = "18";

    const autofixer = makeMax(20);

    expect(autofixer(value)).toEqual(value);
  });

  it("returns the max value if value is more than max", () => {
    const value = "30";

    const autofixer = makeMax(3);

    expect(autofixer(value)).toEqual(3);
  });
});

describe("makeDigitsOnly", () => {
  it("return original value if value only contains digits", () => {
    const value = "182323";

    expect(makeDigitsOnly(value)).toEqual(value);
  });

  it("removes any non digit characters from the value", () => {
    const value = "30a34b34";

    expect(makeDigitsOnly(value)).toEqual("303434");
  });
});

describe("makeBreaks", () => {
  it("return original value if it is shorter than the first break index", () => {
    const value = "123";

    const autofixer = makeBreaks([4, 8, 12]);

    expect(autofixer(value)).toEqual(value);
  });

  it("adds space after first break index", () => {
    const value = "12345678901234";

    const autofixer = makeBreaks([4]);

    expect(autofixer(value)).toEqual("1234 5678901234");
  });

  it("adds space at each break index", () => {
    const value = "12345678901234";

    const autofixer = makeBreaks([4, 9, 14]);

    expect(autofixer(value)).toEqual("1234 5678 9012 34");
  });
});

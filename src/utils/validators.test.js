import { isLength, isValidExpiration } from "./validators";

describe("isLength", () => {
  it("return true if value has not been entered", () => {
    const value = "";

    const validator = isLength(4);

    expect(validator(value)).toEqual(true);
  });

  it("return false if value does not equal length", () => {
    const value = "puppies";
    const valueWithWhitespace = "pi e";

    const validator = isLength(4);

    expect(validator(value)).toEqual(false);
    expect(validator(valueWithWhitespace)).toEqual(false);
  });

  it("return true if value equals length", () => {
    const value = "pie";
    const valueWithWhitespace = "pi e";

    const validator = isLength(3);

    expect(validator(value)).toEqual(true);
    expect(validator(valueWithWhitespace)).toEqual(true);
  });
});

describe("isValidExpiration", () => {
  const oldDate = Date;

  beforeEach(() => {
    global.Date = class {
      constructor() {
        return "fake date";
      }

      getFullYear() {
        return 2018;
      }

      getMonth() {
        return 4;
      }
    };
  });

  afterEach(() => {
    global.Date = oldDate;
  });

  it("return true if one or more values have not been entered", () => {
    expect(isValidExpiration({ month: "", year: 1234 })).toEqual(true);
    expect(
      isValidExpiration({
        month: 12,
        year: ""
      })
    ).toEqual(true);
    expect(isValidExpiration({ month: "", year: "" })).toEqual(true);
  });

  it("return false if year is before today's", () => {
    expect(isValidExpiration({ month: "12", year: 2017 })).toEqual(false);
  });

  it("return false if month is before today's and the year is today's", () => {
    expect(isValidExpiration({ month: "1", year: 2018 })).toEqual(false);
  });

  it("return true if month and year are after today", () => {
    expect(isValidExpiration({ month: "1", year: 2019 })).toEqual(true);
    expect(
      isValidExpiration({
        month: "12",
        year: 2018
      })
    ).toEqual(true);
  });
});

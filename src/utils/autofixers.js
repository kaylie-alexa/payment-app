const getWhiteSpaceCount = value => (value.match(/ /g) || []).length;

export const makeMaxChar = max => value =>
  value.replace(/ /g, "").length > max
    ? value.slice(0, max + getWhiteSpaceCount(value))
    : value;

export const makeDigitsOnly = value => value.replace(/\D/g, "");

export const makeMax = max => value => (Number(value) > max ? max : value);

export const makeBreaks = delimiters => value => {
  let newValue = value;

  for (let delimiter of delimiters) {
    newValue = newValue.replace(new RegExp(`(.{${delimiter}})`), "$1 ");
  }
  return newValue;
};

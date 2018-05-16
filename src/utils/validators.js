export const isLength = length => value =>
  !value || value.replace(/ /g, "").length === length;

export const isValidExpiration = ({ month, year }) =>
  !year ||
  !month ||
  Number(year) > new Date().getFullYear() ||
  (Number(year) === new Date().getFullYear() &&
    Number(month) > new Date().getMonth());

export const isProvided = value => !!value;

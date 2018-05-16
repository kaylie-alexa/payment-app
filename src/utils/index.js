import { makeMax, makeMaxChar, makeDigitsOnly, makeBreaks } from "./autofixers";
import { isLength } from "./validators";
import { VISA_CARD_TYPE } from "../constants";

const CARD_TYPES = {
  visa: {
    cardLength: 16,
    cvv2Length: 3,
    breaks: [4, 9, 14]
  },
  amex: {
    cardLength: 15,
    cvv2Length: 4,
    breaks: [4, 11]
  }
};

const DEFAULT_CARD = VISA_CARD_TYPE;

export const getAutofixers = ({ type }) => {
  const { cardLength, breaks, cvv2Length } = CARD_TYPES[type || DEFAULT_CARD];

  return {
    name: [makeMaxChar(30)],
    "card-number": [
      makeMaxChar(cardLength),
      makeDigitsOnly,
      makeBreaks(breaks)
    ],
    cvv2: [makeMaxChar(cvv2Length), makeDigitsOnly],
    "expiration-month": [makeDigitsOnly, makeMax(12)],
    "expiration-year": [makeDigitsOnly, makeMaxChar(4)]
  };
};

export const getValidations = ({ type }) => {
  const { cardLength, cvv2Length } = CARD_TYPES[type || DEFAULT_CARD];

  return {
    "card-number": [
      {
        fn: isLength(cardLength),
        error: "Please enter a valid card number"
      }
    ],
    cvv2: [
      {
        fn: isLength(cvv2Length),
        error: "Please enter a valid CVV2 code"
      }
    ]
  };
};

const visaElectron = ['4026', '417500', '4508', '4844', '4913', '4917'];
const masterCard = ['51', '52', '53', '54', '55'];
const amexCard = ['34', '37'];
const rules = {
  visa(number) {
    if (number.length < 4) {
      return false;
    }

    if (number[0] !== '4') {
      return false;
    }

    for (let i = 0; i < visaElectron.length; i += 1) {
      if (number.startsWith(visaElectron[i])) {
        return false;
      }
    }

    return true;
  },
  mastercard(number) {
    for (let i = 0; i < masterCard.length; i += 1) {
      if (number.startsWith(masterCard[i])) {
        return true;
      }
    }
    const intNumber = Number(number.substring(0, 6));
    if (intNumber >= 222100 && intNumber <= 272099) {
      return true;
    }

    return false;
  },
  amex(number) {
    for (let i = 0; i < amexCard.length; i += 1) {
      if (number.startsWith(amexCard[i])) {
        return true;
      }
    }

    return false;
  },
  jcb(number) {
    const intNumber = Number(number.substring(0, 4));
    if (intNumber >= 3528 && intNumber <= 3589) {
      return true;
    }

    return false;
  },
  mir(number) {
    if (number.length < 6) {
      return false;
    }

    if (!number.startsWith('2')) {
      return false;
    }

    const intNumber = Number(number.substring(0, 6));
    if (intNumber >= 222100 && intNumber <= 272099) {
      return false;
    }

    return true;
  },
};

const psNumberLengths = {
  visa: {
    min: 13,
    max: 19,
  },
  mastercard: {
    min: 16,
    max: 16,
  },
  amex: {
    min: 15,
    max: 15,
  },
  jcb: {
    min: 16,
    max: 19,
  },
  mir: {
    min: 16,
    max: 16,
  },
};

export function resolveNumber(number) {
  const paymentSystems = Object.getOwnPropertyNames(rules);
  for (let i = 0; i < paymentSystems.length; i += 1) {
    if (rules[paymentSystems[i]](number)) {
      return paymentSystems[i];
    }
  }

  return false;
}

export function checkControlSumValidity(number) {
  const lastDigit = Number(number[number.length - 1]);
  const controlSum = number.substring(0, number.length - 1)
    .split('')
    .map((item) => Number(item))
    .reverse()
    .map((digit, index) => {
      if ((index + 1) % 2 === 1) {
        return digit * 2;
      }
      return digit;
    })
    .map((digit) => {
      if (digit > 9) {
        return digit - 9;
      }
      return digit;
    })
    .reduce((sum, digit) => sum + digit, 0);

  const mod = controlSum % 10;

  return mod === 0
    ? mod === lastDigit
    : 10 - mod === lastDigit;
}

export function checkValidity(number) {
  const ps = resolveNumber(number);
  if (!ps) {
    return false;
  }

  const psLength = psNumberLengths[ps];
  if (number.length < psLength.min || number.length > psLength.max) {
    return false;
  }

  return checkControlSumValidity(number);
}

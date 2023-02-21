import { BN } from "@project-serum/anchor";

type FormatLocale = "de-DE" | "en-US";

type FormatType = {
  code: FormatLocale;
  options?: Intl.NumberFormatOptions;
};

const FORMATS: { [key: string]: FormatType } = {
  EUR: {
    code: "de-DE",
    options: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  DOLLAR: {
    code: "en-US",
    options: {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
  TOKEN: {
    code: "en-US",
  },
  PERCENT: {
    code: "en-US",
    options: {
      useGrouping: false,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
};

const INTERNAL_SCALE = 21n;

const SCALE_FOR_MULTI_DIVI = new BN(`${10n ** INTERNAL_SCALE}`);

const toBN = (BIP: BIP): BN => {
  return new BN(`${BIP.unscale(INTERNAL_SCALE)}`);
};

const toBigInt = (bn: BN): bigint => {
  return BigInt(bn.toString());
};

const toBIP = (bn: BN): BIP => {
  return new BIP(toBigInt(bn), INTERNAL_SCALE);
};

export default class BIP {
  #scaled: BN;
  static FORMAT_EUR: FormatType = FORMATS.EUR;
  static FORMAT_DOLLAR: FormatType = FORMATS.DOLLAR;
  static FORMAT_TOKEN: FormatType = FORMATS.TOKEN;
  static FORMAT_PERCENT: FormatType = FORMATS.PERCENT;

  constructor(value: bigint, exponent: bigint = 0n) {
    this.#scaled = new BN(`${value * 10n ** (INTERNAL_SCALE - exponent)}`);
  }

  static from(value: bigint, exponent: bigint = 0n): BIP {
    return new BIP(value, exponent);
  }

  unscale(precision: bigint): bigint {
    const diff = INTERNAL_SCALE - precision;
    return toBigInt(this.#scaled) / 10n ** diff;
  }

  toNumber(): number {
    const unscaled = toBIP(this.#scaled).unscale(INTERNAL_SCALE);
    return Number(unscaled) / 10 ** Number(INTERNAL_SCALE);
  }

  toString(): string {
    const unscaledNumber = toBIP(this.#scaled).toNumber();
    return `${unscaledNumber}`;
  }

  toFormat(locale: FormatType, fractionalLength: number = 8): string {
    const unscaledNumber = toBIP(this.#scaled).toNumber();
    const options =
      locale !== BIP.FORMAT_TOKEN &&
      Number.isInteger(Number(unscaledNumber.toFixed(2)))
        ? {
            ...locale.options,
            minimumFractionDigits: 0,
          }
        : {
            maximumFractionDigits: fractionalLength,
            ...locale.options,
          };
    return unscaledNumber.toLocaleString(locale.code, options);
  }

  add(other: BIP): BIP {
    const added = this.#scaled.add(toBN(other));
    return toBIP(added);
  }

  sub(other: BIP): BIP {
    const sub = this.#scaled.sub(toBN(other));
    return toBIP(sub);
  }

  mul(other: BIP): BIP {
    const multi = this.#scaled.mul(toBN(other));
    const demulti = multi.div(SCALE_FOR_MULTI_DIVI);
    return toBIP(demulti);
  }

  div(other: BIP): BIP {
    const mult = this.#scaled.mul(SCALE_FOR_MULTI_DIVI);
    const divi = mult.div(toBN(other));
    return toBIP(divi);
  }
}

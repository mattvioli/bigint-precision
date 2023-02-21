"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Decimal_scaled;
Object.defineProperty(exports, "__esModule", { value: true });
const anchor_1 = require("@project-serum/anchor");
const FORMATS = {
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
const INTERNAL_SCALE = 24n;
const SCALE_FOR_MULTI_DIVI = new anchor_1.BN(`${10n ** INTERNAL_SCALE}`);
const toBN = (decimal) => {
    return new anchor_1.BN(`${decimal.unscale(INTERNAL_SCALE)}`);
};
const toBigInt = (bn) => {
    return BigInt(bn.toString());
};
const toDecimal = (bn) => {
    return new Decimal(toBigInt(bn), INTERNAL_SCALE);
};
class Decimal {
    constructor(value, exponent = 0n) {
        _Decimal_scaled.set(this, void 0);
        __classPrivateFieldSet(this, _Decimal_scaled, new anchor_1.BN(`${value * 10n ** (INTERNAL_SCALE - exponent)}`), "f");
    }
    static from(value, exponent = 0n) {
        return new Decimal(value, exponent);
    }
    unscale(precision) {
        const diff = INTERNAL_SCALE - precision;
        return toBigInt(__classPrivateFieldGet(this, _Decimal_scaled, "f")) / 10n ** diff;
    }
    toNumber() {
        const unscaled = toDecimal(__classPrivateFieldGet(this, _Decimal_scaled, "f")).unscale(INTERNAL_SCALE);
        return Number(unscaled) / 10 ** Number(INTERNAL_SCALE);
    }
    toString() {
        const unscaledNumber = toDecimal(__classPrivateFieldGet(this, _Decimal_scaled, "f")).toNumber();
        return `${unscaledNumber}`;
    }
    toFormat(locale, fractionalLength = 8) {
        const unscaledNumber = toDecimal(__classPrivateFieldGet(this, _Decimal_scaled, "f")).toNumber();
        const options = locale !== Decimal.FORMAT_TOKEN &&
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
    add(other) {
        const added = __classPrivateFieldGet(this, _Decimal_scaled, "f").add(toBN(other));
        return toDecimal(added);
    }
    sub(other) {
        const sub = __classPrivateFieldGet(this, _Decimal_scaled, "f").sub(toBN(other));
        return toDecimal(sub);
    }
    mul(other) {
        const multi = __classPrivateFieldGet(this, _Decimal_scaled, "f").mul(toBN(other));
        const demulti = multi.div(SCALE_FOR_MULTI_DIVI);
        return toDecimal(demulti);
    }
    div(other) {
        const mult = __classPrivateFieldGet(this, _Decimal_scaled, "f").mul(SCALE_FOR_MULTI_DIVI);
        const divi = mult.div(toBN(other));
        return toDecimal(divi);
    }
}
exports.default = Decimal;
_Decimal_scaled = new WeakMap();
Decimal.FORMAT_EUR = FORMATS.EUR;
Decimal.FORMAT_DOLLAR = FORMATS.DOLLAR;
Decimal.FORMAT_TOKEN = FORMATS.TOKEN;
Decimal.FORMAT_PERCENT = FORMATS.PERCENT;

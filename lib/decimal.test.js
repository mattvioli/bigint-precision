"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
describe("the BIP class", () => {
    it("checks precision", () => {
        expect(_1.default.from(1000000n, 6n).unscale(18n)).toBe(1n * 10n ** 18n);
        expect(_1.default.from(1000000n, 6n).unscale(4n)).toBe(1n * 10n ** 4n);
        expect(_1.default.from(100000000n, 6n).unscale(4n)).toBe(100n * 10n ** 4n);
    });
    it("checks the add method", () => {
        const summands = _1.default.from(20n, 1n);
        const sum = summands.add(_1.default.from(114159n, 5n)).unscale(5n);
        expect(sum).toEqual(314159n);
    });
    it("checks the subtract method", () => {
        const minuend = _1.default.from(1000n, 2n);
        const difference = minuend.sub(_1.default.from(68584n, 4n)).unscale(4n);
        expect(difference).toEqual(31416n);
    });
    it("checks the multiplication method", () => {
        const multiplicand = _1.default.from(30000000n, 5n);
        const product = multiplicand.mul(_1.default.from(5n)).unscale(2n);
        expect(product).toEqual(150000n);
    });
    it("to checks the divid method", () => {
        // https://mathworld.wolfram.com/PiApproximations.html
        const dividend = _1.default.from(233546921420225777694970883318153571000n, 3n);
        const divisor = _1.default.from(74340293968115785654927455866388593n, 0n);
        const quotient = dividend.div(divisor).unscale(18n);
        expect(quotient).toBe(3141592653916501746n);
    });
    it("subs two BIPs and returns a number", () => {
        const minuend = _1.default.from(1000n, 2n);
        const difference = minuend.sub(_1.default.from(68584n, 4n)).toNumber();
        expect(difference).toEqual(3.1416);
    });
    it("returns BIP as a fixed string", () => {
        expect(_1.default.from(3141590n, 6n).toString()).toBe("3.14159");
    });
    it("returns BIP as a string with different formats", () => {
        expect(_1.default.from(100000n, 2n).toFormat(_1.default.FORMAT_EUR)).toBe("1.000");
        expect(_1.default.from(100036n, 2n).toFormat(_1.default.FORMAT_EUR)).toBe("1.000,36");
        expect(_1.default.from(10000000000n, 4n).toFormat(_1.default.FORMAT_DOLLAR)).toBe("1,000,000");
        expect(_1.default.from(10000001000n, 4n).toFormat(_1.default.FORMAT_DOLLAR)).toBe("1,000,000.10");
        expect(_1.default.from(1000000111111n, 6n).toFormat(_1.default.FORMAT_TOKEN, 8)).toBe("1,000,000.111111");
    });
});

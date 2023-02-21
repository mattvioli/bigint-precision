"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
describe("the Decimal class", () => {
    it("checks precision", () => {
        expect(_1.default.from(1000000n, 6n).unscale(18n)).toBe(1n * 10n ** 18n);
        expect(_1.default.from(1000000n, 6n).unscale(4n)).toBe(1n * 10n ** 4n);
        expect(_1.default.from(100000000n, 6n).unscale(4n)).toBe(100n * 10n ** 4n);
    });
    it("checks the add method", () => {
        const decimal = _1.default.from(20n, 1n);
        const added = decimal.add(_1.default.from(114159n, 5n)).unscale(5n);
        expect(added).toEqual(314159n);
    });
    it("checks the subtract method", () => {
        const decimal = _1.default.from(1000n, 2n);
        const subtract = decimal.sub(_1.default.from(68584n, 4n)).unscale(4n);
        expect(subtract).toEqual(31416n);
    });
    it("checks the multiply method", () => {
        const decimal = _1.default.from(30000000n, 5n);
        const multiply = decimal.mul(_1.default.from(5n)).unscale(2n);
        expect(multiply).toEqual(150000n);
    });
    it("to checks the divid method", () => {
        // https://mathworld.wolfram.com/PiApproximations.html
        const numerator = _1.default.from(233546921420225777694970883318153571000n, 3n);
        const denominator = new _1.default(74340293968115785654927455866388593n);
        expect(numerator.div(denominator).unscale(18n)).toBe(3141592653916501746n);
    });
    it("adds two Decimals and returns a number", () => {
        const decimal = _1.default.from(1000n, 2n);
        const subtract = decimal.sub(_1.default.from(68584n, 4n)).toNumber();
        expect(subtract).toEqual(3.1416);
    });
    it("returns Decimal as a fixed string", () => {
        expect(_1.default.from(3141590n, 6n).toString()).toBe("3.14159");
    });
    it("returns Decimal as a string with different formats", () => {
        expect(_1.default.from(100000n, 2n).toFormat(_1.default.FORMAT_EUR)).toBe("1.000");
        expect(_1.default.from(100036n, 2n).toFormat(_1.default.FORMAT_EUR)).toBe("1.000,36");
        expect(_1.default.from(10000000000n, 4n).toFormat(_1.default.FORMAT_DOLLAR)).toBe("1,000,000");
        expect(_1.default.from(10000001000n, 4n).toFormat(_1.default.FORMAT_DOLLAR)).toBe("1,000,000.10");
        expect(_1.default.from(1000000111111n, 6n).toFormat(_1.default.FORMAT_TOKEN, 8)).toBe("1,000,000.111111");
    });
});

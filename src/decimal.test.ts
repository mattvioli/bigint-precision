import BIP from ".";

describe("the BIP class", () => {
  it("checks precision", () => {
    expect(BIP.from(1_000000n, 6n).unscale(18n)).toBe(1n * 10n ** 18n);
    expect(BIP.from(1_000000n, 6n).unscale(4n)).toBe(1n * 10n ** 4n);
    expect(BIP.from(100_000000n, 6n).unscale(4n)).toBe(100n * 10n ** 4n);
  });

  it("checks the add method", () => {
    const summands = BIP.from(2_0n, 1n);
    const sum = summands.add(BIP.from(1_14159n, 5n)).unscale(5n);
    expect(sum).toEqual(3_14159n);
  });

  it("checks the subtract method", () => {
    const minuend = BIP.from(10_00n, 2n);
    const difference = minuend.sub(BIP.from(6_8584n, 4n)).unscale(4n);
    expect(difference).toEqual(3_1416n);
  });

  it("checks the multiplication method", () => {
    const multiplicand = BIP.from(300_00000n, 5n);
    const product = multiplicand.mul(BIP.from(5n)).unscale(2n);
    expect(product).toEqual(150000n);
  });

  it("to checks the divid method", () => {
    // https://mathworld.wolfram.com/PiApproximations.html
    const dividend = BIP.from(233546921420225777694970883318153571_000n, 3n);
    const divisor = BIP.from(74340293968115785654927455866388593n, 0n);
    const quotient = dividend.div(divisor).unscale(18n);
    expect(quotient).toBe(3_141592653916501746n);
  });

  it("subs two BIPs and returns a number", () => {
    const minuend = BIP.from(10_00n, 2n);
    const difference = minuend.sub(BIP.from(6_8584n, 4n)).toNumber();
    expect(difference).toEqual(3.1416);
  });

  it("returns BIP as a fixed string", () => {
    expect(BIP.from(3_141590n, 6n).toString()).toBe("3.14159");
  });

  it("returns BIP as a string with different formats", () => {
    expect(BIP.from(1000_00n, 2n).toFormat(BIP.FORMAT_EUR)).toBe("1.000");

    expect(BIP.from(1000_36n, 2n).toFormat(BIP.FORMAT_EUR)).toBe("1.000,36");

    expect(BIP.from(1000000_0000n, 4n).toFormat(BIP.FORMAT_DOLLAR)).toBe(
      "1,000,000"
    );

    expect(BIP.from(1000000_1000n, 4n).toFormat(BIP.FORMAT_DOLLAR)).toBe(
      "1,000,000.10"
    );

    expect(BIP.from(1000000_111111n, 6n).toFormat(BIP.FORMAT_TOKEN, 8)).toBe(
      "1,000,000.111111"
    );
  });
});

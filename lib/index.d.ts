type FormatLocale = "de-DE" | "en-US";
type FormatType = {
    code: FormatLocale;
    options?: Intl.NumberFormatOptions;
};
export default class Decimal {
    #private;
    static FORMAT_EUR: FormatType;
    static FORMAT_DOLLAR: FormatType;
    static FORMAT_TOKEN: FormatType;
    static FORMAT_PERCENT: FormatType;
    constructor(value: bigint, exponent?: bigint);
    static from(value: bigint, exponent?: bigint): Decimal;
    unscale(precision: bigint): bigint;
    toNumber(): number;
    toString(): string;
    toFormat(locale: FormatType, fractionalLength?: number): string;
    add(other: Decimal): Decimal;
    sub(other: Decimal): Decimal;
    mul(other: Decimal): Decimal;
    div(other: Decimal): Decimal;
}
export {};

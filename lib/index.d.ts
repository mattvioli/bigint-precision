type FormatLocale = "de-DE" | "en-US";
type FormatType = {
    code: FormatLocale;
    options?: Intl.NumberFormatOptions;
};
export default class BIP {
    #private;
    static FORMAT_EUR: FormatType;
    static FORMAT_DOLLAR: FormatType;
    static FORMAT_TOKEN: FormatType;
    static FORMAT_PERCENT: FormatType;
    constructor(value: bigint, exponent?: bigint);
    static from(value: bigint, exponent?: bigint): BIP;
    unscale(precision: bigint): bigint;
    toNumber(): number;
    toString(): string;
    toFormat(locale: FormatType, fractionalLength?: number): string;
    add(other: BIP): BIP;
    sub(other: BIP): BIP;
    mul(other: BIP): BIP;
    div(other: BIP): BIP;
}
export {};

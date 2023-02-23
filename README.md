# bigint-precision

This is to ensure precision on decimals for BigInt maths.

## Installation

```
  npm install bigint-precision
```

## How to construct a BIP class.

Instead of using the new constructor, we favour using the .from()

From takes 2 arguments, the value and the exponent.

For example, the value of 3.141590 would be entered as below.

```
BIP.from(3_141590n, 6n)
```

<sup>We add \_ as it's an easier visual cue to track it</sup>

## fromNumber

.fromNumber can take a whole number, floating point or evemn scientific notation as an input and allow you to perform big maths on it.

```
BIP.fromNumber(20000)
BIP.fromNumber(20.12221)
BIP.fromNumber("1.2112222222222222e+22");
```

## Return the value

To return the value after applying some maths, we have the following options.

- unscale
- toNumber
- toString
- toFormat

### Unscale

unscale returns the bigint value to the precision dictated by the argument.

```
BIP.from(3_141590n, 6n).unscale(2n)
```

<sup>This will return 3_14n</sup>

### toNumber

unscale returns a number data type and takes no arguments.

```
BIP.from(3_141590n, 6n).toNumber()
```

<sup>This will return 3.14159</sup>

### toString

unscale returns a string data type and takes no arguments.

```
BIP.from(3_141590n, 6n).toString()
```

<sup>This will return "3.14159"</sup>

### toFormat

unscale returns a string data type and returns a formated string.

The current type of formats are:

- Euro
- Dollar
- CyptoToken
- Percent

Please contact me if you want anymore formats added.

```
BIP.from(1000_36n, 2n).toFormat(BIP.FORMAT_EUR))
```

<sup>This will return "1.000,36"</sup>

## Math operators

This includes the following elementary arithmetic operators.

- Addition
- Subtraction
- Multiplication
- Division

### Addition

```
   const summands = BIP.from(2_0n, 1n);
    const sum = summands.add(BIP.from(1_14159n, 5n)).unscale(5n);
```

<sup>The sum will be 3_14159n</sup>

### Subtraction

```
    const minuend = BIP.from(10_00n, 2n);
    const difference = minuend.sub(BIP.from(6_8584n, 4n)).unscale(4n);
```

<sup>The difference will return 3_146n</sup>

### Multiplication

```
    const multiplicand = BIP.from(300_00000n, 5n);
    const product = multiplicand.mul(BIP.from(5n)).unscale(2n);

```

<sup>The product will be 3_146n</sup>

### Division

```
    const dividend = BIP.from(233546921420225777694970883318153571_000n, 3n);
    const divisor = BIP.from(74340293968115785654927455866388593n, 0n);
    const quotient = dividend.div(divisor).unscale(18n);

```

<sup>The quotient will be 3_141592653916501746n</sup>

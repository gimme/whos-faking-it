/**
 * An array of bits, where a bit is either 0 or 1.
 */
export type BitArray = Bit[]
export type Bit = 0 | 1

/**
 * Converts a number to the corresponding array of bits.
 */
export function numberToBits(num: number, length?: number): BitArray {
    const bits: BitArray = []
    while (num > 0) {
        bits.unshift((num & 1) as Bit)
        num >>= 1
    }
    if (length !== undefined) {
        while (bits.length < length) {
            bits.unshift(0)
        }
    }
    return bits
}

/**
 * Converts a short array of bits to the corresponding number.
 */
export function bitsToNumber(bits: BitArray): number {
    return bits.reduce((acc: number, bit) => (acc << 1) | bit, 0)
}

/**
 * Converts bits to the corresponding bigint.
 */
export function bitsToBigInt(bits: BitArray): bigint {
    return bits.reduce((acc: bigint, bit) => (acc << 1n) | BigInt(bit), 0n)
}

/**
 * Converts bits to a string representation in a given radix.
 */
export function bitsToString(bits: BitArray, radix: number): string {
    const bigint = bitsToBigInt(bits)
    return bigint.toString(radix)
}

/**
 * Extracts the last `numberOfBits` bits from the given array.
 */
export function extractBits(bits: BitArray, numberOfBits: number): BitArray {
    return bits.splice(Math.max(0, bits.length - numberOfBits))
}

/**
 * Returns the number of bits required to represent a given value.
 */
export function bitsRequiredFor(value: number) {
    return Math.floor(Math.log2(value)) + 1
}

/**
 * Returns the indices of bits that are set to 1 in the given array.
 */
export function bitsToIndices(bits: BitArray): number[] {
    return bits.map((bit, i) => (bit ? i : -1)).filter((i) => i !== -1)
}

/**
 * Parses a string representation of a number in a given radix into a `BitArray`.
 */
export function parseBits(value: string, radix: number): BitArray {
    return bigIntToBits(parseBigInt(value, radix))
}

/**
 * Converts a string representation of a number in a given radix to a bigint.
 */
function parseBigInt(value: string, radix: number): bigint {
    return [...value.toString()].reduce((r, v) => r * BigInt(radix) + BigInt(parseInt(v, radix)), 0n)
}

/**
 * Converts a bigint to the corresponding array of bits.
 */
function bigIntToBits(value: bigint, length?: number): BitArray {
    const bits: BitArray = []
    while (value > 0n) {
        bits.unshift(Number(value & 1n) as Bit)
        value >>= 1n
    }
    if (length !== undefined) {
        while (bits.length < length) {
            bits.unshift(0)
        }
    }
    return bits
}

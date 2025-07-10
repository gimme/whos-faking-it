import { type BitArray, bitsToString, parseBits } from "@/util/BitArray"

const CHARSET = "xy23456789abcdefghijkzmnopqrstuv"
const BASE = CHARSET.length
export const BITS_PER_CHAR = Math.log2(BASE)

if (!Number.isInteger(BITS_PER_CHAR)) throw new Error("Character set length must be a power of 2")

/**
 * Encodes a bit array to a string using distinguishable characters.
 */
export function encodeBitsToString(bits: BitArray): string {
    const numberOfChars = Math.ceil(bits.length / BITS_PER_CHAR)
    return bitsToString(bits, BASE)
        .padStart(numberOfChars, "0") // Pad with zeros to ensure correct length
        .replace(/./g, (c) => CHARSET[parseInt(c, BASE)])
}

/**
 * Decodes a string back to bits using the same character set as {@link encodeBitsToString}.
 */
export function decodeStringToBits(encoded: string): BitArray {
    const decoded = encoded.replace(/./g, (c) => {
        let index = CHARSET.indexOf(c)
        if (index === -1) index = CHARSET.indexOf(bestGuessIfTypo(c))
        if (index === -1) throw new Error(`Invalid character: ${c}`)
        return index.toString(BASE)
    })

    const numberOfBits = decoded.length * BITS_PER_CHAR
    const bits = parseBits(decoded, BASE)
    while (bits.length < numberOfBits) {
        bits.unshift(0) // Pad with zeros to ensure correct length
    }
    return bits
}

function bestGuessIfTypo(typo: string): string {
    return commonTypos[typo] || typo.toLowerCase()
}

const commonTypos: Record<string, string> = {
    0: "o",
}

import { type BitArray, bitsToString, parseBits } from "@/util/BitArray"

const CHARSET = "xy23456789abcdefghijkzmnopqrstuv"

/**
 * Encodes a bit array to a string using distinguishable characters.
 */
export function encodeBitsToString(bits: BitArray): string {
    const base = CHARSET.length
    return bitsToString(bits, base).replace(/./g, (c) => CHARSET[parseInt(c, base)])
}

/**
 * Decodes a string back to bits using the same character set as {@link encodeBitsToString}.
 */
export function decodeStringToBits(encoded: string): BitArray {
    const base = CHARSET.length
    const decoded = encoded.toLowerCase().replace(/./g, (c) => {
        let index = CHARSET.indexOf(c)
        if (index === -1) index = CHARSET.indexOf(commonTypos[c])
        if (index === -1) throw new Error(`Invalid character: ${c}`)
        return index.toString(base)
    })

    return parseBits(decoded, base)
}

const commonTypos: Record<string, string> = {
    0: "o",
}

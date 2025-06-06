const CHARSET = "xy23456789abcdefghijkzmnopqrstuv"

/**
 * Encodes a number to a string using distinguishable characters.
 */
export function encodeNumberToString(number: number): string {
    const base = CHARSET.length
    return number.toString(base).replace(/./g, (c) => CHARSET[parseInt(c, base)])
}

/**
 * Decodes a string back to a number using the same character set as {@link encodeNumberToString}.
 */
export function decodeStringToNumber(encoded: string): number {
    const base = CHARSET.length
    const decoded = encoded.toLowerCase().replace(/./g, (c) => {
        let index = CHARSET.indexOf(c)
        if (index === -1) index = CHARSET.indexOf(commonTypos[c])
        if (index === -1) throw new Error(`Invalid character: ${c}`)
        return index.toString(base)
    })

    return parseInt(decoded, base)
}

const commonTypos: Record<string, string> = {
    0: "o",
}

import type { GameCode } from "@/app/game/domain/game"
import { ALL_SEAT_COUNTS, MIN_SEAT_COUNT, type SeatCount } from "@/app/game/domain/player"
import { type GameSettings, createGameSettings } from "@/app/game/domain/settings"
import { decodeStringToNumber, encodeNumberToString } from "@/util/number-encoding"

const CHECKSUM_BITS = 3 // 3 bits for checksum, giving a false positive rate of 1 in 8
const DATE_OFFSET_BITS = 1 // 1 bit for date offset (0 or 1), to keep the game alive for at least 1 day
const ENTROPY_BITS = 6 // 6 bits for entropy, allowing for 64 different values
const SEAT_COUNT_BITS = minBitsRequired(ALL_SEAT_COUNTS.length)

/**
 * Encodes game settings into a code that stores all necessary information to recreate the game.
 */
export function encodeGameSettings(settings: GameSettings, entropy?: number): GameCode {
    const { seatCount, includedModules } = settings

    const moduleBits: BitArray = Array.from(
        { length: Math.max(-1, ...includedModules) + 1 },
        (_, i) => (includedModules.includes(i) ? 1 : 0)
    )

    const seatCountOverMin = seatCount - MIN_SEAT_COUNT

    if (entropy === undefined) {
        entropy = Math.floor(Math.random() * (bitmask(ENTROPY_BITS) + 1))
    }

    const dateOffset = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % Math.pow(2, DATE_OFFSET_BITS)

    const combined: BitArray = []
    combined.push(...moduleBits)
    combined.push(...numberToBitArray(seatCountOverMin, SEAT_COUNT_BITS))
    combined.push(...numberToBitArray(entropy, ENTROPY_BITS))
    combined.push(...numberToBitArray(dateOffset, DATE_OFFSET_BITS))
    combined.push(...numberToBitArray(checksum(combined), CHECKSUM_BITS))

    return encodeNumberToString(bitArrayToNumber(combined))
}

/**
 * Decodes a game code back into settings.
 */
export function decodeGameSettings(code: GameCode): GameSettings {
    const decodedBits = numberToBitArray(decodeStringToNumber(code))

    const decodedChecksum = bitArrayToNumber(extractBits(decodedBits, CHECKSUM_BITS))
    if (decodedChecksum !== checksum(decodedBits)) throw new Error("Invalid checksum")

    extractBits(decodedBits, DATE_OFFSET_BITS + ENTROPY_BITS)

    const decodedSeatBits = extractBits(decodedBits, SEAT_COUNT_BITS)
    const seatCount = (bitArrayToNumber(decodedSeatBits) + MIN_SEAT_COUNT) as SeatCount

    const moduleBits = decodedBits.reverse()
    const includedModules = bitArrayToIndices(moduleBits)

    return createGameSettings(seatCount, includedModules)
}

/**
 * Decodes the entropy value from a game code.
 * The entropy is used to produce unique rng values for the same settings.
 */
export function decodeEntropyFromGameCode(code: GameCode): number {
    const decodedBits = decodeStringToNumber(code)
    return (decodedBits >>> (CHECKSUM_BITS + DATE_OFFSET_BITS)) & bitmask(ENTROPY_BITS)
}

/**
 * Returns the amount of days since the game was created, if today (0) or yesterday (1).
 */
export function getDateOffsetFromGameCode(code: GameCode): number {
    const decodedBits = decodeStringToNumber(code)
    const gameDateOffset = (decodedBits >>> CHECKSUM_BITS) & bitmask(DATE_OFFSET_BITS)
    const todayDateOffset = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % Math.pow(2, DATE_OFFSET_BITS)
    const diff = todayDateOffset - gameDateOffset

    if (diff < 0) return diff + Math.pow(2, DATE_OFFSET_BITS) // Adjust for negative difference
    return diff
}

function checksum(input: BitArray): number {
    const num = bitArrayToNumber(input)
    return num % Math.pow(2, CHECKSUM_BITS)
}

/**
 * Returns the indices of bits that are set to 1 in the given bit array.
 */
function bitArrayToIndices(bits: BitArray): number[] {
    return bits
        .map((bit, i) => bit ? i : -1)
        .filter(i => i !== -1)
}

function bitmask(bitCount: number): number {
    return Math.pow(2, bitCount) - 1
}

type BitArray = (0 | 1)[]

function numberToBitArray(num: number, length?: number): BitArray {
    const bits: BitArray = []
    while (num > 0) {
        bits.push((num & 1) as 0 | 1)
        num >>= 1
    }
    if (length !== undefined) {
        while (bits.length < length) {
            bits.push(0)
        }
    }
    return bits.reverse()
}

function bitArrayToNumber(bits: BitArray): number {
    return bits.reduce((acc: number, bit) => (acc << 1) | bit, 0)
}

function extractBits(bits: BitArray, numBits: number): BitArray {
    return bits.splice(Math.max(0, bits.length - numBits))
}

function minBitsRequired(n: number) {
    return Math.floor(Math.log2(n)) + 1;
}

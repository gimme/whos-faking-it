import seedrandom from "seedrandom"

import type { GameCode } from "@/app/game/domain/game"
import { ALL_SEAT_COUNTS, MIN_SEAT_COUNT, type SeatCount } from "@/app/game/domain/player"
import { type GameSettings, createGameSettings } from "@/app/game/domain/settings"
import {
    type BitArray,
    bitsRequiredFor,
    bitsToBigInt,
    bitsToIndices,
    bitsToNumber,
    extractBits,
    numberToBits,
} from "@/util/BitArray"
import { decodeStringToBits, encodeBitsToString } from "@/util/number-encoding"

const CHECKSUM_BITS = 3 // 3 bits for checksum, giving a false positive rate of 1 in 8
const DATE_OFFSET_BITS = 1 // 1 bit for date offset (0 or 1), to keep the game alive for at least 1 day
const ENTROPY_BITS = 6 // 6 bits for entropy, allowing for 64 different values
const SEAT_COUNT_BITS = bitsRequiredFor(ALL_SEAT_COUNTS.length)

/**
 * Encodes game settings into a code that stores all necessary information to recreate the game.
 */
export function encodeGameSettings(settings: GameSettings, entropy?: number): GameCode {
    const { seatCount, includedModules } = settings

    const moduleBits: BitArray = Array.from({ length: Math.max(-1, ...includedModules) + 1 }, (_, i) =>
        includedModules.includes(i) ? 1 : 0,
    )

    const seatCountOverMin = seatCount - MIN_SEAT_COUNT

    if (entropy === undefined) {
        entropy = Math.floor(Math.random() * (bitmask(ENTROPY_BITS) + 1))
    }

    const dateOffset = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % Math.pow(2, DATE_OFFSET_BITS)

    const combined: BitArray = []
    combined.push(...moduleBits)
    combined.push(...numberToBits(seatCountOverMin, SEAT_COUNT_BITS))
    combined.push(...numberToBits(entropy, ENTROPY_BITS))
    combined.push(...numberToBits(dateOffset, DATE_OFFSET_BITS))
    combined.push(...numberToBits(checksum(combined), CHECKSUM_BITS))

    return encodeBitsToString(combined)
}

/**
 * Decodes a game code back into settings.
 */
export function decodeGameSettings(code: GameCode): GameSettings {
    const decodedBits = decodeStringToBits(code)

    const decodedChecksum = bitsToNumber(extractBits(decodedBits, CHECKSUM_BITS))
    if (decodedChecksum !== checksum(decodedBits)) throw new Error("Invalid checksum")

    extractBits(decodedBits, DATE_OFFSET_BITS + ENTROPY_BITS)

    const decodedSeatBits = extractBits(decodedBits, SEAT_COUNT_BITS)
    const seatCount = (bitsToNumber(decodedSeatBits) + MIN_SEAT_COUNT) as SeatCount

    const moduleBits = decodedBits.reverse()
    const includedModules = bitsToIndices(moduleBits)

    return createGameSettings(seatCount, includedModules)
}

/**
 * Decodes the entropy value from a game code.
 * The entropy is used to produce unique rng values for the same settings.
 */
export function getEntropyFromGameCode(code: GameCode): number {
    const decodedBits = decodeStringToBits(code)
    extractBits(decodedBits, CHECKSUM_BITS + DATE_OFFSET_BITS)
    const entropyBits = extractBits(decodedBits, ENTROPY_BITS)
    return bitsToNumber(entropyBits)
}

/**
 * Returns the amount of days since the game was created, if today (0) or yesterday (1).
 */
export function getDateOffsetFromGameCode(code: GameCode): number {
    const decodedBits = decodeStringToBits(code)
    extractBits(decodedBits, CHECKSUM_BITS)
    const gameDateOffsetBits = extractBits(decodedBits, DATE_OFFSET_BITS)
    const gameDateOffset = bitsToNumber(gameDateOffsetBits)
    const todayDateOffset = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % Math.pow(2, DATE_OFFSET_BITS)
    const diff = todayDateOffset - gameDateOffset

    if (diff < 0) return diff + Math.pow(2, DATE_OFFSET_BITS) // Adjust for negative difference
    return diff
}

function checksum(input: BitArray): number {
    return Number(bitsToBigInt(input) % BigInt(Math.pow(2, CHECKSUM_BITS)))
}

function bitmask(bitCount: number): number {
    return Math.pow(2, bitCount) - 1
}

import type { GameCode } from "@/app/game/domain/game"
import type { SeatCount } from "@/app/game/domain/player"
import { type GameSettings, createGameSettings } from "@/app/game/domain/settings"
import { playableModules } from "@/assets/prompts/modules"
import { decodeStringToNumber, encodeNumberToString } from "@/util/number-encoding"

const MIN_SEAT_COUNT = 3

const DATE_OFFSET_BITS = 1 // 1 bit for date offset (0 or 1), to keep the game alive for at least 1 day
const ENTROPY_BITS = 6 // 6 bits for entropy, allowing for 64 different values
const SEAT_COUNT_BITS = 3 // 3 bits can represent 8 different seat counts (e.g., 3 to 10)
const MODULE_BITS = playableModules.length // Number of available modules, each represented by a bit

/**
 * Encodes game settings into a code that stores all necessary information to recreate the game.
 */
export function encodeGameSettings(settings: GameSettings, entropy?: number): GameCode {
    const dateOffset = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % Math.pow(2, DATE_OFFSET_BITS)

    if (entropy === undefined) {
        entropy = Math.floor(Math.random() * (bitmask(ENTROPY_BITS) + 1))
    }

    const { seatCount, includedModules } = settings

    if (seatCount < MIN_SEAT_COUNT || seatCount > MIN_SEAT_COUNT + bitmask(SEAT_COUNT_BITS))
        throw new Error(`Invalid seatCount: ${seatCount}`)
    const seatBits = seatCount - MIN_SEAT_COUNT

    let moduleBits = 0
    for (const moduleIndex of includedModules) {
        if (moduleIndex > MODULE_BITS - 1) {
            console.warn(`Invalid moduleIndex: ${moduleIndex}`)
            continue
        }
        moduleBits |= 1 << moduleIndex
    }

    let combined = 0
    combined = (combined << MODULE_BITS) + moduleBits
    combined = (combined << SEAT_COUNT_BITS) + seatBits
    combined = (combined << ENTROPY_BITS) + entropy
    combined = (combined << DATE_OFFSET_BITS) + dateOffset

    return encodeNumberToString(combined)
}

/**
 * Decodes a game code back into settings.
 */
export function decodeGameSettings(code: GameCode): GameSettings {
    let decodedBits = decodeStringToNumber(code)
    decodedBits >>>= DATE_OFFSET_BITS
    decodedBits >>>= ENTROPY_BITS

    const decodedSeats = decodedBits & bitmask(SEAT_COUNT_BITS)
    decodedBits >>>= SEAT_COUNT_BITS

    const moduleBitmask = decodedBits & bitmask(MODULE_BITS)

    const seatCount = (decodedSeats + MIN_SEAT_COUNT) as SeatCount
    const includedModules = bitmaskToIndices(moduleBitmask)

    return createGameSettings(seatCount, includedModules)
}

/**
 * Decodes the entropy value from a game code.
 * The entropy is used to produce unique rng values for the same settings.
 */
export function decodeEntropyFromGameCode(code: GameCode): number {
    const decodedBits = decodeStringToNumber(code)
    return (decodedBits >>> DATE_OFFSET_BITS) & bitmask(ENTROPY_BITS)
}

/**
 * Returns the amount of days since the game was created, if today (0) or yesterday (1).
 */
export function getDateOffsetFromGameCode(code: GameCode): number {
    const decodedBits = decodeStringToNumber(code)
    const gameDateOffset = decodedBits & bitmask(DATE_OFFSET_BITS)
    const todayDateOffset = (Date.now() / (1000 * 60 * 60 * 24)) % Math.pow(2, DATE_OFFSET_BITS)
    const diff = todayDateOffset - gameDateOffset
    return (diff + Math.pow(2, DATE_OFFSET_BITS)) % Math.pow(2, DATE_OFFSET_BITS)
}

/**
 * Converts a bitmask to an array of indices where the bits are set, starting from the least significant bit.
 * @param bitmask
 */
function bitmaskToIndices(bitmask: number): number[] {
    const indices = []
    let index = 0
    while (bitmask > 0) {
        if (bitmask & 1) {
            indices.push(index)
        }
        bitmask >>= 1
        index++
    }
    return indices
}

function bitmask(bitCount: number): number {
    return Math.pow(2, bitCount) - 1
}

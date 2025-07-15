import seedrandom from "seedrandom"

import type { GameCode } from "@/app/game/domain/game"
import { ALL_SEAT_COUNTS, MIN_SEAT_COUNT, type SeatCount } from "@/app/game/domain/player"
import { type GameSettings, createGameSettings } from "@/app/game/domain/settings"
import {
    type Bit,
    type BitArray,
    bitsRequiredFor,
    bitsToBigInt,
    bitsToIndices,
    bitsToNumber,
    extractBits,
    numberToBits,
    valuesRepresentedByBits,
} from "@/util/BitArray"
import { BITS_PER_CHAR, decodeStringToBits, encodeBitsToString } from "@/util/number-encoding"

const CHECKSUM_BITS = 3 // 3 bits for checksum, giving a false positive rate of 1 in 8
const ENTROPY_BITS = 6 // 6 bits for entropy, allowing for 64 different values
const DATE_OFFSET_BITS = 1 // 1 bit for date offset (0 or 1), to keep the game alive for at least 1 day
const SEAT_COUNT_BITS = bitsRequiredFor(ALL_SEAT_COUNTS.length)

/**
 * Represents the relevant information that is encoded in a game code.
 */
type DecodedGame = {
    settings: GameSettings
    /**
     * The seed which can be used to generate the randomness for the game in a deterministic way.
     * The seed is guaranteed to stay valid for 24-48 hours. Then it will change to ensure that fresh games can be
     * created in the same entropy space without the risk of collisions.
     */
    seed: string
    /**
     * The entropy which makes the `seed` unique for otherwise identical settings.
     */
    entropy: number
}

/**
 * Encodes game settings into a code that stores all necessary information to recreate the game.
 */
export function encodeGame(settings: GameSettings, entropy?: number): GameCode {
    const { seatCount, includedModules } = settings

    const moduleBits: BitArray = Array.from({ length: Math.max(-1, ...includedModules) + 1 }, (_, i) =>
        includedModules.includes(i) ? 1 : 0,
    )

    const seatCountOverMin = seatCount - MIN_SEAT_COUNT

    if (entropy === undefined) {
        entropy = Math.floor(Math.random() * valuesRepresentedByBits(ENTROPY_BITS))
    }

    const dateOffset = getTodaysDateOffset()

    const combined: BitArray = []
    combined.push(...moduleBits.reverse())
    combined.push(...numberToBits(seatCountOverMin, SEAT_COUNT_BITS))
    combined.push(...numberToBits(dateOffset, DATE_OFFSET_BITS))
    combined.push(...numberToBits(entropy, ENTROPY_BITS))
    combined.push(...numberToBits(checksum(combined), CHECKSUM_BITS))

    return bitsToGameCode(combined)
}

/**
 * Decodes a game code back into the relevant data that was encoded in it.
 */
export function decodeGame(code: GameCode): DecodedGame {
    const decodedBits = gameCodeToBits(code)

    const decodedChecksumBits = extractBits(decodedBits, CHECKSUM_BITS)
    const decodedChecksum = bitsToNumber(decodedChecksumBits)
    if (decodedChecksum !== checksum(decodedBits)) throw new Error("Invalid checksum")

    const decodedEntropyBits = extractBits(decodedBits, ENTROPY_BITS)
    const entropy = bitsToNumber(decodedEntropyBits)

    const decodedDateOffsetBits = extractBits(decodedBits, DATE_OFFSET_BITS)
    const decodedDateOffset = bitsToNumber(decodedDateOffsetBits)
    const gameCreationEpochDay = getGameCreationEpochDay(decodedDateOffset)
    const seed = `${code}-${gameCreationEpochDay}`

    const decodedSeatBits = extractBits(decodedBits, SEAT_COUNT_BITS)
    const seatCount = (bitsToNumber(decodedSeatBits) + MIN_SEAT_COUNT) as SeatCount

    const decodedModuleBits = decodedBits.reverse()
    const includedModules = bitsToIndices(decodedModuleBits)

    const settings = createGameSettings(seatCount, includedModules)

    return {
        settings,
        seed,
        entropy,
    }
}

/**
 * Converts a bit array into a game code string.
 */
function bitsToGameCode(bits: BitArray): GameCode {
    const entropyBits = bits.slice(-(ENTROPY_BITS + CHECKSUM_BITS), -CHECKSUM_BITS)
    const entropy = bitsToNumber(entropyBits)

    // Ensure the number of bits matches what the encoding expects
    while (bits.length % BITS_PER_CHAR !== 0) {
        bits.unshift(0)
    }

    const shuffledBits = oneTimePad(bits, entropy)
    // Keep the original entropy bits intact for decoding
    shuffledBits.splice(-(ENTROPY_BITS + CHECKSUM_BITS), ENTROPY_BITS, ...entropyBits)

    return encodeBitsToString(shuffledBits)
}

/**
 * Converts a game code string back into a bit array, reversing the encoding process.
 */
function gameCodeToBits(code: GameCode): BitArray {
    const decodedBits = decodeStringToBits(code)

    // get entropy bits and do the one-time pad to get the original bits
    const entropyBits = decodedBits.slice(-(ENTROPY_BITS + CHECKSUM_BITS), -CHECKSUM_BITS)
    const entropy = bitsToNumber(entropyBits)

    const unshuffledBits = oneTimePad(decodedBits, entropy)
    // Replace the entropy bits with the original ones
    unshuffledBits.splice(-(ENTROPY_BITS + CHECKSUM_BITS), ENTROPY_BITS, ...entropyBits)

    return unshuffledBits
}

/**
 * Calculates the epoch day on which the game was created based on the "date offset" stored in the game code.
 */
function getGameCreationEpochDay(gameDateOffset: number): number {
    const offsetDiff = getTodaysDateOffset() - gameDateOffset
    const daysSinceGameCreation = offsetDiff >= 0 ? offsetDiff : offsetDiff + valuesRepresentedByBits(DATE_OFFSET_BITS)
    return currentEpochDay() - daysSinceGameCreation
}

/**
 * Returns the "date offset" of today's date, which is a way to represent the current date within a limited number of
 * bits. For example, if using two bits, it can represent two days (0 or 1), like today or yesterday.
 */
function getTodaysDateOffset(): number {
    return currentEpochDay() % valuesRepresentedByBits(DATE_OFFSET_BITS)
}

/**
 * Returns the current epoch day, which is the number of days since January 1, 1970.
 */
function currentEpochDay(): number {
    return Math.floor(Date.now() / (1000 * 60 * 60 * 24))
}

/**
 * Applies a one-time pad to the input bits causing the bits to appear completely random.
 * Uses a seed value allowing the input to be reconstructed by applying the same operation again.
 */
function oneTimePad(input: BitArray, seed: number): BitArray {
    const rng = seedrandom(seed.toString())
    const randBit = () => Math.floor(rng() * 2) as Bit
    return input.map((bit) => (bit ^ randBit()) as Bit)
}

/**
 * Calculates a checksum for the given input bits.
 */
function checksum(input: BitArray): number {
    return Number(bitsToBigInt(input) % BigInt(valuesRepresentedByBits(CHECKSUM_BITS)))
}

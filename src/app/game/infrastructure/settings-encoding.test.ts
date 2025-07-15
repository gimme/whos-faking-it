import { type Assertion, describe, expect, test, vi } from "vitest"

import { createGameSettings } from "@/app/game/domain/settings"

import { decodeGame, encodeGame } from "./settings-encoding.js"

describe("getSeedFromGameCode", () => {
    const gameSettings = createGameSettings(3, [])

    function expectSeedToBeTheSameForTwoDaysInARow(date: Date) {
        vi.setSystemTime(date)
        const gameCode = encodeGame(gameSettings)
        const seed = decodeGame(gameCode).seed

        const expectSeed: () => Assertion = () => {
            vi.setSystemTime(date)
            return expect(decodeGame(gameCode).seed)
        }

        // Same day before midnight
        date.setUTCHours(23, 59, 59)
        expectSeed().toBe(seed)

        // Next day before midnight
        date.setUTCDate(date.getUTCDate() + 1)
        expectSeed().toBe(seed)

        // Next day after midnight
        date.setUTCSeconds(date.getUTCSeconds() + 1)
        expectSeed().not.toBe(seed)
    }

    test("returns the same seed for two days in a row", () => {
        expectSeedToBeTheSameForTwoDaysInARow(new Date("2025-06-20T00:00:00Z"))
        expectSeedToBeTheSameForTwoDaysInARow(new Date("2025-06-21T12:00:00Z"))
        expectSeedToBeTheSameForTwoDaysInARow(new Date("2025-06-22T12:00:00Z"))
    })
})

import { describe, expect, test, vi } from "vitest"

import type { SeatCount } from "@/app/game/domain/player"
import { createGameSettings } from "@/app/game/domain/settings"

import { DeterministicGameGenerator } from "./DeterministicGameGenerator"

describe("DeterministicGameGenerator", () => {
    const gameService = DeterministicGameGenerator()

    test("creates a new game with valid settings", () => {
        const settings = createGameSettings(4, [])
        const game = gameService.createNewGame(settings)

        expect(game.settings).toEqual(settings)
        expect(game.rounds.length).toBeGreaterThan(0)
        expect(game.players.length).toBe(settings.seatCount)
    })

    test("creates games with different modules", () => {
        const settings1 = createGameSettings(3, [0]) // Base module
        const game1 = gameService.createNewGame(settings1)

        const settings2 = createGameSettings(3, [0, 1]) // Another module
        const game2 = gameService.createNewGame(settings2)

        expect(game1.settings).toEqual(settings1)
        expect(game2.settings).toEqual(settings2)
    })

    test("joins an existing game by code", () => {
        const settings = createGameSettings(3, [])
        const createdGame = gameService.createNewGame(settings)

        const joinedGame = gameService.findByCode(createdGame.code)
        expect(joinedGame).toEqual(createdGame)
    })

    test("returns undefined for invalid game code", () => {
        const game = gameService.findByCode("invalidCode")
        expect(game).toBeUndefined()
    })

    test("changes settings of an existing game deterministically", () => {
        const initialSettings = createGameSettings(3, [])
        const newSettings = createGameSettings(5, [])

        const game = gameService.createNewGame(initialSettings)
        const updatedGame1 = gameService.changeSettings(game, newSettings)
        const updatedGame2 = gameService.changeSettings(game, newSettings)

        expect(updatedGame1.settings).toEqual(newSettings)
        expect(updatedGame1).toEqual(updatedGame2)
    })

    test("generates consistent games for at least 24 hours", () => {
        vi.setSystemTime("2025-06-21T00:00:01Z")

        const settings = createGameSettings(4, [])
        const game = gameService.createNewGame(settings)
        const game1 = gameService.findByCode(game.code)

        // Simulate waiting for 24 hours
        vi.setSystemTime(Date.now() + 24 * 60 * 60 * 1000)

        const game2 = gameService.findByCode(game.code)

        expect(game1).toBeDefined()
        expect(game1).toEqual(game2)
    })

    const testSeatCounts: SeatCount[] = [3, 4, 5]
    test.each(testSeatCounts)("has expected impostor distribution for %i players", (seatCount: SeatCount) => {
        const settings = createGameSettings(seatCount, [])
        const games = Array.from({ length: 200 }, () => gameService.createNewGame(settings))

        function countRoundsWithImpostorCount(impostorCount: number): number {
            return games.reduce((count, game) => {
                const roundsWithCorrectImpostorCount = game.rounds.filter(
                    (round) => round.playerRoles.filter((role) => role === "impostor").length === impostorCount,
                ).length
                return count + roundsWithCorrectImpostorCount
            }, 0)
        }

        const totalRounds = games.reduce((total, game) => total + game.rounds.length, 0)

        function expectDistribution(impostorCount: number, expectedShare: number, tolerance: number = 0.05) {
            const count = countRoundsWithImpostorCount(impostorCount)
            const actualShare = count / totalRounds
            console.info(
                `${impostorCount} impostors: Out of ${count} rounds -> Expected: ${expectedShare * 100}% ± ${tolerance * 100}%; got ${actualShare * 100}%`,
            )
            expect(actualShare).toBeGreaterThanOrEqual(expectedShare - tolerance)
            expect(actualShare).toBeLessThanOrEqual(expectedShare + tolerance)
        }

        expectDistribution(0, 1 / (seatCount + 2))
        expectDistribution(1, seatCount / (seatCount + 2))
        for (let i = 2; i <= seatCount; i++) {
            expectDistribution(i, (1 / (seatCount + 2)) * (1 / (seatCount - 1)), 0.025)
        }
    })
})

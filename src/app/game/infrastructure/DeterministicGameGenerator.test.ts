import { describe, expect, test, vi } from "vitest"

import { createGameSettings } from "@/app/game/domain/settings"

import { DeterministicGameGenerator } from "./DeterministicGameGenerator"

describe("DeterministicGameGenerator", () => {
    const gameService = DeterministicGameGenerator()

    test("creates a new game with valid settings", () => {
        const settings = createGameSettings(4, [0])
        const game = gameService.createNewGame(settings)

        expect(game.settings).toEqual(settings)
        expect(game.rounds.length).toBeGreaterThan(0)
        expect(game.players.length).toBe(settings.seatCount)
    })

    test("joins an existing game by code", () => {
        const settings = createGameSettings(3, [0])
        const createdGame = gameService.createNewGame(settings)

        const joinedGame = gameService.findByCode(createdGame.code)
        expect(joinedGame).toEqual(createdGame)
    })

    test("returns undefined for invalid game code", () => {
        const game = gameService.findByCode("invalidCode")
        expect(game).toBeUndefined()
    })

    test("changes settings of an existing game deterministically", () => {
        const initialSettings = createGameSettings(3, [0])
        const newSettings = createGameSettings(5, [0])

        const game = gameService.createNewGame(initialSettings)
        const updatedGame1 = gameService.changeSettings(game, newSettings)
        const updatedGame2 = gameService.changeSettings(game, newSettings)

        expect(updatedGame1.settings).toEqual(newSettings)
        expect(updatedGame1).toEqual(updatedGame2)
    })

    test("generates consistent games for at least 24 hours", () => {
        vi.setSystemTime("2025-06-21T00:00:01Z")

        const settings = createGameSettings(4, [0])
        const game = gameService.createNewGame(settings)
        const game1 = gameService.findByCode(game.code)

        // Simulate waiting for 24 hours
        vi.setSystemTime(Date.now() + 24 * 60 * 60 * 1000)

        const game2 = gameService.findByCode(game.code)

        expect(game1).toBeDefined()
        expect(game1).toEqual(game2)
    })
})

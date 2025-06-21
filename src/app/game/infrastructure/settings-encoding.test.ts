import { describe, expect, test, vi } from "vitest"

import { createGameSettings } from "@/app/game/domain/settings"

import { encodeGameSettings, getDateOffsetFromGameCode } from "./settings-encoding.js"

describe("getDateOffsetFromGameCode", () => {
    const createDate = new Date("2025-06-20T12:00:00Z")

    vi.setSystemTime(createDate)
    const gameSettings = createGameSettings(3, [])
    const gameCode = encodeGameSettings(gameSettings)

    test("game created today", () => {
        vi.setSystemTime(new Date("2025-06-20T23:59:59Z"))
        expect(getDateOffsetFromGameCode(gameCode)).toBe(0)
    })

    test("game created yesterday", () => {
        vi.setSystemTime(new Date("2025-06-21T00:00:00Z"))
        expect(getDateOffsetFromGameCode(gameCode)).toBe(1)

        vi.setSystemTime(new Date("2025-06-21T23:59:59Z"))
        expect(getDateOffsetFromGameCode(gameCode)).toBe(1)
    })

    test("really old game", () => {
        vi.setSystemTime(new Date("2025-06-28T00:00:00Z"))
        expect(getDateOffsetFromGameCode(gameCode)).toBe(0)
    })
})

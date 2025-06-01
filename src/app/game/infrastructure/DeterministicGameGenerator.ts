import seedrandom from "seedrandom"

import type { GameService } from "@/app/game/application/GameService"
import type { Card } from "@/app/game/domain/card"
import { type Game, type GameCode, createGame } from "@/app/game/domain/game"
import type { SeatCount } from "@/app/game/domain/player"
import type { Role } from "@/app/game/domain/role"
import type { Round } from "@/app/game/domain/round"
import { type GameSettings, createGameSettings } from "@/app/game/domain/settings"
import { generateCardsFromModule } from "@/app/prompt/module"
import { availableModules } from "@/assets/prompts/modules"
import type { RNG } from "@/common.types"

/**
 * Generates and retrieves games with deterministic states from their codes. The same code will produce the same game
 * on different devices without the need for synchronization.
 */
export function DeterministicGameGenerator(): GameService {
    function generateGameDeterministicallyFromCode(code: GameCode): Game {
        const settings = decodeSettings(code)!
        const rounds = generateRounds(settings, code)

        return createGame(code, settings, rounds)
    }

    function generateRounds(settings: GameSettings, code: GameCode): ReadonlyArray<Round> {
        const seededRng = seedrandom(code)
        const rng = () => seededRng()

        const modulesToUse = availableModules.filter((_, index) => settings.includedModules.includes(index))
        const generatedCards = modulesToUse.flatMap((module) => generateCardsFromModule(module, rng))
        const shuffledDeck = shuffleCards(generatedCards, rng)

        return Array.from({ length: shuffledDeck.length }, (_, i) => i).map((index) => {
            const activeCard = shuffledDeck[index]
            const playerRoles = randomizeRoles(settings.seatCount, rng)
            return {
                roundNumber: index + 1,
                activeCard,
                playerRoles,
            }
        })
    }

    function shuffleCards(cards: Card[], rng: RNG): Card[] {
        const shuffled = [...cards]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1))
            const temp = shuffled[i]
            shuffled[i] = shuffled[j]
            shuffled[j] = temp
        }
        return shuffled
    }

    function randomizeRoles(seatCount: SeatCount, rng: RNG): ReadonlyArray<Role> {
        const impostorIndex = Math.floor(rng() * seatCount)
        return Array.from({ length: seatCount }, (_, i) => {
            return i === impostorIndex ? "impostor" : "truthful"
        })
    }

    function encodeSettings(settings: GameSettings, seed?: string): GameCode {
        if (seed === undefined) {
            seed = (Math.random() * 36).toString(36).split(".")[0]
        }
        // TODO: Use better encoding
        // TODO: Add date entropy to the seed
        return `${seed}-${settings.seatCount}-${settings.includedModules.join(",")}`
    }

    function decodeSettings(code: GameCode): GameSettings {
        const parts = code.split("-")

        const seats = parseInt(parts[1], 10) as SeatCount
        const includedModules = parts[2].split(",").map((index) => parseInt(index, 10))

        return createGameSettings(seats, includedModules)
    }

    function decodeSeed(code: GameCode): string {
        const parts = code.split("-")
        return parts[0]
    }

    return {
        createNewGame(settings: GameSettings): Game {
            const newCode = encodeSettings(settings)
            return generateGameDeterministicallyFromCode(newCode)
        },
        changeSettings(code: GameCode, settings: GameSettings): Game {
            const seed = decodeSeed(code)
            const newCode = encodeSettings(settings, seed)
            return generateGameDeterministicallyFromCode(newCode)
        },
        findByCode(code: GameCode): Game | undefined {
            try {
                return generateGameDeterministicallyFromCode(code)
            } catch (error) {
                console.warn("Failed to create game from code:", code, error)
                return undefined
            }
        },
    }
}

import seedrandom from "seedrandom"

import type { GameService } from "@/app/game/application/GameService"
import type { Card } from "@/app/game/domain/card"
import { type Game, type GameCode, createGame } from "@/app/game/domain/game"
import type { SeatCount } from "@/app/game/domain/player"
import type { Role } from "@/app/game/domain/role"
import type { Round } from "@/app/game/domain/round"
import { type GameSettings } from "@/app/game/domain/settings"
import { decodeGame, encodeGame } from "@/app/game/infrastructure/settings-encoding"
import { generateCardsFromModule } from "@/app/prompt/module"
import { ALL_PLAYABLE_MODULES, DEFAULT_MODULE } from "@/assets/prompts/modules"
import type { RNG } from "@/common.types"

/**
 * Generates and retrieves games with deterministic states from their codes. The same code will produce the same game
 * on different devices without the need for synchronization.
 */
export function DeterministicGameGenerator(): GameService {
    return {
        createNewGame(settings: GameSettings): Game {
            const newCode = encodeGame(settings)
            return generateGameDeterministicallyFromCode(newCode)
        },
        changeSettings(game: Game, settings: GameSettings): Game {
            const entropy = decodeGame(game.code).entropy
            const newCode = encodeGame(settings, entropy)
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

function generateGameDeterministicallyFromCode(code: GameCode): Game {
    const settings = decodeGame(code).settings
    const rounds = generateRounds(settings, code)

    return createGame(code, settings, rounds)
}

function generateRounds(settings: GameSettings, code: GameCode): ReadonlyArray<Round> {
    const seed = decodeGame(code).seed
    const seededRng = seedrandom(seed)
    const rng = () => seededRng()

    const includedModules = settings.includedModules
    const modulesToUse =
        includedModules.length !== 0
            ? ALL_PLAYABLE_MODULES.filter((_, index) => includedModules.includes(index))
            : [DEFAULT_MODULE] // Default if none are selected
    const generatedCards = modulesToUse.flatMap((module) => generateCardsFromModule(module, rng))
    const deckSizeLimit = 99
    const shuffledDeck = shuffleCards(generatedCards, rng).slice(0, deckSizeLimit)

    return shuffledDeck.map((card, index) => {
        const playerRoles = randomizeRoles(settings.seatCount, rng)
        return {
            roundNumber: index + 1,
            activeCard: card,
            playerRoles,
        }
    })
}

function shuffleCards(cards: Card[], rng: RNG): Card[] {
    const shuffled = [...cards]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}

function randomizeRoles(seatCount: SeatCount, rng: RNG): ReadonlyArray<Role> {
    function generateImpostorIndexes(): number[] {
        const r = Math.floor(rng() * (seatCount + 2)) - 2
        if (r === -2) {
            // Two or more impostors
            const numberOfImpostors = Math.floor(rng() * (seatCount - 1)) + 2
            const allRoleIndices = Array.from({ length: seatCount }, (_, i) => i)
            function pickRandomValues(values: number[], count: number): number[] {
                if (count <= 0) return []
                if (values.length === 0) return []

                const randomValue = values[Math.floor(rng() * values.length)]
                const leftoverIndices = values.filter((v) => v !== randomValue)
                return pickRandomValues(leftoverIndices, count - 1).concat(randomValue)
            }
            return pickRandomValues(allRoleIndices, numberOfImpostors)
        }
        if (r === -1) return [] // No impostors
        return [Math.floor(rng() * seatCount)] // One impostor
    }

    const impostorIndices = generateImpostorIndexes()

    return Array.from({ length: seatCount }, (_, i) => {
        return impostorIndices.includes(i) ? "impostor" : "truthful"
    })
}

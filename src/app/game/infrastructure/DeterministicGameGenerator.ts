import seedrandom from "seedrandom"

import type { GameService } from "@/app/game/application/GameService"
import type { Card } from "@/app/game/domain/card"
import { type Game, type GameCode, createGame } from "@/app/game/domain/game"
import type { SeatCount } from "@/app/game/domain/player"
import type { Role } from "@/app/game/domain/role"
import type { Round } from "@/app/game/domain/round"
import { type GameSettings } from "@/app/game/domain/settings"
import {
    decodeEntropyFromGameCode,
    decodeGameSettings,
    encodeGameSettings,
    getDateOffsetFromGameCode,
} from "@/app/game/infrastructure/settings-encoding"
import { generateCardsFromModule } from "@/app/prompt/module"
import { playableModules } from "@/assets/prompts/modules"
import type { RNG } from "@/common.types"

/**
 * Generates and retrieves games with deterministic states from their codes. The same code will produce the same game
 * on different devices without the need for synchronization.
 */
export function DeterministicGameGenerator(): GameService {
    function generateGameDeterministicallyFromCode(code: GameCode): Game {
        const settings = decodeGameSettings(code)
        const rounds = generateRounds(settings, code)

        return createGame(code, settings, rounds)
    }

    function generateRounds(settings: GameSettings, code: GameCode): ReadonlyArray<Round> {
        const dateOffset = getDateOffsetFromGameCode(code)
        const epochDays = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) - dateOffset
        const seededRng = seedrandom(code + epochDays)
        const rng = () => seededRng()

        const modulesToUse = playableModules.filter((_, index) => settings.includedModules.includes(index))
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

    return {
        createNewGame(settings: GameSettings): Game {
            const newCode = encodeGameSettings(settings)
            return generateGameDeterministicallyFromCode(newCode)
        },
        changeSettings(game: Game, settings: GameSettings): Game {
            const entropy = decodeEntropyFromGameCode(game.code)
            const newCode = encodeGameSettings(settings, entropy)
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

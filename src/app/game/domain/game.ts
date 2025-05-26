import type { Player, SeatNumber } from "@/app/game/domain/player"
import type { Round } from "@/app/game/domain/round"
import type { GameSettings } from "@/app/game/domain/settings"

/**
 * Represents a game that can be joined and played in.
 */
export type Game = {
    readonly code: GameCode
    readonly settings: GameSettings
    readonly rounds: ReadonlyArray<Round>
    readonly players: ReadonlyArray<Player>
}

/**
 * A string of letters that uniquely identifies an active game.
 */
export type GameCode = string

export function createGame(code: GameCode, settings: GameSettings, rounds: ReadonlyArray<Round>): Game {
    const seatNumbers = Array.from({ length: settings.seatCount }, (_, i) => (i + 1) as SeatNumber)
    const players: Player[] = seatNumbers.map((seat) => ({ seat }))

    rounds.forEach((round: Round) => {
        if (round.playerRoles.length !== settings.seatCount) {
            throw new Error(`Roles in round ${round.roundNumber} does not match seat count: ${settings.seatCount}`)
        }
    })

    if (players.length !== settings.seatCount) {
        throw new Error(`Number of players (${players.length}) does not match seat count: ${settings.seatCount}`)
    }

    return {
        code,
        settings,
        rounds,
        players,
    }
}

export function getRound(game: Game, roundNumber: number): Round | undefined {
    const roundIndex = roundNumber - 1
    return game.rounds[roundIndex]
}

export function getNextRound(game: Game, round: Round): Round | undefined {
    const nextRoundNumber = round.roundNumber + 1
    return getRound(game, nextRoundNumber)
}

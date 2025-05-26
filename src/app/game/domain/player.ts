/**
 * Represents a player in an active game.
 */
export type Player = {
    readonly seat: SeatNumber
}

/**
 * A number used to identify a seat in a game, one for each player.
 */
export type SeatNumber = 1 | 2 | SeatCount

/**
 * A number of seats used in a game (aka, number of players).
 */
export type SeatCount = 3 | 4 | 5 | 6 | 7 | 8

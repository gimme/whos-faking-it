/**
 * Represents a player in an active game.
 */
export type Player = {
    readonly seat: SeatNumber
}

/**
 * A number used to identify a seat in a game, one for each player.
 */
export type SeatNumber = 1 | SeatCount

/**
 * A number of seats used in a game (aka, number of players).
 */
export type SeatCount = 2 | 3 | 4 | 5 | 6 | 7 | 8

export const MIN_SEAT_COUNT: SeatCount = 2
export const ALL_SEAT_COUNTS: ReadonlyArray<SeatCount> = [2, 3, 4, 5, 6, 7, 8] as const

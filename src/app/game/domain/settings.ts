import type { SeatCount } from "@/app/game/domain/player"

/**
 * Settings that define the rules and structure of a game.
 */
export type GameSettings = {
    readonly seatCount: SeatCount
    readonly includedModules: IncludedModules
}

type ModuleIndex = number
/**
 * A list of indexes representing the modules included in the game.
 */
type IncludedModules = ReadonlyArray<ModuleIndex>

export function createGameSettings(seatCount: SeatCount, includedModules: IncludedModules): GameSettings {
    return {
        seatCount: seatCount,
        includedModules: includedModules,
    }
}

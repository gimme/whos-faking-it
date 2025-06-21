import type { Game, GameCode } from "@/app/game/domain/game"
import type { GameSettings } from "@/app/game/domain/settings"

export interface GameService {
    createNewGame: (settings: GameSettings) => Game
    changeSettings: (game: Game, settings: GameSettings) => Game
    findByCode: (code: GameCode) => Game | undefined
}

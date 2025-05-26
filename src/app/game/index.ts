import type { GameService } from "@/app/game/application/GameService"
import { DeterministicGameGenerator } from "@/app/game/infrastructure/DeterministicGameGenerator"

const gameService = DeterministicGameGenerator()

export function useGameService(): GameService {
    return gameService
}

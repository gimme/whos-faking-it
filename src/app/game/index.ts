import { useMemo } from "react"

import type { GameService } from "@/app/game/application/GameService"
import type { Game } from "@/app/game/domain/game"
import { DeterministicGameGenerator } from "@/app/game/infrastructure/DeterministicGameGenerator"

const gameService = DeterministicGameGenerator()

export function useGameService(): GameService {
    return gameService
}

export function useGame(gameCode: string): Game | undefined {
    const gameService = useGameService()
    return useMemo(() => gameService.findByCode(gameCode), [gameCode, gameService])
}

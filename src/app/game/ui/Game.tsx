import { useMemo } from "react"
import { useParams } from "react-router"

import { useGameService } from "@/app/game"

// TODO: Replace this temporary implementation
export default function Game() {
    const gameService = useGameService()

    const params = useParams()
    const gameCode = params.gameCode
    const seat = Number(params.seat)
    if (!gameCode) throw new Error("Game code is required")
    if (!seat) throw new Error("Seat is required")

    const game = useMemo(() => gameService.findByCode(gameCode), [gameCode, gameService])

    return (
        <div>
            {game ? (
                <div>
                    <h1>Game Code: {game.code}</h1>
                    <h2>Settings</h2>
                    <pre>{JSON.stringify(game.settings, null, 2)}</pre>
                    <h2>Players</h2>
                    <ul>
                        {game.players.map((player) => (
                            <li key={player.seat}>
                                Seat {player.seat} {player.seat == seat ? "(You)" : ""}
                            </li>
                        ))}
                    </ul>
                    <h2>Rounds</h2>
                    <ul>
                        {game.rounds.map((round) => (
                            <li key={round.roundNumber}>
                                Round {round.roundNumber}
                                <ul>
                                    <li>Real prompt: {round.activeCard.realPrompt}</li>
                                    <li>Fake prompt: {round.activeCard.fakePrompt}</li>
                                    <li>Tags: {Array.from(round.activeCard.tags).join(", ")}</li>
                                    <li>Roles: {round.playerRoles.join(", ")}</li>
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Game not found</p>
            )}
        </div>
    )
}

import { useParams } from "react-router"

import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined"
import { Button, Stack, Typography } from "@mui/material"

import { useGame } from "@/app/game"
import type { Player } from "@/app/game/domain/player"
import { GameErrorPage } from "@/app/game/ui/GameErrorPage"
import strings from "@/assets/strings"
import { MainContainer } from "@/components/MainContainer"
import { useAppNavigate } from "@/useAppNavigate"

export default function SeatingPage() {
    const appNavigate = useAppNavigate()

    const { gameCode } = useParams()
    if (!gameCode) throw new Error("Game code is required")

    const game = useGame(gameCode)
    if (!game) return <GameErrorPage message={strings.game.gameNotFound} />

    const handleSelectSeat = (player: Player) => {
        appNavigate.selectSeat(gameCode, player.seat)
    }

    return (
        <MainContainer>
            <Stack spacing={5} width={"100%"}>
                <Typography component="h1" variant="h4" align="center">
                    {strings.room.selectSeat}
                </Typography>
                <Stack spacing={5}>
                    {game.players.map((player) => (
                        <Button
                            key={player.seat}
                            aria-label={`seat-${player.seat}`}
                            variant="outlined"
                            size="large"
                            onClick={() => handleSelectSeat(player)}
                        >
                            {player.seat}
                        </Button>
                    ))}
                </Stack>
                <Stack direction={"row"} color="text.secondary" spacing={1} justifyContent="center">
                    <WarningAmberOutlinedIcon />
                    <Typography component="p" align="center">
                        {strings.room.uniqueSeat}
                    </Typography>
                </Stack>
            </Stack>
        </MainContainer>
    )
}

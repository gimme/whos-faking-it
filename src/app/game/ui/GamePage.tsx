import { useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router"

import { Box, Button, Stack, Typography } from "@mui/material"

import { useGameService } from "@/app/game"
import { getNextRound, getRound } from "@/app/game/domain/game"
import { viewCardAsPlayer } from "@/app/game/domain/round"
import strings from "@/assets/strings"
import { MainContainer } from "@/components/MainContainer"

// TODO: Add whiteboard functionality
export default function GamePage() {
    const navigate = useNavigate()
    const gameService = useGameService()
    const params = useParams()

    const [displayPrompt, setDisplayPrompt] = useState(false)
    const [revealRealPrompt, setRevealRealPrompt] = useState(false)

    const gameCode = params.gameCode
    const seat = Number(params.seat)
    const roundNumber = Number(params.roundNumber)

    if (!gameCode) throw new Error("Game code is required")
    if (!seat) throw new Error("Seat is required")
    if (!roundNumber) throw new Error("Round number is required")

    const game = useMemo(() => gameService.findByCode(gameCode), [gameCode, gameService])

    if (!game) {
        return (
            <MainContainer>
                <Typography component="h1" variant="h4" align="center">
                    {strings.room.gameNotFound}
                </Typography>
            </MainContainer>
        )
    }

    const round = getRound(game, roundNumber)

    if (!round) {
        return (
            <MainContainer>
                <Typography component="h1" variant="h4" align="center">
                    {strings.room.roundNotFound}
                </Typography>
            </MainContainer>
        )
    }

    const player = game.players.find((p) => p.seat === seat)!
    const roleCardView = viewCardAsPlayer(round, player)
    const prompt = roleCardView.prompt
    const realPrompt = round.activeCard.realPrompt

    const handleClickPrompt = () => {
        setDisplayPrompt((prev) => !prev)
        setRevealRealPrompt(false)
    }

    const handleClickRevealRealPrompt = () => {
        setDisplayPrompt(true)
        setRevealRealPrompt(true)
    }

    const handleNextRound = () => {
        setDisplayPrompt(false)
        setRevealRealPrompt(false)

        const nextRound = getNextRound(game, round)
        if (nextRound === undefined) {
            // Reset to first round if no next round exists
            navigate(`/${gameCode}/${seat}/1`)
            return
        }
        navigate(`/${gameCode}/${seat}/${nextRound.roundNumber}`)
    }

    return (
        <MainContainer>
            <Stack spacing={5} width={"100%"} justifyContent={"center"}>
                <Typography component="h1" variant="h4" align="center">
                    {strings.game.round} {roundNumber}
                </Typography>
                <Stack spacing={2}>
                    <Typography component="h2" variant="h5" align="center">
                        {strings.game.prompt}:
                    </Typography>
                    <Box
                        onClick={handleClickPrompt}
                        sx={{
                            padding: 2,
                            cursor: "pointer",
                            border: "2px dashed",
                            borderColor: "divider",
                            borderRadius: 2,
                            minHeight: "150px",
                            alignContent: "center",
                        }}
                    >
                        {displayPrompt ? (
                            revealRealPrompt ? (
                                <Typography component="p" variant="body1" align="center" color={"green"}>
                                    {realPrompt}
                                </Typography>
                            ) : (
                                <Typography component="p" variant="body1" align="center">
                                    {prompt}
                                </Typography>
                            )
                        ) : (
                            <>
                                <Typography component="p" variant="body1" align="center" color="text.secondary">
                                    {strings.game.displayYourPrompt}
                                </Typography>
                            </>
                        )}
                    </Box>
                </Stack>
                {player.seat === 1 && (
                    <Button variant="contained" onClick={handleClickRevealRealPrompt}>
                        {strings.game.revealRealPrompt}
                    </Button>
                )}
                <Button variant="outlined" onClick={handleNextRound}>
                    {strings.game.next}
                </Button>
            </Stack>
        </MainContainer>
    )
}

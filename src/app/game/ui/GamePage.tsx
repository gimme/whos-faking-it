import { useState } from "react"
import { useParams, useSearchParams } from "react-router"

import BrushIcon from "@mui/icons-material/Brush"
import CloseIcon from "@mui/icons-material/Close"
import { Box, Button, Fab, Stack, Typography } from "@mui/material"

import { useGame } from "@/app/game"
import { getNextRound, getRound } from "@/app/game/domain/game"
import { viewCardAsPlayer } from "@/app/game/domain/round"
import { GameErrorPage } from "@/app/game/ui/GameErrorPage"
import { WhiteboardPage } from "@/app/whiteboard/WhiteboardPage"
import strings from "@/assets/strings"
import { MainContainer } from "@/components/MainContainer"
import { useAppNavigate } from "@/useAppNavigate"

export default function GamePage() {
    const appNavigate = useAppNavigate()
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()

    const [displayPrompt, setDisplayPrompt] = useState(false)
    const [revealRealPrompt, setRevealRealPrompt] = useState(false)

    const gameCode = params.gameCode
    const seat = Number(params.seat)
    const roundNumber = Number(params.roundNumber)

    if (!gameCode) throw new Error("Game code is required")
    if (!seat) throw new Error("Seat is required")
    if (!roundNumber) throw new Error("Round number is required")

    const showWhiteboard = searchParams.has("whiteboard")

    const game = useGame(gameCode)
    if (!game) return <GameErrorPage message={strings.game.gameNotFound} />

    const round = getRound(game, roundNumber)
    if (!round) return <GameErrorPage message={strings.game.roundNotFound} />

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
            // Intentionally navigate out of bounds
            appNavigate.playRound(gameCode, seat, round.roundNumber + 1)
            return
        }
        appNavigate.playRound(gameCode, seat, nextRound.roundNumber)
    }

    const handleToggleWhiteboard = () => {
        if (showWhiteboard) {
            appNavigate.back()
        } else {
            setSearchParams((searchParams) => {
                searchParams.set("whiteboard", "")
                return searchParams
            })
        }
    }

    return (
        <>
            <MainContainer>
                <Stack spacing={5} width={"100%"} justifyContent={"center"}>
                    <Typography component="h1" variant="h4" align="center">
                        {strings.game.round} {roundNumber}
                    </Typography>
                    <Stack spacing={2}>
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
                                backgroundColor: revealRealPrompt ? "primary.shade" : undefined,
                            }}
                        >
                            {displayPrompt ? (
                                <Typography component="p" variant="body1" align="center">
                                    {revealRealPrompt ? realPrompt : prompt}
                                </Typography>
                            ) : (
                                <Typography component="p" variant="body1" align="center" color="text.secondary">
                                    {strings.game.displayYourPrompt}
                                </Typography>
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
                <Fab
                    color="secondary"
                    aria-label="open whiteboard"
                    style={{ position: "fixed", bottom: 16, right: 16 }}
                    onClick={handleToggleWhiteboard}
                >
                    {showWhiteboard ? <CloseIcon /> : <BrushIcon />}
                </Fab>
            </MainContainer>
            <WhiteboardPage hidden={!showWhiteboard} />
        </>
    )
}

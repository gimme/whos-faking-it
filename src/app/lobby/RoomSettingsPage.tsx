import { useEffect, useMemo, useState } from "react"

import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import {
    Button,
    IconButton,
    InputAdornment,
    InputLabel,
    Snackbar,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material"

import { useGameService } from "@/app/game"
import type { Game } from "@/app/game/domain/game"
import type { SeatCount } from "@/app/game/domain/player"
import { type GameSettings, type IncludedModules, createGameSettings } from "@/app/game/domain/settings"
import { playableModules } from "@/assets/prompts/modules"
import strings from "@/assets/strings"
import { MainContainer } from "@/components/MainContainer"
import { useAppNavigate } from "@/useAppNavigate"

export default function RoomSettingsPage() {
    const appNavigate = useAppNavigate()
    const gameService = useGameService()
    const modules = playableModules

    const [open, setOpen] = useState(false)
    const [seatCount, setSeatCount] = useState<SeatCount>(4)
    // TODO: Configurable module selection
    const [includedModules] = useState<IncludedModules>(modules.map((_, index) => index))

    const settings: GameSettings = useMemo(
        () => createGameSettings(seatCount, includedModules),
        [seatCount, includedModules],
    )
    const [game, setGame] = useState<Game>(gameService.createNewGame(settings))
    const gameCode = game.code

    useEffect(() => {
        setGame((prevGame) => gameService.changeSettings(prevGame, settings))
    }, [gameService, settings])

    const handleStart = () => {
        appNavigate.joinRoom(gameCode)
    }

    const handleCopy = () => {
        window.navigator.clipboard.writeText(gameCode).then(() => {
            // TODO: show a notification or feedback to the user
            console.log("Game code copied to clipboard")
            setOpen(true)
        })
    }

    const SeatCountSelect = () => (
        <Stack spacing={2}>
            <InputLabel id="seatCount-label" style={{ textAlign: "center", fontSize: "1.2rem" }}>
                <strong>{strings.room.seatCount}:</strong>
            </InputLabel>
            <Stack direction="row" spacing={2} useFlexGap flexWrap={"wrap"} justifyContent={"center"}>
                {[3, 4, 5, 6, 7, 8].map((count) => (
                    <Button
                        key={count}
                        variant={seatCount === count ? "contained" : "outlined"}
                        value={count.toString()}
                        onClick={() => setSeatCount(count as SeatCount)}
                        aria-label={`seat-count-${count}`}
                        style={{ minWidth: "90px", minHeight: "60px" }}
                    >
                        {count}
                    </Button>
                ))}
            </Stack>
        </Stack>
    )

    const GameCodeOutput = () => (
        <TextField
            value={gameCode}
            fullWidth
            label={strings.common.code}
            onFocus={(event) => {
                event.target.select()
            }}
            slotProps={{
                htmlInput: {
                    readOnly: true,
                },
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <Tooltip title={strings.common.copyToClipboard}>
                                <IconButton onClick={handleCopy} edge="end">
                                    <ContentCopyIcon />
                                </IconButton>
                            </Tooltip>
                            <Snackbar
                                message={strings.common.copiedToClipboard}
                                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                autoHideDuration={2000}
                                onClose={() => setOpen(false)}
                                open={open}
                            />
                        </InputAdornment>
                    ),
                },
            }}
        />
    )

    const StartButton = () => (
        <Button aria-label={"start"} variant="contained" disabled={!gameCode} onClick={handleStart}>
            {strings.common.start}
        </Button>
    )

    return (
        <MainContainer>
            <Stack spacing={8}>
                <Typography component="h1" variant="h4" align="center">
                    {strings.createGame.title}
                </Typography>
                <SeatCountSelect />
                <Stack spacing={4}>
                    <GameCodeOutput />
                    <StartButton />
                </Stack>
            </Stack>
        </MainContainer>
    )
}

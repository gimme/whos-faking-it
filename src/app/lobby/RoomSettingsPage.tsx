import { useMemo, useState } from "react"
import { useNavigate } from "react-router"

import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { Button, IconButton, InputAdornment, InputLabel, Stack, TextField } from "@mui/material"

import { useGameService } from "@/app/game"
import type { Game } from "@/app/game/domain/game"
import type { SeatCount } from "@/app/game/domain/player"
import { type GameSettings, type IncludedModules, createGameSettings } from "@/app/game/domain/settings"
import { availableModules } from "@/assets/prompts/modules"
import strings from "@/assets/strings"
import { MainContainer } from "@/components/MainContainer"

export default function RoomSettingsPage() {
    const navigate = useNavigate()
    const gameService = useGameService()
    const modules = availableModules

    const [seatCount, setSeatCount] = useState<SeatCount>(4)
    // TODO: Configurable module selection
    const [includedModules] = useState<IncludedModules>(modules.map((_, index) => index))

    const settings: GameSettings = createGameSettings(seatCount, includedModules)
    const game: Game = useMemo(() => gameService.createNewGame(settings), [gameService, settings])
    const gameCode = game.code

    const handleStart = () => {
        navigate(`/${gameCode}`)
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(gameCode).then(() => {
            // Optionally, you can show a notification or feedback to the user
            console.log("Game code copied to clipboard")
        })
    }

    const SeatCountSelect = () => (
        <Stack spacing={2}>
            <InputLabel id="seatCount-label" sx={{ textAlign: "center", fontSize: "1.2rem" }}>
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
                        sx={{ minWidth: "90px", minHeight: "60px" }}
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
            slotProps={{
                htmlInput: {
                    readOnly: true,
                },
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleCopy} edge="end">
                                <ContentCopyIcon />
                            </IconButton>
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
            <Stack direction="column" spacing={4} sx={{ width: "100%" }}>
                <SeatCountSelect />
                <GameCodeOutput />
                <StartButton />
            </Stack>
        </MainContainer>
    )
}

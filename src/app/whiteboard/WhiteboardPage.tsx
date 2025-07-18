import { useRef } from "react"

import ClearIcon from "@mui/icons-material/DeleteForever"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"
import { Box, Fab, useTheme } from "@mui/material"

import { Whiteboard, type WhiteboardElement } from "@/app/whiteboard/Whiteboard"
import { useFullscreen } from "@/util/useFullscreen"

type WhiteboardPageProps = {
    hidden?: boolean
}

export function WhiteboardPage(props: WhiteboardPageProps) {
    const theme = useTheme()
    const whiteboardRef = useRef<WhiteboardElement>(null)
    const { isFullscreen, isFullscreenSupported, requestFullscreen, exitFullscreen } = useFullscreen()

    const handleClear = () => {
        whiteboardRef.current?.clearAll?.()
    }

    return (
        <Box
            style={{
                display: props.hidden ? "none" : undefined,
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            <Whiteboard
                ref={whiteboardRef}
                style={{
                    width: "100dvw",
                    height: "100dvh",
                }}
                boardColor={theme.palette.whiteboard}
                markerColor={theme.palette.text.primary}
            />
            {isFullscreenSupported && (
                <Fab
                    color="secondary"
                    aria-label="toggle fullscreen"
                    style={{ position: "fixed", top: 16, right: 16 }}
                    onClick={isFullscreen ? exitFullscreen : requestFullscreen}
                >
                    {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </Fab>
            )}
            <Fab
                color="secondary"
                aria-label="clear"
                style={{ position: "fixed", top: 16, left: 16 }}
                onClick={handleClear}
            >
                <ClearIcon />
            </Fab>
        </Box>
    )
}

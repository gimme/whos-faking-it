import { useEffect, useRef, useState } from "react"

import ClearIcon from "@mui/icons-material/DeleteForever"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"
import { Box, Fab, useTheme } from "@mui/material"

import { Whiteboard, type WhiteboardElement } from "@/app/whiteboard/Whiteboard"

type WhiteboardPageProps = {
    hidden?: boolean
}

export function WhiteboardPage(props: WhiteboardPageProps) {
    const theme = useTheme()
    const ref = useRef<HTMLDivElement>(null)
    const whiteboardRef = useRef<WhiteboardElement>(null)
    const [fullscreen, setFullscreen] = useState(false)

    useEffect(() => {
        const trackFullscreen = () => {
            const isFullscreen = !!document.fullscreenElement
            setFullscreen(isFullscreen)
        }
        document.addEventListener("fullscreenchange", trackFullscreen)
        return () => document.removeEventListener("fullscreenchange", trackFullscreen)
    }, [])

    const goFullscreen = () => {
        ref.current?.requestFullscreen?.()
    }

    const exitFullscreen = () => {
        if (document.fullscreenElement === ref.current) {
            document.exitFullscreen()
        }
    }

    const handleClear = () => {
        whiteboardRef.current?.clearAll?.()
    }

    return (
        <Box ref={ref} style={{ display: props.hidden ? "none" : undefined }}>
            <Whiteboard
                ref={whiteboardRef}
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
                boardColor={theme.palette.whiteboard}
                markerColor={theme.palette.text.primary}
            />
            <Fab
                color="primary"
                aria-label="toggle fullscreen"
                style={{ position: "fixed", top: 32, right: 32 }}
                onClick={fullscreen ? exitFullscreen : goFullscreen}
            >
                {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </Fab>
            <Fab
                color="primary"
                aria-label="clear"
                style={{ position: "fixed", top: 32, left: 32 }}
                onClick={handleClear}
            >
                <ClearIcon />
            </Fab>
        </Box>
    )
}

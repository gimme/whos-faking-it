import { useEffect, useRef, useState } from "react"
import CanvasDraw from "react-canvas-draw"

import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"
import { Box, Button, useTheme } from "@mui/material"

export function Whiteboard() {
    const theme = useTheme()
    const containerRef = useRef<null | HTMLDivElement>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)

    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement)
        document.addEventListener("fullscreenchange", handler)
        return () => document.removeEventListener("fullscreenchange", handler)
    }, [])

    const enterFullscreen = () => containerRef.current?.requestFullscreen?.()
    const exitFullscreen = () => document.exitFullscreen?.()

    return (
        <Box
            ref={containerRef}
            sx={{
                height: "100%",
                width: "100%",
                position: "relative",
            }}
        >
            <CanvasDraw
                brushRadius={10}
                lazyRadius={0}
                brushColor={theme.palette.text.primary}
                hideGrid={true}
                style={{
                    width: "100%",
                    height: "100%",
                    background: theme.palette.whiteboard,
                }}
            />
            <Button
                sx={{ position: "absolute", bottom: "30px", right: "30px" }}
                onClick={isFullscreen ? exitFullscreen : enterFullscreen}
            >
                {isFullscreen ? (
                    <FullscreenExitIcon fontSize="large" />
                ) : (
                    <FullscreenIcon fontSize="large" />
                )}
            </Button>
        </Box>
    )
}

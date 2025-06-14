import { useEffect, useRef, useState } from "react"
import CanvasDraw from "react-canvas-draw"

import ClearIcon from "@mui/icons-material/DeleteOutline"
import FullscreenIcon from "@mui/icons-material/Fullscreen"
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit"
import { Box, Button, useTheme } from "@mui/material"

export function Whiteboard() {
    const theme = useTheme()
    const containerRef = useRef<HTMLDivElement>(null)
    const whiteboardRef = useRef<CanvasDraw>(null)
    const [isFullscreen, setIsFullscreen] = useState(false)

    useEffect(() => {
        const handler = () => setIsFullscreen(!!document.fullscreenElement)
        document.addEventListener("fullscreenchange", handler)
        return () => document.removeEventListener("fullscreenchange", handler)
    }, [])

    const handleClear = () => {
        if (!whiteboardRef.current) return
        whiteboardRef.current.clear()
    }

    const enterFullscreen = () => containerRef.current?.requestFullscreen?.()
    const exitFullscreen = () => document.exitFullscreen?.()

    return (
        <Box ref={containerRef} height={"100%"} width={"100%"} position={"relative"}>
            <CanvasDraw
                ref={whiteboardRef}
                brushRadius={8}
                lazyRadius={0}
                brushColor={theme.palette.text.primary}
                hideGrid={true}
                hideInterface={true}
                style={{
                    width: "100%",
                    height: "100%",
                    background: theme.palette.whiteboard,
                }}
            />
            <Button
                style={{ position: "absolute", bottom: "30px", right: "30px" }}
                onClick={isFullscreen ? exitFullscreen : enterFullscreen}
            >
                {isFullscreen ? <FullscreenExitIcon fontSize="large" /> : <FullscreenIcon fontSize="large" />}
            </Button>
            <Button style={{ position: "absolute", top: "30px", left: "30px" }} onClick={handleClear}>
                <ClearIcon fontSize="large" />
            </Button>
        </Box>
    )
}

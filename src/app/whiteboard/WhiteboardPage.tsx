import { useEffect, useRef } from "react"

import { useTheme } from "@mui/material"

import { Whiteboard } from "@/app/whiteboard/Whiteboard"
import { useAppNavigate } from "@/useAppNavigate"

type WhiteboardPageProps = {
    hidden?: boolean
}

export function WhiteboardPage(props: WhiteboardPageProps) {
    const theme = useTheme()
    const appNavigate = useAppNavigate()
    const whiteboardRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (props.hidden) {
            if (document.fullscreenElement === whiteboardRef.current) {
                document.exitFullscreen()
            }
            return
        }

        whiteboardRef?.current?.requestFullscreen?.()

        const handler = () => {
            const isFullscreen = !!document.fullscreenElement
            if (!isFullscreen) {
                appNavigate.back()
            }
            console.log("Fullscreen change detected:", isFullscreen, props.hidden)
        }
        document.addEventListener("fullscreenchange", handler)
        return () => document.removeEventListener("fullscreenchange", handler)
    }, [props.hidden, whiteboardRef, appNavigate])

    return (
        <Whiteboard
            ref={whiteboardRef}
            style={{
                display: props.hidden ? "none" : undefined,
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }}
            boardColor={theme.palette.whiteboard}
            markerColor={theme.palette.text.primary}
        />
    )
}

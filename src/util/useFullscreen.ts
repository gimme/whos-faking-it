import { useEffect, useState } from "react"

export function useFullscreen() {
    const [isFullscreen, setIsFullscreen] = useState<boolean>(!!document.fullscreenElement)

    useEffect(() => {
        const trackFullscreen = () => setIsFullscreen(!!document.fullscreenElement)
        document.addEventListener("fullscreenchange", trackFullscreen)
        return () => document.removeEventListener("fullscreenchange", trackFullscreen)
    }, [])

    const requestFullscreen = (element: HTMLElement | null) => {
        element?.requestFullscreen?.()
    }

    const exitFullscreen = () => {
        if (!document.fullscreenElement) return
        document.exitFullscreen()
    }

    return { isFullscreen, requestFullscreen, exitFullscreen }
}

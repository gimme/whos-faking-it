import { useLayoutEffect, useState } from "react"

export function useFullscreen() {
    const [isFullscreen, setIsFullscreen] = useState<boolean>(!!document.fullscreenElement)

    useLayoutEffect(() => {
        const trackFullscreen = () => setIsFullscreen(!!document.fullscreenElement)
        trackFullscreen() // Initial check
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

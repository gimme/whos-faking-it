import { useLayoutEffect, useState } from "react"

import screenfull from "screenfull"

export function useFullscreen() {
    const [isFullscreen, setIsFullscreen] = useState<boolean>(screenfull.isFullscreen)

    useLayoutEffect(() => {
        if (!screenfull.isEnabled) {
            console.warn("Fullscreen API is not supported in this browser.")
            return
        }
        const trackFullscreen = () => setIsFullscreen(screenfull.isFullscreen)
        trackFullscreen() // Initial check
        screenfull.on("change", trackFullscreen)
        return () => {
            screenfull.off("change", trackFullscreen)
        }
    }, [])

    const requestFullscreen = () => screenfull.request()

    const exitFullscreen = () => screenfull.exit()

    return { isFullscreen, isFullscreenSupported: screenfull.isEnabled, requestFullscreen, exitFullscreen }
}

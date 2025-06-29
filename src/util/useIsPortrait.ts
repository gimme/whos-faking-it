import { useLayoutEffect, useState } from "react"

export const useIsPortrait: () => boolean = () => {
    const [orientationType, setOrientationType] = useState<OrientationType>(screen.orientation.type)

    useLayoutEffect(() => {
        const trackOrientation: (this: ScreenOrientation, ev: Event) => void = () => {
            setOrientationType(screen.orientation.type)
        }
        setOrientationType(screen.orientation.type) // Initial check
        screen.orientation.addEventListener("change", trackOrientation)
        return () => screen.orientation.removeEventListener("change", trackOrientation)
    }, [])

    return orientationType.startsWith("portrait")
}

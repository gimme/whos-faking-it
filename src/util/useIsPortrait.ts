import { useEffect, useState } from "react"

export const useIsPortrait: () => boolean = () => {
    const [orientationType, setOrientationType] = useState<OrientationType>(screen.orientation.type)

    useEffect(() => {
        const trackOrientation: (this: ScreenOrientation, ev: Event) => void = () => {
            setOrientationType(screen.orientation.type)
        }
        screen.orientation.addEventListener("change", trackOrientation)
        return () => screen.orientation.removeEventListener("change", trackOrientation)
    }, [])

    return orientationType.startsWith("portrait")
}

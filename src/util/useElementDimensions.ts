import React, { useLayoutEffect, useState } from "react"

export function useElementDimensions(ref: React.RefObject<HTMLElement | null>) {
    const [dimensions, setDimensions] = useState({
        width: ref.current?.clientWidth ?? 0,
        height: ref.current?.clientHeight ?? 0,
    })

    useLayoutEffect(() => {
        const element = ref.current!
        const handleResize = () => {
            setDimensions({
                width: element.clientWidth,
                height: element.clientHeight,
            })
        }

        const resizeObserver = new ResizeObserver(handleResize)
        handleResize() // Initial check
        resizeObserver.observe(element)
        return () => resizeObserver.disconnect()
    }, [ref])

    return dimensions
}

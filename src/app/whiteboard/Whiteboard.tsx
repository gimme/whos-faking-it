import React, { type KeyboardEvent, type RefObject, useLayoutEffect, useRef, useState } from "react"

type WhiteboardProps = {
    boardColor: string
    markerColor: string
    style?: React.CSSProperties
    ref?: RefObject<HTMLCanvasElement | null>
}

export function Whiteboard(props: WhiteboardProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const mergedRef = (node: HTMLCanvasElement) => {
        if (props.ref) {
            props.ref.current = node
        }
        canvasRef.current = node
    }
    const [strokes, setStrokes] = useState<Stroke[]>([])
    const [undoCount, setUndoCount] = useState(0)
    const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null)
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    })

    const renderCanvas = (canvas: HTMLCanvasElement) => {
        canvas.width = dimensions.width
        canvas.height = dimensions.height

        const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!

        const strokesWithUndo = strokes.slice(0, strokes.length - undoCount)
        const strokesToRender = [...strokesWithUndo, ...(currentStroke ? [currentStroke] : [])]
        strokesToRender.forEach((stroke) => {
            ctx.strokeStyle = props.markerColor
            ctx.lineCap = "round"
            ctx.lineWidth = 8

            ctx.beginPath()
            ctx.moveTo(stroke.startingPoint.x, stroke.startingPoint.y)
            ctx.lineTo(stroke.startingPoint.x, stroke.startingPoint.y)
            stroke.points.forEach((point) => {
                ctx.lineTo(point.x, point.y)
            })
            ctx.stroke()
        })
    }

    if (canvasRef.current) {
        renderCanvas(canvasRef.current)
    }

    useLayoutEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        handleResize() // Set initial dimensions
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const addStroke = (stroke: Stroke) => {
        setStrokes((prevStrokes) => [...prevStrokes, stroke])
    }

    const completeCurrentStroke = () => {
        if (!currentStroke) return
        clearUndone()
        addStroke(currentStroke)
        setCurrentStroke(null)
    }

    const clearUndone = () => {
        if (undoCount === 0) return
        setStrokes((prevStrokes) => prevStrokes.slice(0, -undoCount))
        setUndoCount(0)
    }

    const undo = () => {
        completeCurrentStroke()
        setUndoCount((prev) => {
            if (prev === strokes.length) return prev
            return prev + 1
        })
    }

    const redo = () => {
        setUndoCount((prev) => {
            if (prev === 0) return 0
            return prev - 1
        })
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === "z") {
            e.preventDefault()
            undo()
        } else if (e.ctrlKey && e.shiftKey && e.key === "Z") {
            e.preventDefault()
            redo()
        } else if (e.key === "Escape" && currentStroke) {
            e.preventDefault()
            setCurrentStroke(null)
        }
    }

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        const { offsetX, offsetY } = getOffset(e)
        setCurrentStroke({
            startingPoint: { x: offsetX, y: offsetY },
            points: [],
        })
    }

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        const { offsetX, offsetY } = getOffset(e)
        setCurrentStroke((prevStroke) => {
            if (!prevStroke) return null
            return {
                ...prevStroke,
                points: [...prevStroke.points, { x: offsetX, y: offsetY }],
            }
        })
    }

    const stopDrawing = completeCurrentStroke

    const getOffset = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current
        const rect = canvas?.getBoundingClientRect()
        const x = "touches" in e ? e.touches[0].clientX - (rect?.left ?? 0) : e.nativeEvent.offsetX
        const y = "touches" in e ? e.touches[0].clientY - (rect?.top ?? 0) : e.nativeEvent.offsetY
        return {
            offsetX: x,
            offsetY: y,
        }
    }

    return (
        <canvas
            ref={mergedRef}
            style={{ touchAction: "none", display: "block", backgroundColor: props.boardColor, ...props.style }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        />
    )
}

type Stroke = {
    startingPoint: Point
    points: Point[]
}
type Point = {
    x: number
    y: number
}

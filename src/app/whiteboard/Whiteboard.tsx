import React, { type KeyboardEvent, type RefObject, useImperativeHandle, useRef, useState } from "react"

import { useElementDimensions } from "@/util/useElementDimensions"
import { useIsPortrait } from "@/util/useIsPortrait"

export type WhiteboardProps = {
    boardColor: string
    markerColor: string
    style?: React.CSSProperties
    ref?: RefObject<WhiteboardElement | null>
}

export type WhiteboardElement = {
    clearAll: () => void
    undo: () => void
    redo: () => void
}

export function Whiteboard(props: WhiteboardProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useImperativeHandle(props.ref, () => ({
        clearAll() {
            clearAll()
        },
        undo() {
            undo()
        },
        redo() {
            redo()
        },
        canvasRef: canvasRef,
    }))

    const isPortrait = useIsPortrait()

    const [strokes, setStrokes] = useState<Stroke[]>([])
    const [undoCount, setUndoCount] = useState(0)
    const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null)
    const dimensions = useElementDimensions(canvasRef)

    const renderCanvas = (canvas: HTMLCanvasElement) => {
        canvas.width = dimensions.width
        canvas.height = dimensions.height

        const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!

        const drawStroke = (stroke: Stroke) => {
            ctx.strokeStyle = props.markerColor
            ctx.lineCap = "round"
            ctx.lineJoin = "round"
            ctx.lineWidth = 10

            ctx.beginPath()
            const startingPoint = stroke.startingPoint
            ctx.moveTo(startingPoint.x, startingPoint.y)
            ctx.lineTo(startingPoint.x, startingPoint.y)

            stroke.points.forEach((point) => {
                ctx.lineTo(point.x, point.y)
            })
            ctx.stroke()
        }

        ctx.save()
        ctx.translate(0.5, 0.5)

        if (isPortrait) {
            ctx.rotate(Math.PI / 2)
            ctx.translate(0, -canvas.width)
        }

        const strokesWithUndo = strokes.slice(0, strokes.length - undoCount)
        const strokesToRender = [...strokesWithUndo, ...(currentStroke ? [currentStroke] : [])]
        strokesToRender.forEach(drawStroke)

        ctx.restore()
    }

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

    const clearAll = () => {
        setStrokes([])
        setUndoCount(0)
        setCurrentStroke(null)
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
        if ("button" in e && e.button !== 0) return // Only left mouse button

        const point = getPoint(e)

        setCurrentStroke({
            startingPoint: point,
            points: [],
        })
    }

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        const point = getPoint(e)
        setCurrentStroke((prevStroke) => {
            if (!prevStroke) return null
            return {
                ...prevStroke,
                points: [...prevStroke.points, point],
            }
        })
    }

    const stopDrawing = completeCurrentStroke

    const getPoint: (e: React.MouseEvent | React.TouchEvent) => Point = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current
        const rect = canvas?.getBoundingClientRect()
        const canvasX = "touches" in e ? e.touches[0].clientX - (rect?.left ?? 0) : e.nativeEvent.offsetX
        const canvasY = "touches" in e ? e.touches[0].clientY - (rect?.top ?? 0) : e.nativeEvent.offsetY

        return translatePointFromPortrait({ x: canvasX, y: canvasY })
    }

    const translatePointFromPortrait = (point: Point): Point => {
        return {
            x: isPortrait ? point.y : point.x,
            y: isPortrait ? canvasRef.current!.width - point.x : point.y,
        }
    }

    if (canvasRef.current) {
        renderCanvas(canvasRef.current)
    }

    return (
        <canvas
            ref={canvasRef}
            style={{
                touchAction: "none",
                display: "block",
                backgroundColor: props.boardColor,
                ...props.style,
            }}
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

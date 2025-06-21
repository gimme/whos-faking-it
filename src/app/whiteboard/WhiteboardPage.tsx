import { Box, useTheme } from "@mui/material"

import { Whiteboard } from "@/app/whiteboard/Whiteboard"

type WhiteboardPageProps = {
    hidden?: boolean
}

export function WhiteboardPage(props: WhiteboardPageProps) {
    const theme = useTheme()

    return (
        <Box
            style={{
                display: props.hidden ? "none" : "block",
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            <Whiteboard boardColor={theme.palette.whiteboard} markerColor={theme.palette.text.primary} />
        </Box>
    )
}

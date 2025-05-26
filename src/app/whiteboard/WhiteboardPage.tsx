import { Box } from "@mui/material"

import { Whiteboard } from "@/app/whiteboard/Whiteboard"

export function WhiteboardPage() {
    return (
        <Box
            sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            <Whiteboard />
        </Box>
    )
}

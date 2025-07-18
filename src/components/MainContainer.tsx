import React from "react"

import { Container } from "@mui/material"

type Props = {
    children: React.ReactNode
}

/**
 * The base container for pages.
 */
export function MainContainer(props: Props) {
    return (
        <Container
            component="main"
            maxWidth="sm"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100dvh",
                padding: "30px 20px 60px 20px",
            }}
        >
            {props.children}
        </Container>
    )
}

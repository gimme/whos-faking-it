import { Typography } from "@mui/material"

import { MainContainer } from "@/components/MainContainer"

export type GameNotFoundPageProps = {
    message: string
}

export function GameErrorPage(props: GameNotFoundPageProps) {
    return (
        <MainContainer>
            <Typography component="h1" variant="h4" align="center">
                {props.message}
            </Typography>
        </MainContainer>
    )
}

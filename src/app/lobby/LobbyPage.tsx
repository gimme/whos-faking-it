import React, { useState } from "react"
import { useNavigate } from "react-router"

import { Button, Stack, TextField, Typography } from "@mui/material"

import strings from "@/assets/strings"
import { MainContainer } from "@/components/MainContainer"

export default function LobbyPage() {
    const navigate = useNavigate()
    const [joinCode, setJoinCode] = useState<string>("")

    const onChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setJoinCode(event.target.value.toLowerCase())
    }

    const handleJoin = () => {
        navigate(`/${joinCode}`)
    }

    const handleCreate = () => {
        navigate("/create")
    }

    return (
        <>
            <MainContainer>
                <Stack spacing={2} width={"100%"}>
                    <Typography component="h1" variant="h4" align="center">
                        {strings.meta.name}
                    </Typography>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="code"
                        type="text"
                        label={strings.common.code}
                        value={joinCode}
                        onChange={onChangeCode}
                    />
                    <Button aria-label={"join"} variant="contained" disabled={!joinCode} onClick={handleJoin}>
                        {strings.common.join}
                    </Button>
                    <Button aria-label={"create"} variant="outlined" onClick={handleCreate}>
                        {strings.common.create}
                    </Button>
                </Stack>
            </MainContainer>
        </>
    )
}

import { BrowserRouter, Route, Routes } from "react-router"

import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material"

import GamePage from "@/app/game/ui/GamePage"
import LobbyPage from "@/app/lobby/LobbyPage"
import RoomSettingsPage from "@/app/lobby/RoomSettingsPage"
import SeatingPage from "@/app/lobby/SeatingPage"
import { getTheme } from "@/theme"

export default function App() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

    return (
        <ThemeProvider theme={getTheme(prefersDarkMode)}>
            <CssBaseline />
            <BrowserRouter basename="/whos-faking-it">
                <Routes>
                    <Route path="/">
                        <Route index element={<LobbyPage />} />
                        <Route path="/create" element={<RoomSettingsPage />} />
                        <Route path="/:gameCode" element={<SeatingPage />} />
                        <Route path="/:gameCode/:seat/:roundNumber" element={<GamePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

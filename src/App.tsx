import { BrowserRouter, Route, Routes } from "react-router"

import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material"

import GamePage from "@/app/game/ui/GamePage"
import LobbyPage from "@/app/lobby/LobbyPage"
import RoomSettingsPage from "@/app/lobby/RoomSettingsPage"
import SeatingPage from "@/app/lobby/SeatingPage"
import { Redirect } from "@/components/Redirect"
import { getTheme } from "@/theme"

export default function App() {
    const prefersLightMode = useMediaQuery("(prefers-color-scheme: light)")

    return (
        <ThemeProvider theme={getTheme(!prefersLightMode)}>
            <CssBaseline />
            <BrowserRouter basename="/whos-faking-it">
                <Routes>
                    <Route path="/">
                        <Route index element={<LobbyPage />} />
                        <Route path="/create-game" element={<RoomSettingsPage />} />
                        <Route path="/:gameCode" element={<Redirect to={"/games/:gameCode"} />} />
                        <Route path="/games/:gameCode" element={<Redirect to={"/games/:gameCode/seats"} />} />
                        <Route path="/games/:gameCode/seats" element={<SeatingPage />} />
                        <Route
                            path="/games/:gameCode/seats/:seat"
                            element={<Redirect to={"/games/:gameCode/seats/:seat/rounds"} />}
                        />
                        <Route
                            path="/games/:gameCode/seats/:seat/rounds"
                            element={<Redirect to={"/games/:gameCode/seats/:seat/rounds/1"} />}
                        />
                        <Route path="/games/:gameCode/seats/:seat/rounds/:roundNumber" element={<GamePage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

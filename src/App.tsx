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
                    <Route index element={<LobbyPage />} />
                    <Route path="create-game" element={<RoomSettingsPage />} />
                    <Route path=":gameCode" element={<Redirect to="/games/:gameCode" />} />
                    <Route path="games/:gameCode">
                        <Route index element={<Redirect to="seats" />} />
                        <Route path="seats">
                            <Route index element={<SeatingPage />} />
                            <Route path=":seat">
                                <Route index element={<Redirect to="rounds" />} />
                                <Route path="rounds" element={<Redirect to="1" />} />
                                <Route path="rounds/:roundNumber" element={<GamePage />} />
                            </Route>
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

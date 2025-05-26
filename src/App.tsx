import { BrowserRouter, Route, Routes } from "react-router"

import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material"

import { WhiteboardPage } from "@/app/whiteboard/WhiteboardPage"
import { getTheme } from "@/theme"

export default function App() {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

    return (
        <ThemeProvider theme={getTheme(prefersDarkMode)}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path="/whos-faking-it">
                        <Route index element={<WhiteboardPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

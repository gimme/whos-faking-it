import { blue, purple } from "@mui/material/colors"
import { createTheme } from "@mui/material/styles"

export const getTheme = (darkMode?: boolean) =>
    darkMode ? darkTheme : lightTheme

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: blue[200],
        },
        secondary: {
            main: purple[200],
        },
        whiteboard: "#000",
    },
})

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: blue[500],
        },
        secondary: {
            main: purple[500],
        },
        whiteboard: "#fff",
    },
})

declare module "@mui/material/styles" {
    interface Palette {
        whiteboard: string
    }
    interface PaletteOptions {
        whiteboard: string
    }
}

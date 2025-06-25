import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
    base: "/whos-faking-it",
    plugins: [react()],
    resolve: {
        alias: {
            "@": "/src",
        },
    },
})

import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const amongUs: PromptCardSpec = {
    prompts: [
        "Who among you would you trust with your life?",
        "Who among you has the best fashion sense?",
        "Who among you swears the most?",
        "Who among you is most similar to yourself?",
        "Who among you is the funniest?",
        "Who among you is the most opinionated?",
        "Who among you is the most likely to go to jail?",
        "Who among you is the most likely to break something?",
        "Who among you is the most likely to become famous?",
        "Who among you is the most likely to become rich?",
    ],
}

export const amongUsModule: Module = {
    promptSpecs: [amongUs],
    minPlayers: 4,
}

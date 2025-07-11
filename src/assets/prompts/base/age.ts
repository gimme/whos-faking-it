import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const lowAge: PromptCardSpec = {
    realPrompts: ["What age do you feel like you are?", "What's a good age to be mentally?"],
    prompts: [
        "What's the youngest age a person should get engaged?",
        "What age is too young to have a kid?",
        "If you could be one age for the rest of your life, what would it be?",
        "What's a good age to have your first kid?",
        "What's a good age to be physically?",
        "What's a good age to start working?",
        "What age do you think the average adult feels like they are?",
        "What's a good age to buy your first house?",
        "What's a good age to move out?",
    ],
}

const midAge: PromptCardSpec = {
    prompts: ["What age is too old to have a kid?", "What's a good age to retire?"],
}

const oldAge: PromptCardSpec = {
    prompts: [
        "At what age do you think you will stop working?",
        "At what age do you have a weird feeling you will die?",
    ],
}

export const ageModule: Module = {
    promptSpecs: [lowAge, midAge, oldAge],
}

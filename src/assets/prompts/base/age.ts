import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const lowestAge: PromptCardSpec = {
    prompts: [
        "What's the youngest age you can remember?",
        "At what age should you get your first phone?",
        "At what age should a kid eat their first junk food?",
        "At what age would you be comfortable leaving a kid home alone?",
        "At what age would you allow a kid on social media?",
    ],
}

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
        "What's the youngest age a person should be allowed to vote?",
        "What's the youngest age a person should be allowed to drink alcohol?",
        "What's the youngest age a person should be allowed to get married?",
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
    promptSpecs: [lowestAge, lowAge, midAge, oldAge],
}

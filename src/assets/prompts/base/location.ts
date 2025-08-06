import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const vacation: PromptCardSpec = {
    realPrompts: [
        "What's your dream vacation spot?",
        "Name an overrated vacation spot.",
        "What vacation spot would you never want to visit?",
    ],
    fakePrompts: ["Name a small country."],
}

const liveAbroad: PromptCardSpec = {
    prompts: [
        "What's a foreign place you'd want to live in?",
        "What's a place you'd want to visit for vacation only and not live in?",
    ],
}

const country: PromptCardSpec = {
    prompts: [
        "If you couldn't live in your current country, where would you want to live?",
        "Which country has the most attractive people?",
        "Which country has the best food?",
        "Which country do you think is the most beautiful?",
        "Name a country you'd never want to live in.",
        { tags: ["trivia"], prompt: "Which country has the most tigers?" },
    ],
}

const location: PromptCardSpec = {
    realPrompts: ["If you could teleport anywhere right now, where would you go?"],
    prompts: [
        "What's the craziest place you've taken a dump?",
        "Name a good place to relax.",
        "What's the weirdest place you've fallen asleep?",
        "Name a good place to read a book.",
    ],
    fakePrompts: ["What's your favorite fast food restaurant?"],
}

export const locationModule: Module = {
    promptSpecs: [vacation, liveAbroad, country, location],
}

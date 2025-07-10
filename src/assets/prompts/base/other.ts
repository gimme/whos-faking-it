import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const bench: PromptCardSpec = {
    prompts: ["How much can you bench?"],
    fakePrompts: ["Pick a weight: 30-100 kg (or 65–225 lbs)."],
}

const squat: PromptCardSpec = {
    prompts: ["How much can you squat?"],
    fakePrompts: ["Pick a weight: 60-140 kg (or 135-315 lbs)."],
}

const videoGame: PromptCardSpec = {
    prompts: [
        "What video game requires the most skill?",
        "Name a video game you'd share with your kids.",
        "What's your all-time favorite video game?",
        "What is the objectively best video game ever made?",
        "What's the most chill video game?",
        "Name a video game that you haven't gotten into but seems fun.",
    ],
}

export const otherModule: Module = {
    promptSpecs: [bench, squat, videoGame],
}

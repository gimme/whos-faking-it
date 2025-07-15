import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const item: PromptCardSpec = {
    realPrompts: ["Name a good item to have during a zombie apocalypse?"],
    prompts: [
        "What's a good thing to have in your bag?",
        "What's a bad gift to receive?",
        "Name something you bring on vacation.",
        "Name something a collector might collect.",
        "Name something you'd never buy.",
        "Name an item you value a lot.",
        "Name an item you'd take camping.",
        "Name a strange thing you own.",
        "What's the weirdest thing you have in your pantry?",
    ],
    fakePrompts: ['Name an item that starts with "A".'],
}

const island: PromptCardSpec = {
    prompts: ["What item would you bring to a deserted island?", "What's a bad item to bring to a deserted island?"],
}

const purchase: PromptCardSpec = {
    prompts: ["What was your best purchase?", "What was your worst purchase?"],
}

const lottery: PromptCardSpec = {
    realPrompts: ["What's the first thing you'd buy after winning the lottery?"],
    fakePrompts: ["What's something expensive that you wouldn't want even if it was free?"],
}

export const itemModule: Module = {
    promptSpecs: [item, island, purchase, lottery],
}

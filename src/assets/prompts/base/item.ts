import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const item: PromptCardSpec = {
    realPrompts: ["What's the best item to have during a zombie apocalypse?"],
    prompts: [
        "What is a good thing to always keep in your bag?",
        "What's the worst gift to receive?",
        "Name something you bring on vacation.",
        "Name a strange thing you own.",
        "Name an item you value a lot.",
        "Name something a collector might collect.",
        "What item would you bring to a remote island?",
        "What's a bad item to bring to a remote island?",
    ],
    fakePrompts: ['Name an item that starts with "A".'],
}

const purchase: PromptCardSpec = {
    prompts: ["What was your best purchase?", "What was your worst purchase?"],
}

const lottery: PromptCardSpec = {
    realPrompts: ["What's the first thing you would buy after winning the lottery?"],
    fakePrompts: ["What's something expensive that you wouldn't want even if it was free?"],
}

export const itemModule: Module = {
    promptSpecs: [item, purchase, lottery],
}

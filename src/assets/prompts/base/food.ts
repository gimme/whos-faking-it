import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const food: PromptCardSpec = {
    prompts: [
        "What's your favorite food?",
        "What would you choose for your final meal?",
        "What was a food you loved as a kid?",
        "What's a good meal to cook for someone?",
        "What's a good breakfast meal?",
        "What's your comfort food?",
        "Name something you had for lunch or dinner this week.",
        "What's a food you have to try once?",
        "Name a food that's bad when cold.",
    ],
}

const breakfast: PromptCardSpec = {
    prompts: [
        "Name a food that's bad when warm.",
        "If you could fry any food, what would it be?",
        "Name something you would eat for breakfast.",
        "What breakfast food could you have for every meal?",
        "Name a breakfast food you wouldn't eat for breakfast.",
        "What's a good midnight snack?",
    ],
}

const sweet: PromptCardSpec = {
    prompts: ["What's a good dessert?", "What's a good snack?"],
}

const aquiredTaste: PromptCardSpec = {
    prompts: ["What's a food you can't stand?", "What's a food you learned to love?"],
}

export const foodModule: Module = {
    promptSpecs: [food, breakfast, sweet, aquiredTaste],
}

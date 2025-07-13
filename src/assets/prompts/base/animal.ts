import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const animal: PromptCardSpec = {
    realPrompts: ["If you could have the abilities of any animal, what animal would it be?"],
    prompts: [
        "Name an animal you could take in a fight.",
        "Name a cute animal.",
        "If you were an animal, what would you be?",
        "If you could live as any animal for a week, what would it be?",
        "If you could talk to any animal, what would it be?",
        "If you had to remove one animal from existence, what would it be?",
        "If you could tame any wild animal, what would you choose as a pet?",
        "What animal would you want as a companion in the apocalypse?",
        "What wild animal would you want as a pet?",
        "What animal do you think is secretly really smart?",
        "What animal are you irrationally afraid of?",
        "What animal is the friendliest?",
        { tags: ["trivia"], prompt: "What animal lives the longest?" },
        { tags: ["trivia"], prompt: "What animal has the biggest brain?" },
    ],
    fakePrompts: ["Name an animal.", "Name an insect.", "What's the biggest animal you've seen?"],
}

export const animalModule: Module = {
    promptSpecs: [animal],
}

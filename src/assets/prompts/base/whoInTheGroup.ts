import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const who: PromptCardSpec = {
    prompts: [
        "Who in the group would you trust with your life?",
        "Who in the group is the funniest?",
        "Who in the group is the most likely to go to jail?",
        "Who in the group is the most likely to break something?",
        "Who in the group has the best fashion sense?",
        "Who in the group swears the most?",
        "Who in the group is the most likely to become famous?",
        "Who in the group is the most likely to become rich?",
    ],
}

export const whoInTheGroupModule: Module = {
    promptSpecs: [who],
}

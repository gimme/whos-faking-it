import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const percent: PromptCardSpec = {
    realPrompts: [
        "If you really tried, how likely would you be to go pro in a sport (%)?",
        { tags: ["meta"], prompt: "How likely are you to find the impostor this round (%)?" },
    ],
    prompts: [
        "If you won the jackpot, how much of the winnings would you spend on yourself (%)?",
        "How likely is it that aliens exist (%)?",
        "If heaven is real, how likely are you to get in (%)?",
        "How much do your parents (or kids) love you (%)?",
        'How many people are "good" people (%)?',
        "What percentage of your day do you feel productive?",
        "What percentage of success do you think comes from luck and not hard work?",
        "What happy are you with your life (%)?",
        "What percentage of adults do you think are happy with their lives?",
        "How likely would you be to score a penalty against a professional goalie (%)?",
        "How likely are you to score a free throw (%)?",
    ],
    fakePrompts: [
        "How much do you tip at a restaurant (%)?",
        "Pick a percentage from 0–100%.",
        { tags: ["trivia"], prompt: "What percentage of people are left-handed?" },
        { tags: ["trivia"], prompt: "What percentage of water does a cucumber consist of?" },
    ],
}

const jackpot: PromptCardSpec = {
    prompts: [
        "If you won the jackpot, how much of the winnings would you give away (%)?",
        "If you won the jackpot, how much of the winnings would you keep for yourself (%)?",
    ],
}

export const percentModule: Module = {
    promptSpecs: [percent, jackpot],
}

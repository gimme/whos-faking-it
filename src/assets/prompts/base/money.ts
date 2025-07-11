import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const moneyLow: PromptCardSpec = {
    prompts: ["How much money is in your bank account right now?"],
    fakePrompts: ["Pick an amount of money from $0–$5,000."],
}

const moneyMedium: PromptCardSpec = {
    prompts: [
        "How much money would it take for you to run down the street naked right now?",
        "How much money would it take for you to spend 3 months in jail?",
        "How much money would you give your best friend if you won $100 million?",
        "How much money would it take for you to move to another city?",
        "If the Mona Lisa was put up for auction, how much would you bid?",
        "How much would you pay to go to space?",
    ],
    fakePrompts: ["Pick an amount of money from $0–$1,000,000 (using your preferred currency)."],
}

const weekInJail: PromptCardSpec = {
    prompts: ["How much money would it take for you to spend 1 week in jail?"],
    fakePrompts: [
        "How much money would it take for you to spend 1 day in jail?",
        "How much money would it take for you to spend 2 months in jail?",
    ],
}

const monthInJail: PromptCardSpec = {
    prompts: ["How much money would it take for you to spend 1 month in jail?"],
    fakePrompts: [
        "How much money would it take for you to spend 1 week in jail?",
        "How much money would it take for you to spend 1 year in jail?",
    ],
}

const yearInJail: PromptCardSpec = {
    prompts: ["How much money would it take for you to spend 1 year in jail?"],
    fakePrompts: [
        "How much money would it take for you to spend 1 month in jail?",
        "How much money would it take for you to spend 10 years in jail?",
    ],
}

const moneyHigh: PromptCardSpec = {
    prompts: ["How much would you spend on a house?"],
    fakePrompts: ["Pick an amount of money from $300,000–$2,000,000 (using your preferred currency)."],
}

const outfit: PromptCardSpec = {
    prompts: [
        "How much would you spend on a full new outfit?",
        "How much would you spend on a new pair of shoes?",
        "How much is your current outfit worth?",
        "How much do you spend on clothes per year?",
    ],
    fakePrompts: ["Pick an amount of money from $0–$1000 (using your preferred currency)."],
}

export const moneyModule: Module = {
    promptSpecs: [moneyLow, moneyMedium, moneyHigh, outfit, weekInJail, monthInJail, yearInJail],
}

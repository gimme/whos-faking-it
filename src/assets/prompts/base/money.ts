import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const howMuch: PromptCardSpec = {
    prompts: [
        "How much money is in your bank account right now?",
        "For how much money would you shave your head right now?",
        "For how much money would you dye your hair a crazy color right now?",
        "For how much money would you get a random tattoo right now?",
        "For how much money would you get a new piercing right now?",
        "For how much money would you run down the street naked right now?",
        "For how much money would you eat 8 raw eggs right now?",
        "How much would you pay for a meal at the best restaurant in the world?",
        "How much would you pay to go to the moon?",
        "How much would you pay to go to the international space station?",
        "How much would you pay to see the Titanic wreck?",
        "If the Mona Lisa was put up for auction, how much would you bid?",
    ],
    fakePrompts: ["Pick an amount from $0–$100,000 (using your preferred currency)."],
}

const spendOnPeople: PromptCardSpec = {
    prompts: [
        "If you won $10 million, how much would you give to your best friend?",
        "If you won $10 million, how much would you give to your parents (or kids)?",
        "If you won $10 million, how much would you give to charity?",
        "If you won $10 million, how much would you spend on yourself?",
        "If you won $10 million, how much would you keep in your bank account?",
    ],
}

const spendOnAHouse: PromptCardSpec = {
    prompts: [
        "If you won $10 million, how much would you spend on a house?",
        "If you won $10 million, how much would you spend on a vacation home?",
        "How much would you spend on a house?",
    ],
}

const leaveHome: PromptCardSpec = {
    prompts: [
        "For how much money would you agree to never live in your city again?",
        "For how much money would you agree to never live in your country again?",
    ],
}

const outfit: PromptCardSpec = {
    prompts: [
        "How much would you spend on a full new outfit?",
        "How much would you spend on a new pair of shoes?",
        "How much is your current outfit worth?",
        "How much do you spend on clothes per year?",
    ],
    fakePrompts: ["Pick an amount from $0–$1,000 (using your preferred currency)."],
}

const dayInJail: PromptCardSpec = {
    prompts: ["For how much money would you agree to do 24 hours in jail?"],
    fakePrompts: [
        "For how much money would you agree to do 3 hours in jail?",
        "For how much money would you agree to do 1 week in jail?",
    ],
}

const weekInJail: PromptCardSpec = {
    prompts: ["For how much money would you agree to do 1 week in jail?"],
    fakePrompts: [
        "For how much money would you agree to do 24 hours in jail?",
        "For how much money would you agree to do 1 month in jail?",
    ],
}

const monthInJail: PromptCardSpec = {
    prompts: ["For how much money would you agree to do 1 month in jail?"],
    fakePrompts: [
        "For how much money would you agree to do 1 week in jail?",
        "For how much money would you agree to do 3 months in jail?",
    ],
}

const monthsInJail: PromptCardSpec = {
    prompts: ["For how much money would you agree to do 3 months in jail?"],
    fakePrompts: [
        "For how much money would you agree to do 1 month in jail?",
        "For how much money would you agree to do 1 year in prison?",
    ],
}

const yearInJail: PromptCardSpec = {
    prompts: ["For how much money would you agree to do 1 year in prison?"],
    fakePrompts: [
        "For how much money would you agree to do 3 months in jail?",
        "For how much money would you agree to do 3 years in prison?",
    ],
}

const yearsInJail: PromptCardSpec = {
    prompts: ["For how much money would you agree to do 3 years in prison?"],
    fakePrompts: [
        "For how much money would you agree to do 1 year in prison?",
        "For how much money would you agree to do 6 years in prison?",
    ],
}

const inJailModule: Module = {
    promptSpecs: [dayInJail, weekInJail, monthInJail, monthsInJail, yearInJail, yearsInJail],
    maxCards: 3,
}

export const moneyModule: Module = {
    promptSpecs: [howMuch, spendOnPeople, spendOnAHouse, outfit, leaveHome],
    subModules: [inJailModule],
}

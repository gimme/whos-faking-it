import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const screenTime: PromptCardSpec = {
    prompts: [
        "How many hours of screen time do you get per day?",
        "How many hours of screen time would you allow your kids per day?",
    ],
}

const sleep: PromptCardSpec = {
    prompts: [
        "How much sleep do you usually get per night?",
        "How much sleep do you think the average person gets?",
        "What's the lowest amount of sleep you've gotten in the last week?",
        "What's the most amount of sleep you've gotten in the last week?",
    ],
}

const minutes: PromptCardSpec = {
    prompts: [
        "How long is your typical shower?",
        "How long does it take you to get ready in the morning?",
        "How long does it take you to get ready for bed?",
        "How long does it take you to get ready when going out?",
        "How long does it take you to get ready for work?",
        "How long does it take you to fall asleep?",
        "How long do you stay in bed before trying to sleep?",
        "How long do you stay in bed after waking up?",
        "How long does it take you to eat breakfast?",
        "How long does it take you to cook dinner?",
        "How long does it take you to commute to work?",
        "How much time do you spend watching TV per day?",
        "How much time do you spend on social media per day?",
        "How much time do you spend reading per day?",
        "How much time do you spend on your hobbies per day?",
        {
            tags: ["trivia"],
            prompt: "How long does it take for a ray of light to travel from the sun to the earth?",
        },
    ],
    fakePrompts: ["Pick a number of minutes from 1–60."],
}

const hours: PromptCardSpec = {
    prompts: [
        "How long does it take you to get ready for a vacation?",
        "How long does it take you to buy groceries?",
        "How long does it take you to clean your whole home?",
        "How much time do you spend on your phone per day?",
        "How much time do you think the average person spends on their phone per day?",
        "How much time do you spend working per day?",
        "How much time do you spend exercising per week?",
        "How much time do you spend on your hobbies per week?",
        "How much time do you spend exercising per week?",
        "How much time do you think the average healthy person spends exercising per week?",
        "How much time do you spend with friends per week?",
        "How much time do you spend with family per week?",
        "How much time do you spend doing chores per week?",
    ],
    fakePrompts: ["Pick a number of hours from 1–7."],
}

const days: PromptCardSpec = {
    prompts: [
        "How long could you fast?",
        "How long could you go without the internet?",
        "How long could you go without your phone?",
        "What's the longest you've gone without pooping?",
        "What's the longest you've gone without showering?",
        "Not counting today, how long has it been since your last shower?",
        "How long has it been since you washed your bedsheets?",
        "How long would you survive in the zombie apocalypse?",
    ],
    fakePrompts: ["Pick a number of days from 1–10."],
}

const months: PromptCardSpec = {
    prompts: ["How long should you date someone before moving in together?"],
    fakePrompts: ["Pick a number of months from 1–12."],
}

const years: PromptCardSpec = {
    prompts: [
        "How long should you date someone before getting engaged?",
        "How long should you date someone before marrying them?",
        "How long have you had your current phone?",
        "For how many years did you believe in Santa?",
        "How long did you live in your childhood home?",
        "How long was your longest relationship?",
        "How long should you stay at the same job?",
    ],
    fakePrompts: ["Pick a number of years from 1–10."],
}

const howLongItTakesYou: PromptCardSpec = {
    prompts: [
        "How long would it take you to learn a new language?",
        "How long would it take you to learn a new instrument?",
        "How long would it take you to become a professional athlete?",
        "How long would it take you to train for a marathon?",
        "How long would it take you to write a book?",
        "How long does it take you to read a book?",
    ],
    fakePrompts: ["Pick a duration, up to 1 year."],
}

const fasting: PromptCardSpec = {
    realPrompts: ["How long would fast for $50,000?"],
    fakePrompts: ["How long would fast for $1,000?", "How long would fast for $1,000,000?"],
}

const withoutSleep: PromptCardSpec = {
    realPrompts: ["How long would you go without sleep for $50,000?"],
    fakePrompts: [
        "How long would you go without sleep for $1,000?",
        "How long would you go without sleep for $1,000,000?",
    ],
}

const liveInTheWoods: PromptCardSpec = {
    realPrompts: ["How long would you live in the woods for $50,000?"],
    fakePrompts: [
        "How long would you live in the woods for $1,000?",
        "How long would you live in the woods for $1,000,000?",
    ],
}

const darkRoom: PromptCardSpec = {
    realPrompts: ["How long would you live in a pitch-black room without human contact for $100,000?"],
    fakePrompts: [
        "How long would you live in a pitch-black room without human contact for $10,000?",
        "How long would you live in a pitch-black room without human contact for $2,000,000?",
    ],
}

export const durationModule: Module = {
    promptSpecs: [
        screenTime,
        sleep,
        minutes,
        hours,
        days,
        months,
        years,
        howLongItTakesYou,
        fasting,
        withoutSleep,
        liveInTheWoods,
        darkRoom,
    ],
}

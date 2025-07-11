import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const activity: PromptCardSpec = {
    realPrompts: ["If you had to teach a class on something, what would your subject be?"],
    prompts: [
        "Name something you like to do with friends.",
        "Name something you like to do alone.",
        "Name something to do when bored.",
        "Name an activity that old people love.",
        "In what field do you think you could set a world record?",
        "What's something you're secretly good at?",
    ],
    fakePrompts: ["Name a sport you would never play.", "Name something that's part of your daily routine."],
}

const sport: PromptCardSpec = {
    prompts: [
        "Name a sport you would never play.",
        "Name a sport you loved as a kid.",
        "Name a sport you tried and then quickly gave up on.",
        "What sport do you think you could go pro in?",
        "What's the hardest sport to go pro in?",
        "What's the easiest sport to go pro in?",
        "What's your favorite sport to watch?",
        "Name an overrated sport.",
        "Name an underrated sport.",
        "Name an underrated sport to watch.",
        "What sport do you wish you could exercise more often?",
        "What sport do you wish you had started exercising early as a kid?",
        "What sport or physical activity could you beat everyone here at?",
    ],
}

const weirdHobby: PromptCardSpec = {
    prompts: [
        "Name a hobby you picked up and then quickly abandoned.",
        "What's the most unusual hobby you have or know someone who has?",
    ],
}

const goodFirstDate: PromptCardSpec = {
    realPrompts: ["What's a good first date idea?"],
    fakePrompts: ["What's a bad first date idea?", "Name an activity that is really fun to do with friends."],
}

const badFirstDate: PromptCardSpec = {
    prompts: ["What's a bad activity for a first date?", "Name an activity that would be very fun for a first date."],
}

export const activityModule: Module = {
    promptSpecs: [activity, sport, weirdHobby, goodFirstDate, badFirstDate],
}

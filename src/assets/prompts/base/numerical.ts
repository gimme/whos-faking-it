import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const howManyTimesPer: PromptCardSpec = {
    prompts: [
        "How many times per day do you go to the bathroom?",
        "How many times per week do you take a shower?",
        "How many times per week do you brush your teeth?",
        "How many times per week do you drink coffee?",
        "How many times per week do you exercise?",
        "How many times per week do you watch TV?",
        "How many times per week do you poop?",
        "How many times per week do you do laundry?",
        "How many times per week do you wash your dishes?",
        "How many videos do you watch per week?",
        "How many times per month do you buy groceries?",
        "How many times per month do you eat out?",
        "How many times per month do you order takeout?",
        "How many times per month do you eat fast food?",
        "How many times per year do you leave your city?",
        "How many times per year do you get a haircut?",
        "How many times per year do you go to the cinema?",
        "How many books do you read per year?",
    ],
    fakePrompts: [
        "Pick a number from 0–20.",
        "Pick a number from 3–8.",
        "Pick a number from 0–5.",
        "Pick a number from 5–15.",
    ],
}

const howManyLow: PromptCardSpec = {
    prompts: [
        "How many kids would you at LEAST like to have?",
        "How many kids could you see yourself having at MOST?",
        "How many kids is the most you could handle without being miserable?",
        "What's the perfect amount of siblings in a family?",
        "How many showers is a good amount to take per week?",
        "How many different countries have you been in?",
        "How many hot dogs could you eat in 5 minutes?",
        "How many times do you wake up during the night?",
        "How many times could you juggle a soccer ball in a row?",
        "How many alcoholic drinks have you had in one night?",
        "How many condiments belong on a hot dog?",
        "Which Star Wars Episode is the best (1-9)?",
        "How many times have you seen Shawshank Redemption?",
        "How many times have you seen Shrek?",
        "How many cups of coffee have you had today?",
        "How many sports did you try as a kid?",
        "How many pairs of shoes do you own?",
        "How many close friends does the average person have?",
        "How many cavities has the average person had?",
        "How many people would you want in your zombie apocalypse survival team?",
        'How many different "best friends" have you had?',
        "How many children could you take in a fight?",
        "How many times have you been seriously injured?",
        "How many pizza slices could you eat in one sitting?",
        "How many different best friends have you had?",
        { tags: ["trivia"], prompt: "How many years did World War I last?" },
        { tags: ["trivia"], prompt: "How many manned missions have been sent to the moon?" },
        { tags: ["trivia"], prompt: "How many people have walked on the moon?" },
        { tags: ["trivia"], prompt: "How many sequels are there to The Fast and the Furious?" },
    ],
    fakePrompts: [
        "Pick a number from 0–10.",
        "Pick a number from 3–8.",
        "Pick a number from 0–5.",
        "Pick a number from 5–12.",
    ],
}

const howManyMedium: PromptCardSpec = {
    prompts: [
        "How many hot dogs could you eat in 1 day?",
        "How many hot dogs could you smuggle into a movie theatre without getting caught?",
        "How many marshmallows could you fit in your mouth?",
        "How many potato chips could you eat in 30 seconds?",
        "How many push-ups can you do in a row?",
        "How many words can you type in a minute?",
        "How many people would you want at your wedding?",
        "How many actors could you name in 1 minute?",
        "How many people would show up to your birthday party?",
        { tags: ["trivia"], prompt: "How many letters are there in the Arabic alphabet?" },
        { tags: ["trivia"], prompt: "How many eggs does a chicken lay in a month?" },
        { tags: ["trivia"], prompt: "How many players are there in an NFL team?" },
    ],
    fakePrompts: [
        "Pick a number from 10–100.",
        "Pick a number from 5–50.",
        "Pick a number from 20–100.",
        "Pick a number from 3–20.",
    ],
}

const howManyHigh: PromptCardSpec = {
    realPrompts: [
        "If you stopped aging physically but were forced to live until a certain age, what number would you pick?",
    ],
    prompts: [
        "How many songs are in your favorite playlist?",
        { tags: ["trivia"], prompt: "How many countries are there in the world?" },
        { tags: ["trivia"], prompt: "How many hieroglyphs are there?" },
        { tags: ["trivia"], prompt: "How many people have been to space?" },
        {
            tags: ["trivia"],
            prompt: "How many years does it take for a plastic bottle to completely disintegrate in the ocean?",
        },
    ],
    fakePrompts: ["Pick a number from 100–10,000."],
}

const hotDogsForCash: PromptCardSpec = {
    prompts: [
        "How many hot dogs would you eat today if you got $10 for each one?",
        "How many hot dogs would you eat today if you got $1 million for each one?",
    ],
}

const hotDogsInMinutes: PromptCardSpec = {
    realPrompts: ["How many hot dogs could you eat in 5 minutes?"],
    fakePrompts: ["How many hot dogs could you eat in 1 minute?", "How many hot dogs could you eat in 1 hour?"],
}

const hotDogsInHours: PromptCardSpec = {
    realPrompts: ["How many hot dogs could you eat in 1 hour?"],
    fakePrompts: ["How many hot dogs could you eat in 5 minutes?", "How many hot dogs could you eat in 1 day?"],
}

const hotDogsInDays: PromptCardSpec = {
    realPrompts: ["How many hot dogs could you eat in 1 day?"],
    fakePrompts: ["How many hot dogs could you eat in 1 hour?", "How many hot dogs could you eat in 1 week?"],
}

const howManyContinents: PromptCardSpec = {
    tags: ["trivia"],
    realPrompts: ["How many continents are there?"],
    fakePrompts: ["Pick a number from 3–8."],
}

const outOf10: PromptCardSpec = {
    prompts: [
        "How attractive would you rate yourself out of 10?",
        "Rate your cooking skills out of 10.",
        "Rate your fashion sense out of 10.",
        "Rate your acting skills out of 10.",
        "Rate your current mood out of 10.",
        "Rate Interstellar out of 10.",
        "Rate Shrek out of 10.",
        "Rate your work ethic 0-10.",
        "How feminist are you out of 10?",
        "How many free throws can you make out of 10?",
    ],
    fakePrompts: ["Pick a number from 0–10."],
}

export const numericalModule: Module = {
    tags: ["numerical"],
    promptSpecs: [
        howManyTimesPer,
        howManyLow,
        howManyMedium,
        howManyHigh,
        hotDogsForCash,
        hotDogsInMinutes,
        hotDogsInHours,
        hotDogsInDays,
        howManyContinents,
        outOf10,
    ],
}

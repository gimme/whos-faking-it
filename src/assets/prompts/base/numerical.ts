import type { Module } from "@/app/prompt/module"
import type { PromptSpec } from "@/app/prompt/prompt-spec"

const howManyTimesPer: PromptSpec = {
    prompt: [
        "How many times per day do you go to the bathroom?",
        "How many times per week do you take a shower?",
        "How many times per week do you brush your teeth?",
        "How many times per week do you eat fast food?",
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
        "How many times per year do you leave your city?",
        "How many times per year do you get a haircut?",
        "How many times per year do you go to the cinema?",
        "How many books do you read per year?",
    ],
    extraFakePrompt: "Pick a number between 0 and 20.",
}

const howManyLow: PromptSpec = {
    prompt: [
        "How many kids could you see yourself having?",
        "How many countries have you been in?",
        "How many people can you take on in a fight at once?",
        "How many potato chips can you eat in 20 seconds?",
        "How many hot dogs can you eat in 5 minutes?",
        "How many times do you wake up during the night?",
        "How many times can you juggle a ball in a row?",
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
        { tags: ["trivia"], prompt: "How many years did World War I last?" },
        { tags: ["trivia"], prompt: "How many manned missions have been sent to the moon?" },
        { tags: ["trivia"], prompt: "How many people have walked on the moon?" },
        { tags: ["trivia"], prompt: "How many sequels are there to The Fast and the Furious?" },
    ],
}

const howManyMedium: PromptSpec = {
    prompt: [
        "How many hot dogs can you eat in 10 minutes?",
        "How many hot dogs can you eat in an hour?",
        "How many hot dogs can you eat in a day?",
        "How many hot dogs can you smuggle into a movie theatre?",
        "How many marshmallows can you fit in your mouth?",
        "How many push-ups can you do in a row?",
        "How many words can you type in a minute?",
        "How many people would you want at your wedding?",
        "How many actors can you name in 1 minute?",
        { tags: ["trivia"], prompt: "How many letters are there in the Arabic alphabet?" },
        { tags: ["trivia"], prompt: "How many eggs does a chicken lay in a month?" },
        { tags: ["trivia"], prompt: "How many players are there in an NFL team?" },
    ],
}

const howManyHigh: PromptSpec = {
    prompt: [
        { tags: ["trivia"], prompt: "How many countries are there in the world?" },
        { tags: ["trivia"], prompt: "How many hieroglyphs are there?" },
        { tags: ["trivia"], prompt: "How many people have been to space?" },
        "If you stopped aging today and were forced to live until a certain age, what number would you pick?",
    ],
    extraFakePrompt: "Pick a number between 100 and 10,000.",
}

const howManyHotDogs: PromptSpec = {
    prompt: [
        "How many hot dogs would you eat in a day if you were paid $10 for each one?",
        "How many hot dogs would you eat in a day if you were paid $1 million for each one?",
    ],
}

const howManyContinents: PromptSpec = {
    tags: ["trivia"],
    prompt: "How many continents are there?",
    fakePrompt: "Pick a number between 3 and 8.",
}

const outOf10: PromptSpec = {
    prompt: [
        "How attractive would you rate yourself out of 10?",
        "Rate your cooking skills out of 10.",
        "Rate your fashion sense out of 10.",
        "Rate your acting skills out of 10.",
        "Rate your current mood out of 10.",
        "Rate Interstellar out of 10.",
        "Rate Shrek out of 10.",
        "How many free throws can you make out of 10?",
    ],
    extraFakePrompt: "Pick a number between 0 and 10.",
}

export const numericalModule: Module = {
    tags: ["numerical"],
    promptSpecs: [howManyTimesPer, howManyLow, howManyMedium, howManyHigh, howManyHotDogs, howManyContinents, outOf10],
}

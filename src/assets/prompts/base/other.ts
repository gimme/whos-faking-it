import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const bench: PromptCardSpec = {
    prompts: ["How much can you bench?"],
    fakePrompts: ["Pick a weight: 30-100 kg (or 65–225 lbs)."],
}

const squat: PromptCardSpec = {
    prompts: ["How much can you squat?"],
    fakePrompts: ["Pick a weight: 60-140 kg (or 135-315 lbs)."],
}

const videoGame: PromptCardSpec = {
    prompts: [
        "What video game requires the most skill?",
        "Name a video game you'd share with your kids.",
        "What's your all-time favorite video game?",
        "What is the objectively best video game ever made?",
        "What's the most chill video game?",
        "Name a video game that you haven't gotten into but seems fun.",
    ],
}

const invention: PromptCardSpec = {
    realPrompts: ["What's your pitch for an invention that would change the world?"],
    fakePrompts: ["If you could have any superpower, what would it be?"],
}

const goodSuperpower: PromptCardSpec = {
    prompts: ["If you could have any superpower, what would it be?", "Name an overrated superpower."],
}

const badSuperpower: PromptCardSpec = {
    prompts: ["What is the most useless superpower?", "Name an underrated superpower."],
}

const irrationalFear: PromptCardSpec = {
    prompts: [
        "Name an irrational fear you have.",
        "Name something that used to scare you.",
        "What's the weirdest fear that others have?",
    ],
}

const firstThingYouDo: PromptCardSpec = {
    prompts: [
        "What's the first thing you'd do after winning the lottery?",
        "What's the first thing you'd do if you had only 1 year to live?",
        "What's the first thing you'd do if there was no tomorrow?",
        "What's the first thing you'd do in a zombie apocalypse?",
        'Name a "bucket list" item.',
        "If money were no object, what's something you'd like to do?",
    ],
}

const topSpeed: PromptCardSpec = {
    prompts: [
        "What's your top speed in km/h?",
        "What's the fastest you'd ride a bike without a helmet (km/h)?",
        "What's the top speed of an elephant (km/h)?",
    ],
    fakePrompts: ["Pick a speed: 1–80 km/h."],
}

const bodyPart: PromptCardSpec = {
    prompts: [
        "What's the first thing you wash in the shower?",
        "What's the most attractive physical feature?",
        "What's your best physical feature?",
        "What's the grossest body part?",
        "If you had to get an extra copy of an exterior body part, what would it be?",
    ],
    fakePrompts: ["Name an exterior body part."],
}

const fruit: PromptCardSpec = {
    prompts: ["Name a fruit you like.", "Name a berry you like."],
}

const vegetable: PromptCardSpec = {
    prompts: ["Name a vegetable you like.", "Name a vegetable you hate."],
}

const job: PromptCardSpec = {
    prompts: [
        "Name a job you'd want only if it paid well.",
        "Name a job you'd never want even if it paid well.",
        "Name a job that would be nice to have.",
        "What did you want to be when you grew up?",
    ],
}

const wakeUpTime: PromptCardSpec = {
    prompts: [
        "What time did you wake up today?",
        "What time does the average person wake up?",
        "What time is too late for breakfast?",
        "What's a good time to wake up on a chill weekend?",
    ],
}

const timeOfDay: PromptCardSpec = {
    realPrompts: ["What's the best time of day to go to the gym?"],
    fakePrompts: ["What's your favorite time of day?", "What's a good time to wake up on a chill weekend?"],
}

const app: PromptCardSpec = {
    realPrompts: ["What app do you use the most on your phone?"],
    fakePrompts: ["Name an app you keep on your home screen."],
}

const getRich: PromptCardSpec = {
    prompts: ["What's the best way to get rich quick?", "What's the worst way to get rich quick?"],
}

export const otherModule: Module = {
    promptSpecs: [
        bench,
        squat,
        videoGame,
        invention,
        goodSuperpower,
        badSuperpower,
        irrationalFear,
        firstThingYouDo,
        topSpeed,
        bodyPart,
        fruit,
        vegetable,
        job,
        wakeUpTime,
        timeOfDay,
        app,
        getRich,
    ],
}

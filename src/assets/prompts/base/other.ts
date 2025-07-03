import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const weight: PromptCardSpec = {
    prompts: ["How much can you bench?", "Pick a weight: 30-100 kg (or 65–225 lbs)."],
}

const song: PromptCardSpec = {
    prompts: [
        "What's your go-to karaoke song?",
        "Name a song that could make you cry.",
        "Name a song you love.",
        "Name a song that pumps you up.",
        "Name a song you're tired of.",
        "Name a song you've listened to a lot recently.",
        "Name a song you would want played at your wedding.",
        "Name a song you would want played at your funeral.",
        "What's your guilty pleasure song?",
        "Name a song you get annoyed by.",
    ],
    fakePrompts: ["Name a song that gets played too much."],
}

const artist: PromptCardSpec = {
    prompts: [
        "Who's your favorite artist?",
        "Name an overrated artist.",
        "Name an artist you started listening to recently.",
        "Who's the best artist of all time?",
        "Name an artist with a great voice.",
    ],
}

const twoArtists: PromptCardSpec = {
    prompts: ["What two artists do you think should collaborate?", "What two artists had a good collaboration?"],
}

const rapper: PromptCardSpec = {
    prompts: ["Who's the best rapper?", "Name an overrated rapper."],
}

export const musicModule: Module = {
    promptSpecs: [song, artist, twoArtists, rapper],
}

const movieShow: PromptCardSpec = {
    prompts: [
        "What's your favorite movie/show?",
        "What's your favorite childhood movie/show?",
        "Name a good movie/show.",
        "Name a bad movie/show.",
        "What movie/show would be uncomfortable to watch with your parents?",
        "What movie/show is your guilty pleasure?",
        "What's a movie/show you have to rewatch?",
        "What's the first adult movie/show you'd share with your kid?",
        "Name a movie/show world you'd want to live in.",
        "Name a movie/show you've been meaning to see.",
        "Name a movie/show you think the others haven't heard of.",
        "What movie/show makes you cry?",
    ],
}

const movieOverUnderRated: PromptCardSpec = {
    prompts: ["What movie/show is overrated?", "What movie/show is underrated?"],
}

const movieRecentlyWatched: PromptCardSpec = {
    prompts: ["Name a good movie/show you've watched recently.", "Name a bad movie/show you've watched recently."],
}

const movieFromThePast: PromptCardSpec = {
    prompts: ["Name a good movie from the 00s.", "Name a good movie from the 90s."],
}

const movieRecommendation: PromptCardSpec = {
    prompts: [
        "What movie/show would you recommend to a friend?",
        "What movie/show would you NOT recommend to a friend?",
    ],
}

const movieStuck: PromptCardSpec = {
    prompts: ["What's a good movie/show to be stuck in?", "What's a bad movie/show to be stuck in?"],
}

export const movieModule: Module = {
    promptSpecs: [
        movieShow,
        movieOverUnderRated,
        movieRecentlyWatched,
        movieFromThePast,
        movieRecommendation,
        movieStuck,
    ],
}

const age: PromptCardSpec = {
    prompts: [
        "What's the youngest age a person should get engaged?",
        "If you could be one age for the rest of your life, what would it be?",
        "What's a good age to have your first kid?",
        "What's a good age to be mentally?",
        "What's a good age to be physically?",
        "What's a good age to retire?",
        "What age is too old to have a kid?",
        "What age is too young to have a kid?",
    ],
}

const oldAge: PromptCardSpec = {
    prompts: [
        "At what age do you think you will retire?",
        "At what age do you have a weird feeling you will die?",
        "How long do you have left to live?",
    ],
}

export const ageModule: Module = {
    promptSpecs: [age, oldAge],
}

const videoGame: PromptCardSpec = {
    prompts: [
        "What video game requires the most skill?",
        "Name a video game you'd play with your kids.",
        "What's your all-time favorite video game?",
        "What is the objectively best video game ever made?",
        "What's the most chill video game?",
        "Name a video game that you haven't gotten into but seems fun.",
    ],
}

const money1: PromptCardSpec = {
    prompts: ["How much money is in your bank account right now?"],
    fakePrompts: ["Pick an amount of money around $0–$5,000."],
}

const money2: PromptCardSpec = {
    prompts: [
        "How much money would it take for you to run down the street naked right now?",
        "How much money would it take for you to move to another city?",
    ],
    fakePrompts: ["Pick an amount of money around $0–$1,000,000."],
}

const money3: PromptCardSpec = {
    prompts: ["How much would you spend on a house?"],
    fakePrompts: ["Pick an amount of money around $300,000–$2,000,000."],
}

export const moneyModule: Module = {
    promptSpecs: [money1, money2, money3],
}

const duration1: PromptCardSpec = {
    prompts: [
        "How many hours of screen time do you get per day?",
        "How many hours of screen time would you allow your kids on a weekend day?",
        "How many hours of sleep do you get per night?",
    ],
}

const duration2: PromptCardSpec = {
    prompts: [
        "How long is your typical shower?",
        "How much time do you spend on your phone in bed?",
        "How long do you stay in bed after waking up?",
    ],
}

const duration3: PromptCardSpec = {
    prompts: [
        "How long would you go without eating for $100,000?",
        "How long would you go without sleep for $10,000?",
        "How long would you go without sleep for $1,000,000?",
        "Pick: 0-30 days",
        "Pick any number of days.",
        "What's the longest you've gone without pooping?",
        "What's the longest you've gone without showering?",
        "How long has it been since your last shower?",
        "How long has it been since you last washed your bedsheets?",
        "How long would you survive in the zombie apocalypse?",
        "How many days could you survive without the internet?",
    ],
}

const duration4: PromptCardSpec = {
    prompts: [
        "How long should you date someone before marrying them?",
        "How long could you survive prison?",
        "How long have you had your current phone?",
        "For how many years did you believe in Santa?",
        "How long did you go to the same school?",
        "How long did you live in your childhood home?",
        "How long was your longest relationship?",
    ],
}

export const durationModule: Module = {
    promptSpecs: [duration1, duration2, duration3, duration4],
}

export const otherModule: Module = {
    promptSpecs: [weight, videoGame],
}

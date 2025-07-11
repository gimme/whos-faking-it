import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const song: PromptCardSpec = {
    prompts: [
        "What's your favorite song?",
        "Name an overrated song.",
        "Name an underrated song.",
        "Name an iconic song.",
        "Name a song that will be a classic in 20 years.",
        "What's your go-to karaoke song?",
        "What song are you tired of hearing?",
        "Name a song that could make you cry.",
        "Name a song that pumps you up.",
        "Name a song you've listened to a lot recently.",
        "Name a song you'd want played at your wedding.",
        "Name a song you'd want played at your funeral.",
        "Name a song that reminds you of your childhood.",
        "What song is at the top of your playlist right now?",
    ],
    fakePrompts: ["What song is the greatest of all time?"],
}

const artist: PromptCardSpec = {
    prompts: [
        "Name one of your most listened to artists.",
        "Name an overrated artist.",
        "Name an underrated artist.",
        "Name an artist you started listening to recently.",
        "Name an artist with a great voice.",
        'What\'s a "guilty pleasure" artist you have?',
    ],
    fakePrompts: [
        "Who's your favorite artist?",
        "What artist is the greatest of all time?",
        "Who's the reigning king/queen of pop?",
        "Name a rapper.",
    ],
}

const twoArtists: PromptCardSpec = {
    prompts: ["What two artists do you wish had collaborated?", "What two artists had a good collaboration?"],
}

const rapper: PromptCardSpec = {
    prompts: ["Who's the best rapper?", "Name an overrated rapper."],
}

export const musicModule: Module = {
    promptSpecs: [song, artist, twoArtists, rapper],
}

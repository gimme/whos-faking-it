import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const movie: PromptCardSpec = {
    prompts: [
        "What's your favorite movie?",
        "Name a movie you'd rate 8/10.",
        'What\'s a "guilty pleasure" movie you have?',
        "Name a movie you have to rewatch.",
        "Name a movie that can make you cry.",
        "Name a movie on your watchlist.",
        "Name a good lesser known movie.",
        "What's the first adult movie you'd share with your kid?",
        "Name a movie that has a world you'd want to live in.",
        "Name a movie that would be uncomfortable to watch with your parents.",
    ],
    fakePrompts: ["What's your favorite childhood movie?", "Invent a movie title (and plot)."],
}

const series: PromptCardSpec = {
    prompts: [
        "What's your favorite series?",
        "Name a series you'd rate 8/10.",
        'What\'s a "guilty pleasure" series you have?',
        "Name a series you have to rewatch.",
        "Name a series that can make you cry.",
        "Name a series on your watchlist.",
        "Name a series you think the others haven't heard of.",
        "What's the first adult series you'd share with your kid?",
        "Name a series that has a world you'd want to live in.",
        "Name a series that would be uncomfortable to watch with your parents.",
    ],
    fakePrompts: ["What's your favorite childhood series?"],
}

const movieOverUnderRated: PromptCardSpec = {
    prompts: ["What movie is overrated?", "What movie is underrated?"],
}

const seriesOverUnderRated: PromptCardSpec = {
    prompts: ["What series is overrated?", "What series is underrated?"],
}

const recentlyWatched: PromptCardSpec = {
    prompts: ["Name a good movie/series you've watched recently.", "Name a bad movie/series you've watched recently."],
}

const movieFromThePast: PromptCardSpec = {
    prompts: ["Name a good movie from the 00s.", "Name a good movie from the 90s."],
}

const movieRecommendation: PromptCardSpec = {
    prompts: [
        "Name a movie/series you'd recommend to a friend.",
        "Name a movie/series you wouldn't recommend to a friend.",
    ],
}

const movieStuckIn: PromptCardSpec = {
    prompts: ["What's a good movie/series to be stuck in?", "What's a bad movie/series to be stuck in?"],
}

const movieRating: PromptCardSpec = {
    prompts: ["Name a movie you'd rate 10/10.", "Name a movie you'd rate 8/10."],
}

const seriesRating: PromptCardSpec = {
    prompts: ["Name a series you'd rate 10/10.", "Name a series you'd rate 8/10."],
}

const unknownMovie: PromptCardSpec = {
    prompts: ["Name a movie you think the others haven't heard of."],
    fakePrompts: ["Invent a movie title (and plot)."],
}

const oneWordTitle: PromptCardSpec = {
    realPrompts: ["Invent a one-word movie title."],
    fakePrompts: [
        "What's one word you'd use to describe the USA?",
        "What's one word you'd use to describe yourself?",
        "What's one word you'd use to describe this group?",
    ],
}

export const movieModule: Module = {
    promptSpecs: [
        movie,
        series,
        movieOverUnderRated,
        seriesOverUnderRated,
        recentlyWatched,
        movieFromThePast,
        movieRecommendation,
        movieStuckIn,
        movieRating,
        seriesRating,
        unknownMovie,
        oneWordTitle,
    ],
}

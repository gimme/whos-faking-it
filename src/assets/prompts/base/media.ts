import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const movie: PromptCardSpec = {
    prompts: [
        "What's your favorite movie?",
        "Name a movie you'd rate 8/10.",
        'What\'s your "guilty pleasure" movie?',
        "Name a movie you want to rewatch.",
        "Name a movie that can make you cry.",
        "Name a movie on your watchlist.",
        "Name a good movie that's lesser known.",
        "What's the first adult movie you'd share with your kid?",
        "Name a movie that has a world you'd want to live in.",
        "Name a movie that would be uncomfortable to watch with your parents.",
    ],
    fakePrompts: ["What's your favorite childhood movie?", "Invent a movie title."],
}

const series: PromptCardSpec = {
    prompts: [
        "What's your favorite series?",
        "Name a series you'd rate 8/10.",
        'What\'s your "guilty pleasure" TV series?',
        "Name a series you want to rewatch.",
        "Name a series that can make you cry.",
        "Name a series on your watchlist.",
        "Name a good series you think the others haven't heard of.",
        "What's the first adult series you'd share with your kid?",
        "Name a series that has a world you'd want to live in.",
        "Name a series that would be uncomfortable to watch with your parents.",
    ],
    fakePrompts: ["Invent a title for a TV series."],
}

const movieUnderrated: PromptCardSpec = {
    realPrompts: ["What movie is underrated?"],
    fakePrompts: ["What movie is overrated?", "Name a bad popular movie."],
}

const movieOverrated: PromptCardSpec = {
    prompts: ["Name a 10/10 movie.", "Name an overrated movie."],
}

const seriesUnderrated: PromptCardSpec = {
    realPrompts: ["What series is underrated?"],
    fakePrompts: ["What series is overrated?", "Name a bad popular series."],
}

const seriesOverrated: PromptCardSpec = {
    prompts: ["Name a 10/10 series.", "Name an overrated series."],
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

const realityShow: PromptCardSpec = {
    prompts: [
        "If you could be on any reality show, which one would it be?",
        "What reality show would you never want to be on?",
    ],
}

export const movieModule: Module = {
    promptSpecs: [
        movie,
        series,
        movieUnderrated,
        movieOverrated,
        seriesUnderrated,
        seriesOverrated,
        recentlyWatched,
        movieFromThePast,
        movieRecommendation,
        movieStuckIn,
        movieRating,
        seriesRating,
        unknownMovie,
        oneWordTitle,
        realityShow,
    ],
}

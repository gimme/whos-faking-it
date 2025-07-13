import type { Module } from "@/app/prompt/module"
import type { PromptCardSpec } from "@/app/prompt/prompt-card-spec"

const gorillaVsHuman: PromptCardSpec = {
    prompts: ["Would 100 humans beat a gorilla?", "Would a gorilla beat 100 humans?"],
}

const attention: PromptCardSpec = {
    prompts: ["Do you enjoy being the center of attention?", "Do you dislike being the center of attention?"],
}

const morningPerson: PromptCardSpec = {
    prompts: ["Are you a morning person?", "Are you a night person?"],
}

const realityShow: PromptCardSpec = {
    prompts: ["Would you accept going on a reality show?", "Would you decline going on a reality show?"],
}

const famous: PromptCardSpec = {
    prompts: ["Would you like to be famous?", "Would you rather be unknown than famous?"],
}

const traitor: PromptCardSpec = {
    prompts: [
        "If you were in the reality show The Traitors, would you accept to be a traitor?",
        "If you were in the reality show The Traitors, would you decline to be a traitor?",
    ],
}

const innerMonologue: PromptCardSpec = {
    prompts: ["Do you have an inner monologue?", "Do you have no inner monologue?"],
}

const creativeVsLogical: PromptCardSpec = {
    prompts: ["Are you more creative than logical?", "Are you more logical than creative?"],
}

const introvertedVsExtroverted: PromptCardSpec = {
    prompts: [
        "What describes you the best: extroverted vs introverted?",
        "What describes you the least: extroverted vs introverted?",
    ],
}

const legOrArm: PromptCardSpec = {
    prompts: [
        "If you had to lose a limb, what would you rather lose?",
        "If you had to lose a limb, what would you rather keep?",
    ],
}

const humble: PromptCardSpec = {
    prompts: ["Pick one: smart, beautiful, athletic, rich.", "Remove one: smart, beautiful, athletic, rich."],
}

const menWomenDrama: PromptCardSpec = {
    prompts: ["Who is more dramatic, men or women?", "Who is less dramatic, men or women?"],
}

const aliens: PromptCardSpec = {
    prompts: ["Are there aliens out there?", "Are we alone in the universe?"],
}

const prisonVsExile: PromptCardSpec = {
    prompts: [
        "Would you rather: spend 1 year in prison or be banished from your country forever?",
        "What's worse: spend 1 year in prison or be banished from your country forever?",
    ],
}

const musicVsMovies: PromptCardSpec = {
    prompts: [
        "Would you rather: live in a world without music or without movies?",
        "What's worse: live in a world without music or without movies?",
    ],
}

const moneyVsTime: PromptCardSpec = {
    prompts: [
        "Would you rather: have unlimited money or unlimited time?",
        "What's worse: have unlimited money or unlimited time?",
    ],
}

const internetVsNature: PromptCardSpec = {
    prompts: [
        "Would you rather: live in a world without the internet or without nature?",
        "What's worse: live in a world without the internet or without nature?",
    ],
}

export const oneOrTheOtherModule: Module = {
    promptSpecs: [
        gorillaVsHuman,
        attention,
        morningPerson,
        realityShow,
        famous,
        traitor,
        innerMonologue,
        creativeVsLogical,
        introvertedVsExtroverted,
        legOrArm,
        humble,
        menWomenDrama,
        aliens,
        prisonVsExile,
        musicVsMovies,
        moneyVsTime,
        internetVsNature,
    ],
}

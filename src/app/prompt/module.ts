import type { Card } from "@/app/game/domain/card"
import { type Tag, createTagSet } from "@/app/game/domain/tag"
import { type PromptCardSpec, generateCardsFromSpec } from "@/app/prompt/prompt-card-spec"
import type { NonEmptyArray, RNG } from "@/common.types"

/**
 * Represents a module of related prompt specifications that can be used to generate cards in the game.
 */
export type Module = {
    readonly promptSpecs?: ReadonlyArray<PromptCardSpec>
    readonly subModules?: ReadonlyArray<Module>
    readonly tags?: NonEmptyArray<Tag>
    /**
     * The maximum number of cards that can be generated from this module.
     * If not specified, there is no limit.
     */
    readonly maxCards?: number
}

export function generateCardsFromModule(module: Module, rng: RNG): ReadonlyArray<Card> {
    const moduleCards = module.promptSpecs?.flatMap((promptSpec) => generateCardsFromSpec(promptSpec, rng)) ?? []
    const subModuleCards = module.subModules?.flatMap((subModule) => generateCardsFromModule(subModule, rng)) ?? []

    const randomlySelectedCards = getRandomSelection([...moduleCards, ...subModuleCards], module.maxCards, rng)
    return randomlySelectedCards.map((card) => ({
        ...card,
        tags: createTagSet([...card.tags, ...(module.tags ?? [])]),
    }))
}

/**
 * Returns a random selection of `n` items from the given array.
 */
function getRandomSelection<T>(arr: T[], n: number | undefined, rng: RNG): T[] {
    if (n === undefined || n > arr.length) return [...arr]

    const result = new Array(n)
    let len = arr.length
    const taken = new Array(len)

    while (n--) {
        const r = Math.floor(rng() * len)
        result[n] = arr[r in taken ? taken[r] : r]
        taken[r] = --len in taken ? taken[len] : len
    }
    return result
}

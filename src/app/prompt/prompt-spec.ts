import type { Card } from "@/app/game/domain/card"
import { type Tag, createTagSet } from "@/app/game/domain/tag"
import type { NonEmptyArray, RNG } from "@/common.types"

/**
 * A specification for generating prompt cards of a specific type in the game.
 */
export type PromptSpec = {
    /**
     * Main prompts to use for the card.
     */
    readonly prompt: PromptGroup
    readonly tags?: NonEmptyArray<Tag>
} & FakePromptSpec

/**
 * Specifies what fake prompts to use for the card.
 */
type FakePromptSpec =
    | {
          /**
           * The only fake prompts to pick from.
           */
          readonly fakePrompt: PromptGroup
      }
    | {
          /**
           * Extra fake prompts to pick from in addition to the main prompts.
           */
          readonly extraFakePrompt?: PromptGroup
      }

type PromptGroup = Prompt | NonEmptyArray<Prompt>
type Prompt = string | { readonly prompt: string; readonly tags: NonEmptyArray<Tag> }

/**
 * Generates a set of unique cards based on the given prompt specification.
 * @param spec The prompt specification
 * @param rng A random number generator to determine the randomness of prompt selection
 */
export function generateCardsFromSpec(spec: PromptSpec, rng: RNG): Card[] {
    const realPromptOptions = getRealPromptOptions(spec)
    const fakePromptOptions = getFakePromptOptions(spec)

    return generateCardsFromOptions(realPromptOptions, fakePromptOptions, spec.tags ?? [], rng)
}

function generateCardsFromOptions(
    realPromptOptions: Prompt[],
    fakePromptOptions: Prompt[],
    tags: Tag[],
    rng: RNG,
): Card[] {
    if (realPromptOptions.length === 0 || fakePromptOptions.length === 0) return []

    const [selectedRealPrompt, leftoverRealPrompts] = extractRandomPrompt(
        realPromptOptions as NonEmptyArray<Prompt>,
        rng,
    )

    const fakePromptOptionsExceptReal = removeItem(fakePromptOptions, selectedRealPrompt)
    if (fakePromptOptionsExceptReal.length === 0) {
        return generateCardsFromOptions(leftoverRealPrompts, fakePromptOptions, tags, rng)
    }

    const [selectedFakePrompt, unusedFakePrompts] = extractRandomPrompt(
        fakePromptOptionsExceptReal as NonEmptyArray<Prompt>,
        rng,
    )

    const unusedRealPrompts = removeItem(leftoverRealPrompts, selectedFakePrompt)

    const card = {
        realPrompt: getPromptText(selectedRealPrompt),
        fakePrompt: getPromptText(selectedFakePrompt),
        tags: createTagSet([
            ...getPromptTags(selectedRealPrompt),
            ...getPromptTags(selectedFakePrompt),
            ...(tags ?? []),
        ]),
    }

    return [card, ...generateCardsFromOptions(unusedRealPrompts, unusedFakePrompts, tags, rng)]
}

function getRealPromptOptions(spec: PromptSpec): NonEmptyArray<Prompt> {
    const realPrompt = spec.prompt
    return Array.isArray(realPrompt) ? realPrompt : [realPrompt]
}

function getFakePromptOptions(spec: PromptSpec): NonEmptyArray<Prompt> {
    const fakePrompt = "fakePrompt" in spec ? spec.fakePrompt : undefined
    const extraFakePrompt = "extraFakePrompt" in spec ? spec.extraFakePrompt : undefined

    if (fakePrompt === undefined) {
        const realPromptOptions = getRealPromptOptions(spec)
        const extraFakePrompts =
            extraFakePrompt === undefined ? [] : Array.isArray(extraFakePrompt) ? extraFakePrompt : [extraFakePrompt]
        return [...realPromptOptions, ...extraFakePrompts]
    } else {
        return Array.isArray(fakePrompt) ? fakePrompt : [fakePrompt]
    }
}

function extractRandomPrompt(promptOptions: NonEmptyArray<Prompt>, rng: RNG): [Prompt, Prompt[]] {
    const index = Math.floor(rng() * promptOptions.length)
    return [promptOptions[index], removeIndex(promptOptions, index)]
}

function getPromptText(prompt: Prompt): string {
    return typeof prompt === "string" ? prompt : prompt.prompt
}

function getPromptTags(prompt: Prompt): Tag[] {
    return typeof prompt === "object" ? prompt.tags : []
}

function removeItem<T>(arr: T[], itemToRemove: T): T[] {
    return arr.filter((item) => item !== itemToRemove)
}

function removeIndex<T>(arr: T[], indexToRemove: number): T[] {
    return [...arr.slice(0, indexToRemove), ...arr.slice(indexToRemove + 1)]
}

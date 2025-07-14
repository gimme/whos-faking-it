import seedrandom from "seedrandom"
import { describe, expect, test } from "vitest"

import { type Module, generateCardsFromModule } from "@/app/prompt/module"

describe("generateCardsFromModule", () => {
    test("generates an expected set of cards", () => {
        const module: Module = {
            promptSpecs: [
                {
                    realPrompts: ["A Real 1", "A Real 2"],
                    prompts: ["A Prompt 1", "A Prompt 2"],
                    fakePrompts: ["A Fake 1", "A Fake 2"],
                },
                {
                    realPrompts: ["B Real 1", "B Real 2"],
                    prompts: ["B Prompt 1", "B Prompt 2"],
                    fakePrompts: ["B Fake 1", "B Fake 2"],
                },
            ],
            subModules: [
                {
                    promptSpecs: [
                        {
                            realPrompts: ["C Real 1", "C Real 2"],
                            prompts: ["C Prompt 1", "C Prompt 2"],
                            fakePrompts: ["C Fake 1", "C Fake 2"],
                        },
                        {
                            realPrompts: ["D Real 1", "D Real 2"],
                            prompts: ["D Prompt 1", "D Prompt 2"],
                            fakePrompts: ["D Fake 1", "D Fake 2"],
                        },
                    ],
                    maxCards: 1,
                },
            ],
            maxCards: 5,
            tags: ["trivia"],
        }

        const rng = seedrandom("test-seed")

        const largeSampleOfCards = Array.from({ length: 1000 }, () => {
            const cards = generateCardsFromModule(module, rng)

            const promptsUsed = new Set<string>()
            cards.forEach((card) => {
                expect(card.realPrompt).not.toBe(card.fakePrompt)
                expect(card.realPrompt[0]).toBe(card.fakePrompt[0]) // From the same prompt spec
                expect(card.tags).toContain("trivia")

                expect(promptsUsed.has(card.realPrompt)).toBe(false)
                expect(promptsUsed.has(card.fakePrompt)).toBe(false)
                promptsUsed.add(card.realPrompt)
                promptsUsed.add(card.fakePrompt)
            })

            expect(cards.length).toBe(module.maxCards)

            return cards
        }).flat()

        const totalCount = largeSampleOfCards.length

        // Ensure that core and submodule prompts are used in the expected proportions
        const aAndBCount = largeSampleOfCards.filter(
            (card) => card.realPrompt.startsWith("A") || card.realPrompt.startsWith("B"),
        ).length
        const cAndDCount = largeSampleOfCards.filter(
            (card) => card.realPrompt.startsWith("C") || card.realPrompt.startsWith("D"),
        ).length

        expectCloseTo(aAndBCount / totalCount, 5 / 6)
        expectCloseTo(cAndDCount / totalCount, 1 / 6)

        // Ensure that "Real"/"Fake" prompts are used in the expected proportions
        const realCount = largeSampleOfCards.filter((card) => card.realPrompt.includes("Real")).length
        const fakeCount = largeSampleOfCards.filter((card) => card.fakePrompt.includes("Fake")).length

        expectCloseTo(realCount / totalCount, 0.62)
        expectCloseTo(fakeCount / totalCount, 0.67)
    })
})

function expectCloseTo(actual: number, expected: number, tolerance: number = 0.03) {
    console.info(`Expected ${expected} ± ${tolerance}; got ${actual}`)
    expect(actual).toBeGreaterThanOrEqual(expected - tolerance)
    expect(actual).toBeLessThanOrEqual(expected + tolerance)
}

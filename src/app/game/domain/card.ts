import type { Role } from "@/app/game/domain/role"
import type { TagSet } from "@/app/game/domain/tag"

/**
 * A card that determines the prompts to use during a round of the game.
 */
export type Card = {
    readonly realPrompt: string
    readonly fakePrompt: string
    readonly tags: TagSet
}

/**
 * An altered view of a card when viewed as a specific role in a round.
 */
export type RoleCardView = {
    readonly prompt: string
}

export function viewCardAsRole(card: Card, role: Role): RoleCardView {
    return {
        prompt: role === "impostor" ? card.fakePrompt : card.realPrompt,
    }
}

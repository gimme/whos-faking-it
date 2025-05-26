import { type Card, type RoleCardView, viewCardAsRole } from "@/app/game/domain/card"
import type { Player } from "@/app/game/domain/player"
import type { Role } from "@/app/game/domain/role"

/**
 * Represents a specific round of the game during play.
 */
export type Round = {
    readonly roundNumber: number
    readonly activeCard: Card
    readonly playerRoles: ReadonlyArray<Role>
}

export function viewCardAsPlayer(round: Round, player: Player): RoleCardView {
    const card = round.activeCard
    const role = getRoleForPlayer(round, player)
    return viewCardAsRole(card, role)
}

export function viewCardAsTruthful(round: Round): RoleCardView {
    return viewCardAsRole(round.activeCard, "truthful")
}

function getRoleForPlayer(round: Round, player: Player): Role {
    const playerIndex = player.seat - 1
    return round.playerRoles[playerIndex]
}

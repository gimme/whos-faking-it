export type Tag = "numerical" | "trivia" | "meta"
export type TagSet = ReadonlySet<Tag>

export function createTagSet(tags: Array<Tag>): ReadonlySet<Tag> {
    return new Set(tags)
}

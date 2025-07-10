import type { Module } from "@/app/prompt/module"
import { ageModule } from "@/assets/prompts/base/age"
import { durationModule } from "@/assets/prompts/base/duration"
import { movieModule } from "@/assets/prompts/base/media"
import { moneyModule } from "@/assets/prompts/base/money"
import { musicModule } from "@/assets/prompts/base/music"
import { numericalModule } from "@/assets/prompts/base/numerical"
import { otherModule } from "@/assets/prompts/base/other"

export const coreModule: Module = {
    subModules: [numericalModule, musicModule, movieModule, ageModule, moneyModule, durationModule, otherModule],
}

export const DEFAULT_MODULE: Module = coreModule
export const ALL_PLAYABLE_MODULES: ReadonlyArray<Module> = [coreModule]

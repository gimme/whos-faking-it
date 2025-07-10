import type { Module } from "@/app/prompt/module"
import { numericalModule } from "@/assets/prompts/base/numerical"
import {
    ageModule,
    durationModule,
    moneyModule,
    movieModule,
    musicModule,
    otherModule,
} from "@/assets/prompts/base/other"

export const coreModule: Module = {
    subModules: [numericalModule, musicModule, movieModule, ageModule, moneyModule, durationModule, otherModule],
}

export const DEFAULT_MODULE: Module = coreModule
export const ALL_PLAYABLE_MODULES: ReadonlyArray<Module> = [coreModule]

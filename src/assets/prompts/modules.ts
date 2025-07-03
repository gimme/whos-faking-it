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

const baseModule: Module = {
    subModules: [numericalModule, musicModule, movieModule, ageModule, moneyModule, durationModule, otherModule],
}
export const playableModules: ReadonlyArray<Module> = [baseModule]

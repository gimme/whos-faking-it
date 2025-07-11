import type { Module } from "@/app/prompt/module"
import { activityModule } from "@/assets/prompts/base/activity"
import { ageModule } from "@/assets/prompts/base/age"
import { animalModule } from "@/assets/prompts/base/animal"
import { durationModule } from "@/assets/prompts/base/duration"
import { foodModule } from "@/assets/prompts/base/food"
import { itemModule } from "@/assets/prompts/base/item"
import { locationModule } from "@/assets/prompts/base/location"
import { movieModule } from "@/assets/prompts/base/media"
import { moneyModule } from "@/assets/prompts/base/money"
import { musicModule } from "@/assets/prompts/base/music"
import { numericalModule } from "@/assets/prompts/base/numerical"
import { oneOrTheOtherModule } from "@/assets/prompts/base/oneOrTheOther"
import { otherModule } from "@/assets/prompts/base/other"
import { percentModule } from "@/assets/prompts/base/percent"
import { whoInTheGroupModule } from "@/assets/prompts/base/whoInTheGroup"

export const coreModule: Module = {
    subModules: [
        activityModule,
        ageModule,
        animalModule,
        durationModule,
        foodModule,
        itemModule,
        locationModule,
        moneyModule,
        movieModule,
        musicModule,
        numericalModule,
        otherModule,
        percentModule,
        whoInTheGroupModule,
        oneOrTheOtherModule,
    ],
}

export const DEFAULT_MODULE: Module = coreModule
export const ALL_PLAYABLE_MODULES: ReadonlyArray<Module> = [coreModule]

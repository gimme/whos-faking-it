import type { Module } from "@/app/prompt/module"
import { activityModule } from "@/assets/prompts/base/activity"
import { ageModule } from "@/assets/prompts/base/age"
import { amongUsModule } from "@/assets/prompts/base/amongUs"
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

export const coreModule: Module = {
    subModules: [
        activityModule,
        ageModule,
        amongUsModule,
        animalModule,
        durationModule,
        foodModule,
        itemModule,
        locationModule,
        moneyModule,
        movieModule,
        musicModule,
        numericalModule,
        oneOrTheOtherModule,
        otherModule,
        percentModule,
    ],
}

export const DEFAULT_MODULE: Module = coreModule
export const ALL_PLAYABLE_MODULES: ReadonlyArray<Module> = [coreModule]

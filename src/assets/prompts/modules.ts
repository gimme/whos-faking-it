import type { Module } from "@/app/prompt/module"
import { numericalModule } from "@/assets/prompts/base/numerical"

const baseModule: Module = {
    subModules: [numericalModule],
}
export const playableModules: ReadonlyArray<Module> = [baseModule]

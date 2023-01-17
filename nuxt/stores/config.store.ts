import {ShowcaseCharacter} from "~/types/showcase"

export type ThemeConfig = "auto" | "light" | "dark"

export const useConfigStore = defineStore("config", {
  persist: {
    storage: localStorage,
  },
  state: () => {
    return {
      previousVersion: null as string | null,
      resinBaseTime: new Date(),
      resinCount: "0",
      characterStatus: {} as {[characterId: string]: ShowcaseCharacter},
      gachaUrl: "",
      uid: "",
      autoImport: 0,
      theme: "auto" as ThemeConfig,
    }
  },
  getters: {
    isAutoImportEnabled: (state) => {
      return state.autoImport === 1
    },
    currentTheme(state): string {
      return state.theme === "auto" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light" : state.theme
    },
  },
})

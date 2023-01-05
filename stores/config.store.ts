import {ShowcaseCharacter} from "~/types/showcase"

export const useConfigStore = defineStore("config", {
  persist: {
    storage: localStorage,
  },
  state: () => {
    return {
      previousVersion: null as string | null,
      resinBaseTime: new Date(),
      resinCount: 0,
      characterStatus: {} as {[characterId: string]: ShowcaseCharacter},
      gachaAuthKey: "",
      uid: "",
      autoImport: 0,
    }
  },
  getters: {
    isAutoImportEnabled: (state) => {
      return state.autoImport === 1
    },
  },
})

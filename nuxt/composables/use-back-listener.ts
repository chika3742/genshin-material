import {App} from "@capacitor/app"
import type {PluginListenerHandle} from "@capacitor/core"

export const useBackListener = (onBack: () => void, canBack: () => boolean) => {
  let listener: PluginListenerHandle | null = null

  onMounted(async() => {
    listener = await App.addListener("backButton", () => {
      if (canBack()) {
        onBack()
      } else {
        void App.exitApp()
      }
    })
  })

  onBeforeUnmount(() => {
    void listener?.remove()
  })
}

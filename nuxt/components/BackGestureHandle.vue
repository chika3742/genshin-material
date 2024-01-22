<script lang="ts" setup>
import TinyGesture from "tinygesture"
import {Capacitor} from "@capacitor/core"

interface Props {
  canBack: boolean
}
const props = defineProps<Props>()

interface Emits {
  (e: "back"): void
}
const emit = defineEmits<Emits>()

let gesture: TinyGesture | null = null

const gestureRange = ref<HTMLElement>()

const registerGestureListener = () => {
  if (gestureRange.value) {
    gesture = new TinyGesture(gestureRange.value, {
      mouseSupport: false,
    })

    gesture.on("swiperight", () => {
      props.canBack && emit("back")
    })

    const noScroll = (e: Event) => {
      e.preventDefault()
    }

    const adjustWidth = (width: number, threshold: number, base: number) => {
      // If the width is above the threshold
      if (width > threshold) {
        // Calculate the excess width over the threshold
        const excess = width - threshold

        // Grow the width at a rate that decreases as the excess increases
        return threshold + Math.log(excess + 1) / Math.log(base)
      }

      // If the width is at or below the threshold, return it unchanged
      return width
    }

    const initialWidth = 24
    const threshold = 48
    const decayBase = 1.15
    const opacityThresholdFactor = 1.7

    gesture.on("panstart", () => {
      if (gestureRange.value && props.canBack) {
        gestureRange.value.style.transition = ""
        document.documentElement.addEventListener("touchmove", noScroll, {passive: false})
      }
    })

    gesture.on("panmove", () => {
      if (gestureRange.value && props.canBack) {
        gestureRange.value.style.width = `${adjustWidth(initialWidth + gesture!.touchMoveX!, threshold, decayBase)}px`
        gestureRange.value.style.opacity = ((gesture!.touchMoveX! - initialWidth) / threshold / opacityThresholdFactor).toString()
      }
    })

    gesture.on("panend", () => {
      if (gestureRange.value) {
        gestureRange.value.style.transition = "all 200ms ease"
        gestureRange.value.style.width = ""
        gestureRange.value.style.opacity = "0"
        document.documentElement.removeEventListener("touchmove", noScroll)
      }
    })
  }
}

onMounted(() => {
  registerGestureListener()
})

onBeforeUnmount(() => {
  gesture?.destroy()
})
</script>

<template>
  <div v-if="Capacitor.getPlatform() === 'ios'" ref="gestureRange" class="ios-swipe-gesture-range">
    <v-icon class="pl-4" size="40" style="height: 50%">
      mdi-arrow-left
    </v-icon>
  </div>
</template>

<style lang="sass" scoped>
.ios-swipe-gesture-range
  position: fixed
  height: calc(100vh - 64px - env(safe-area-inset-top))
  width: 24px
  left: 0
  bottom: 0
  user-select: none
  background: rgba(var(--v-theme-surface-variant), 0.3)
  opacity: 0
  backdrop-filter: blur(4px)
  z-index: 9999
</style>

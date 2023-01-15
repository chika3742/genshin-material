import {RouterConfig} from "@nuxt/schema"

const savedPositions: { [path: string]: number } = {}

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    const vMain = document.querySelector(".v-main")
    if (!vMain) {
      return false
    }

    savedPositions[from.fullPath] = vMain.scrollTop
    if (savedPosition) {
      const enterVMain = document.querySelector(".v-main.scroll-x-reverse-transition-enter-active")
      if (savedPositions[to.fullPath]) {
        enterVMain?.scrollTo(0, Number(savedPositions[to.fullPath]))
      } else {
        enterVMain?.scrollTo(0, 0)
      }
    } else {
      delete savedPositions[to.fullPath]
    }
  },
}

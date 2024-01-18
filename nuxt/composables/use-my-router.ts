export const useMyRouter = () => {
  const {$getPageTitle} = useNuxtApp()
  const route = useRoute()
  const router = useRouter()
  const rConfig = useRuntimeConfig()

  const pageTitle = ref($getPageTitle(route.fullPath))
  let unsubscribe: (() => void) | undefined

  const layoutId = computed(() => {
    return getLayoutId(
      rConfig.public.nativeUi,
      router.currentRoute.value.meta.screenType,
    )
  })

  onMounted(() => {
    unsubscribe = router.afterEach((to, from) => {
      if (layoutId.value === "web" || to.meta.screenType === from.meta.screenType) {
        pageTitle.value = $getPageTitle(to.fullPath)
      }
    })
  })

  onBeforeUnmount(() => {
    unsubscribe?.()
  })
  return {
    preservedRouteStacks: useState<Record<string, string[]>>("preservedRouteStacks", () => ({})),
    tabId: useState("tabId", () => "/bookmarks"),
    pageTitle,
    layoutId,
  }
}

const getLayoutId = (native: boolean, screenType: "default" | "base" | undefined) => {
  if (typeof screenType === "undefined") {
    throw new TypeError("screenType page meta is not defined.")
  }

  if (native) {
    if (screenType === "default") {
      return "native" as const
    }
    if (screenType === "base") {
      return "native-base" as const
    }
  } else {
    return "web" as const
  }
}

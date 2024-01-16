export const useMyRouter = () => {
  const route = useRoute()
  const router = useRouter()
  const i18n = useI18n()
  const rConfig = useRuntimeConfig()

  const pageTitle = ref(getPageTitle(route.fullPath, router, i18n))
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
        pageTitle.value = getPageTitle(to.fullPath, router, i18n)
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

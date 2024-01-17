export default defineNuxtRouteMiddleware((to) => {
  const rConfig = useRuntimeConfig()
  const nativeUi = rConfig.public.nativeUi

  if (!nativeUi && to.meta.nativeOnly) {
    return navigateTo("/")
  }
})

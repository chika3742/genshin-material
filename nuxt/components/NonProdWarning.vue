<template>
  <div class="warning-overlay-banner">
    <span>{{ tx("common.nonProdWarning") }}</span>
  </div>
</template>

<style scoped lang="sass">
.warning-overlay-banner
  width: 100%
  position: sticky
  padding: 8px 16px
  font-size: 0.8em
  bottom: 0
  z-index: 999
  background: rgba(var(--v-theme-warning), 0.6)
  font-weight: bold
  backdrop-filter: blur(8px)
</style>

<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator
        :duration="3000"
        color="linear-gradient(to right, #4FC3F7, #D4E157, #FFA726)"
      />
      <NuxtPage :page-key="$route.fullPath" />
    </NuxtLayout>
  </div>
</template>
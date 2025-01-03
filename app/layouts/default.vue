<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader @reset="handleReset" />
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="py-4 px-6 border-t border-gray-200 mt-auto">
      <p class="text-center text-gray-600">Tools Demo App - MK</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

function handleReset() {
  router.push('/')
  window.location.reload()
}
</script> 
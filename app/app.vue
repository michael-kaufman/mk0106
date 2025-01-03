<template>
  <NuxtLayout>
    <div class="min-h-screen bg-gray-50 font-sans">
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// No font imports needed for Arial
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <header class="bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-semibold text-gray-800">Tool Rental System</h1>
        <button
          @click="handleReset"
          class="px-4 py-2 text-base font-medium text-gray-800 bg-gray-50 border-2 border-gray-400 hover:bg-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          Reset Form
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AppHeader'
})

const emit = defineEmits<{
  reset: []
}>()

function handleReset() {
  emit('reset')
}
</script> 
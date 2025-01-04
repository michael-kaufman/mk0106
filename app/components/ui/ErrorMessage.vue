<template>
  <div v-if="errors.length" class="text-sm text-red-600 bg-red-50 p-3 rounded-md mb-4">
    <p v-for="error in errors" :key="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  errors: string[]
}

defineProps<Props>()
</script> 
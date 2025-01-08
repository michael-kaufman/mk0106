<template>
  <label 
    class="block text-base font-semibold text-gray-800 mb-[10px]"
    :class="{ 'text-center': center }"
  >
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  center?: boolean
}>(), {
  center: false
})
</script> 
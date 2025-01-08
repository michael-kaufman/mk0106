<template>
  <div class="relative">
    <select
      ref="selectRef"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
      class="select-tool w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 bg-sky-100 text-gray-800 text-base font-medium appearance-none cursor-pointer hover:bg-white focus:bg-white transition-colors pr-10"
      v-bind="$attrs"
    >
      <slot></slot>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
      <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectRef = ref<HTMLSelectElement>()

defineProps<{
  modelValue: string,
  id?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()

defineExpose({
  select: selectRef
})
</script>

<style scoped>
.select-tool {
  font-family: Arial, sans-serif; 
  font-size: 18px; 
  color: #333; 
  font-weight: 500;
  background-color: #faf7f7e5; 
}
</style>
// eslint-disable-next-line no-multiple-empty-lines

<template>
  <div class="relative">
    <input
      type="number"
      :value="modelValue"
      @input="handleInput"
      :min="min"
      :max="max"
      required
      v-bind="$attrs"
      class="block w-full rounded-lg border-2 border-gray-400 pl-4 pr-10 shadow-md focus:border-primary-500 focus:ring-primary-500 text-center text-[3rem] font-medium text-gray-800 min-h-[80px] bg-gray-50 hover:bg-white focus:bg-white transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    >
    <div class="absolute inset-y-0 right-0 flex flex-col border-l-2 border-gray-400 bg-gray-50">
      <Button 
        type="button"
        @click="handleIncrement(1)"
        class="flex-1 flex items-center justify-center px-2 hover:bg-gray-100 rounded-tr-lg border-b-2 border-gray-400 transition-colors scale-80"
      >
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
      </Button>
      <Button 
        type="button"
        @click="handleIncrement(-1)"
        class="flex-1 flex items-center justify-center px-2 hover:bg-gray-100 rounded-br-lg border-gray-400 transition-colors scale-80"
      >
        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue'

interface Props {
  modelValue: number
  min: number
  max: number
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  'increment': [value: number]
}>()

const handleInput = (event: InputEvent & { target: HTMLInputElement }) => {
  emit('update:modelValue', Number(event.target.value) || 0)
}

const handleIncrement = (amount: number) => {
  const newValue = Number(props.modelValue) + amount
  if (newValue >= props.min && newValue <= props.max) {
    emit('increment', amount)
  }
}
</script> 
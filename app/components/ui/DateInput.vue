<template>
  <div>
    <Label v-if="label">{{ label }}</Label>
    <VueDatePicker
      @update:modelValue="handleDateChange"
      :enable-time-picker="false"
      :model-value="modelValue"
      :text-input="true"
      auto-apply
      :close-on-auto-apply="true"
      text-input-format="mm/dd/yy"
      :format="(date) => date ? formatPreviewDate(date) : ''"
      :name="name"
      :placeholder="placeholder"
      input-className="w-full rounded-lg border-2 border-gray-400 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 bg-gray-50 text-gray-800 text-base font-medium hover:bg-white focus:bg-white transition-colors"
    />
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { formatPreviewDate } from '~/utils/dates'
import Label from './Label.vue'

interface Props {
  modelValue: Date | null
  label?: string
  name: string
  placeholder?: string
  minDate?: Date
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: Date | null]
}>()

const handleDateChange = (date: Date | null) => {
  // Ensure we have a valid date object
  if (date && !(date instanceof Date)) {
    date = new Date(date)
  }
  emit('update:modelValue', date)
}
</script> 
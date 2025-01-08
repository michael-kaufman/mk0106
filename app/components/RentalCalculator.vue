<template>
  <div class="min-h-[500px] p-4">
    <ErrorMessage v-if="error" :errors="[error.message]" />
    <div class="max-w-2xl mx-auto">
      <RentalForm
        :loading="loading"
        @submit="handleSubmit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { RentalResult } from '~/types/rental'
import { createError, type ErrorOptions } from '~/utils/errors'
import ErrorMessage from '~/components/ui/ErrorMessage.vue'

const result = useState<RentalResult | null>('rentalResult', () => null)
const loading = useState<boolean>('loading', () => false)
const error = ref<ErrorOptions | null>(null)

const handleSubmit = async (formData: {
  toolCode: string
  checkoutDate: string
  returnDate: string
  discountPercent: number
}) => {
  loading.value = true
  error.value = null
  
  try {
    result.value = await $fetch('/api/calculate-rental', {
      method: 'POST',
      body: formData
    })
    navigateTo('/results')
  } catch (err) {
    error.value = {
      statusCode: 500,
      message: 'Failed to calculate rental'
    }
    console.error(error.value)
  } finally {
    loading.value = false
  }
}

const handleReset = () => {
  result.value = null
  error.value = null
}
</script> 
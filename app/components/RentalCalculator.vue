<template>
  <div class="rental-calculator">
    <RentalForm v-if="!result" @submit="handleSubmit" />
    <RentalResults v-else :result="result" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { RentalResult } from '~/types/rental'

const result = ref<RentalResult | null>(null)

const handleSubmit = async (formData: {
  toolCode: string
  checkoutDate: string
  returnDate: string
  discountPercent: number
}) => {
  try {
    result.value = await $fetch('/api/calculate-rental', {
      method: 'POST',
      body: formData
    })
  } catch (error) {
    console.error('Failed to calculate rental:', error)
  }
}
</script> 
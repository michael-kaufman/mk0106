<template>
  <div v-if="result" class="rental-results bg-white shadow-lg rounded-lg p-8 mt-8 max-w-3xl mx-auto" data-testid="rental-results">
    <h3 class="text-2xl font-bold text-gray-800 mb-8 text-center border-b pb-4">Rental Agreement Summary</h3>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <!-- Tool Information -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h4 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Tool Information</h4>
        <dl class="space-y-3">
          <div class="flex justify-between">
            <dt class="text-gray-600">Tool Code:</dt>
            <dd class="font-semibold text-gray-800">{{ result.code }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-gray-600">Tool Type:</dt>
            <dd class="font-semibold text-gray-800">{{ result.type }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-gray-600">Brand:</dt>
            <dd class="font-semibold text-gray-800">{{ result.brand }}</dd>
          </div>
        </dl>
      </div>

      <!-- Rental Period -->
      <div class="bg-gray-50 p-6 rounded-lg">
        <h4 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Rental Period</h4>
        <dl class="space-y-3">
          <div class="flex justify-between">
            <dt class="text-gray-600">Checkout Date:</dt>
            <dd class="font-semibold text-gray-800">{{ formatDate(result.checkoutDate) }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-gray-600">Return Date:</dt>
            <dd class="font-semibold text-gray-800">{{ formatDate(result.returnDate) }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-gray-600">Rental Days:</dt>
            <dd class="font-semibold text-gray-800" data-testid="charge-days">{{ result.chargeDays }}</dd>
          </div>
        </dl>
      </div>

      <!-- Charges -->
      <div class="sm:col-span-2 bg-blue-50 p-6 rounded-lg">
        <h4 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Charges</h4>
        <dl class="space-y-3">
          <div class="flex justify-between">
            <dt class="text-gray-600">Daily Rental Charge:</dt>
            <dd class="font-semibold text-gray-800">${{ result.dailyRentalCharge.toFixed(2) }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-gray-600">Pre-discount Charge:</dt>
            <dd class="font-semibold text-gray-800" data-testid="pre-discount-charge">${{ result.preDiscountCharge.toFixed(2) }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-gray-600">Discount Percent:</dt>
            <dd class="font-semibold text-gray-800">{{ result.discountPercent }}%</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-gray-600">Discount Amount:</dt>
            <dd class="font-semibold text-gray-800" data-testid="discount-amount">${{ result.discountAmount.toFixed(2) }}</dd>
          </div>
          <div class="flex justify-between pt-4 border-t border-blue-200">
            <dt class="text-lg font-bold text-gray-800">Final Charge:</dt>
            <dd class="text-xl font-bold text-blue-600" data-testid="final-charge">${{ result.finalCharge.toFixed(2) }}</dd>
          </div>
        </dl>
      </div>
    </div>
    <div class="text-center mt-8">
      <button 
        @click="$emit('reset')" 
        class="text-blue-600 hover:text-blue-800 font-medium px-4 py-2 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
      >
        Back to Calculator
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RentalResult } from '~/types/rental'
import { formatDate } from '~/utils/dates'

const props = withDefaults(defineProps<{
  result?: RentalResult | null
}>(), {
  result: null
})

defineEmits<{
  reset: []
}>()
</script> 
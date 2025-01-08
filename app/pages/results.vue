<template>
  <div>
    <AppHeader />
    <main class="container mx-auto px-4 py-8">
      <div v-if="loading" class="text-center py-8">
        <p class="text-gray-600 text-lg">Loading rental calculation...</p>
      </div>
      <div v-if="!result" class="text-center py-8">
        <p class="text-gray-600 text-lg mb-4">No rental calculation found.</p>
        <button 
          @click="navigateTo('/')" 
          class="text-blue-600 hover:text-blue-800 font-medium"
        >
          Return to calculator
        </button>
      </div>
      <RentalResults
        v-else
        :result="result"
        @reset="handleReset"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import type { RentalResult } from '~/types/rental'

const result = useState<RentalResult | null>('rentalResult', () => null)
const loading = useState<boolean>('loading', () => false)

function handleReset() {
  result.value = null
  navigateTo('/')
}
</script> 
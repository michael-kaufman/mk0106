<template>
  <div v-if="pending">Loading tools...</div>
  <form @submit.prevent="handleSubmit" class="bg-white shadow-lg rounded-lg p-6">
    <div class="space-y-6">
      <!-- Tool Selection -->
      <div>
        <label class="block text-base font-semibold text-gray-800 mb-[10px]">Select a Tool</label>
        <div class="relative">
          <select
            v-model="state.selectedTool"
            name="toolCode"
            class="w-full rounded-md border-2 border-gray-400 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 bg-gray-50 text-gray-800 text-base font-medium appearance-none cursor-pointer hover:bg-white focus:bg-white transition-colors font-sans [&>*]:font-sans"
            :class="{ 'border-red-500': state.errors.find((e: string) => e.includes('tool')) }"
          >
            <option value="" disabled class="text-gray-500">Select a tool...</option>
            <option 
              v-for="tool in tools" 
              :key="tool.code"
              :value="tool.code"
              class="py-3 text-gray-800"
            >
              {{ tool.code }} - {{ tool.type }} ({{ tool.brand }})
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
            <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div> 
        </div>
      </div>

      <!-- Dates -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-base font-semibold text-gray-800 mb-[10px]">Checkout Date</label>
          <VueDatePicker
            v-model="state.checkoutDate"
            :enable-time-picker="false"
            :text-input="true"
            auto-apply
            :teleport="true"
            :close-on-auto-apply="true"
            text-input-format="mm/dd/yy"
            :format="(date: Date | null) => date ? formatDate(date.toISOString().split('T')[0]) : ''"
            name="checkoutDate"
            placeholder="Select date"
            :min-date="new Date()"
            input-class-name="w-full rounded-lg border-2 border-gray-400 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 bg-gray-50 text-gray-800 text-base font-medium hover:bg-white focus:bg-white transition-colors"
          />
        </div>
        <div>
          <label class="block text-base font-semibold text-gray-800 mb-[10px]">Return Date</label>
          <VueDatePicker
            v-model="state.returnDate"
            :enable-time-picker="false"
            :text-input="true"
            auto-apply
            :teleport="true"
            :close-on-auto-apply="true"
            text-input-format="mm/dd/yy"
            :format="(date: Date | null) => date ? formatDate(date.toISOString().split('T')[0]) : ''"
            name="returnDate"
            placeholder="Select date"
            input-class-name="w-full rounded-lg border-2 border-gray-400 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-3 bg-gray-50 text-gray-800 text-base font-medium hover:bg-white focus:bg-white transition-colors"
          />
        </div>
      </div>

      <!-- Discount -->
      <div class="flex flex-col items-center">
        <label class="block text-base font-semibold text-gray-800 mb-[10px] text-center">Discount (%)</label>
        <div class="w-full max-w-[200px]">
          <div class="relative">
            <input
              type="number"
              v-model="state.discountPercent"
              min="0"
              max="100"
              name="discountPercent"
              class="block w-full rounded-lg border-2 border-gray-400 pl-4 pr-12 shadow-md focus:border-primary-500 focus:ring-primary-500 text-center text-base font-medium text-gray-800 h-12 bg-gray-50 hover:bg-white focus:bg-white transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            >
            <div class="absolute inset-y-0 right-0 flex flex-col border-l-2 border-gray-400 bg-gray-50">
              <button 
                type="button"
                @click="incrementDiscount(1)"
                class="flex-1 flex items-center justify-center px-3 hover:bg-white rounded-tr-lg border-b-2 border-gray-400 transition-colors"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button 
                type="button"
                @click="incrementDiscount(-1)"
                class="flex-1 flex items-center justify-center px-3 hover:bg-white rounded-br-lg transition-colors"
              >
                <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Errors -->
      <div v-if="state.errors.length" class="text-sm text-red-600 bg-red-50 p-3 rounded-md">
        <p v-for="error in state.errors" :key="error">{{ error }}</p>
      </div>

      <!-- Action Buttons -->
      <div class="grid gap-4">
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-base font-semibold"
        >
          <span v-if="loading">Processing...</span>
          <span v-else>Generate Rental Agreement</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Tool, ToolsResponse } from '~/types/rental'
import { ToolCode } from '~/types/rental'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { formatDate } from '~/utils/dates'

interface FormState {
    selectedTool: string
    checkoutDate: Date | null
    returnDate: Date | null
    discountPercent: number
    errors: string[]
}

const props = defineProps<{
    loading?: boolean
}>()

const state = ref<FormState>({
    selectedTool: '',
    checkoutDate: null,
    returnDate: null,
    discountPercent: 0,
    errors: []
})

// Get tools from API
const pending = ref(true)
const toolsData = ref<ToolsResponse>()

onMounted(async () => {
    try {
        toolsData.value = await $fetch('/api/tools')
    } catch (error) {
        console.error('Failed to fetch tools:', error)
    } finally {
        pending.value = false
    }
})

const tools = computed(() => {
    if (!toolsData.value?.tools) {
        return []
    }
    return Object.entries(toolsData.value.tools).map(([code, tool]) => ({
        ...tool,
        code
    }))
})

// Emits
const emit = defineEmits<{
    submit: [{ 
        toolCode: string, 
        checkoutDate: string, 
        returnDate: string, 
        discountPercent: number 
    }]
}>()

function handleSubmit() {
    state.value.errors = []

    // Validate form
    if (!state.value.selectedTool) {
        state.value.errors.push('Please select a tool')
        return
    }

    if (!state.value.checkoutDate || !state.value.returnDate) {
        state.value.errors.push('Both dates are required')
        return
    }

    // Check if checkout is before return date
    if (state.value.checkoutDate >= state.value.returnDate) {
        state.value.errors.push('Checkout date must be before return date')
        return
    }

    // Validate discount percent range
    if (state.value.discountPercent < 0 || state.value.discountPercent > 100) {
        state.value.errors.push('Discount must be between 0 and 100')
        return
    }

    // Format dates for API
    emit('submit', {
        toolCode: state.value.selectedTool,
        checkoutDate: formatDateForSubmit(state.value.checkoutDate),
        returnDate: formatDateForSubmit(state.value.returnDate),
        discountPercent: state.value.discountPercent
    })
}

function incrementDiscount(amount: number) {
    const newValue = Number(state.value.discountPercent) + amount
    if (newValue >= 0 && newValue <= 100) {
        state.value.discountPercent = newValue
    }
}

function formatPreviewDate(date: Date): string {
    if (!date) return ''
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = String(date.getFullYear()).slice(-2)
    return `${month}/${day}/${year}`
}

function formatDateForSubmit(date: Date | string | null): string {
    if (!date) return ''
    if (typeof date === 'string') return date
    return date.toISOString().split('T')[0]
}
</script>

<style scoped>
/* Only keep styles that can't be done with Tailwind */
</style>


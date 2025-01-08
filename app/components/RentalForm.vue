<template>
  <div v-if="pending">Loading tools...</div>
  <form @submit.prevent="handleSubmit" class="bg-white shadow-lg rounded-lg p-[15px] min-h-[500px]">
    <div class="flex flex-col h-full">
      <div class="space-y-6 pb-[75px]">
        <!-- Tool Selection -->
        <div>
          <Label>Select a tool</Label>
          <Select
            v-model="state.selectedTool"
            name="toolCode"
            :class="{ 'border-red-500': state.errors.find((e: string) => e.includes('tool')) }"
          >
            <option value=""></option>
            <option value="" disabled class="text-gray-500">Select a tool...</option>
            <option 
              v-for="tool in tools" 
              :key="tool.code"
              :value="tool.code"
              class="py-3 text-gray-800"
            >
              {{ tool.code }} - {{ tool.type }} ({{ tool.brand }})
            </option>
          </Select>
        </div>

        <!-- Dates -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <DateInput
              v-model="state.checkoutDate"
              name="checkoutDate"
              placeholder="Select date"
              :min-date="new Date()"
              label="Checkout Date"
            />
          </div>
          <div>
            <DateInput
              v-model="state.returnDate"
              name="returnDate"
              placeholder="Select date"
              :min-date="state.checkoutDate || new Date()"
              label="Return Date"
            />
          </div>
        </div>

        <!-- Discount -->
        <div class="flex flex-col items-center">
          <Label center>Discount (%)</Label>
          <div class="w-full max-w-[200px] h-[60px]">
            <NumberInput
              v-model="state.discountPercent"
              :min="0"
              :max="100"
              name="discountPercent"
              @increment="incrementDiscount"
            />
          </div>
        </div>

        <!-- Errors -->
      </div>

      <!-- Footer Section -->
      <div class="mt-auto">
        <ErrorMessage :errors="state.errors" />
        <div class="pb-[15px]">
          <!-- Action Buttons -->
          <div class="grid gap-4">
            <Button
              type="submit"
              :disabled="loading"
            >
              <span v-if="loading">Processing...</span>
              <span v-else>Generate Rental Agreement</span>
            </Button>
            <Button
              type="reset"
              class="bg-gray-600 hover:bg-gray-700"
              @click="handleReset"
            >
              Reset Form
            </Button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Tool, ToolsResponse, RentalCalculation } from '~/types/rental'
import { ToolCode } from '~/types/rental'
import Select from '~/components/ui/Select.vue'
import Button from '~/components/ui/Button.vue'
import { validateRentalForm } from '~/utils/validation'
import NumberInput from '~/components/ui/NumberInput.vue'
import Label from '~/components/ui/Label.vue'
import DateInput from '~/components/ui/DateInput.vue'
import ErrorMessage from '~/components/ui/ErrorMessage.vue'

interface FormState {
    selectedTool: ToolCode
    checkoutDate: Date | null
    returnDate: Date | null
    discountPercent: number
    errors: string[]
}

const props = defineProps<{
    loading?: boolean
}>()

const state = ref<FormState>({
    selectedTool: '' as ToolCode,
    checkoutDate: null,
    returnDate: null,
    discountPercent: 0,
    errors: []
})

const selectedIndex = ref<number>()

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
    submit: [RentalCalculation]
}>()

function handleSubmit() {
    state.value.errors = []
    
    const validationErrors = validateRentalForm({
        toolCode: state.value.selectedTool,
        checkoutDate: state.value.checkoutDate,
        returnDate: state.value.returnDate,
        discountPercent: state.value.discountPercent
    })

    if (validationErrors.length) {
        state.value.errors = validationErrors
        return
    }

    // Proceed with form submission...
    const submitData: RentalCalculation = {
        toolCode: state.value.selectedTool,
        checkoutDate: formatDateForSubmit(state.value.checkoutDate),
        returnDate: formatDateForSubmit(state.value.returnDate),
        discountPercent: state.value.discountPercent
    }
    emit('submit', submitData)
}

function incrementDiscount(amount: number) {
    const newValue = Number(state.value.discountPercent) + amount
    if (newValue >= 0 && newValue <= 100) {
        state.value.discountPercent = newValue
    }
}

function formatDateForSubmit(date: Date | string | null): string {
    if (!date) return ''
    if (typeof date === 'string') return date
    return date.toISOString().split('T')[0]
}

function handleReset() {
  state.value = {
    selectedTool: '' as ToolCode,
    checkoutDate: null,
    returnDate: null,
    discountPercent: 0,
    errors: []
  }
  selectedIndex.value = 0
}
</script>
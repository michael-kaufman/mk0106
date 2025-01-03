<template>
    <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-semibold text-center mb-8 text-gray-800">Tool Rental Calculator</h2>
        <RentalForm 
            @submit="handleSubmit" 
            :loading="loading"
        />
        
        <div v-if="result" class="mt-8">
            <RentalResults :result="result" />
        </div>
        <div v-if="error" class="mt-8 p-4 bg-red-50 text-red-600 rounded-lg">
            {{ error }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { RentalResult } from '~/types/rental'

const result = ref<RentalResult | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

async function handleSubmit(formData: any) {
    loading.value = true
    error.value = null
    result.value = null
    
    try {
        console.log('Submitting form data:', formData)
        const response = await $fetch<RentalResult>('/api/calculate-rental', {
            method: 'POST',
            body: formData
        })
        console.log('API Response:', response)
        
        if (!response) {
            throw new Error('No response received from server')
        }
        
        // Ensure all required properties are present
        if (!response.code || !response.type || !response.brand || 
            typeof response.dailyRentalCharge !== 'number' || 
            typeof response.chargeDays !== 'number' ||
            typeof response.preDiscountCharge !== 'number' ||
            typeof response.discountAmount !== 'number' ||
            typeof response.finalCharge !== 'number') {
            console.error('Invalid response:', response)
            throw new Error('Invalid response format from server')
        }
        
        result.value = response
    } catch (e: any) {
        console.error('API Error:', e)
        error.value = e.data?.message || e.message || 'An unexpected error occurred. Please try again.'
        result.value = null
    } finally {
        loading.value = false
    }
}
</script> 
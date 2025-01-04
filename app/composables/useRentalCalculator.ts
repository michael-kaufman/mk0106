import type { RentalCalculation, RentalResult, Tool } from '~/types/rental'
import { isWeekend, isHoliday } from '~/utils/dates'
import { createError } from '~/utils/errors'
import { validateRentalForm } from '~/utils/validation'

export const useRentalCalculator = () => {
    const { data: toolsData } = useAsyncData<{ tools: Record<string, Tool> }>('tools', () => $fetch('/api/tools'))

    const formatCurrency = (amount: number): string => {
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }

    const calculateRental = async (params: RentalCalculation): Promise<RentalResult> => {
        const validationErrors = validateRentalForm({
            toolCode: params.toolCode,
            checkoutDate: new Date(params.checkoutDate),
            returnDate: new Date(params.returnDate),
            discountPercent: params.discountPercent ?? 0
        })

        if (validationErrors.length) {
            throw createError({ 
                statusCode: 400, 
                message: validationErrors.join(', ') 
            })
        }

        if (!toolsData.value?.tools) {
            throw createError({ 
                statusCode: 500, 
                message: 'Failed to load tool data' 
            })
        }

        const tool = toolsData.value.tools[params.toolCode]
        if (!tool) {
            throw createError({ 
                statusCode: 400, 
                message: 'Invalid tool code' 
            })
        }

        // Calculate charges locally
        const start = new Date(params.checkoutDate)
        const end = new Date(params.returnDate)
        
        let chargeDays = 0
        const current = new Date(start)
        
        while (current <= end) {
            const isChargeableDay = (
                (tool.weekdayCharge && !isWeekend(current)) ||
                (tool.weekendCharge && isWeekend(current))
            ) && (!isHoliday(current) || tool.holidayCharge)
            
            if (isChargeableDay) {
                chargeDays++
            }
            
            current.setDate(current.getDate() + 1)
        }
        
        const preDiscountCharge = chargeDays * tool.dailyRentalCharge
        const discountAmount = Number((preDiscountCharge * params.discountPercent / 100).toFixed(2))
        const finalCharge = Number((preDiscountCharge - discountAmount).toFixed(2))

        return {
            ...tool,
            chargeDays,
            preDiscountCharge: Number(preDiscountCharge.toFixed(2)),
            discountAmount: Number(discountAmount.toFixed(2)),
            finalCharge: Number(finalCharge.toFixed(2)),
            checkoutDate: params.checkoutDate,
            returnDate: params.returnDate,
            discountPercent: params.discountPercent
        }
    }

    return {
        tools: toolsData,
        calculateRental,
        formatCurrency
    }
} 
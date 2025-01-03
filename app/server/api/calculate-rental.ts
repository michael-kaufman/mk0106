import type { RentalCalculation, RentalResult, Tool, ToolsResponse } from '~/types/rental'
import { ToolCode } from '~/types/rental'
import { isWeekend, isHoliday } from '~/utils/dates'
import { createError } from '~/utils/errors'

interface ChargingStrategy {
    isChargeable(date: Date): boolean;
}

class LadderChargingStrategy implements ChargingStrategy {
    constructor(private readonly tool: Tool) {}

    isChargeable(date: Date): boolean {
        const isWeekendDay = isWeekend(date)
        const isHolidayDay = isHoliday(date)

        // Weekends are always chargeable for ladders
        if (isWeekendDay && this.tool.weekendCharge) {
            return true
        }

        // Don't charge for holidays unless it's a weekend
        if (isHolidayDay && !isWeekendDay) {
            return false
        }

        // Charge for weekdays
        return isWeekendDay ? this.tool.weekendCharge : this.tool.weekdayCharge
    }
}

class ChainsawChargingStrategy implements ChargingStrategy {
    constructor(private readonly tool: Tool) {}

    isChargeable(date: Date): boolean {
        const isWeekendDay = isWeekend(date)
        const isHolidayDay = isHoliday(date)

        // Only charge for regular weekdays
        return !isWeekendDay && !isHolidayDay && this.tool.weekdayCharge
    }
}

class DeWaltJackhammerChargingStrategy implements ChargingStrategy {
    constructor(private readonly tool: Tool) {}

    isChargeable(date: Date): boolean {
        const isWeekendDay = isWeekend(date)
        
        // Charge for all weekdays, including holidays
        return !isWeekendDay && this.tool.weekdayCharge
    }
}

class RidgidJackhammerChargingStrategy implements ChargingStrategy {
    constructor(private readonly tool: Tool) {}

    isChargeable(date: Date): boolean {
        const isWeekendDay = isWeekend(date)
        const isHolidayDay = isHoliday(date)

        // Only charge for non-holiday weekdays
        return !isWeekendDay && !isHolidayDay && this.tool.weekdayCharge
    }
}

function createChargingStrategy(tool: Tool): ChargingStrategy {
    switch (tool.code) {
        case 'LADW':
            return new LadderChargingStrategy(tool)
        case 'CHNS':
            return new ChainsawChargingStrategy(tool)
        case 'JAKD':
            return new DeWaltJackhammerChargingStrategy(tool)
        case 'JAKR':
            return new RidgidJackhammerChargingStrategy(tool)
        default:
            throw new Error(`Unknown tool code: ${tool.code}`)
    }
}

class RentalCalculator {
    private readonly tool: Tool
    private readonly strategy: ChargingStrategy
    
    constructor(tool: Tool) {
        this.tool = tool
        this.strategy = createChargingStrategy(tool)
    }

    calculateChargeDays(startDate: Date, endDate: Date): number {
        let chargeDays = 0
        const currentDate = new Date(startDate)
        const lastDate = new Date(endDate)

        // Set time to midnight to avoid time zone issues
        currentDate.setUTCHours(0, 0, 0, 0)
        lastDate.setUTCHours(0, 0, 0, 0)

        while (currentDate.getTime() <= lastDate.getTime()) {
            if (this.strategy.isChargeable(currentDate)) {
                chargeDays++
            }
            currentDate.setUTCDate(currentDate.getUTCDate() + 1)
        }

        return chargeDays
    }

    calculateCharges(chargeDays: number, discountPercent: number): {
        preDiscountCharge: number;
        discountAmount: number;
        finalCharge: number;
    } {
        const preDiscountCharge = Number((chargeDays * this.tool.dailyRentalCharge).toFixed(2))
        const discountAmount = Number(((preDiscountCharge * discountPercent) / 100).toFixed(2))
        const finalCharge = Number((preDiscountCharge - discountAmount).toFixed(2))

        return {
            preDiscountCharge,
            discountAmount,
            finalCharge
        }
    }
}

export async function calculateRental(request: RentalCalculation): Promise<RentalResult> {
    try {
        // Validate discount percent
        if (request.discountPercent < 0 || request.discountPercent > 100) {
            throw createError({
                statusCode: 400,
                message: 'Discount percent must be between 0 and 100'
            })
        }

        // Get tool data
        const response = await $fetch<ToolsResponse>('/api/tools')
        const tool = response.tools[request.toolCode]
        if (!tool) {
            throw createError({
                statusCode: 404,
                message: 'Tool not found'
            })
        }

        // Parse dates
        const checkoutDate = new Date(request.checkoutDate + 'T00:00:00Z')
        const returnDate = new Date(request.returnDate + 'T00:00:00Z')

        // Validate dates
        if (isNaN(checkoutDate.getTime()) || isNaN(returnDate.getTime())) {
            throw createError({
                statusCode: 400,
                message: 'Invalid date format'
            })
        }

        if (checkoutDate >= returnDate) {
            throw createError({
                statusCode: 400,
                message: 'Checkout date must be before return date'
            })
        }
        
        // Calculate rental charges
        const calculator = new RentalCalculator(tool)
        const chargeDays = calculator.calculateChargeDays(checkoutDate, returnDate)
        const charges = calculator.calculateCharges(chargeDays, request.discountPercent)

        return {
            ...tool,
            chargeDays,
            ...charges,
            checkoutDate: request.checkoutDate,
            returnDate: request.returnDate,
            discountPercent: request.discountPercent
        }
    } catch (error: any) {
        // If it's already a handled error, rethrow it
        if (error.statusCode) {
            throw error
        }
        
        // Otherwise, log it and throw a generic error
        console.error('Rental calculation error:', error)
        throw createError({
            statusCode: 500,
            message: 'An error occurred while calculating the rental'
        })
    }
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    console.log('Received request:', body)
    
    const result = await calculateRental(body)
    console.log('Sending response:', result)
    return result
}) 
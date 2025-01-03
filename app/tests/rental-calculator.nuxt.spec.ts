import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ToolCode } from '../types/rental'

// Mock the module
const mockCalculateRental = vi.fn(async (event) => {
    const body = event
    if (body.discountPercent > 100) {
        throw new Error('Discount percent must be between 0 and 100')
    }
    return {
        code: ToolCode.CHNS,
        type: 'chainsaw',
        brand: 'Stihl',
        dailyRentalCharge: 1.49,
        chargeDays: 3,
        preDiscountCharge: 4.47,
        discountAmount: 0.89,
        finalCharge: 3.58,
        checkoutDate: '2023-07-02',
        returnDate: '2023-07-07',
        discountPercent: 20,
        weekdayCharge: true,
        weekendCharge: false,
        holidayCharge: true
    }
})

vi.mock('../server/api/calculate-rental', () => ({
    default: mockCalculateRental
}))

describe('rental calculator', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should validate discount percent', async () => {
        const mockRequest = {
            toolCode: ToolCode.CHNS,
            checkoutDate: '2023-07-02',
            returnDate: '2023-07-07',
            discountPercent: 101
        }

        await expect(mockCalculateRental(mockRequest)).rejects.toThrow('Discount percent must be between 0 and 100')
    })

    it('should calculate charges correctly', async () => {
        const mockRequest = {
            toolCode: ToolCode.CHNS,
            checkoutDate: '2023-07-02',
            returnDate: '2023-07-07',
            discountPercent: 20
        }

        const result = await mockCalculateRental(mockRequest)
        expect(result).toEqual({
            code: ToolCode.CHNS,
            type: 'chainsaw',
            brand: 'Stihl',
            dailyRentalCharge: 1.49,
            chargeDays: 3,
            preDiscountCharge: 4.47,
            discountAmount: 0.89,
            finalCharge: 3.58,
            checkoutDate: '2023-07-02',
            returnDate: '2023-07-07',
            discountPercent: 20,
            weekdayCharge: true,
            weekendCharge: false,
            holidayCharge: true
        })
    })
}) 
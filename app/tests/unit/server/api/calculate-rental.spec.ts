import { describe, it, expect } from 'vitest'
import { calculateCharges } from '~/server/api/calculate-rental.post'


describe('Rental API Calculations', () => {
    it('should calculate 3 days of charges with no discount', () => {
        const testTool = {
            code: 'LADW',
            type: 'Ladder',
            brand: 'Werner',
            dailyRentalCharge: 1.99,
            weekdayCharge: true,
            weekendCharge: true,
            holidayCharge: false
        }
        const result = calculateCharges(3, testTool, 0)
        expect(result.preDiscountCharge).toBe(5.97)
        expect(result.discountAmount).toBe(0.00)
        expect(result.finalCharge).toBe(5.97)
    })
}) 
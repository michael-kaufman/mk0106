import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RentalResults from '~/components/RentalResults.vue'
import { ToolCode } from '~/types/rental'

describe('RentalResults', () => {
    it('should not render when result is null', () => {
        const wrapper = mount(RentalResults, {
            props: {
                result: null
            }
        })
        expect(wrapper.find('[data-testid="rental-results"]').exists()).toBe(false)
    })

    it('should render rental agreement summary with correct data', () => {
        const mockResult = {
            type: 'chainsaw',
            brand: 'Stihl',
            code: ToolCode.CHNS,
            dailyRentalCharge: 1.49,
            weekdayCharge: true,
            weekendCharge: false,
            holidayCharge: true,
            chargeDays: 3,
            preDiscountCharge: 4.47,
            discountAmount: 1.12,
            finalCharge: 3.35,
            checkoutDate: '2023-07-02',
            returnDate: '2023-07-07',
            discountPercent: 25
        }

        const wrapper = mount(RentalResults, {
            props: {
                result: mockResult
            }
        })

        // Check if all sections are rendered
        expect(wrapper.find('[data-testid="rental-results"]').exists()).toBe(true)
        expect(wrapper.text()).toContain('Rental Agreement Summary')
        expect(wrapper.text()).toContain('Tool Information')
        expect(wrapper.text()).toContain('Rental Period')
        expect(wrapper.text()).toContain('Charges')

        // Check specific values
        expect(wrapper.find('[data-testid="charge-days"]').text()).toBe('3')
        expect(wrapper.find('[data-testid="pre-discount-charge"]').text()).toBe('$4.47')
        expect(wrapper.find('[data-testid="discount-amount"]').text()).toBe('$1.12')
        expect(wrapper.find('[data-testid="final-charge"]').text()).toBe('$3.35')
    })
}) 
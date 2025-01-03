import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RentalCalculator from '../../components/RentalCalculator.vue'
import RentalForm from '../../components/RentalForm.vue'
import RentalResults from '../../components/RentalResults.vue'
import { ToolCode } from '../../types/rental'

// Mock $fetch
vi.stubGlobal('$fetch', vi.fn())

describe('Rental Calculator Page', () => {
    it('should render form by default', () => {
        const wrapper = mount(RentalCalculator, {
            global: {
                components: {
                    RentalForm,
                    RentalResults
                }
            }
        })
        expect(wrapper.findComponent(RentalForm).exists()).toBe(true)
        expect(wrapper.findComponent(RentalResults).exists()).toBe(false)
    })

    it('should show results when form is submitted', async () => {
        const mockResponse = {
            code: ToolCode.CHNS,
            type: 'chainsaw',
            brand: 'Stihl',
            dailyRentalCharge: 1.49,
            chargeDays: 3,
            preDiscountCharge: 4.47,
            discountAmount: 1.12,
            finalCharge: 3.35,
            checkoutDate: '2023-07-02',
            returnDate: '2023-07-07',
            discountPercent: 25,
            weekdayCharge: true,
            weekendCharge: false,
            holidayCharge: true
        }

        vi.mocked($fetch).mockResolvedValue(mockResponse)

        const wrapper = mount(RentalCalculator, {
            global: {
                components: {
                    RentalForm,
                    RentalResults
                }
            }
        })
        
        // Simulate form submission
        await wrapper.vm.handleSubmit({
            toolCode: ToolCode.CHNS,
            checkoutDate: '2023-07-02',
            returnDate: '2023-07-07',
            discountPercent: 20
        })

        await wrapper.vm.$nextTick()

        expect(wrapper.findComponent(RentalResults).exists()).toBe(true)
    })
}) 
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { ToolCode } from '../../types/rental'
import { h } from 'vue'

// Mock VueDatePicker before importing RentalForm
vi.mock('@vuepic/vue-datepicker', () => ({
    default: defineComponent({
        name: 'VueDatePicker',
        props: {
            modelValue: {
                type: [Date, String],
                default: null
            },
            'enable-time-picker': Boolean,
            'text-input': Boolean,
            'auto-apply': Boolean,
            teleport: Boolean,
            'close-on-auto-apply': Boolean,
            'text-input-format': String,
            format: Function,
            name: String,
            placeholder: String,
            'min-date': Date,
            'input-class-name': String
        },
        emits: ['update:modelValue'],
        setup(props, { emit }) {
            return () => h('div', [
                h('input', {
                    type: 'text',
                    value: props.modelValue instanceof Date ? props.modelValue.toISOString().split('T')[0] : props.modelValue,
                    onInput: (event) => {
                        const target = event.target as HTMLInputElement
                        emit('update:modelValue', new Date(target.value))
                    },
                    name: props.name
                })
            ])
        }
    })
}))

// Mock $fetch
vi.stubGlobal('$fetch', vi.fn())

// Import RentalForm after mocks are set up
import RentalForm from '../../components/RentalForm.vue'

describe('RentalForm', () => {
    it('should fetch tools on mount', async () => {
        const mockTools = {
            [ToolCode.CHNS]: { 
                type: 'chainsaw',
                brand: 'Stihl',
                dailyRentalCharge: 1.49,
                weekdayCharge: true,
                weekendCharge: false,
                holidayCharge: true,
                code: ToolCode.CHNS
            }
        }

        vi.mocked($fetch).mockResolvedValue({ tools: mockTools })

        const wrapper = mount(RentalForm)
        await wrapper.vm.$nextTick()

        expect(vi.mocked($fetch)).toHaveBeenCalledWith('/api/tools')
        expect(wrapper.find('select[name="toolCode"]').exists()).toBe(true)
    })

    it('should emit submit event with form data', async () => {
        const mockTools = {
            [ToolCode.CHNS]: { 
                type: 'chainsaw',
                brand: 'Stihl',
                dailyRentalCharge: 1.49,
                weekdayCharge: true,
                weekendCharge: false,
                holidayCharge: true,
                code: ToolCode.CHNS
            }
        }

        vi.mocked($fetch).mockResolvedValue({ tools: mockTools })

        const wrapper = mount(RentalForm)
        await wrapper.vm.$nextTick()

        // Set tool
        const toolSelect = wrapper.find('select[name="toolCode"]')
        await toolSelect.setValue(ToolCode.CHNS)
        await wrapper.vm.$nextTick()

        // Set dates
        const datePickers = wrapper.findAllComponents({ name: 'VueDatePicker' })
        const checkoutDate = new Date('2023-07-02')
        const returnDate = new Date('2023-07-07')

        await datePickers[0].vm.$emit('update:modelValue', checkoutDate)
        await wrapper.vm.$nextTick()
        
        await datePickers[1].vm.$emit('update:modelValue', returnDate)
        await wrapper.vm.$nextTick()
        
        // Set discount
        const discountInput = wrapper.find('input[name="discountPercent"]')
        await discountInput.setValue(20)
        await wrapper.vm.$nextTick()

        // Wait for all state updates to complete
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        // Submit form
        await wrapper.find('form').trigger('submit')
        await wrapper.vm.$nextTick()

        const emitted = wrapper.emitted()
        type SubmitEvent = [{ 
            toolCode: string
            checkoutDate: string
            returnDate: string
            discountPercent: number 
        }]
        expect(emitted['submit']).toBeTruthy()
        expect((emitted['submit'] as SubmitEvent[])[0][0]).toEqual({
            toolCode: ToolCode.CHNS,
            checkoutDate: '2023-07-02',
            returnDate: '2023-07-07',
            discountPercent: 20
        })
    })

    it('should validate form inputs', async () => {
        const mockTools = {
            [ToolCode.CHNS]: { 
                type: 'chainsaw',
                brand: 'Stihl',
                dailyRentalCharge: 1.49,
                weekdayCharge: true,
                weekendCharge: false,
                holidayCharge: true,
                code: ToolCode.CHNS
            }
        }

        vi.mocked($fetch).mockResolvedValue({ tools: mockTools })

        const wrapper = mount(RentalForm)
        await wrapper.vm.$nextTick()

        // Set tool
        const toolSelect = wrapper.find('select[name="toolCode"]')
        await toolSelect.setValue(ToolCode.CHNS)
        await wrapper.vm.$nextTick()

        // Set dates
        const datePickers = wrapper.findAllComponents({ name: 'VueDatePicker' })
        const checkoutDate = new Date('2023-07-02')
        const returnDate = new Date('2023-07-07')

        await datePickers[0].vm.$emit('update:modelValue', checkoutDate)
        await wrapper.vm.$nextTick()
        
        await datePickers[1].vm.$emit('update:modelValue', returnDate)
        await wrapper.vm.$nextTick()
        
        // Set invalid discount
        const discountInput = wrapper.find('input[name="discountPercent"]')
        await discountInput.setValue(101)
        await wrapper.vm.$nextTick()

        // Wait for all state updates to complete
        await wrapper.vm.$nextTick()
        await wrapper.vm.$nextTick()

        // Submit form
        await wrapper.find('form').trigger('submit')
        await wrapper.vm.$nextTick()

        const errorMessages = wrapper.findAll('.text-red-600')
        expect(errorMessages.length).toBeGreaterThan(0)
        const errorText = errorMessages.map(msg => msg.text()).join(' ')
        expect(errorText).toContain('Discount must be between 0 and 100')
    })
}) 
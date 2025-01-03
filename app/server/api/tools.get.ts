import type { Tool, ToolsResponse } from '~/types/rental'

export default defineEventHandler((): ToolsResponse => {
    return {
        success: true,
        tools: {
            CHNS: { 
                code: 'CHNS',
                type: 'chainsaw',
                brand: 'Stihl',
                dailyRentalCharge: 1.49,
                weekdayCharge: true,
                weekendCharge: false,
                holidayCharge: true
            },
            LADW: { 
                code: 'LADW',
                type: 'ladder',
                brand: 'Werner',
                dailyRentalCharge: 1.99,
                weekdayCharge: true,
                weekendCharge: true,
                holidayCharge: false
            },
            JAKD: { 
                code: 'JAKD',
                type: 'jackhammer',
                brand: 'DeWalt',
                dailyRentalCharge: 2.99,
                weekdayCharge: true,
                weekendCharge: false,
                holidayCharge: false
            },
            JAKR: { 
                code: 'JAKR',
                type: 'jackhammer',
                brand: 'Ridgid',
                dailyRentalCharge: 2.99,
                weekdayCharge: true,
                weekendCharge: false,
                holidayCharge: false
            }
        }
    }
}) 
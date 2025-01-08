import type { Tool, ToolsResponse } from '~/types/rental'
import { ToolCode } from '~/types/rental'
import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return {
    success: true,
    tools: {
      [ToolCode.LADW]: {
        code: ToolCode.LADW,
        type: 'Ladder',
        brand: 'Werner',
        dailyRentalCharge: 1.99,
        weekdayCharge: true,
        weekendCharge: true,
        holidayCharge: false
      },
      [ToolCode.CHNS]: {
        code: ToolCode.CHNS,
        type: 'Chainsaw',
        brand: 'Stihl',
        dailyRentalCharge: 1.49,
        weekdayCharge: true,
        weekendCharge: false,
        holidayCharge: false
      },
      [ToolCode.JAKR]: {
        code: ToolCode.JAKR,
        type: 'Jackhammer',
        brand: 'Ridgid',
        dailyRentalCharge: 2.99,
        weekdayCharge: true,
        weekendCharge: false,
        holidayCharge: false
      },
      [ToolCode.JAKD]: {
        code: ToolCode.JAKD,
        type: 'Jackhammer',
        brand: 'DeWalt',
        dailyRentalCharge: 2.99,
        weekdayCharge: true,
        weekendCharge: false,
        holidayCharge: false
      }
    }
  }
}) 
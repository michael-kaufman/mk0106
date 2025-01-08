import { describe, it, expect } from 'vitest'

enum ToolCode {
  LADW = 'LADW',
  CHNS = 'CHNS',
  JAKR = 'JAKR',
  JAKD = 'JAKD'
}

const tools = {
  [ToolCode.LADW]: {
    type: 'ladder',
    brand: 'Werner',
    code: ToolCode.LADW,
    dailyRentalCharge: 1.99,
    weekdayCharge: true,
    weekendCharge: true,
    holidayCharge: false
  },
  [ToolCode.CHNS]: {
    type: 'chainsaw',
    brand: 'Stihl',
    code: ToolCode.CHNS,
    dailyRentalCharge: 1.49,
    weekdayCharge: true,
    weekendCharge: false,
    holidayCharge: true
  },
  [ToolCode.JAKR]: {
    type: 'jackhammer',
    brand: 'Ridgid',
    code: ToolCode.JAKR,
    dailyRentalCharge: 2.99,
    weekdayCharge: true,
    weekendCharge: false,
    holidayCharge: false
  },
  [ToolCode.JAKD]: {
    type: 'jackhammer',
    brand: 'DeWalt',
    code: ToolCode.JAKD,
    dailyRentalCharge: 2.99,
    weekdayCharge: true,
    weekendCharge: false,
    holidayCharge: true
  }
}

function calculateRental(toolCode: ToolCode, checkoutDate: string, returnDate: string, discountPercent: number) {
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error('Discount percent must be between 0 and 100')
  }

  const tool = tools[toolCode]
  const checkout = new Date(checkoutDate)
  const returnDay = new Date(returnDate)
  
  let chargeDays = 0
  const current = new Date(checkout)
  
  while (current <= returnDay) {
    const isWeekend = current.getDay() === 0 || current.getDay() === 6
    
    // July 4th holiday handling (observed on Friday if Saturday, Monday if Sunday)
    const isJuly4th = current.getMonth() === 6 && (
      current.getDate() === 4 || // Actual July 4th
      (current.getDate() === 3 && current.getDay() === 5) || // Friday before
      (current.getDate() === 5 && current.getDay() === 1)    // Monday after
    )
    
    // Labor Day (first Monday in September)
    const isLaborDay = current.getMonth() === 8 && current.getDay() === 1 && current.getDate() <= 7
    const isHoliday = isJuly4th || isLaborDay

    if (
      (tool.weekdayCharge && !isWeekend && !isHoliday) ||
      (tool.weekendCharge && isWeekend) ||
      (tool.holidayCharge && isHoliday)
    ) {
      chargeDays++
    }

    current.setDate(current.getDate() + 1)
  }

  const preDiscountCharge = Number((chargeDays * tool.dailyRentalCharge).toFixed(2))
  const discountAmount = Number((preDiscountCharge * (discountPercent / 100)).toFixed(2))
  const finalCharge = Number((preDiscountCharge - discountAmount).toFixed(2))

  return {
    chargeDays,
    preDiscountCharge,
    discountAmount,
    finalCharge
  }
}

describe('6 Rental Scenarios', () => {
  it('1: JAKR for 5 days with 101% discount should fail', () => {
    expect(() => calculateRental(
      ToolCode.JAKR,
      '2015-09-03',
      '2015-09-08',
      101
    )).toThrow('Discount percent must be between 0 and 100')
  })

  it('2: LADW for 3 days with 10% discount', () => {
    const result = calculateRental(
      ToolCode.LADW,
      '2020-07-02',
      '2020-07-05',
      10
    )
    expect(result).toEqual({
      chargeDays: 3,
      preDiscountCharge: 5.97,
      discountAmount: 0.60,
      finalCharge: 5.37
    })
  })

  it('3: CHNS for 5 days with 25% discount', () => {
    const result = calculateRental(
      ToolCode.CHNS,
      '2015-07-02',
      '2015-07-07',
      25
    )
    expect(result).toEqual({
      chargeDays: 5,
      preDiscountCharge: 7.45,
      discountAmount: 1.86,
      finalCharge: 5.59
    })
  })

  it('4: JAKD for 6 days with 0% discount', () => {
    const result = calculateRental(
      ToolCode.JAKD,
      '2015-09-03',
      '2015-09-09',
      0
    )
    expect(result).toEqual({
      chargeDays: 5,
      preDiscountCharge: 14.95,
      discountAmount: 0.00,
      finalCharge: 14.95
    })
  })

  it('5: JAKR for 9 days with 0% discount', () => {
    const result = calculateRental(
      ToolCode.JAKR,
      '2015-07-02',
      '2015-07-11',
      0
    )
    expect(result).toEqual({
      chargeDays: 7,
      preDiscountCharge: 20.93,
      discountAmount: 0.00,
      finalCharge: 20.93
    })
  })

  it('6: JAKR for 4 days with 50% discount', () => {
    const result = calculateRental(
      ToolCode.JAKR,
      '2020-07-02',
      '2020-07-06',
      50
    )
    expect(result).toEqual({
      chargeDays: 2,
      preDiscountCharge: 5.98,
      discountAmount: 2.99,
      finalCharge: 2.99
    })
  })
}) 
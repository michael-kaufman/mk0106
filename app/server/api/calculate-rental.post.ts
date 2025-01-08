import type { Tool, RentalCalculation, RentalResult } from '~/types/rental'
import { ToolCode } from '~/types/rental'
import { isWeekend, isHoliday } from '~/utils/dates'
import { defineEventHandler, readBody, createError } from 'h3'

const isWeekendDay = (date: Date): boolean => isWeekend(date);
const isHolidayDay = (date: Date): boolean => {
    const month = date.getMonth()
    const day = date.getDate()
    const dayOfWeek = date.getDay()
    const year = date.getFullYear()
    
    // July 4th (Independence Day)
    if (month === 6) { // July
        const july4 = new Date(year, 6, 4)
        const july4Day = july4.getDay()
        
        // If July 4th is on a weekend, observe on Friday before or Monday after
        if (july4Day === 0) { // Sunday
            return day === 5 // Observe on Monday
        } else if (july4Day === 6) { // Saturday
            return day === 3 || day === 4 // Observe on Friday and Saturday
        } else {
            return day === 4 // Observe on actual day
        }
    }
    
    // Labor Day (First Monday in September)
    if (month === 8) { // September
        return dayOfWeek === 1 && day <= 7 // First Monday
    }
    
    return false
};

export const isDateChargeable = (date: Date, tool: Tool): boolean => {
    const isWeekend = isWeekendDay(date);
    const isHoliday = isHolidayDay(date);

    switch(tool.code) {
        case ToolCode.LADW:
            return isWeekend ? tool.weekendCharge : !isHoliday && tool.weekdayCharge;
        case ToolCode.CHNS:
        case ToolCode.JAKR:
            return !isWeekend && !isHoliday && tool.weekdayCharge;
        case ToolCode.JAKD:
            return !isWeekend && tool.weekdayCharge;
        default:
            return false;
    }
};

export const calculateChargeDays = (startDate: Date, endDate: Date, tool: Tool): number => {
    let chargeDays = 0;
    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    currentDate.setUTCHours(0, 0, 0, 0);
    lastDate.setUTCHours(0, 0, 0, 0);

    while (currentDate.getTime() < lastDate.getTime()) {
        if (isDateChargeable(currentDate, tool)) {
            chargeDays++;
        }
        currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return chargeDays;
};

export const calculateCharges = (chargeDays: number, tool: Tool, discountPercent: number) => {
    if (discountPercent < 0 || discountPercent > 100) {
        throw new Error('Discount percent must be between 0 and 100');
    }
    
    const preDiscountCharge = Number((chargeDays * tool.dailyRentalCharge).toFixed(2));
    const discountAmount = Number(((preDiscountCharge * discountPercent) / 100).toFixed(2));
    const finalCharge = Number((preDiscountCharge - discountAmount).toFixed(2));

    return { preDiscountCharge, discountAmount, finalCharge };
};

// The tools data
const tools = {
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
};

export default defineEventHandler(async (event) => {
    const body = await readBody(event) as RentalCalculation;
    
    if (body.discountPercent < 0 || body.discountPercent > 100) {
        throw new Error('Discount percent must be between 0 and 100');
    }

    const tool = tools[body.toolCode];
    if (!tool) {
        throw new Error('Invalid tool code');
    }

    const checkoutDate = new Date(body.checkoutDate);
    const returnDate = new Date(body.returnDate);

    const chargeDays = calculateChargeDays(checkoutDate, returnDate, tool);
    const charges = calculateCharges(chargeDays, tool, body.discountPercent);

    const result: RentalResult = {
        ...tool,
        chargeDays,
        ...charges,
        checkoutDate: body.checkoutDate,
        returnDate: body.returnDate,
        discountPercent: body.discountPercent
    };

    return result;
}); 
export enum ToolCode {
    LADW = 'LADW',
    CHNS = 'CHNS',
    JAKD = 'JAKD',
    JAKR = 'JAKR'
}

export interface ToolsResponse {
    success: boolean;
    tools: Record<ToolCode, Tool>;
}

export interface FormData {
    tools: Tool[]
}

export interface RentalCalculation {
    toolCode: ToolCode;
    checkoutDate: string;
    returnDate: string;
    discountPercent: number;
}

export interface Tool {
    code: string;
    type: string;
    brand: string;
    dailyRentalCharge: number;
    weekdayCharge: boolean;
    weekendCharge: boolean;
    holidayCharge: boolean;
}

export interface RentalResult extends Tool {
    chargeDays: number;
    preDiscountCharge: number;
    discountAmount: number;
    finalCharge: number;
    checkoutDate: string;
    returnDate: string;
    discountPercent: number;
}
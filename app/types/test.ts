import type { Tool, RentalCalculation, RentalAgreement } from './rental'

// Test scenario type
export interface TestScenario {
  toolCode: string
  checkoutDate: string
  returnDate: string
  discountPercent: number
  expectedResults: {
    toolType: string
    brand: string
    dailyCharge: number
    chargeDays: number
    preDiscountCharge: number
    discountAmount: number
    finalCharge: number
  }
}

// Mock tool store type
export interface ToolStoreMock {
  value: {
    tools: Tool[]
  }
}

// Test context type
export interface TestContext {
  page: any  // Playwright page type
  request: RentalCalculation
  response: RentalAgreement
} 
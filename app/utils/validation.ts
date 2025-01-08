import type { RentalFormData } from '~/types/rental'

export function validateRentalForm(data: RentalFormData): string[] {
    const errors: string[] = []

    if (!data.toolCode) {
        errors.push('Please select a tool')
    }

    if (!data.checkoutDate || !data.returnDate) {
        errors.push('Both dates are required')
    } else if (data.checkoutDate >= data.returnDate) {
        errors.push('Checkout date must be before return date')
    }

    const discount = Number(data.discountPercent ?? 0)
    if (isNaN(discount) || discount < 0 || discount > 100) {
        errors.push('Discount must be between 0 and 100')
    }

    return errors
} 
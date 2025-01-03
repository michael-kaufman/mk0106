export function isWeekend(date: Date): boolean {
    const day = date.getDay()
    return day === 0 || day === 6 // 0 is Sunday, 6 is Saturday
}

export function isHoliday(date: Date): boolean {
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
}

export function adjustHolidayDate(date: Date): Date {
    const day = date.getDay()
    if (day === 0) { // Sunday
        return new Date(date.setDate(date.getDate() + 1)) // Observe on Monday
    }
    if (day === 6) { // Saturday
        return new Date(date.setDate(date.getDate() - 1)) // Observe on Friday
    }
    return date
}

export function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = String(date.getFullYear()).slice(-2)
    return `${month}/${day}/${year}`
} 
export function parseDate(dateStr: string): Date {
    const [month, day, year] = dateStr.split('/')
    return new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day))
}

export function isWeekend(date: Date): boolean {
    const day = date.getDay()
    return day === 0 || day === 6 // 0 is Sunday, 6 is Saturday
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

export function isHoliday(date: Date): boolean {
    const month = date.getMonth()
    const day = date.getDate()
    
    // July 4th (Independence Day)
    if (month === 6) { // July
        const july4th = new Date(date.getFullYear(), 6, 4)
        const observedDate = adjustHolidayDate(july4th)
        if (date.getTime() === observedDate.getTime()) return true
    }
    
    // Labor Day (First Monday in September)
    if (month === 8) { // September
        if (date.getDay() === 1 && day <= 7) return true
    }
    
    return false
} 
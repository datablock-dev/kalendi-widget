import { Dayjs } from "dayjs"

export const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const weekDaysAlt = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', ' August', 'September', 'October', 'November', 'December']

export function fixTimezoneTimestamp(timestamp: string): string{
    const [firstPart, secondPart] = timestamp.split('T')

    return `${firstPart} ${secondPart.replace('Z', '')}`
}

export function timestampToString(timestamp: Dayjs): string{
    const day = switchOrdinalNumbers(timestamp.date())
    const month = months[timestamp.month()]
    const year = timestamp.year()

    const dateTime = timestamp.toJSON().split('T')[1].substring(0,5)

    return `${day} of ${month} ${year} at ${dateTime}`
}

export function dateToTimestamp(date: Dayjs){
    const year = date.year()
    const month = date.month() < 9 ? `0${date.month() + 1}` : date.month() + 1
    const day = date.date() < 9 ? `0${date.date()}` : date.date()

    const hour = date.hour() < 9 ? `0${date.hour()}` : date.hour()
    const minute = date.minute() < 9 ? `0${date.minute()}` : date.minute()
    const second = date.second() < 9 ? `0${date.second()}` : date.second()

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

function switchOrdinalNumbers(day: number){
    switch(day){
        case 1:
            return "1st"
        case 2:
            return "2nd"
        case 3:
            return "3rd"
        default:
            return `${day}th`
    }
}
import { Dayjs } from "dayjs"
import { Locale } from "../types"

export function weekDays(locale: Locale){
    switch (locale){
        case 'en':
            return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        case 'sv':
            return ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag']
    }
}

export function weekDaysAlt(locale: Locale){
    switch (locale){
        case 'en':
            return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        case 'sv':
            return ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag']
    }
}

export function months(locale: Locale){
    switch (locale){
        case 'en':
            return ['January', 'February', 'March', 'April', 'May', 'June', 'July', ' August', 'September', 'October', 'November', 'December']
        case 'sv':
            return ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December']
    }
}

export function fixTimezoneTimestamp(timestamp: string): string{
    const [firstPart, secondPart] = timestamp.split('T')

    return `${firstPart} ${secondPart.replace('Z', '')}`
}

export function timestampToString(timestamp: Dayjs, locale: Locale): string{
    const day = switchOrdinalNumbers(timestamp.date())
    const month = months(locale)[timestamp.month()]
    const year = timestamp.year()

    const dateTime = timestamp.toJSON().split('T')[1].substring(0,5)

    return `${day} of ${month} ${year} at ${dateTime}`
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
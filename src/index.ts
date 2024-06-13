import { Dayjs } from "dayjs"
export * as default from './KalendiContainer'
import './style.css'
import './tailwind.css'

export type Options = 
    | "service" 
    | "employee" 
    | "book" 
    | "date-selected"
    | "stripe" 
    | "confirmation"

export type TimeBoxHours = 
    | '00'
    | '01'
    | '02'
    | '03'
    | '04'
    | '05'
    | '06'
    | '07'
    | '08'
    | '09'
    | '10'
    | '11'
    | '12'
    | '13'
    | '14'
    | '15'
    | '16'
    | '17'
    | '18'
    | '19'
    | '20'
    | '21'
    | '22'
    | '23'

export type TimeBoxMinutes = 
    | '00'
    | '15'
    | '30'
    | '45'

export type TimeBox = `${TimeBoxHours}:${TimeBoxMinutes}`

export interface CustomerData {
    name: string
    email: string
}

export interface Services {
    service_id: string
    service_name: string
    service_image: string | null
    service_price: number | null
    service_currency: string | null
    service_time_block: number
    service_url: string | null
}

export interface Users {
    user_id: string
    firstname: string
    lastname: string
    email: null | string
    avatar: string | null
    title: string
    admin_id: null | string
}

export interface Data {
    user_id: string
    firstname: string
    lastname: string
    email: null | string
    avatar: string | null
    title: string
    admin_id: null | string
    service_id: string
    service_name: string
    service_image: string | null
    service_price: number | null,
    service_currency: string | null
    service_time_block: number
    service_url: string | null
}

export interface WeekView {
    dayOfMonth: number
    dayOfMonthLeadingZero: string
    year: number
    month: number
    monthLeadingZero: string
    monthString: string
    daysInMonth: number
    weekDay: number
    weekDayString: string
    date: Dayjs
    weekFromCurrentWeek: number
}

export interface UserAvailability {
    [key: string]: string | null
}

export interface EventResponse {
    event_id: string
    user_id: string
    reason: string | null
    from_timestamp: string
    to_timestamp: string
}

export interface UserAvailabilityResponse {
    availability: UserAvailability
    events: EventResponse[]
    bookings: CalendarItemPayload[]
}

export interface CalendarItem {
    VERSION: string
    CALSCALE: "GREGORIAN"
    METHOD: "PUBLISH"
    BEGIN: "VEVENT"
    SUMMARY: string // This is the title of the calendar event
    UID: string
    ORGANIZER?: string
    PERIOD?: string
    STATUS?: "CONFIRMED" | "PENDING" | "REJECTED"
    RRULE?: {
        FREQ: "YEARLY" | "WEEKLY" | "MONTHLY" | "DAILY"
        INTERVAL: number
        BYMONTH: number
        BYMONTHDAY: number
    }
    LOCATION?: string
    SEQUENCE?: string
    GEO?: {
        x: string
        y: string
    }
    ATTENDEE?: string
    DESCRIPTION: string
    URL?: string
    END: "VEVENT"
}

// Post request to backend
export interface CalendarItemPayload {
    title: string
    description: string
    employee_id: string
    customer_id: string
    from_timestamp: string
    to_timestamp: string
    ical: string
}
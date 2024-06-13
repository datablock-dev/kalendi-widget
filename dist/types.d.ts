import { Dayjs } from 'dayjs';

type Options = 
    | "service" 
    | "employee" 
    | "book" 
    | "date-selected"
    | "stripe" 
    | "confirmation"

type TimeBoxHours = 
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

type TimeBoxMinutes = 
    | '00'
    | '15'
    | '30'
    | '45'

type TimeBox = `${TimeBoxHours}:${TimeBoxMinutes}`

interface CustomerData {
    name: string
    email: string
}
interface KalendiContainerProps {
    backendRoute: string
    user_id?: string
    service_id?: string
    header?: string
    closeCallback?: (e?: any) => any
    // Styling
}

interface Services {
    service_id: string
    service_name: string
    service_image: string | null
    service_price: number | null
    service_currency: string | null
    service_time_block: number
    service_url: string | null
}

interface Users {
    user_id: string
    firstname: string
    lastname: string
    email: null | string
    avatar: string | null
    title: string
    admin_id: null | string
}

interface Data {
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

interface WeekView {
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

interface UserAvailability {
    [key: string]: string | null
}

interface EventResponse {
    event_id: string
    user_id: string
    reason: string | null
    from_timestamp: string
    to_timestamp: string
}

interface UserAvailabilityResponse {
    availability: UserAvailability
    events: EventResponse[]
    bookings: CalendarItemPayload[]
}

interface CalendarItem {
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
interface CalendarItemPayload {
    title: string
    description: string
    employee_id: string
    customer_id: string
    from_timestamp: string
    to_timestamp: string
    ical: string
}

export type { CalendarItem, CalendarItemPayload, CustomerData, Data, EventResponse, KalendiContainerProps, Options, Services, TimeBox, TimeBoxHours, TimeBoxMinutes, UserAvailability, UserAvailabilityResponse, Users, WeekView };

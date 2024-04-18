export type Options = 
    | "service" 
    | "employee" 
    | "book" 
    | "date-selected"
    | "stripe" 
    | "confirmation"

export interface KalendiContainer {
    backendRoute: string
    user_id?: string
    service_id?: string
    header?: string
    // Styling
}

export interface Services {
    service_id: string
    service_name: string
    service_image: string | null
    service_price: number | null
    service_currency: string | null
    service_time_block: number | null
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
    service_time_block: number | null
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
    time_from: string
    time_to: string
}

export interface UserAvailabilityResponse {
    availability: UserAvailability
    events: EventResponse[]
    bookings: any[]
}

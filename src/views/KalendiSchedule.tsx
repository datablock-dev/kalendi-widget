import { Dispatch, SetStateAction, useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { fixTimezoneTimestamp, months, weekDays } from "../utils/time";
import { Options, WeekView, UserAvailability, EventResponse, UserAvailabilityResponse, Data, Services } from "types";

export interface KalendiSchedule {
    backendRoute: string
    data: Data[]
    services: Services[]
    selectedUser: string
    selectedService: string
    setView: Dispatch<SetStateAction<Options | null>>
    setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>
}

const timeBoxes = Array.from({length: 24}).map((_, index) => {
    const hasPrefix = index < 10 ? "0" : ""
    return [`${hasPrefix}${index}:00`, `${hasPrefix}${index}:15`, `${hasPrefix}${index}:30`, `${hasPrefix}${index}:45`]
}).flat(1)

export default function KalendiSchedule({ backendRoute, data, services, selectedUser, selectedService, setView, setSelectedDate }: KalendiSchedule) {
    dayjs.extend(isBetween)
    const currentDate = dayjs()
    const [weekMove, setWeekMove] = useState<number>(0)
    const [weekView, setWeekView] = useState<null | WeekView[]>(null)
    const [userAvailability, setUserAvailability] = useState<UserAvailability | null | false>(null)
    const [events, setEvents] = useState<null | EventResponse[]>(null)

    const service = services.find((item) => item.service_id === selectedService)
    console.log(service)

    if(!service) return <span>...</span>

    useEffect(() => {
        if(!weekView){
            setWeekView(createWeekView(currentDate, weekMove))
        } else if(weekView){
            if(weekMove !== weekView[0].weekFromCurrentWeek){
                setWeekView(createWeekView(currentDate, weekMove))
                fetchAvailability(createWeekView(currentDate, weekMove))
            }
        }

        if(userAvailability === null && selectedUser && weekView){
            fetchAvailability(weekView)
        }
    }, [currentDate, weekMove])

    async function fetchAvailability(weekView: WeekView[]){
        try {
            let urlString: null | string = null
            if (!selectedUser || !weekView) return

            const dateFrom = `${weekView[0].year}-${weekView[0].monthLeadingZero}-${weekView[0].dayOfMonthLeadingZero}`
            const dateTo = `${weekView[4].year}-${weekView[4].monthLeadingZero}-${weekView[4].dayOfMonthLeadingZero}`
            urlString = `${backendRoute}/public/availability/${selectedUser}/null/${dateFrom}/${dateTo}`

            if (!urlString) return
            const res = await fetch(urlString, { method: 'GET', })
            const data = await res.json() as UserAvailabilityResponse

            if(data.availability){
                setUserAvailability(data.availability)
            } else {
                setUserAvailability(false)
            }

            if(data.events){
                setEvents(data.events)
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    function changeWeek(direction: 'left' | 'right'){
        if(direction === "right" && weekMove < 10){
            setWeekMove(weekMove + 1)
        } else if (direction === "left" && weekMove > 0){
            setWeekMove(weekMove - 1)
        }
    }

    return (
        <div className="h-[100%] w-[100%]">
            <div className="flex flex-row justify-between w-[100%] h-[40px] mb-[10px]">
                <div
                    className="flex flex-row items-center gap-[6px] rounded-[3px] data-[selectable=true]:hover:cursor-pointer data-[selectable=false]:hover:cursor-not-allowed border-[#787878] border-[1px] border-solid px-[12px]"
                    data-selectable={weekMove > 0 ? true : false}
                    onClick={() => { changeWeek('left') }}
                >
                    <KeyboardArrowLeftIcon/> Previous Week
                </div>
                <div
                    className="flex flex-row items-center gap-[6px] rounded-[3px] data-[selectable=true]:hover:cursor-pointer data-[selectable=false]:hover:cursor-not-allowed data-[selectable=true]:hover:bg-[#d4d4d4] border-[#787878] border-[1px] border-solid px-[12px]"
                    data-selectable={weekMove < 10 ? true : false}
                    onClick={() => { changeWeek('right') }}
                >
                    Next Week <KeyboardArrowRightIcon/>
                </div>
            </div>
            {
                !weekView &&
                <div className="w-[100%] h-[100%] flex justify-center items-center">
                    <div id='outer'>
                        <div id='middle'>
                            <div id='inner'/>
                        </div>
                    </div>
                </div>
            }
            <div className="w-[100%] h-[50px] grid week-grid overflow-y-auto">
                {
                    (weekView && userAvailability !== null) &&
                    weekView.map((day) => {
                        return(
                            <div
                                className="w-[100%] h-[100%] min-h-[100%] flex flex-col odd:bg-[#c4c4c48a]"
                                key={day.date.toISOString()}
                                data-date={day.date.toISOString().split('T')[0]}
                            >
                                <div className="flex flex-col items-center">
                                    <span>{day.weekDayString.substring(0, 3)}</span>
                                    <span>{day.dayOfMonth}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="w-[100%] h-[calc(100%_-_100px)] grid week-grid overflow-y-auto relative">
                {
                    (weekView && userAvailability !== null) &&
                    weekView.map((day, index) => {
                        // To identify if we are in a week that is non-bookable (no free slots)
                        const isNonBookable = isNonBookableWeek(weekView, userAvailability)
                        
                        // We need to get the ranges from userAvailability
                        const fromValueKey = userAvailability ? userAvailability[(Object.keys(userAvailability)[index * 2])] : null
                        const toValueKey = userAvailability ? userAvailability[(Object.keys(userAvailability)[(index * 2) + 1])] : null
                        
                        let availableSlots: string[] = timeBoxes
                        let isBefore: boolean = false
                        if(day.date.isBefore(currentDate, 'day')){
                            isBefore = true
                            availableSlots = []
                        }

                        if(fromValueKey){
                            availableSlots = availableSlots.filter((slot) => slot >= fromValueKey)

                            if(availableSlots.length > 0 && toValueKey){
                                availableSlots = availableSlots.filter((slot) => slot < toValueKey)
                            }
                        } else {
                            availableSlots = []
                        }

                        if(events){
                            const currDate = dayjs(day.date)

                            events.forEach((event) => {
                                const timeFrom = dayjs(fixTimezoneTimestamp(event.time_from))
                                const timeTo = dayjs(fixTimezoneTimestamp(event.time_to))

                                const isFullDay = timeTo.diff(timeFrom, 'hour') > 24 ? true : false

                                if(isFullDay && dayjs(currDate).isBetween(timeFrom, timeTo, 'minute')){
                                    availableSlots = []
                                }
                            })
                        }

                        if(service.service_time_block){
                            const diff = service.service_time_block / 15
                            availableSlots = availableSlots.filter((_, index) => {
                                return index % diff === 0;
                            })
                        }

                        return (
                            <div
                                className="w-[100%] h-[100%] min-h-[100%] flex flex-col"
                                key={day.date.toISOString()}
                                data-date={day.date.toISOString().split('T')[0]}
                            >
                                <div className="flex flex-col h-[100%] items-center gap-[10px] bg-[#fff] pt-[10px]">
                                    {
                                        availableSlots.length > 0 &&
                                        availableSlots
                                        .filter((time) => parseInt(time.substring(0, 2)) >= 7 )
                                        .map((time) => {
                                            return(
                                                <div
                                                    className="rounded-[3px] bg-[#fff] py-[4px] px-[4px] border-solid border-[#d4d4d4] border-[1px] hover:cursor-pointer hover:bg-[#e4e4e4]"
                                                    key={day.weekDayString + time}
                                                    onClick={() => {
                                                        const timestamp = `${day.year}-${day.monthLeadingZero}-${day.dayOfMonthLeadingZero} ${time}:00`
                                                        setSelectedDate(dayjs(timestamp))
                                                        setView('date-selected')
                                                    }}
                                                >
                                                    <span>{time}</span>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        (!isNonBookable && availableSlots.length === 0 && !isBefore) &&
                                        <div>
                                            <span className="text-wrap">No available slots</span>
                                        </div>
                                    }
                                    {
                                        (isNonBookable && index === 2 && !isBefore) &&
                                        <div className="bg-[#1890ff] text-[#fff] px-[12px] py-[8px] rounded-[3px] border-[1px] hover:cursor-pointer hover:brightness-80 absolute bottom-[50%]">
                                            <span>Next available time</span>
                                        </div>
                                    }
                                    {
                                        isBefore &&
                                        <div className="w-[calc(100%_-_2px)] h-[100%] bg-[repeating-linear-gradient(45deg,#606dbc,#606dbc_10px,#465298_10px,#465298_20px)] rounded-[3px]"></div>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

function createWeekView(currentDate: Dayjs, weeksMove: number): WeekView[] {
    const currDate = dayjs(currentDate)
    const currentWeekDay = currDate.day()

    const weekView = new Array()

    const rollBack  = currentWeekDay > 0 ? 1 - currDate.day() : -6
    const mondayOfWeek = currDate.add(rollBack, 'day').add(weeksMove, 'week')
    Array.from({ length: 5 }).forEach((_, index) => {
        const mondayOfWeekCopy = mondayOfWeek
        const newValue = mondayOfWeekCopy.add(index, 'day')

        weekView.push({
            dayOfMonth: newValue.date(),
            dayOfMonthLeadingZero: newValue.date() >= 10 ? `${newValue.date()}` : `0${newValue.date()}`,
            year: newValue.year(),
            month: newValue.month(),
            monthLeadingZero: newValue.month() + 1 >= 10 ? `${newValue.month() + 1}` : `0${newValue.month() + 1}`,
            monthString: months[newValue.month()],
            daysInMonth: newValue.daysInMonth(),
            weekDay: newValue.day(),
            weekDayString: weekDays[newValue.day()],
            date: newValue,
            weekFromCurrentWeek: weeksMove
        })
    })
    
    return weekView
}

function isNonBookableWeek(weekView: WeekView[], userAvailability: false | UserAvailability): boolean{
    let isNonBookable: boolean = true


    weekView.forEach((weekDay, index) => {
        const fromValueKey = userAvailability ? userAvailability[(Object.keys(userAvailability)[index * 2])] : null
        const toValueKey = userAvailability ? userAvailability[(Object.keys(userAvailability)[(index * 2) + 1])] : null

        if(fromValueKey && toValueKey){
            isNonBookable = false
        }
    })

    return isNonBookable
}
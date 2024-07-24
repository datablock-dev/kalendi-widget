import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import isBetween from "dayjs/plugin/isBetween"
import weekOfYear from "dayjs/plugin/weekOfYear"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { months, weekDays } from "../utils/time";
import { Options, WeekView, UserAvailabilityResponse, Data, Services, Locale } from "../types";
import { KalendiContext } from "../KalendiProvider";
import axios, { AxiosResponse } from "axios";

export interface KalendiSchedule {
    backendRoute: string
    data: Data[]
    services: Services[]
    selectedUser: string
    selectedService: string
    setView: Dispatch<SetStateAction<Options | null>>
    setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>
}

export default function KalendiSchedule({ backendRoute, data, services, selectedUser, selectedService, setView, setSelectedDate }: KalendiSchedule) {
    const context = useContext(KalendiContext)
    dayjs.extend(isBetween)
    dayjs.extend(weekOfYear)
    const currentDate = dayjs()
    const [weekMove, setWeekMove] = useState<number>(0)
    const [weekView, setWeekView] = useState<null | WeekView[]>(null)
    const [firstAvailableSlot, setFirstAvailableSlot] = useState<string | null>(null)
    const [weekToAvailability, setWeekToAvailability] = useState<null | [string, string]>(null)

    const service = services.find((item) => item.service_id === selectedService)

    useEffect(() => {
        if (!weekView) {
            setWeekView(createWeekView(currentDate, weekMove, context?.locale || 'en'))
        } else if (weekView && context?.availability) {
            if (!context.availability.availability && selectedUser) {
                fetchAvailability(weekView)
            } else if (weekMove !== weekView[0].weekFromCurrentWeek) {
                setWeekView(createWeekView(currentDate, weekMove, context?.locale || 'en'))
                fetchAvailability(createWeekView(currentDate, weekMove, context?.locale || 'en'))
            }
        }

    }, [currentDate, weekMove, context?.availability])

    if (!service) return <span>...</span>

    async function fetchAvailability(weekView: WeekView[], date_from: string | null = null, date_to: string | null = null) {
        try {
            let urlString: null | string = null
            if (!selectedUser || !weekView) return

            const dateFrom = `${weekView[0].year}-${weekView[0].monthLeadingZero}-${weekView[0].dayOfMonthLeadingZero}`
            const dateTo = `${weekView[4].year}-${weekView[4].monthLeadingZero}-${weekView[4].dayOfMonthLeadingZero}`
            urlString = `${backendRoute}/public/availability/${selectedUser}/${service?.service_id}/${date_from || dateFrom}/${date_to || dateTo}/${new Date().getTimezoneOffset()}`

            if (!urlString) return
            const { data } = await axios.get(urlString) as AxiosResponse<UserAvailabilityResponse>
            context?.availability.setAvailability(data.scheduleAvailability)
            setFirstAvailableSlot(data.firstAvailableSlot)
        
            if(data.weekToAvailability) setWeekToAvailability(data.weekToAvailability)
            if(data.firstAvailableSlot) setFirstAvailableSlot(data.firstAvailableSlot)

        } catch (error) {
            console.error(error)
        }
    }

    function changeWeek(direction: 'left' | 'right') {
        if (direction === "right" && weekMove < 10) {
            setWeekMove(weekMove + 1)
        } else if (direction === "left" && weekMove > 0) {
            setWeekMove(weekMove - 1)
        }
    }

    async function nextAvailableTime(){
        if(!context?.availability.availability || !firstAvailableSlot) return

        console.log(context.availability.availability)
        const weeksToMove = dayjs(firstAvailableSlot).week() - currentDate.add(weekMove, 'week').week()
        setWeekMove(weekMove + weeksToMove)
    }

    return (
        <div className="h-[100%] w-[100%]">
            <div className="flex flex-row justify-between w-[100%] h-[40px] mb-[10px]">
                <div
                    className="flex flex-row items-center gap-[6px] rounded-[3px] data-[selectable=true]:hover:cursor-pointer data-[selectable=false]:hover:cursor-not-allowed border-[#787878] border-[1px] border-solid px-[12px] text-[#000] select-none"
                    data-selectable={weekMove > 0 ? true : false}
                    onClick={() => { changeWeek('left') }}
                >
                    <KeyboardArrowLeftIcon sx={{ fill: "#000" }} />
                    <span>
                        { context?.locale === "en" && "Previous Week" }
                        { context?.locale === "sv" && "Förra Veckan" }
                    </span>
                </div>
                <div
                    className="flex flex-row items-center gap-[6px] rounded-[3px] data-[selectable=true]:hover:cursor-pointer data-[selectable=false]:hover:cursor-not-allowed data-[selectable=true]:hover:bg-[#d4d4d4] border-[#787878] border-[1px] border-solid px-[12px] text-[#000] select-none"
                    data-selectable={weekMove < 10 ? true : false}
                    onClick={() => { changeWeek('right') }}
                >
                    <span>
                        { context?.locale === "en" && "Next Week " }
                        { context?.locale === "sv" && "Nästa Vecka" }
                    </span>
                    <KeyboardArrowRightIcon sx={{ fill: "#000" }} />
                </div>
            </div>
            {
                !weekView &&
                <div className="w-[100%] h-[100%] flex justify-center items-center">
                    <div id='outer'>
                        <div id='middle'>
                            <div id='inner' />
                        </div>
                    </div>
                </div>
            }
            <div className="w-[100%] h-[50px] grid week-grid overflow-y-auto">
                {
                    (weekView && context?.availability.availability) &&
                    weekView.map((day) => {
                        return (
                            <div
                                className="w-[100%] h-[100%] min-h-[100%] flex flex-col odd:bg-[#c4c4c48a]"
                                key={day.date.format('YYYY-MM-DD HH:mm:ss')}
                                data-date={day.date.format('YYYY-MM-DD')}
                            >
                                <div className="flex flex-col items-center">
                                    <span className="text-[#000]">{day.weekDayString.substring(0, 3)}</span>
                                    <span className="text-[#000]">{day.dayOfMonth}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="w-[100%] h-[calc(100%_-_100px)] grid week-grid overflow-y-auto relative">
                {
                    (context?.availability.availability && context.availability.availability[weekMove] && weekView) &&
                    Object.keys(context.availability.availability[weekMove]).map((key, index) => {
                        if(!context.availability.availability) return
                        const availability = context.availability.availability[weekMove][key]
                        const weekHasAvailableSlots = Object.values(context.availability.availability[weekMove]).map((item) => item.length).reduce((prev, next) => prev + next) > 0 ? true : false
                        
                        return (
                            <div
                                className="w-[100%] h-[100%] min-h-[100%] flex flex-col"
                                key={key}
                                data-date={key}
                            >
                                <div className="flex flex-col h-[100%] items-center gap-[10px] bg-[#fff] pt-[10px]">
                                    {
                                        availability.length > 0 &&
                                        availability
                                            .filter((time) => parseInt(time.substring(0, 2)) >= 7)
                                            .map((time) => {
                                                return (
                                                    <div
                                                        className="rounded-[3px] bg-[#fff] py-[4px] px-[4px] border-solid border-[#d4d4d4] border-[1px] hover:cursor-pointer hover:bg-[#e4e4e4]"
                                                        data-timestamp={`${key} ${time}`}
                                                        key={key + time}
                                                        onClick={() => {
                                                            const timestamp = `${key} ${time}:00`
                                                            setSelectedDate(dayjs(timestamp))
                                                            setView('date-selected')
                                                        }}
                                                    >
                                                        <span className="text-[#000]">{time}</span>
                                                    </div>
                                                )
                                            })
                                    }
                                    {
                                        (!weekHasAvailableSlots && index === 2) &&
                                        <div 
                                            className="bg-[#1890ff] text-[#fff] px-[12px] py-[8px] rounded-[3px] border-[1px] hover:cursor-pointer hover:brightness-80 absolute bottom-[50%]"
                                            onClick={nextAvailableTime}
                                        >
                                            <span>
                                                { context?.locale === "en" && "Next available time" }
                                                { context?.locale === "sv" && "Nästa tillgängliga tid" }
                                            </span>
                                        </div>
                                    }
                                    {
                                        availability.length === 0 &&
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

function createWeekView(currentDate: Dayjs, weeksMove: number, locale: Locale): WeekView[] {
    const currDate = dayjs(currentDate)
    const currentWeekDay = currDate.day()

    // @ts-ignore
    const weekView = []

    const rollBack = currentWeekDay > 0 ? 1 - currDate.day() : -6
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
            monthString: months(locale)[newValue.month()],
            daysInMonth: newValue.daysInMonth(),
            weekDay: newValue.day(),
            weekDayString: weekDays(locale)[newValue.day()],
            date: newValue,
            weekFromCurrentWeek: weeksMove
        })
    })

    // @ts-ignore
    return weekView
}
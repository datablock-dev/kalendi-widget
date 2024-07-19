import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { Data, Locale, Options, UserAvailabilityResponse } from "../types"
import PersonIcon from '@mui/icons-material/Person';
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { dateToTimestamp } from "../utils/time";
import { KalendiContext } from "../KalendiProvider";

export interface EmployeeView {
    backendRoute: string
    data: Data[]
    setView: Dispatch<SetStateAction<Options | null>>
    selectedService: string | null
    selectedUser: string | null
    setSelectedUser: Dispatch<SetStateAction<string | null>>
}

interface AvailabilityObject {
    user_id: string
    service_id?: string
    date: string | null
}

export default function EmployeeView({ backendRoute, data, setView, selectedService, selectedUser, setSelectedUser }: EmployeeView) {
    const context = useContext(KalendiContext)
    const [availability, setAvailability] = useState<null | false | AvailabilityObject[]>(null)

    useEffect(() => {
        if (availability === null) {
            fetchAvailability()
        }

        async function fetchAvailability() {
            try {
                const users = data.filter((item) => item.service_id === selectedService)
                const date_from = dateToTimestamp(dayjs().day(1)).split(' ')[0]
                const date_to = dateToTimestamp(dayjs().day(5)).split(' ')[0]

                const promiseArray: Promise<AxiosResponse<UserAvailabilityResponse>>[] = []
                users.forEach((user) => {
                    const url = `${backendRoute}/public/availability/${user.user_id}/${selectedService}/${date_from}/${date_to}/${new Date().getTimezoneOffset()}`
                    promiseArray.push(axios.get(url))
                })

                const res = await Promise.all(promiseArray) as AxiosResponse<UserAvailabilityResponse>[]

                const availabilityData = res.map((response) => response.data).map((data) => {
                    return {
                        user_id: data.user_id,
                        service_id: data.service?.service_id,
                        date: data.firstAvailableSlot
                    }
                })

                setAvailability(availabilityData)
            } catch (error) {
                console.error(error)
                setAvailability(false)
            }
        }

        console.log(availability)
    }, [availability])

    return (
        <div>
            <div className="flex flex-col list">
                {
                    data
                        .filter((item) => item.service_id === selectedService)
                        .sort((a, b) => a.firstname > b.firstname ? 1 : -1)
                        .map((employee) => {
                            return (
                                <div
                                    className="flex flex-row justify-between border-[1px] border-solid border-[#787878] rounded-[3px] py-[6px] px-[12px] items-center"
                                    key={employee.user_id}
                                >
                                    <div className="flex flex-row items-center gap-[10px]">
                                        {
                                            employee.avatar ?
                                                <img
                                                    className="w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4]"
                                                    src={employee.avatar ? `${backendRoute}/upload/${employee.avatar}` : ""}
                                                    alt="service_image"
                                                />
                                                :
                                                <div className="w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4] text-[12px] flex items-center justify-center">
                                                    <PersonIcon sx={{ fill: "#000" }} />
                                                </div>
                                        }
                                        <div className="flex flex-col">
                                            <span className="color-[#000] font-[600]">{employee.firstname} {employee.lastname}</span>
                                            <span className="text-[#4f4f4f] text-[14px]">{employee.title}</span>
                                            <FirstAvilableSlot
                                                availability={availability}
                                                employee={employee}
                                                className="kalendi-md:hidden"
                                                locale={context?.locale || 'en'}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-[10px] kalendi-sd:hidden">
                                        <FirstAvilableSlot
                                            availability={availability}
                                            employee={employee}
                                            className="kalendi-sd:hidden"
                                            locale={context?.locale || 'en'}
                                        />
                                        <div
                                            className="rounded-[50%] h-[20px] w-[20px] border-[#787878] border-[1px] data-[selected=true]:bg-[#50913b] hover:bg-[#d4d4d4] hover:cursor-pointer"
                                            data-selected={selectedUser === employee.user_id ? true : false}
                                            onClick={() => {
                                                // Clear other settings that occurs after user selection
                                                selectedUser === employee.user_id ? setSelectedUser(null) : setSelectedUser(employee.user_id)
                                                setView('book')
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="rounded-[50%] h-[20px] w-[20px] border-[#787878] border-[1px] data-[selected=true]:bg-[#50913b] hover:bg-[#d4d4d4] hover:cursor-pointer kalendi-md:hidden"
                                        data-selected={selectedUser === employee.user_id ? true : false}
                                        onClick={() => {
                                            // Clear other settings that occurs after user selection
                                            selectedUser === employee.user_id ? setSelectedUser(null) : setSelectedUser(employee.user_id)
                                            setView('book')
                                        }}
                                    />
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

interface FirstAvilableSlot {
    availability: AvailabilityObject[] | null | false
    employee: Data
    className?: string
    locale: Locale
}

function FirstAvilableSlot({ availability, employee, className, locale }: FirstAvilableSlot){
    return(
        <>
        {
            (availability && availability.find((item) => item.user_id === employee.user_id)) ?
                <div className={"flex kalendi-md:flex-row kalendi-md:items-center kalendi-md:gap-[6px] kalendi-sd:flex-col " + className}>
                    <span className="h-fit">
                        { locale === "en" && "First available slot: " }
                        { locale === "sv" && "Första tillgängliga tid: " }
                    </span>
                    <span className="bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid text-[#000]">
                        {availability.find((item) => item.user_id === employee.user_id)?.date}
                    </span>
                </div>
                :
                <div className="flex items-center justify-center">
                    <svg
                        className="animate-spin"
                        style={{ fill: "#000" }}
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        width="24"
                        viewBox="0 -960 960 960"
                    >
                        <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
                    </svg>
                </div>
        }
        </>
    )
}
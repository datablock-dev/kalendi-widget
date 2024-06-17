'use client';

import React, { Dispatch, SetStateAction } from "react";
import { Dayjs } from "dayjs";
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import { Options, Data, Services, Users } from "../types";
import CloseIcon from '@mui/icons-material/Close';

export interface KalendiNavbar {
    backendRoute: string
    service_id?: string
    services: Services[]
    data: Data[]
    header?: string
    // View Management
    view: Options | null
    setView: Dispatch<SetStateAction<Options | null>>
    selectedUser: string | null
    setSelectedUser: Dispatch<SetStateAction<string | null>>
    selectedService: string | null
    setSelectedService: Dispatch<SetStateAction<string | null>>
    selectedDate: Dayjs | null
    users: Users[] | false | null
}

export default function KalendiNavbar({ backendRoute, service_id, services, data, header, view, setView, selectedService, setSelectedService, selectedUser, setSelectedUser, selectedDate, users }: KalendiNavbar) {

    return (
        <>
            <div className="w-[100%]">
                <h3 className="font-[600] text-[24px] mb-[10px]">{header || "Book an Appointment"}</h3>
                <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-[10px] flex-wrap">
                        {
                            (selectedService && view !== "confirmation") &&
                            <div className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] select-none data-[selected=true]:bg-[#d4d4d4] max-w-fit flex flex-row gap-[10px] items-center">
                                <CategoryIcon />
                                <span>{services.find((item) => item.service_id === selectedService)?.service_name}</span>
                                <div
                                    className="w-[20px] h-[20px] flex items-center justify-center rounded-[50%] hover:bg-[#d4d4d4] hover:cursor-pointer"
                                    onClick={() => {
                                        setSelectedService(null)
                                        setSelectedUser(null)
                                        setView('service')
                                    }}
                                >
                                    <CloseIcon fontSize={"small"} />
                                </div>
                            </div>
                        }
                        {
                            (selectedUser && users && view !== "confirmation") &&
                            <div className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] select-none data-[selected=true]:bg-[#d4d4d4] max-w-fit flex flex-row gap-[10px] items-center">
                                <PersonIcon />
                                <span>{users.find((item) => item.user_id === selectedUser)?.firstname} {users.find((item) => item.user_id === selectedUser)?.lastname}</span>
                            </div>
                        }
                    </div>
                    <div className="flex mt-[10px] flex-row gap-[10px] flex-wrap">
                        {
                            view !== "confirmation" &&
                            <>
                                <div
                                    className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4]"
                                    onClick={() => { view !== 'service' ? setView('service') : undefined }}
                                    data-selected={view === "service" ? true : false}
                                >
                                    Services
                                </div>
                                {
                                    selectedService &&
                                    <div
                                        className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4]"
                                        onClick={() => { view !== 'employee' ? setView('employee') : undefined }}
                                        data-selected={view === "employee" ? true : false}
                                    >
                                        Employees
                                    </div>
                                }
                                {
                                    (selectedService && selectedUser) &&
                                    <div
                                        className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4]"
                                        onClick={() => { view !== 'book' ? setView('book') : undefined }}
                                        data-selected={view === "book" ? true : false}
                                    >
                                        Book
                                    </div>
                                }
                                {
                                    (selectedDate && selectedService && selectedUser) &&
                                    <div
                                        className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4]"
                                        onClick={() => { view !== "date-selected" ? setView("date-selected") : undefined }}
                                        data-selected={view === "date-selected" ? true : false}
                                    >
                                        Confirm Booking
                                    </div>
                                }

                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
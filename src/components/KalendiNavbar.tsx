'use client';

import React, { Dispatch, SetStateAction, useContext } from "react";
import { Dayjs } from "dayjs";
import { Options, Data, Services, Users, CustomerData, PaymentConnector } from "../types";
import { KalendiContext } from "../KalendiProvider";
import Icons from "./Icons";

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
    paymentConnector?: PaymentConnector
    customerData: null | CustomerData
    setCustomerData: Dispatch<SetStateAction<CustomerData | null>>
}

export default function KalendiNavbar({ backendRoute, service_id, services, data, header, view, setView, selectedService, setSelectedService, selectedUser, setSelectedUser, selectedDate, users, paymentConnector, customerData, setCustomerData }: KalendiNavbar) {
    const context = useContext(KalendiContext)

    return (
        <>
            <div className="w-[100%]">
                <h3 className="font-[600] text-[24px] text-[#000] mb-[10px]">
                    {header && header}
                    {
                        !header &&
                        <>
                            {context?.locale === "en" && "Book an Appointment"}
                            {context?.locale === "sv" && "Boka ett möte"}
                        </>
                    }
                </h3>
                <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-[10px] flex-wrap">
                        {
                            (selectedService && view !== "confirmation") &&
                            <div className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] select-none data-[selected=true]:bg-[#d4d4d4] max-w-fit flex flex-row gap-[10px] items-center">
                                <Icons className="!size-[24px] fill-[#000]" icon="category"/>
                                <span className="text-[#000]">{services.find((item) => item.service_id === selectedService)?.service_name}</span>
                                <div
                                    className="w-[20px] h-[20px] flex items-center justify-center rounded-[50%] hover:bg-[#d4d4d4] hover:cursor-pointer"
                                    onClick={() => {
                                        setSelectedService(null)
                                        setSelectedUser(null)
                                        setView('service')
                                    }}
                                >
                                    <Icons className="!size-[14px] fill-[#000]" icon="close"/>
                                </div>
                            </div>
                        }
                        {
                            (selectedUser && users && view !== "confirmation") &&
                            <div className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] select-none data-[selected=true]:bg-[#d4d4d4] max-w-fit flex flex-row gap-[10px] items-center">
                                <Icons className="!size-[24px] fill-[#000]" icon="person"/>
                                <span className="text-[#000]">{users.find((item) => item.user_id === selectedUser)?.firstname} {users.find((item) => item.user_id === selectedUser)?.lastname}</span>
                            </div>
                        }
                    </div>
                    <div className="flex mt-[10px] flex-row gap-[10px] flex-wrap">
                        {
                            view !== "confirmation" &&
                            <>
                                <div
                                    className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4] text-[#000]"
                                    onClick={() => { view !== 'service' ? setView('service') : undefined }}
                                    data-selected={view === "service" ? true : false}
                                >
                                    {context?.locale === "en" && "Services"}
                                    {context?.locale === "sv" && "Tjänster"}
                                </div>
                                {
                                    selectedService &&
                                    <div
                                        className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4] text-[#000]"
                                        onClick={() => { view !== 'employee' ? setView('employee') : undefined }}
                                        data-selected={view === "employee" ? true : false}
                                    >
                                        {context?.locale === "en" && "Employees"}
                                        {context?.locale === "sv" && "Konsult"}
                                    </div>
                                }
                                {
                                    (selectedService && selectedUser) &&
                                    <div
                                        className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4] text-[#000]"
                                        onClick={() => { view !== 'book' ? setView('book') : undefined }}
                                        data-selected={view === "book" ? true : false}
                                    >
                                        {context?.locale === "en" && "Time Slots"}
                                        {context?.locale === "sv" && "Tid"}
                                    </div>
                                }
                                {
                                    (selectedDate && selectedService && selectedUser) &&
                                    <div
                                        className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4] text-[#000]"
                                        onClick={() => { view !== "date-selected" ? setView("date-selected") : undefined }}
                                        data-selected={view === "date-selected" ? true : false}
                                    >
                                        {context?.locale === "en" && "Confirm Booking"}
                                        {context?.locale === "sv" && "Dina uppgifter"}
                                    </div>
                                }
                                {
                                    (selectedDate && selectedService && selectedUser && customerData && paymentConnector?.key) &&
                                    <div
                                        className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4] text-[#000]"
                                        onClick={() => { view !== 'pay' ? setView('pay') : undefined }}
                                        data-selected={view === "pay" ? true : false}
                                    >
                                        {context?.locale === "en" && "Pay"}
                                        {context?.locale === "sv" && "Betala"}
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
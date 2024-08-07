'use client';

import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { CustomerData, Data, Options, PaymentConnector, Services } from "../types"
import { Dayjs } from "dayjs"

// Views
import KalendiSchedule from "../views/KalendiSchedule";
import ServiceView from "../views/ServiceView";
import ConfirmBookingView from "../views/Booking";
import EmployeeView from "../views/EmployeeView";
import Final from "../views/Final";
import PaymentView from "../views/Payment";

export interface KalendiViewer {
    backendRoute: string
    services: Services[]
    data: Data[]
    header?: string
    // View Management
    view: Options | null
    setView: Dispatch<SetStateAction<Options | null>>
    // User
    selectedUser: string | null
    setSelectedUser: Dispatch<SetStateAction<string | null>>
    selectedService: string | null
    setSelectedService: Dispatch<SetStateAction<string | null>>
    selectedDate: Dayjs | null
    setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>

    // Payments
    paymentConnector?: PaymentConnector
    customerData: null | CustomerData
    setCustomerData: Dispatch<SetStateAction<CustomerData | null>>
}

export default function KalendiViewer({ backendRoute, services, data, view, setView, selectedUser, setSelectedUser, selectedService, setSelectedService, selectedDate, setSelectedDate, paymentConnector, customerData, setCustomerData }: KalendiViewer) {

    useEffect(() => {
        setSelectedDate(null)
    }, [selectedUser])

    return (
        <div className="overflow-y-scroll w-[100%] h-[100%] mt-[10px]">
            {
                view === "service" &&
                <ServiceView
                    backendRoute={backendRoute}
                    services={services}
                    setView={setView}
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                    data={data}
                />
            }
            {
                (view === "employee" && data && selectedService) &&
                <div>
                    <EmployeeView
                        backendRoute={backendRoute}
                        data={data}
                        setView={setView}
                        selectedService={selectedService}
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                    />
                </div>
            }
            {
                (view === "book" && selectedService && selectedUser) &&
                <KalendiSchedule
                    backendRoute={backendRoute}
                    // Data
                    data={data}
                    services={services}
                    // Select states
                    selectedUser={selectedUser}
                    selectedService={selectedService}
                    setView={setView}
                    setSelectedDate={setSelectedDate}
                />
            }
            {
                (selectedService && selectedUser && selectedDate && services && data) &&
                <>
                    {
                        view === "date-selected" &&
                        <ConfirmBookingView
                            backendRoute={backendRoute}
                            // Data
                            data={data}
                            services={services}
                            // Select states
                            selectedUser={selectedUser}
                            selectedService={selectedService}
                            selectedDate={selectedDate}
                            setView={setView}
                            customerData={customerData}
                            setCustomerData={setCustomerData}
                            hasPaymentConnector={paymentConnector?.key ? true : false}
                        />
                    }
                    {
                        (view === "pay" && paymentConnector && customerData) &&
                        <PaymentView
                            backendRoute={backendRoute}
                            customerData={customerData}
                            // Data
                            data={data}
                            services={services}
                            // Select states
                            selectedUser={selectedUser}
                            selectedService={selectedService}
                            selectedDate={selectedDate}
                            setView={setView}
                            setCustomerData={setCustomerData}
                            paymentConnector={paymentConnector}
                        />
                    }
                    {
                        (view === "confirmation" && customerData) &&
                        <Final
                            backendRoute={backendRoute}
                            customerData={customerData}
                            data={data}
                            services={services}
                            selectedUser={selectedUser}
                            selectedService={selectedService}
                            selectedDate={selectedDate}
                        />
                    }
                </>
            }
        </div>
    )
}
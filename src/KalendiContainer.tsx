'use client';

import React, { useContext, useEffect, useState } from "react"
import KalendiNavbar from "./components/KalendiNavbar";
import KalendiViewer from "./components/KalendiViewer";
import { Options, Services, Users, Data, PaymentConnector } from './types';
import { Dayjs } from 'dayjs';
import axios, { AxiosResponse } from "axios";
import { KalendiContext } from "./KalendiProvider";
import Notification from "./components/Notification";
import Icons from "./components/Icons";

interface KalendiContainerProps {
    backendRoute: string
    user_id?: string
    service_id?: string
    header?: string
    closeCallback: (e?: any) => any
    // Styling
    paymentConnector?: PaymentConnector
}

export function KalendiContainer({ backendRoute, user_id, service_id, closeCallback, header, paymentConnector }: KalendiContainerProps) {
    const context = useContext(KalendiContext)
    const [services, setServices] = useState<null | Services[]>(null)
    const [users, setUsers] = useState<null | false | Users[]>(null)
    const [data, setData] = useState<null | false | Data[]>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [view, setView] = useState<Options | null>('service')

    // Selection states
    const [selectedService, setSelectedService] = useState<null | string>(service_id || null)
    const [selectedUser, setSelectedUser] = useState<null | string>(user_id || null) // The user_id
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)

    if (!backendRoute) throw new TypeError("backendRoute prop must be provided!")

    useEffect(() => {
        if (data === null) {
            getData()
        }
    }, [data])

    useEffect(() => {
        if (users === null && data) {
            const uniqueUserSet = new Set<string>()
            const uniqueUserArray: Users[] = []

            data.forEach((item) => {
                if (!uniqueUserSet.has(item.user_id)) {
                    uniqueUserArray.push({
                        user_id: item.user_id,
                        firstname: item.firstname,
                        lastname: item.lastname,
                        avatar: item.avatar,
                        title: item.title,
                        email: item.email,
                        admin_id: item.admin_id
                    })
                    uniqueUserSet.add(item.user_id)
                }
            })

            setUsers(uniqueUserArray)
        }
    }, [users, data])

    async function getData() {
        try {
            let urlString: null | string = null
            if (user_id && !service_id) {
                urlString = `${backendRoute}/public/user_data/${user_id}`
            } else if (service_id && !user_id) {
                urlString = `${backendRoute}/public/user_data/null/${service_id}`
            } else if (service_id && user_id) {
                urlString = `${backendRoute}/public/user_data/${user_id}/${service_id}`
            } else if (!service_id && !user_id) {
                urlString = `${backendRoute}/public/user_data`
            }

            if (!urlString) return

            const { data } = await axios.get(urlString) as AxiosResponse<Data[]>

            if(data.length === 0){
                const error = new Error("No service/employee combinations found. Please check that you have configured everything right in Kalendi")
                context?.onError && context.onError(error)
                console.error(error)
                return closeCallback()
            }

            setData(data)
            // Set services
            const serviceSet = new Set<string>()
            const serviceArray: Services[] = []
            data.forEach((item) => {
                if (!serviceSet.has(item.service_id)) {
                    serviceArray.push({
                        service_id: item.service_id,
                        service_image: item.service_image,
                        service_name: item.service_name,
                        service_price: item.service_price,
                        service_currency: item.service_currency,
                        service_time_block: item.service_time_block,
                        service_url: item.service_url
                    })
                    serviceSet.add(item.service_id)
                }
            })

            setServices(serviceArray)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setIsLoading(false)
            setData(false)
            closeCallback
        }
    }

    return (
        <div 
            className="flex fixed items-center justify-center top-[0px] left-[0px] w-[100vw] h-[100vh] z-[9999999]"
            style={{position: 'fixed'}}
            id="kalendi-widget-wrapper"
        >
            <div
                className="absolute z-[10001] kalendi-md:top-[20px] kalendi-sd:top-[0px] kalendi-sd:left-[0px] shadow-[0_20px_20px_0_rgba(0,0,0,.25)] min-h-[100px] min-w-[200px] h-[400px] max-h-[200px] rounded-[3px] border-[1px] border-solid border-[#787878] transition-[max-height,max-width] duration-[800ms] ease bg-[#fff] flex flex-col data-[loading=false]:items-center data-[loading=false]:max-h-[90vh] kalendi-sd:data-[loading=false]:max-h-[100dvh] data-[loading=false]:h-[calc(90vh_-_100px)] kalendi-sd:data-[loading=false]:h-[100dvh] data-[loading=false]:w-[min(1000px,90vw)] kalendi-sd:data-[loading=false]:w-[100vw] data-[loading=false]:max-w-[min(1000px,90vw)] kalendi-sd:data-[loading=false]:max-w-[100vw] data-[loading=false]:p-[20px] data-[loading=true]:justify-center data-[loading=true]:items-center data-[loading=true]:max-w-[200px]"
                data-loading={isLoading}
            >
                <div 
                    className='absolute flex justify-center items-center right-[20px] top-[20px] rounded-[50%] w-[30px] h-[30px] hover:cursor-pointer hover:opacity-80 hover:bg-[#d4d4d4]'
                    onClick={closeCallback}
                >
                    <Icons 
                        className="!size-[30px] fill-[#000]"
                        icon="close"
                    />
                </div>
                {
                    isLoading &&
                    <svg
                        className="animate-spin" 
                        style={{ fill: "#000" }}
                        xmlns="http://www.w3.org/2000/svg" 
                        height="80" 
                        width="80"
                        viewBox="0 -960 960 960" 
                    >
                        <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/>
                    </svg>
                }
                {
                    (!isLoading && data && services && context) &&
                    <>
                        <KalendiNavbar
                            backendRoute={backendRoute}
                            service_id={service_id}
                            services={services}
                            data={data}
                            header={header}
                            // Select states
                            selectedService={selectedService}
                            setSelectedService={setSelectedService}
                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                            selectedDate={selectedDate}
                            users={users}
                            // Views
                            view={view}
                            setView={setView}
                            paymentConnector={paymentConnector}
                            // CustomerData
                            customerData={context.customerData}
                            setCustomerData={context.setCustomerData}
                        />
                        <KalendiViewer
                            backendRoute={backendRoute}
                            services={services}
                            data={data}
                            view={view}
                            setView={setView}
                            selectedUser={selectedUser}
                            setSelectedUser={setSelectedUser}
                            selectedService={selectedService}
                            setSelectedService={setSelectedService}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            paymentConnector={paymentConnector}
                            // CustomerData
                            customerData={context.customerData}
                            setCustomerData={context.setCustomerData}
                        />
                    </>
                }
                <Notification/>
            </div>
            <a 
                className='absolute bottom-[10px]'
                href="https://datablock.dev"
            >
                Powered by Kalendi
            </a>
            <div className="bg-[rgba(0,0,0,.8)] w-[100%] h-[100%]"/>
        </div>
    )
}
"use client";

import './style.css';
import './tailwind.css';
import React from "react"
import { useEffect, useState } from "react"
import KalendiNavbar from './KalendiNavbar';
import CloseIcon from '@mui/icons-material/Close';
import KalendiViewer from './KalendiViewer';
import { Options, Services, Users, Data, KalendiContainerProps } from '../types';
import { Dayjs } from 'dayjs';

export function KalendiContainer({ backendRoute, user_id, service_id, closeCallback, header }: KalendiContainerProps): JSX.Element {
    const [services, setServices] = useState<null | Services[]>(null)
    const [users, setUsers] = useState<null | false | Users[]>(null)
    const [userServices, setUserServices] = useState(null)
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
            const uniqueUserArray = new Array()

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

            const res = await fetch(urlString, { method: 'GET', })
            const data = await res.json() as Data[]
            setData(data)

            // Set services
            const serviceSet = new Set<string>()
            const serviceArray = new Array()
            data.forEach((item) => {
                if (!serviceSet.has(item.service_id)) {
                    serviceArray.push({
                        service_id: item.service_id,
                        service_image: item.service_image,
                        service_name: item.service_name,
                        service_price: item.service_price,
                        service_currency: item.service_currency,
                        service_time_block: item.service_time_block
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
        }
    }

    return (
        <div className="kalendi-container">
            <div
                className="kalendi-widget-wrapper"
                data-loading={isLoading}
            >
                <div 
                    className='absolute flex justify-center items-center right-[20px] top-[20px] rounded-[50%] w-[30px] h-[30px] hover:cursor-pointer hover:opacity-80 hover:bg-[#d4d4d4]'
                    onClick={closeCallback}
                >
                    <CloseIcon/>
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
                    (!isLoading && data && services) &&
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
                        />
                    </>
                }
            </div>
            <a 
                className='absolute bottom-[10px]'
                href="https://datablock.dev"
            >
                Powered by Kalendi
            </a>
        </div>
    )
}
import React, { Dispatch, SetStateAction, useEffect } from "react"
import ServiceItem from "../components/ServiceItem"
import { Options, Services, Data } from "../types"

interface ServiceView {
    backendRoute: string
    services: Services[]
    setView: Dispatch<SetStateAction<Options | null>>
    selectedService: string | null
    setSelectedService: Dispatch<SetStateAction<string | null>>
    selectedUser: string | null
    setSelectedUser: Dispatch<SetStateAction<string | null>>
    data: Data[]
}

export default function ServiceView({ backendRoute, services, setView, selectedService, setSelectedService, selectedUser, setSelectedUser, data }: ServiceView){

    useEffect(() => {
        
    }, [selectedService, selectedUser])

    return (
        <div className="">
            <div className="list">
                {
                    // If no user has been selected
                    (services && !selectedUser) &&
                    services
                        .sort((a, b) => a.service_name < b.service_name ? -1 : 1)
                        .map((item) => {
                            return (
                                <ServiceItem
                                    key={item.service_id}
                                    service={item}
                                    backendRoute={backendRoute}
                                    selectedService={selectedService}
                                    setSelectedService={setSelectedService}
                                    setView={setView}
                                />
                            )
                        })
                }
                {
                    // If no service has been selected but we have a selected user
                    (selectedUser && data) &&
                    data
                        .filter((item) => item.user_id === selectedUser)
                        .sort((a, b) => a.service_name < b.service_name ? -1 : 1)
                        .map((item) => {
                            return (
                                <ServiceItem
                                    key={item.service_id}
                                    service={item}
                                    backendRoute={backendRoute}
                                    selectedService={selectedService}
                                    setSelectedService={setSelectedService}
                                    setView={setView}
                                />
                            )
                        })
                }
            </div>
        </div>
    )
}
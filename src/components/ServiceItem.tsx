import React, { Dispatch, SetStateAction, useContext } from "react"
import { Options, Services } from "../types"
import { formatMonetaryValue } from "../utils/string";
import { KalendiContext } from "../KalendiProvider";
import Icons from "./Icons";
export interface ServiceItem {
    service: Services
    backendRoute: string
    selectedService: string | null
    setSelectedService: Dispatch<SetStateAction<string | null>>
    setView: Dispatch<SetStateAction<Options | null>>
}

export default function ServiceItem({ service, backendRoute, selectedService, setSelectedService, setView }: ServiceItem) {
    const context = useContext(KalendiContext)

    return (
        <div
            className="flex flex-row items-center gap-[10px] rounded-[3px] border-solid border-[1px] border-[#787878] py-[6px] px-[12px] bg-[#fff] justify-between"
            key={service.service_id}
        >
            <div className="flex flex-row items-center gap-[10px] w-[100%]">
                {
                    service.service_image ?
                        <img
                            className="w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4]"
                            src={service.service_image ? `${backendRoute}/upload/${service.service_image}` : ""}
                            alt="service_image"
                        />
                        :
                        <div className="w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4] text-[12px] flex items-center justify-center">
                            <Icons
                                className="!size-[30px] fill-[#000]"
                                icon="image"
                            />
                        </div>
                }
                <div className="flex flex-col w-[calc(100%_-_60px)]">
                    <span className="text-[#000] font-[600] leading-[18px]">{service.service_name}</span>
                    <span className="text-[#4f4f4f] text-[14px]">{formatMonetaryValue(service.service_price || 0, ' ')} {service.service_currency}</span>
                </div>
            </div>
            <div
                className="rounded-[50%] h-[20px] w-[20px] border-[#787878] border-[1px] data-[selected=true]:bg-[#50913b] data-[selected=true]:border-[#141414] hover:bg-[#d4d4d4] hover:cursor-pointer min-w-[20px] min-h-[20px]"
                data-selected={selectedService === service.service_id ? true : false}
                onClick={() => {
                    if (selectedService === service.service_id) {
                        setSelectedService(null)
                        context?.setServiceID(undefined)
                    } else {
                        setSelectedService(service.service_id)
                        context?.setServiceID(service.service_id)
                        setView('employee')
                    }
                }}
            />
        </div>
    )
}
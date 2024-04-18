import { Dispatch, SetStateAction } from "react"
import { Options, Services } from "types"

export interface ServiceItem {
    service: Services
    backendRoute: string
    selectedService: string | null
    setSelectedService: Dispatch<SetStateAction<string | null>>
    setView: Dispatch<SetStateAction<Options | null>>
}

export default function ServiceItem({ service, backendRoute, selectedService, setSelectedService, setView }: ServiceItem){
    return (
        <div
            className="list-item justify-between"
            key={service.service_id}
        >
            <div className="flex flex-row items-center gap-[10px]">
                {
                    service.service_image ?
                        <img
                            className="image-round"
                            src={service.service_image ? `${backendRoute}/upload/${service.service_image}` : ""}
                            alt="service_image"
                        />
                        :
                        <div className="image-round text-[12px] flex items-center justify-center">N/A</div>
                }
                <span>{service.service_name}</span>
            </div>
            <div
                className="rounded-[50%] h-[20px] w-[20px] border-[#787878] border-[1px] data-[selected=true]:bg-[#50913b] hover:bg-[#d4d4d4] hover:cursor-pointer"
                data-selected={selectedService === service.service_id ? true : false}
                onClick={() => {
                    if(selectedService === service.service_id){
                        setSelectedService(null)
                    } else {
                        setSelectedService(service.service_id)
                        setView('employee')
                    }
                }}
            />
        </div>
    )
}
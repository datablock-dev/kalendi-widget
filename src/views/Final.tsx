import React, { useContext, useEffect } from "react"
import { Dayjs } from "dayjs"
import { CustomerData, Data, Services } from "../types"
import { KalendiContext } from "../KalendiProvider";
import Icons from "../components/Icons";

interface Final {
    backendRoute: string
    // Data
    data: Data[]
    services: Services[]
    // Select states
    selectedUser: string
    selectedService: string
    selectedDate: Dayjs
    customerData: CustomerData,
}

export default function Final({ backendRoute, data, services, selectedUser, selectedService, selectedDate, customerData }: Final) {
    const context = useContext(KalendiContext)
    const service = services.find((item) => item.service_id === selectedService)
    const user = data.find((item) => item.user_id === selectedUser)

    useEffect(() => {
        if(context && context.onSuccess){
            // Add data callback here
            
            return context.onSuccess(context.customerData)
        }
    }, [context])

    if (!service || !user) return <div>Error...</div>

    return (
        <div className="w-[100%] h-[100%] flex flex-col">
            <p className="whitespace-pre-line text-[18px] text-[#000]">
                { context?.locale === "en" && "Dear " }
                { context?.locale === "sv" && "Kära " }
                <span className="font-[600] text-[#000]">{customerData.name}</span>,
                <br /><br />
                { context?.locale === "en" && "We are thrilled to confirm that your booking has been successfully processed. Please review the details below to ensure that everything aligns with your request:"}
                { context?.locale === "sv" && "Vi är glada att bekräfta att din bokning har behandlats och gått igenom. Vänligen granska detaljerna nedan för att säkerställa att vi har fått rätt information från dig:"}
            </p>
            <div className="flex flex-col items-center mx-[20px]">
                <div className="flex flex-row items-center gap-[10px]">
                    <span className="text-[#000] bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid">{selectedDate.format('YYYY-MM-DD')}</span>
                    <span className="text-[#000] bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid">{selectedDate.format('HH:mm')}</span>
                    <span className="text-[#000]">
                        { context?.locale === "en" && "to" }
                        { context?.locale === "sv" && "till" }
                    </span>
                    <span className="text-[#000] bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid">{selectedDate.add(service.service_time_block, 'minutes').format('HH:mm')}</span>
                </div>
                <div className="flex flex-col flex-wrap gap-[10px] my-[10px] w-fit">
                    <div className="flex flex-col items-center rounded-[3px] border-[#787878] border-[1px] border-solid kalendi-sd:w-[100%] kalendi-md:w-[300px] py-[10px]">
                        <label className="font-[600] text-[#000]">
                            { context?.locale === "en" && "Service" }
                            { context?.locale === "sv" && "Tjänst" }
                        </label>
                        <div className="flex flex-row items-center gap-[10px]">
                            {
                                service.service_image ?
                                    <img
                                        className="w-[50px] h-[50px] rounded-[50%] object-cover bg-[#b2b2b2]"
                                        src={service.service_image ? `${backendRoute}/upload/${service.service_image}` : ""}
                                        alt="service_image"
                                    />
                                    :
                                    <div className="w-[50px] h-[50px] rounded-[50%] object-cover bg-[#b2b2b2] text-[12px] flex items-center justify-center">
                                        <Icons className="size-[24px] fill-[#000]" icon="image"/>
                                    </div>
                            }
                            <span className="text-[#000]">{service.service_name}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center rounded-[3px] border-[#787878] border-[1px] border-solid kalendi-sd:w-[100%] kalendi-md:w-[300px] py-[10px]">
                        <label className="font-[600] text-[#000]">
                            { context?.locale === "en" && "Employee" }
                            { context?.locale === "sv" && "Konsult" }
                        </label>
                        <div className="flex flex-row items-center gap-[10px]">
                            {
                                user.avatar ?
                                    <img
                                        className="w-[50px] h-[50px] rounded-[50%] object-cover bg-[#b2b2b2]"
                                        src={user.avatar ? `${backendRoute}/upload/${user.avatar}` : ""}
                                        alt="user_avatar"
                                    />
                                    :
                                    <div className="w-[50px] h-[50px] rounded-[50%] object-cover bg-[#b2b2b2] text-[12px] flex items-center justify-center text-[#000]">N/A</div>
                            }
                            <span className="text-[#000]">{user.firstname} {user.lastname}</span>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-[#000] whitespace-pre-line">
                { context?.locale === "en" && 
                    `A confirmation email has been sent to the email address provided during booking.
                    If you do not see it in your inbox, please check your spam or junk folder.

                    Thank you for choosing our service. We look forward to serving you. If you have any questions or need further assistance, please feel free to reach out to us.` 
                }
                { context?.locale === "sv" && 
                    `Ett bekräftelsemail har skickats till den e-postadress som angavs vid bokningen. Om du inte ser det i din inkorg, vänligen kontrollera din skräppost eller skräpmapp.

                    Tack för att du valde oss, och vi ser fram emot att få hjälpa dig. Om du har några frågor eller behöver ytterligare assistans, hör gärna av dig till oss.` 
                }
            </p>
        </div>
    )
}
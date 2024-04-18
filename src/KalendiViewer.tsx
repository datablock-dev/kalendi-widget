import { Dispatch, SetStateAction, useEffect } from "react"
import { Data, Options, Services } from "types"
import ServiceItem from "./components/ServiceItem"
import KalendiSchedule from "./views/KalendiSchedule"
import ServiceView from "./views/ServiceView"
import { Dayjs } from "dayjs"
import ConfirmBookingView from "./views/Booking"

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
}

export default function KalendiViewer({ backendRoute, services, data, view, setView, selectedUser, setSelectedUser, selectedService, setSelectedService, selectedDate, setSelectedDate }: KalendiViewer) {
    
    useEffect(() => {}, [view])

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
                    <div className="list">
                        {
                            data
                                .filter((item) => item.service_id === selectedService)
                                .sort((a, b) => a.firstname > b.firstname ? 1 : -1)
                                .map((employee) => {
                                    return (
                                        <div
                                            className="list-item justify-between"
                                            key={employee.user_id}
                                        >
                                            <div className="flex flex-row items-center gap-[10px]">
                                                {
                                                    employee.avatar ?
                                                        <img
                                                            className="image-round"
                                                            src={employee.avatar ? `${backendRoute}/upload/${employee.avatar}` : ""}
                                                            alt="service_image"
                                                        />
                                                        :
                                                        <div className="image-round text-[12px] flex items-center justify-center">N/A</div>
                                                }
                                                <span>{employee.firstname} {employee.lastname}</span>
                                            </div>
                                            <div
                                                className="rounded-[50%] h-[20px] w-[20px] border-[#787878] border-[1px] data-[selected=true]:bg-[#50913b] hover:bg-[#d4d4d4] hover:cursor-pointer"
                                                data-selected={selectedUser === employee.user_id ? true : false}
                                                onClick={() => {
                                                    selectedUser === employee.user_id ? setSelectedUser(null) : setSelectedUser(employee.user_id)

                                                }}
                                            />
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            }
            {
                (view === "book" && selectedService && selectedUser) &&
                <KalendiSchedule
                    backendRoute={backendRoute}
                    selectedUser={selectedUser}
                    setView={setView}
                    setSelectedDate={setSelectedDate}
                />
            }
            {
                (view === "date-selected" && selectedService && selectedUser && selectedDate && services && data) &&
                <ConfirmBookingView
                    backendRoute={backendRoute}
                    // Data
                    data={data}
                    services={services}
                    // Select states
                    selectedUser={selectedUser}
                    selectedService={selectedService}
                    selectedDate={selectedDate}
                />
            }
        </div>
    )
}
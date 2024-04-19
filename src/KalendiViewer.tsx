import { Dispatch, SetStateAction, useEffect } from "react"
import { Data, Options, Services } from "types"
import { Dayjs } from "dayjs"

// Views
import KalendiSchedule from "./views/KalendiSchedule"
import ServiceView from "./views/ServiceView"
import ConfirmBookingView from "./views/Booking"
import EmployeeView from "./views/EmployeeView"

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
                    <EmployeeView
                        backendRoute={backendRoute}
                        data={data}
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
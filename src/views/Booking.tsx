import { Dayjs } from "dayjs"
import { timestampToString } from "src/utils/time"
import { Data, Services, Users } from "types"
import Input from "src/components/Input"

export interface ConfirmBookingView {
    backendRoute: string
    // Data
    data: Data[]
    services: Services[]
    // Select states
    selectedUser: string
    selectedService: string
    selectedDate: Dayjs
}

export default function ConfirmBookingView({ backendRoute, data, services, selectedUser, selectedService, selectedDate }: ConfirmBookingView) {

    console.log(services, selectedService, selectedUser)

    const service = services.find((item) => item.service_id === selectedService)
    const user = data.find((item) => item.user_id === selectedUser)

    if (!service || !user) return <div>Error...</div>

    return (
        <div className="w-[100%] h-[100%] flex flex-col">
            <div className="flex flex-col">
                <h1>Confirm your booking</h1>
                <p>You are about to book the following...</p>
            </div>
            <div className="flex flex-row items-center">
                <label>Date:</label>
                <span>{timestampToString(selectedDate)}</span>
            </div>
            <div className="flex flex-row items-center">
                <label>Service:</label>
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
            </div>
            <div className="flex flex-row items-center">
                <label>Employee:</label>
                <div className="flex flex-row items-center gap-[10px]">
                    {
                        user.avatar ?
                            <img
                                className="image-round"
                                src={user.avatar ? `${backendRoute}/upload/${user.avatar}` : ""}
                                alt="user_avatar"
                            />
                            :
                            <div className="image-round text-[12px] flex items-center justify-center">N/A</div>
                    }
                    <span>{user.firstname} {user.lastname}</span>
                </div>
            </div>
            <div className="flex flex-row justify-between w-[100%] flex-wrap">
                <Input
                    label="Name"
                />
                <Input
                    label="Email"
                    type="Email"
                />
            </div>
        </div>
    )
}
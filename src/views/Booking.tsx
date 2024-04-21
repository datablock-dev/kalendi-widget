import { useRef, useState } from "react"
import { Dayjs } from "dayjs"
import { fixTimezoneTimestamp, timestampToString } from "src/utils/time"
import { Data, Services, Users } from "types"
import { isEmail, isAlpha } from "validator"
import Input from "src/components/Input"
import Button from "src/components/Button"
import { JSONtoCal } from "src/utils/ical"

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
    const [isClickable, setIsClickable] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Ref
    const nameRef = useRef<null | HTMLInputElement>(null)
    const emailRef = useRef<null | HTMLInputElement>(null)

    async function bookRequest(){
        try {
            if(!nameRef.current || !emailRef.current) return setIsClickable(false)
            const name = nameRef.current.value
            const email = emailRef.current.value

            if(!isEmail(email)) return alert('Please provide a valid email address')
            if(name.length < 2) return alert('Please provide a valid name value')


            const payload = {
                title: '',
                description: `Welcome ${selectedUser}`,
                employee_id: selectedUser,
                customer_id: undefined,
                from_timestamp: fixTimezoneTimestamp(selectedDate.toISOString()).substring(0, 19),
                to_timestamp: fixTimezoneTimestamp(selectedDate.add(60, 'minutes').toISOString()).substring(0, 19),
                ical: JSONtoCal({
                    VERSION: '2.0',
                    CALSCALE: 'GREGORIAN',
                    METHOD: 'PUBLISH',
                    BEGIN: 'VEVENT',
                    SUMMARY: `Welcome ${selectedUser}`,
                    UID: 
                })
            }
            //setIsLoading(true)
            console.log(selectedUser, selectedService, fixTimezoneTimestamp(selectedDate.toISOString()).substring(0, 19))

        } catch (error) {
            
        }
    }

    function changeEvent(){
        if(!nameRef.current || !emailRef.current) return setIsClickable(false)

        const name = nameRef.current.value
        const email = emailRef.current.value
        if(!isEmail(email)) return setIsClickable(false)
        if(name.length < 2) return setIsClickable(false)


        setIsClickable(true)
    }

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
                    forwardRef={nameRef}
                    onChangeCallBack={changeEvent}
                />
                <Input
                    label="Email"
                    type="Email"
                    forwardRef={emailRef}
                    onChangeCallBack={changeEvent}
                />
            </div>
            <Button
                text="Book"
                callBack={bookRequest}
                isClickable={isClickable}
                isLoading={isLoading}
            />
        </div>
    )
}
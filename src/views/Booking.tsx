import React, { Dispatch, SetStateAction, useRef, useState } from "react"
import { Dayjs } from "dayjs"
import { CustomerData, Data, Options, Services } from "../types"
import { isEmail } from "validator"
import Input from "../components/Input"
import Button from "../components/Button"
import ImageIcon from '@mui/icons-material/Image';

export interface ConfirmBookingView {
    backendRoute: string
    // Data
    data: Data[]
    services: Services[]
    // Select states
    selectedUser: string
    selectedService: string
    selectedDate: Dayjs
    setView: Dispatch<SetStateAction<Options | null>>
    setCustomerData: Dispatch<SetStateAction<CustomerData | null>>
}

export default function ConfirmBookingView({ backendRoute, data, services, selectedUser, selectedService, selectedDate, setView, setCustomerData }: ConfirmBookingView) {
    const [isClickable, setIsClickable] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    //console.log(selectedDate.format('YYYY-MM-DD HH:mm'))
    //console.log(selectedDate.add(60, 'minutes').format('YYYY-MM-DD HH:mm:ss'))

    // Ref
    const nameRef = useRef<null | HTMLInputElement>(null)
    const emailRef = useRef<null | HTMLInputElement>(null)

    const service = services.find((item) => item.service_id === selectedService)
    const user = data.find((item) => item.user_id === selectedUser)

    if (!service || !user) return <div>Error...</div>

    async function bookRequest() {
        try {
            if(!service) return
            if (!nameRef.current || !emailRef.current) return setIsClickable(false)
            const name = nameRef.current.value
            const email = emailRef.current.value

            if (!isEmail(email)) return alert('Please provide a valid email address')
            if (name.length < 2) return alert('Please provide a valid name value')


            setIsLoading(true)
            const userService = data.find((item) => (item.user_id === selectedUser && item.service_id === selectedService))
            if (!userService) {
                return setIsLoading(false)
            }

            const payload = {
                user_id: selectedUser,
                service_id: selectedService,
                from_timestamp: selectedDate.format('YYYY-MM-DD HH:mm:ss'),
                to_timestamp: selectedDate.add(service?.service_time_block, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                customer: {
                    name: name,
                    email: email
                }
            }

            const res = await fetch(`${backendRoute}/public`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            setCustomerData({name: name,
                email: email
            })
            setIsLoading(false)
            setView('confirmation') // Trigger the confirmation view
            return
        } catch (error) {
            console.error(error)
        }
    }

    function changeEvent() {
        if (!nameRef.current || !emailRef.current) return setIsClickable(false)

        const name = nameRef.current.value
        const email = emailRef.current.value
        if (!isEmail(email)) return setIsClickable(false)
        if (name.length < 2) return setIsClickable(false)


        setIsClickable(true)
    }

    return (
        <div className="w-[100%] h-[100%] flex flex-col">
            <div className="flex flex-row gap-[6px] items-center mb-[10px]">
                <label className="font-[600] text-[#000]">Date:</label>
                <div className="flex flex-row items-center gap-[10px]">
                    <span className="bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid text-[#000]">{selectedDate.format('YYYY-MM-DD')}</span>
                    <span className="bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid text-[#000]">{selectedDate.format('HH:mm')}</span>
                    <span className="bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid text-[#000]">{selectedDate.add(service.service_time_block, 'minutes').format('HH:mm')}</span>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-[10px]">
                <div className="flex flex-col items-center rounded-[3px] border-[#787878] border-[1px] border-solid sd:w-[100%] md:w-[min(calc(50%_-_5px),500px)] py-[10px]">
                    <label className="font-[600] text-[#000]">Service</label>
                    <div className="flex flex-row items-center gap-[10px]">
                        {
                            service.service_image ?
                                <img
                                    className="image-round"
                                    src={service.service_image ? `${backendRoute}/upload/${service.service_image}` : ""}
                                    alt="service_image"
                                />
                                :
                                <div className="image-round text-[12px] flex items-center justify-center">
                                    <ImageIcon sx={{fill: "#000"}}/>
                                </div>
                        }
                        <span className="text-[#000]">{service.service_name}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center rounded-[3px] border-[#787878] border-[1px] border-solid sd:w-[100%] md:w-[min(calc(50%_-_5px),500px)] py-[10px]">
                    <label className="font-[600] text-[#000]">Employee</label>
                    <div className="flex flex-row items-center gap-[10px]">
                        {
                            user.avatar ?
                                <img
                                    className="image-round"
                                    src={user.avatar ? `${backendRoute}/upload/${user.avatar}` : ""}
                                    alt="user_avatar"
                                />
                                :
                                <div className="image-round text-[12px] flex items-center justify-center text-[#000]">N/A</div>
                        }
                        <span className="text-[#000]">{user.firstname} {user.lastname}</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-[repeat(2,calc(50%_-_5px))] gap-[10px] mt-[20px] sd:flex sd:flex-col sd:gap-[10px]">
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
                loadingColor="#fff"
            />
        </div>
    )
}
import React, { Dispatch, SetStateAction, useContext, useRef, useState } from "react"
import { Dayjs } from "dayjs"
import { CustomerData, Data, Options, Services } from "../types"
import { isEmail } from "validator"
import Input from "../components/Input"
import Button from "../components/Button"
import ImageIcon from '@mui/icons-material/Image';
import axios from "axios"
import { KalendiContext } from "../KalendiProvider"

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
    customerData: null | CustomerData
    setCustomerData: Dispatch<SetStateAction<CustomerData | null>>
    hasPaymentConnector: boolean
}

export default function ConfirmBookingView({ backendRoute, data, services, selectedUser, selectedService, selectedDate, setView, customerData, setCustomerData, hasPaymentConnector }: ConfirmBookingView) {
    const context = useContext(KalendiContext)
    const [isClickable, setIsClickable] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Ref
    const nameRef = useRef<null | HTMLInputElement>(null)
    const emailRef = useRef<null | HTMLInputElement>(null)

    const service = services.find((item) => item.service_id === selectedService)
    const user = data.find((item) => item.user_id === selectedUser)

    if (!service || !user) return <div>Error...</div>

    function goToPayment() {
        if (!nameRef.current || !emailRef.current) return setIsClickable(false)
        const name = nameRef.current.value
        const email = emailRef.current.value

        if (!isEmail(email)) return alert('Please provide a valid email address')

        const customerData: { [key: string]: any } = {
            name: name,
            email: email
        }

        const inputs = document.querySelector('#kalendi-widget-wrapper')?.querySelectorAll('input')
        if(!inputs) return
        if (inputs.length > 0 && context?.informationInputs?.inputs) {
            inputs.forEach((ref, index) => {
                if (!ref) return

                if (index > 1){
                    const key = context?.informationInputs?.inputs[index - 2].label.toLocaleLowerCase()
    
                    if (!key) return
    
                    customerData[key] = ref.value
                }
            })
        }

        // Temp solution, needs to be fixed
        setCustomerData(customerData as CustomerData)
        setView('pay')
    }

    async function bookRequest() {
        try {
            if (!service) return
            if (!nameRef.current || !emailRef.current) return setIsClickable(false)
            const name = nameRef.current.value
            const email = emailRef.current.value

            if (!isEmail(email)) return context?.onError ? context.onError(new Error('Please provide a valid email address')) : alert('Please provide a valid email address')
            if (name.length < 2) return context?.onError ? context.onError(new Error('Please provide a valid name value')) : alert('Please provide a valid name value')


            setIsLoading(true)
            const userService = data.find((item) => (item.user_id === selectedUser && item.service_id === selectedService))
            if (!userService) {
                return setIsLoading(false)
            }

            const payload = {
                locale: context?.locale || 'en',
                user_id: selectedUser,
                service_id: selectedService,
                from_timestamp: selectedDate.format('YYYY-MM-DD HH:mm:ss'),
                to_timestamp: selectedDate.add(service?.service_time_block, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                customer: {
                    name: name,
                    email: email
                }
            }

            await axios.post(`${backendRoute}/public`, payload)

            const customerData: { [key: string]: any } = {
                name: name,
                email: email
            }

            const inputs = document.querySelector('#kalendi-widget-wrapper')?.querySelectorAll('input')
            if(!inputs) return
            if (inputs.length > 0 && context?.informationInputs?.inputs) {
                inputs.forEach((ref, index) => {
                    if (!ref) return
                    if (index > 1){
                        const key = context?.informationInputs?.inputs[index - 2].label.toLocaleLowerCase()
    
                        if (!key) return
    
                        customerData[key] = ref.value
                    }
                })
            }

            // Temp solution, needs to be fixed
            setCustomerData(customerData as CustomerData)
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

        const inputs = document.querySelector('#kalendi-widget-wrapper')?.querySelectorAll('input')
        if(!inputs) return
        if (inputs.length > 0) {
            let passed = true
            inputs.forEach((ref, index) => {
                if (!ref) return setIsClickable(false)

                if (index > 1){
                    const validator = context?.informationInputs?.inputs[index - 2].validator
    
                    if (validator && !validator(ref.value)) {
                        ref.classList.add('border-[#ae2f2f]')
                        ref.classList.remove('border-[1px]')
                        ref.classList.add('border-[2px]')
                        passed = false
                    } else {
                        ref.classList.remove('border-[#ae2f2f]')
                        ref.classList.remove('border-[2px]')
                        ref.classList.add('border-[1px]')
                    }
                }
            })

            return setIsClickable(passed)
        } else {
            return setIsClickable(true)
        }
    }

    // This function determines the sort of action when button is clicked
    function buttonCallback() {
        const servicePrice = data.find((item) => item.service_id === selectedService)?.service_price

        if (hasPaymentConnector && servicePrice !== 0) {
            return {
                callBack: goToPayment,
                text: {
                    en: 'Pay',
                    sv: 'Betala'
                }[context?.locale || 'en']
            }
        } else {
            return {
                callBack: bookRequest,
                text: {
                    en: 'Book',
                    sv: 'Boka'
                }[context?.locale || 'en']
            }
        }
    }

    return (
        <div className="w-[100%] h-[100%] flex flex-col">
            <div className="flex flex-row gap-[6px] items-center mb-[10px]">
                <label className="font-[600] text-[#000]">
                    { context?.locale === "en" && "Date:" }
                    { context?.locale === "sv" && "Datum:" }
                </label>
                <div className="flex flex-row items-center gap-[10px]">
                    <span className="bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid text-[#000]">{selectedDate.format('YYYY-MM-DD')}</span>
                    <span className="bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid text-[#000]">{selectedDate.format('HH:mm')}</span>
                    <span>-</span>
                    <span className="bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid text-[#000]">{selectedDate.add(service.service_time_block, 'minutes').format('HH:mm')}</span>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-[10px]">
                <div className="flex flex-col items-center rounded-[3px] border-[#787878] border-[1px] border-solid kalendi-sd:w-[100%] kalendi-md:w-[min(calc(50%_-_5px),500px)] py-[10px]">
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
                                <div className="text-[12px] flex items-center justify-center w-[50px] h-[50px] rounded-[50%] object-cover bg-[#b2b2b2]">
                                    <ImageIcon sx={{ fill: "#000" }} />
                                </div>
                        }
                        <span className="text-[#000]">{service.service_name}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center rounded-[3px] border-[#787878] border-[1px] border-solid kalendi-sd:w-[100%] kalendi-md:w-[min(calc(50%_-_5px),500px)] py-[10px]">
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
                                <div className="text-[12px] flex items-center justify-center text-[#000] w-[50px] h-[50px] rounded-[50%] object-cover bg-[#b2b2b2]">
                                    N/A
                                </div>
                        }
                        <span className="text-[#000]">{user.firstname} {user.lastname}</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-[repeat(2,calc(50%_-_5px))] gap-[10px] mt-[20px] kalendi-sd:flex kalendi-sd:flex-col kalendi-sd:gap-[10px]">
                <Input
                    label={{
                        en: "Name",
                        sv: 'Namn'
                    }[context?.locale || 'en']}
                    forwardRef={nameRef}
                    onChangeCallBack={changeEvent}
                    defaultValue={customerData ? customerData.name : undefined}
                />
                <Input
                    label={{
                        en: "Email",
                        sv: 'Email'
                    }[context?.locale || 'en']}
                    type="Email"
                    forwardRef={emailRef}
                    onChangeCallBack={changeEvent}
                    defaultValue={customerData ? customerData.email : undefined}
                />
            </div>
            {
                context?.informationInputs &&
                <div className="grid grid-cols-[repeat(2,calc(50%_-_5px))] gap-[10px] mt-[20px] kalendi-sd:flex kalendi-sd:flex-col kalendi-sd:gap-[10px]">
                    {
                        context.informationInputs.inputs.map((input, index) => {
                            return (
                                <Input
                                    label={input.label}
                                    key={index}
                                    note={input.note}
                                    onChangeCallBack={changeEvent}
                                />
                            )
                        })
                    }
                </div>
            }
            {
                context?.terms &&
                <p className="text-[12px] mt-[10px]">
                    { context.locale === "en" && "By proceeding, you confirm that you have read and agree to the terms and conditions of purchase, including product details, pricing, payment obligations, and refund policies. If you do not agree, do not continue. Your participation signifies acceptance of these" }
                    { context.locale === "sv" && "Genom att fortsätta bekräftar du att du har läst och godkänner köpevillkoren, inklusive produktdetaljer, prissättning, betalningsskyldigheter och återbetalningspolicyer. Om du inte godkänner, fortsätt inte. Din medverkan innebär att du accepterar dessa" }
                    <a
                        className="ml-[4px] font-[600]"
                        href={context.terms.url}
                        rel="noreferrer"
                        target="_blank"
                    >
                        { context.locale === "en" && "terms" }
                        { context.locale === "sv" && "villkor" }
                    </a>
                    .
                </p>
            }
            <Button
                text={buttonCallback().text}
                callBack={buttonCallback().callBack}
                isClickable={isClickable}
                isLoading={isLoading}
                loadingColor="#fff"
            />
        </div>
    )
}
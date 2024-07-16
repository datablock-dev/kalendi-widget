'use client'

import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import ServiceItem from "../components/ServiceItem"
import { Options, Services, Data, PaymentConnector, StripePaymentIntent, CustomerData } from "../types"
import { AddressElement, Elements, ExpressCheckoutElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import KalendiStripe from "../utils/connectors/stripe"
import { formatMonetaryValue } from "../utils/string"
import axios, { AxiosResponse } from "axios"
import Button from "../components/Button"
import { Dayjs } from "dayjs"
import { loadStripe } from "@stripe/stripe-js"

interface PaymentView {
    backendRoute: string
    selectedDate: Dayjs
    customerData: CustomerData
    setCustomerData: Dispatch<SetStateAction<CustomerData | null>>
    services: Services[]
    setView: Dispatch<SetStateAction<Options | null>>
    selectedService: string
    selectedUser: string
    data: Data[]
    paymentConnector: PaymentConnector
}

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY as string)

export default function PaymentView({ backendRoute, selectedDate, customerData, setCustomerData, services, setView, selectedService, selectedUser, data, paymentConnector }: PaymentView) {
    const [clientSecret, setClientSecret] = useState<null | { clientSecret: StripePaymentIntent['client_secret'] }>(null)
    const [paymentIntent, setPaymentIntent] = useState<null | StripePaymentIntent>(null)

    useEffect(() => {
        if (!clientSecret) {
            getPaymentIntent()
        }

        async function getPaymentIntent() {
            try {
                const url = new URL(backendRoute + "/public/payment-intent")
                const payload = {
                    service_id: selectedService,
                    customer_email: data.find((item: any) => item.user_id === selectedUser)?.email
                }

                const res = await axios.post(url.toString(), payload) as AxiosResponse<StripePaymentIntent>

                setPaymentIntent(res.data)
                setClientSecret({ clientSecret: res.data.client_secret })
            } catch (error) {
                console.error(error)
            }
        }
    }, [clientSecret, paymentIntent])

    return (
        <div className="w-[100%] h-[100%] flex flex-col">
            {
                (stripePromise !== null && clientSecret && paymentIntent) ?
                    <Elements
                        stripe={stripePromise}
                        options={clientSecret}
                    >
                        <Checkout
                            backendRoute={backendRoute}
                            paymentIntent={paymentIntent}
                            setView={setView}
                            customerData={customerData}
                            data={data}
                            services={services}
                            selectedService={selectedService}
                            selectedDate={selectedDate}
                            selectedUser={selectedUser}
                        />
                    </Elements>
                    :
                    <div>
                        <div className="flex items-center justify-center">
                            <svg
                                className="animate-spin fill-[#000]"
                                style={{ fill: "#000" }}
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                width="24"
                                viewBox="0 -960 960 960"
                            >
                                <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
                            </svg>
                        </div>
                    </div>
            }
        </div>
    )
}

interface Checkout {
    backendRoute: string
    paymentIntent: StripePaymentIntent
    setView: Dispatch<SetStateAction<Options | null>>
    customerData: CustomerData
    data: Data[]
    services: Services[]
    selectedService: string
    selectedDate: Dayjs
    selectedUser: string
}

function Checkout({ backendRoute, paymentIntent, setView, customerData, data, services, selectedService, selectedDate, selectedUser }: Checkout) {
    const [isClickable, setIsClickable] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Stripe
    const stripe = useStripe()
    const elements = useElements()

    async function pay(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        if (!stripe || !elements) return

        const { error: submitError } = await elements.submit()
        if (submitError) {
            console.error(submitError)
            console.error(submitError.message)
            return
        }

        const clientSecret = paymentIntent.client_secret as string

        stripe.confirmPayment({
            redirect: 'if_required',
            // `elements` instance used to create the Express Checkout Element
            elements,
            // `clientSecret` from the created PaymentIntent
            clientSecret
        })
            .then((res) => {
                setIsLoading(false)
                bookRequest()
                setView('confirmation')
            })
            .catch((err) => {
                setIsLoading(false)
                console.error(err.message)
            })
    }

    async function bookRequest() {
        try {
            setIsLoading(true)
            const service = services.find((item) => item.service_id === selectedService)
            const userService = data.find((item) => (item.user_id === selectedUser && item.service_id === selectedService))
            if (!userService || !service) {
                return setIsLoading(false)
            }

            const payload = {
                user_id: selectedUser,
                service_id: selectedService,
                from_timestamp: selectedDate.format('YYYY-MM-DD HH:mm:ss'),
                to_timestamp: selectedDate.add(service?.service_time_block, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                customer: {
                    name: customerData.name,
                    email: customerData.email
                }
            }

            await axios.post(`${backendRoute}/public`, payload)
            setIsLoading(false)
            setView('confirmation') // Trigger the confirmation view
            return
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form
            className="flex flex-col gap-[14px] w-[100%] overflow-y-auto"
            onSubmit={pay}
        >
            <PaymentElement
                id="payment-element"
            />
            <Button
                text="Pay"
                isClickable={isClickable}
                isLoading={isLoading}
                loadingColor="#fff"
                style={{ width: '100%' }}
            >
                Pay
                <span className="ml-10">{formatMonetaryValue(paymentIntent.amount / 100, ' ')} SEK</span>
            </Button>
        </form>
    )
}
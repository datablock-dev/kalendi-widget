'use client'

import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import ServiceItem from "../components/ServiceItem"
import { Options, Services, Data, PaymentConnector, StripePaymentIntent, CustomerData } from "../types"
import { AddressElement, Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import KalendiStripe from "../utils/connectors/stripe"
import { formatMonetaryValue } from "../utils/string"
import axios, { AxiosResponse } from "axios"
import Button from "../components/Button"
import { Dayjs } from "dayjs"

interface PaymentView {
    backendRoute: string
    selectedDate: Dayjs
    setCustomerData: Dispatch<SetStateAction<CustomerData | null>>
    services: Services[]
    setView: Dispatch<SetStateAction<Options | null>>
    selectedService: string | null
    selectedUser: string | null
    data: Data[]
    paymentConnector: PaymentConnector
}

export default function PaymentView({ backendRoute, selectedDate, setCustomerData, services, setView, selectedService, selectedUser, data, paymentConnector }: PaymentView) {
    const KALENDI_STRIPE = new KalendiStripe(paymentConnector.key, backendRoute)
    const stripePromise = KALENDI_STRIPE.loadStripe()

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

                console.log(res.data)

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
                            paymentIntent={paymentIntent}
                            setView={setView}
                        />
                    </Elements>
                    :
                    <div>

                    </div>

            }
        </div>
    )
}

interface Checkout {
    paymentIntent: StripePaymentIntent
    setView: Dispatch<SetStateAction<Options | null>>
}

function Checkout({ paymentIntent, setView }: Checkout) {
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
                setView('confirmation')
            })
            .catch((err) => {
                setIsLoading(false)
                console.error(err.message)
            })
    }

    return (
        <form
            className="flex flex-col gap-[14px] w-[100%] overflow-y-auto"
            onSubmit={pay}
        >
            <AddressElement
                options={{
                    mode: 'shipping',
                    allowedCountries: ['SE'],
                    autocomplete: process.env.AUTOCOMPLETE_API_KEY ? {
                        mode: 'google_maps_api',
                        apiKey: process.env.AUTOCOMPLETE_API_KEY
                    } : undefined
                }}
            />
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
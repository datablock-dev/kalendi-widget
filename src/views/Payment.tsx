'use client'

import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"
import ServiceItem from "../components/ServiceItem"
import { Options, Services, Data, PaymentConnector, StripePaymentIntent } from "../types"
import { AddressElement, Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import KalendiStripe from "../utils/connectors/stripe"
import { formatMonetaryValue } from "../utils/string"

interface ServiceView {
    backendRoute: string
    services: Services[]
    setView: Dispatch<SetStateAction<Options | null>>
    selectedService: string | null
    setSelectedService: Dispatch<SetStateAction<string | null>>
    selectedUser: string | null
    setSelectedUser: Dispatch<SetStateAction<string | null>>
    data: Data[]
    paymentConnector: PaymentConnector
}

export default function ServiceView({ backendRoute, services, setView, selectedService, setSelectedService, selectedUser, setSelectedUser, data, paymentConnector }: ServiceView) {
    const KALENDI_STRIPE = new KalendiStripe(paymentConnector.key, backendRoute)
    const stripePromise = KALENDI_STRIPE.loadStripe()

    const [clientSecret, setClientSecret] = useState<null | { clientSecret: StripePaymentIntent['client_secret'] }>(null)
    const [paymentIntent, setPaymentIntent] = useState<null | StripePaymentIntent>(null)

    useEffect(() => {
        if(!clientSecret){
            getPaymentIntent()
        }

        async function getPaymentIntent(){
            try {
                const url = new URL(backendRoute + "/public/payment-intent")
                const body = JSON.stringify({ 
                    service_id: selectedService
                })

                const res = await fetch(url, { 
                    method: 'POST',
                    body: body
                })
                const data = await res.json()

                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }
    }, [clientSecret, paymentIntent])

    return (
        <div className="w-[100%] h-[100%] flex flex-col">
            <div className="flex flex-row gap-[6px] items-center mb-[10px]">
                <label className="font-[600] text-[#000]">Date:</label>
            </div>
            <div className="flex flex-row flex-wrap gap-[10px]">
                {
                    (stripePromise && clientSecret) ?
                    <Elements
                        stripe={stripePromise}
                        options={clientSecret}
                    >
                        <Checkout/>
                    </Elements>
                    :
                    <div>

                    </div>

                }
            </div>
        </div>
    )
}

function Checkout() {
    // Stripe
    const stripe = useStripe()
    const elements = useElements()

    async function pay(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
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
        .then((res) => {})
        .catch((err) => {
            console.error(err.message)
        })
    }

    return (
        <form
            className="flex-col gap-14 w-[100%]"
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
            <button
                className="text-center bg-[#000] color-[#fff] w-[100%] block brd-radius-3 py-12 fw-600 inter brd-none mt-20 hover:cursor-pointer hover:opacity-80"
            >
                Pay
                <span className="ml-10">{formatMonetaryValue(paymentIntent.amount / 100, ' ')} SEK</span>
            </button>
        </form>
    )
}
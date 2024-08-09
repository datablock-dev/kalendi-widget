'use client';

import React, { createContext, useState, useEffect, useCallback } from "react";
import { KalendiContainer } from "./KalendiContainer";
import { PaymentConnector, Terms, KalendiContextInterface, InformationInputs, CustomerData, Locale, ScheduleAvailability } from "./types";

// Create the context
export const KalendiContext = createContext<KalendiContextInterface | null>(null);

interface KalendiProvider {
    children: React.ReactNode
    backendRoute: string
    locale: Locale
    user_id?: string
    service_id?: string
    header?: string
    // Stripe
    paymentConnector?: PaymentConnector
    // Terms
    terms?: Terms
    // Additional inputs
    informationInputs?: InformationInputs
    // CallBacks
    onError?: (e: Error) => any
    onSuccess?: (e: any) => any
}

// Define the provider component
export default function KalendiProvider({ children, backendRoute, locale, user_id, service_id, header, paymentConnector, terms, informationInputs, onError, onSuccess }: KalendiProvider){
    const [isKalendiVisible, setIsKalendiVisible] = useState<boolean>(false)
    const [userID, setUserID] = useState<string | undefined>(user_id)
    const [serviceID, setServiceID] = useState<string | undefined>(service_id)

    // Selection states
    const [customerData, setCustomerData] = useState<null | CustomerData>(null)
    
    // Data states
    const [availability, setAvailability] = useState<null | { [key: string]: ScheduleAvailability }>(null)

    const context: KalendiContextInterface = {
        locale: locale,
        isKalendiVisible: isKalendiVisible, 
        setIsKalendiVisible: setIsKalendiVisible,
        user_id: userID, 
        setUserID: setUserID,
        service_id: serviceID,
        setServiceID: setServiceID,
        customerData: customerData,
        setCustomerData: setCustomerData,
        availability: {
            availability: availability,
            setAvailability: setAvailability
        },
        // Misc
        terms: terms,
        informationInputs: informationInputs,
        // Callbacks
        onError: onError,
        onSuccess: onSuccess,
    }

    useEffect(() => {
        console.log(availability, context.availability.availability)
    }, [context.availability.availability])

    useEffect(() => {
        if(isKalendiVisible){
            document.body.style.overflow = "hidden"
            window.addEventListener('keydown', escapeClick)
        } else {
            window.removeEventListener('keydown', escapeClick)
            document.body.style.overflow = ""
        }

        return(() => {
            window.removeEventListener('keydown', escapeClick)
        })
    }, [isKalendiVisible])

    const escapeClick = useCallback((event: KeyboardEvent) => {
        const key = event.key

        if(key === "Escape"){
            setIsKalendiVisible(false)
        }
    }, [isKalendiVisible])

    return (
        <KalendiContext.Provider value={context}>
            {children}
            <>
                {
                    isKalendiVisible &&
                    <KalendiContainer 
                        backendRoute={backendRoute}
                        user_id={userID}
                        service_id={serviceID}
                        header={header}
                        paymentConnector={paymentConnector}
                        closeCallback={() => { setIsKalendiVisible(false) }}
                    />
                }
            </>
        </KalendiContext.Provider>
    );
};
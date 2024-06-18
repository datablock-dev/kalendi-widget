'use client';

import React, { createContext, useState, useEffect } from "react";
import { KalendiContainer } from "./KalendiContainer";

// Define the context type
interface KalendiContext {
    isKalendiVisible: boolean
    setIsKalendiVisible: React.Dispatch<React.SetStateAction<boolean>>
    user_id: string | undefined
    setUserID: React.Dispatch<React.SetStateAction<string | undefined>>
    service_id: string | undefined
    setServiceID: React.Dispatch<React.SetStateAction<string | undefined>>
}

// Create the context
export const KalendiContext = createContext<KalendiContext | null>(null);

interface KalendiProvider {
    children: React.ReactNode
    backendRoute: string
    user_id?: string
    service_id?: string
    header?: string
}

// Define the provider component
export default function KalendiProvider({ children, backendRoute, user_id, service_id, header }: KalendiProvider){
    const [isKalendiVisible, setIsKalendiVisible] = useState<boolean>(false)
    const [userID, setUserID] = useState<string | undefined>(user_id)
    const [serviceID, setServiceID] = useState<string | undefined>(service_id)

    const context: KalendiContext = {
        isKalendiVisible: isKalendiVisible, 
        setIsKalendiVisible: setIsKalendiVisible,
        user_id: userID, 
        setUserID: setUserID,
        service_id: serviceID,
        setServiceID: setServiceID
    }

    useEffect(() => {
        if(isKalendiVisible){
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
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
                        closeCallback={() => { setIsKalendiVisible(false) }}
                    />
                }
            </>
        </KalendiContext.Provider>
    );
};
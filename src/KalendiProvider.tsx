import React, { useContext, createContext, useState, ReactElement, FC } from "react";
import { KalendiContainer } from "./KalendiContainer";

// Define the context type
interface MyContextType {
    isKalendiVisible: boolean;
    setIsKalendiVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
export const KalendiContext = createContext<MyContextType | null>(null);

interface KalendiProvider {
    children: React.ReactNode
    backendRoute: string
    user_id?: string
    service_id?: string
    header?: string
    closeCallback?: (e?: any) => any
    // Styling
}

// Define the provider component
export default function KalendiProvider({ children, backendRoute, user_id, service_id, header, closeCallback }: KalendiProvider){
    const [isKalendiVisible, setIsKalendiVisible] = useState<boolean>(false);

    return (
        <KalendiContext.Provider value={{ isKalendiVisible: isKalendiVisible, setIsKalendiVisible: setIsKalendiVisible }}>
            {children}
            <>
                {
                    isKalendiVisible &&
                    <KalendiContainer 
                        backendRoute={backendRoute}
                        user_id={user_id}
                        service_id={service_id}
                        header={header}
                        closeCallback={() => { setIsKalendiVisible(false) }}
                    />
                }
            </>
        </KalendiContext.Provider>
    );
};
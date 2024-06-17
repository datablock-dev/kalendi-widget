import { useContext, createContext } from "react";
import { KalendiContainer } from "./KalendiContainer";

const KalendiContext = createContext(null)

export default function KalendiWidget(){
    return(
        <KalendiContext.Provider>
            <KalendiContainer
            />
        </KalendiContext>
    )
}
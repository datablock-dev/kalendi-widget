import React, { useContext, useEffect, useState } from "react"
import { KalendiContext } from "../KalendiProvider"
import Icons from "./Icons"

export default function Notification() {
    const context = useContext(KalendiContext)
    const [message, setMessage] = useState<null | string>(null)

    useEffect(() => {
        if (!message && context?.errorState) {
            if(typeof context.errorState === "string"){
                setMessage(context.errorState)
            } else {
                setMessage("An error has occurred!")
            }
        }

    }, [message, context?.errorState])

    return (
        <div 
            className="flex flex-row gap-[10px] justify-center items-center w-[90%] mx-auto min-h-[40px] absolute data-[visible=true]:top-[10px] data-[visible=false]:top-[-400px] left-[5%] bg-[#fff] rounded-[3px] shadow-[0_20px_20px_0_rgba(0,0,0,.25)] border-[1px] border-solid border-[#787878] transition-[top] duration-[600ms] ease-out text-[#fff] bg-[#531616]"
            data-visible={context?.errorState ? true : false}
        >
            <div>
                <Icons className="size-[24px] fill-[#000]" icon="error" />
            </div>
            <p>
                {message}
            </p>
        </div>
    )
}
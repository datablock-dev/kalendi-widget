import React, { RefObject } from "react"

export interface Input {
    label: string
    type?: string
    onChangeCallBack?: (e?: any) => any
    forwardRef?: RefObject<null | any>
}

export default function Input({ label, type, onChangeCallBack, forwardRef }: Input){

    return(
        <div className="flex flex-col gap-[4px] w-[100%]">
            <label className="font-[500]">{label}</label>
            <input
                className="rounded-[3px] border-[1px] border-[#787878] border-solid h-[44px] w-[100%] pl-[8px]"
                type={type}
                onChange={onChangeCallBack}
                ref={forwardRef}
            />
        </div>
    )
}
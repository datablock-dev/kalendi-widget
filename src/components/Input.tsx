import React, { RefObject } from "react"

export interface Input {
    label: string
    type?: string
    onChangeCallBack?: (e?: any) => any
    forwardRef?: RefObject<null | any>
    defaultValue?: string
    note?: string
    error?: string
}

export default function Input({ label, type, onChangeCallBack, forwardRef, defaultValue, note, error }: Input){

    return(
        <div className="flex flex-col gap-[4px] w-[100%]">
            <label className="font-[500] text-[#000]">{label}</label>
            <input
                className={`rounded-[3px] border-[1px] border-solid h-[44px] w-[100%] pl-[8px] text-[#000] ${error ? "border-[#ae2f2f]" : "border-[#787878]"}`}
                type={type}
                onChange={onChangeCallBack}
                ref={forwardRef}
                defaultValue={defaultValue}
            />
            {
                note &&
                <p className="text-[12px]">
                    {note}
                </p>
            }
            {
                error &&
                <p className="text-[12px] text-[#ae2f2f]">
                    {error}
                </p>
            }
        </div>
    )
}
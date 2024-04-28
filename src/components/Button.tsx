export interface Button {
    children?: React.ReactNode
    text?: string
    style?: any
    callBack?: (e: any) => any
    isClickable?: boolean
    isLoading?: boolean
    loadingColor?: string
}

export default function Button({ children, text, style, callBack, isClickable = true, isLoading = false, loadingColor }: Button){
    return(
        <button 
            className={ isClickable ? 
                'border-[1px] bg-[#141414] text-[#fff] rounded-[3px] py-[8px] mt-[20px] hover:bg-[#484848]' : 
                'border-[1px] bg-[#aaaaaa] text-[#fff] border-[#787878] rounded-[3px] py-[8px] mt-[20px] hover:cursor-not-allowed'
            }
            style={style || undefined}
            onClick={(callBack && isClickable) ? callBack : undefined}
        >
            {
                isLoading &&
                <div className="flex items-center justify-center">
                    <svg
                        className="animate-spin" 
                        style={{fill: loadingColor || "#000"}}
                        xmlns="http://www.w3.org/2000/svg" 
                        height="24" 
                        width="24"
                        viewBox="0 -960 960 960" 
                    >
                        <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/>
                    </svg>
                </div>
            }
            {
                (text && !isLoading) &&
                text
            }
        </button>
    )
}
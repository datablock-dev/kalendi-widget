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
                    <i 
                        className="material-symbols-outlined user-select-none animation-[rotate_800ms_ease-in-out_infinite]"
                        style={{color: loadingColor || "#000"}}
                    >
                        progress_activity
                    </i>
                </div>
            }
            {
                (text && !isLoading) &&
                text
            }
        </button>
    )
}
export default function Input(_a) {
    var label = _a.label, type = _a.type, onChangeCallBack = _a.onChangeCallBack, forwardRef = _a.forwardRef;
    return (<div className="flex flex-col gap-[4px] w-[100%]">
            <label className="font-[500]">{label}</label>
            <input className="rounded-[3px] border-[1px] border-[#787878] border-solid h-[44px] w-[100%] pl-[8px]" type={type} onChange={onChangeCallBack} ref={forwardRef}/>
        </div>);
}

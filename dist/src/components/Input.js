var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Input(_a) {
    var label = _a.label, type = _a.type, onChangeCallBack = _a.onChangeCallBack, forwardRef = _a.forwardRef;
    return (_jsxs("div", __assign({ className: "flex flex-col gap-[4px] w-[100%]" }, { children: [_jsx("label", __assign({ className: "font-[500]" }, { children: label })), _jsx("input", { className: "rounded-[3px] border-[1px] border-[#787878] border-solid h-[44px] w-[100%] pl-[8px]", type: type, onChange: onChangeCallBack, ref: forwardRef })] })));
}

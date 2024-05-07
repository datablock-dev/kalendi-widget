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
export default function Button(_a) {
    var children = _a.children, text = _a.text, style = _a.style, callBack = _a.callBack, _b = _a.isClickable, isClickable = _b === void 0 ? true : _b, _c = _a.isLoading, isLoading = _c === void 0 ? false : _c, loadingColor = _a.loadingColor;
    return (_jsxs("button", __assign({ className: isClickable ?
            'border-[1px] bg-[#141414] text-[#fff] rounded-[3px] py-[8px] mt-[20px] hover:bg-[#484848]' :
            'border-[1px] bg-[#aaaaaa] text-[#fff] border-[#787878] rounded-[3px] py-[8px] mt-[20px] hover:cursor-not-allowed', style: style || undefined, onClick: (callBack && isClickable) ? callBack : undefined }, { children: [isLoading &&
                _jsx("div", __assign({ className: "flex items-center justify-center" }, { children: _jsx("svg", __assign({ className: "animate-spin", style: { fill: loadingColor || "#000" }, xmlns: "http://www.w3.org/2000/svg", height: "24", width: "24", viewBox: "0 -960 960 960" }, { children: _jsx("path", { d: "M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" }) })) })), (text && !isLoading) &&
                text] })));
}

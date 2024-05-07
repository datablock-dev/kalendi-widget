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
import ImageIcon from '@mui/icons-material/Image';
export default function ServiceItem(_a) {
    var service = _a.service, backendRoute = _a.backendRoute, selectedService = _a.selectedService, setSelectedService = _a.setSelectedService, setView = _a.setView;
    return (_jsxs("div", __assign({ className: "list-item justify-between" }, { children: [_jsxs("div", __assign({ className: "flex flex-row items-center gap-[10px]" }, { children: [service.service_image ?
                        _jsx("img", { className: "w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4]", src: service.service_image ? "".concat(backendRoute, "/upload/").concat(service.service_image) : "", alt: "service_image" })
                        :
                            _jsx("div", __assign({ className: "w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4] text-[12px] flex items-center justify-center" }, { children: _jsx(ImageIcon, {}) })), _jsx("span", { children: service.service_name })] })), _jsx("div", { className: "rounded-[50%] h-[20px] w-[20px] border-[#787878] border-[1px] data-[selected=true]:bg-[#50913b] data-[selected=true]:border-[#141414] hover:bg-[#d4d4d4] hover:cursor-pointer", "data-selected": selectedService === service.service_id ? true : false, onClick: function () {
                    if (selectedService === service.service_id) {
                        setSelectedService(null);
                    }
                    else {
                        setSelectedService(service.service_id);
                        setView('employee');
                    }
                } })] }), service.service_id));
}

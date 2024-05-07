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
export default function Final(_a) {
    var backendRoute = _a.backendRoute, data = _a.data, services = _a.services, selectedUser = _a.selectedUser, selectedService = _a.selectedService, selectedDate = _a.selectedDate, customerData = _a.customerData;
    var service = services.find(function (item) { return item.service_id === selectedService; });
    var user = data.find(function (item) { return item.user_id === selectedUser; });
    if (!service || !user)
        return _jsx("div", { children: "Error..." });
    return (_jsxs("div", __assign({ className: "w-[100%] h-[100%] flex flex-col" }, { children: [_jsxs("p", __assign({ className: "whitespace-pre-line text-[18px]" }, { children: ["Dear ", _jsx("span", __assign({ className: "font-[600]" }, { children: customerData.name })), ",", _jsx("br", {}), _jsx("br", {}), "We are thrilled to confirm that your booking has been successfully processed. Please review the details below to ensure that everything aligns with your request:"] })), _jsxs("div", __assign({ className: "flex flex-col items-center mx-[20px]" }, { children: [_jsxs("div", __assign({ className: "flex flex-row items-center gap-[10px]" }, { children: [_jsx("span", __assign({ className: "bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid" }, { children: selectedDate.format('YYYY-MM-DD') })), _jsx("span", __assign({ className: "bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid" }, { children: selectedDate.format('HH:mm') })), _jsx("span", { children: "to" }), _jsx("span", __assign({ className: "bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid" }, { children: selectedDate.add(service.service_time_block, 'minutes').format('HH:mm') }))] })), _jsxs("div", __assign({ className: "flex flex-col flex-wrap gap-[10px] my-[10px] w-fit" }, { children: [_jsxs("div", __assign({ className: "flex flex-col items-center rounded-[3px] border-[#787878] border-[1px] border-solid sd:w-[100%] md:w-[300px] py-[10px]" }, { children: [_jsx("label", __assign({ className: "font-[600]" }, { children: "Service" })), _jsxs("div", __assign({ className: "flex flex-row items-center gap-[10px]" }, { children: [service.service_image ?
                                                _jsx("img", { className: "image-round", src: service.service_image ? "".concat(backendRoute, "/upload/").concat(service.service_image) : "", alt: "service_image" })
                                                :
                                                    _jsx("div", __assign({ className: "image-round text-[12px] flex items-center justify-center" }, { children: _jsx(ImageIcon, {}) })), _jsx("span", { children: service.service_name })] }))] })), _jsxs("div", __assign({ className: "flex flex-col items-center rounded-[3px] border-[#787878] border-[1px] border-solid sd:w-[100%] md:w-[300px] py-[10px]" }, { children: [_jsx("label", __assign({ className: "font-[600]" }, { children: "Employee" })), _jsxs("div", __assign({ className: "flex flex-row items-center gap-[10px]" }, { children: [user.avatar ?
                                                _jsx("img", { className: "image-round", src: user.avatar ? "".concat(backendRoute, "/upload/").concat(user.avatar) : "", alt: "user_avatar" })
                                                :
                                                    _jsx("div", __assign({ className: "image-round text-[12px] flex items-center justify-center" }, { children: "N/A" })), _jsxs("span", { children: [user.firstname, " ", user.lastname] })] }))] }))] }))] })), _jsxs("p", { children: ["A confirmation email has been sent to the email address provided during booking.", _jsx("br", {}), "If you do not see it in your inbox, please check your spam or junk folder. Thank you for choosing our service. We look forward to serving you. If you have any questions or need further assistance, please feel free to reach out to us."] })] })));
}

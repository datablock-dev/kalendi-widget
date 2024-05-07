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
import PersonIcon from '@mui/icons-material/Person';
export default function EmployeeView(_a) {
    var backendRoute = _a.backendRoute, data = _a.data, setView = _a.setView, selectedService = _a.selectedService, selectedUser = _a.selectedUser, setSelectedUser = _a.setSelectedUser;
    return (_jsx("div", { children: _jsx("div", __assign({ className: "list" }, { children: data
                .filter(function (item) { return item.service_id === selectedService; })
                .sort(function (a, b) { return a.firstname > b.firstname ? 1 : -1; })
                .map(function (employee) {
                return (_jsxs("div", __assign({ className: "list-item justify-between" }, { children: [_jsxs("div", __assign({ className: "flex flex-row items-center gap-[10px]" }, { children: [employee.avatar ?
                                    _jsx("img", { className: "w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4]", src: employee.avatar ? "".concat(backendRoute, "/upload/").concat(employee.avatar) : "", alt: "service_image" })
                                    :
                                        _jsx("div", __assign({ className: "w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4] text-[12px] flex items-center justify-center" }, { children: _jsx(PersonIcon, {}) })), _jsxs("span", { children: [employee.firstname, " ", employee.lastname] })] })), _jsx("div", { className: "rounded-[50%] h-[20px] w-[20px] border-[#787878] border-[1px] data-[selected=true]:bg-[#50913b] hover:bg-[#d4d4d4] hover:cursor-pointer", "data-selected": selectedUser === employee.user_id ? true : false, onClick: function () {
                                // Clear other settings that occurs after user selection
                                selectedUser === employee.user_id ? setSelectedUser(null) : setSelectedUser(employee.user_id);
                                setView('book');
                            } })] }), employee.user_id));
            }) })) }));
}

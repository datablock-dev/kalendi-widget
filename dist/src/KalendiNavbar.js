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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
export default function KalendiNavbar(_a) {
    var _b, _c, _d;
    var backendRoute = _a.backendRoute, service_id = _a.service_id, services = _a.services, data = _a.data, header = _a.header, view = _a.view, setView = _a.setView, selectedService = _a.selectedService, setSelectedService = _a.setSelectedService, selectedUser = _a.selectedUser, setSelectedUser = _a.setSelectedUser, selectedDate = _a.selectedDate, users = _a.users;
    return (_jsx(_Fragment, { children: _jsxs("div", __assign({ className: "w-[100%]" }, { children: [_jsx("h3", __assign({ className: "font-[600] text-[24px] mb-[10px]" }, { children: header || "Book an Appointment" })), _jsxs("div", __assign({ className: "flex flex-col" }, { children: [_jsxs("div", __assign({ className: "flex flex-row items-center gap-[10px] flex-wrap" }, { children: [(selectedService && view !== "confirmation") &&
                                    _jsxs("div", __assign({ className: "rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] select-none data-[selected=true]:bg-[#d4d4d4] max-w-fit flex flex-row gap-[10px] items-center" }, { children: [_jsx(CategoryIcon, {}), _jsx("span", { children: (_b = services.find(function (item) { return item.service_id === selectedService; })) === null || _b === void 0 ? void 0 : _b.service_name }), _jsx("div", __assign({ className: "w-[20px] h-[20px] flex items-center justify-center rounded-[50%] hover:bg-[#d4d4d4] hover:cursor-pointer", onClick: function () {
                                                    setSelectedService(null);
                                                    setSelectedUser(null);
                                                    setView('service');
                                                } }, { children: _jsx(CloseIcon, { fontSize: "small" }) }))] })), (selectedUser && users && view !== "confirmation") &&
                                    _jsxs("div", __assign({ className: "rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] select-none data-[selected=true]:bg-[#d4d4d4] max-w-fit flex flex-row gap-[10px] items-center" }, { children: [_jsx(PersonIcon, {}), _jsxs("span", { children: [(_c = users.find(function (item) { return item.user_id === selectedUser; })) === null || _c === void 0 ? void 0 : _c.firstname, " ", (_d = users.find(function (item) { return item.user_id === selectedUser; })) === null || _d === void 0 ? void 0 : _d.lastname] })] }))] })), _jsx("div", __assign({ className: "flex mt-[10px] flex-row gap-[10px] flex-wrap" }, { children: view !== "confirmation" &&
                                _jsxs(_Fragment, { children: [_jsx("div", __assign({ className: "rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4]", onClick: function () { view !== 'service' ? setView('service') : undefined; }, "data-selected": view === "service" ? true : false }, { children: "Services" })), selectedService &&
                                            _jsx("div", __assign({ className: "rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4]", onClick: function () { view !== 'employee' ? setView('employee') : undefined; }, "data-selected": view === "employee" ? true : false }, { children: "Employees" })), (selectedService && selectedUser) &&
                                            _jsx("div", __assign({ className: "rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4]", onClick: function () { view !== 'book' ? setView('book') : undefined; }, "data-selected": view === "book" ? true : false }, { children: "Book" })), (selectedDate && selectedService && selectedUser) &&
                                            _jsx("div", __assign({ className: "rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4]", onClick: function () { view !== "date-selected" ? setView("date-selected") : undefined; }, "data-selected": view === "date-selected" ? true : false }, { children: "Confirm Booking" }))] }) }))] }))] })) }));
}

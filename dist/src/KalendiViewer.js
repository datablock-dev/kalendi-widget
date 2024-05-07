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
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
// Views
import KalendiSchedule from "./views/KalendiSchedule";
import ServiceView from "./views/ServiceView";
import ConfirmBookingView from "./views/Booking";
import EmployeeView from "./views/EmployeeView";
import Final from "./views/Final";
export default function KalendiViewer(_a) {
    var backendRoute = _a.backendRoute, services = _a.services, data = _a.data, view = _a.view, setView = _a.setView, selectedUser = _a.selectedUser, setSelectedUser = _a.setSelectedUser, selectedService = _a.selectedService, setSelectedService = _a.setSelectedService, selectedDate = _a.selectedDate, setSelectedDate = _a.setSelectedDate;
    var _b = useState(null), customerData = _b[0], setCustomerData = _b[1];
    useEffect(function () {
        setSelectedDate(null);
    }, [selectedUser]);
    return (_jsxs("div", __assign({ className: "overflow-y-scroll w-[100%] h-[100%] mt-[10px]" }, { children: [view === "service" &&
                _jsx(ServiceView, { backendRoute: backendRoute, services: services, setView: setView, selectedService: selectedService, setSelectedService: setSelectedService, selectedUser: selectedUser, setSelectedUser: setSelectedUser, data: data }), (view === "employee" && data && selectedService) &&
                _jsx("div", { children: _jsx(EmployeeView, { backendRoute: backendRoute, data: data, setView: setView, selectedService: selectedService, selectedUser: selectedUser, setSelectedUser: setSelectedUser }) }), (view === "book" && selectedService && selectedUser) &&
                _jsx(KalendiSchedule, { backendRoute: backendRoute, 
                    // Data
                    data: data, services: services, 
                    // Select states
                    selectedUser: selectedUser, selectedService: selectedService, setView: setView, setSelectedDate: setSelectedDate }), (selectedService && selectedUser && selectedDate && services && data) &&
                _jsxs(_Fragment, { children: [view === "date-selected" &&
                            _jsx(ConfirmBookingView, { backendRoute: backendRoute, 
                                // Data
                                data: data, services: services, 
                                // Select states
                                selectedUser: selectedUser, selectedService: selectedService, selectedDate: selectedDate, setView: setView, setCustomerData: setCustomerData }), (view === "confirmation" && customerData) &&
                            _jsx(Final, { backendRoute: backendRoute, customerData: customerData, data: data, services: services, selectedUser: selectedUser, selectedService: selectedService, selectedDate: selectedDate })] })] })));
}

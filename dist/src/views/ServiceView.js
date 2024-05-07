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
import { useEffect } from "react";
import ServiceItem from "../components/ServiceItem";
export default function ServiceView(_a) {
    var backendRoute = _a.backendRoute, services = _a.services, setView = _a.setView, selectedService = _a.selectedService, setSelectedService = _a.setSelectedService, selectedUser = _a.selectedUser, setSelectedUser = _a.setSelectedUser, data = _a.data;
    useEffect(function () { }, [selectedService, selectedUser]);
    return (_jsx("div", __assign({ className: "" }, { children: _jsxs("div", __assign({ className: "list" }, { children: [
                // If no user has been selected
                (services && !selectedUser) &&
                    services
                        .sort(function (a, b) { return a.service_name < b.service_name ? -1 : 1; })
                        .map(function (item) {
                        return (_jsx(ServiceItem, { service: item, backendRoute: backendRoute, selectedService: selectedService, setSelectedService: setSelectedService, setView: setView }, item.service_id));
                    }), 
                // If no service has been selected but we have a selected user
                (selectedUser && data) &&
                    data
                        .filter(function (item) { return item.user_id === selectedUser; })
                        .sort(function (a, b) { return a.service_name < b.service_name ? -1 : 1; })
                        .map(function (item) {
                        return (_jsx(ServiceItem, { service: item, backendRoute: backendRoute, selectedService: selectedService, setSelectedService: setSelectedService, setView: setView }, item.service_id));
                    })] })) })));
}

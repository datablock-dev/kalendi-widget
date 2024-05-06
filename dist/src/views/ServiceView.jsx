import { useEffect } from "react";
import ServiceItem from "../components/ServiceItem";
export default function ServiceView(_a) {
    var backendRoute = _a.backendRoute, services = _a.services, setView = _a.setView, selectedService = _a.selectedService, setSelectedService = _a.setSelectedService, selectedUser = _a.selectedUser, setSelectedUser = _a.setSelectedUser, data = _a.data;
    useEffect(function () { }, [selectedService, selectedUser]);
    return (<div className="">
            <div className="list">
                {
        // If no user has been selected
        (services && !selectedUser) &&
            services
                .sort(function (a, b) { return a.service_name < b.service_name ? -1 : 1; })
                .map(function (item) {
                return (<ServiceItem key={item.service_id} service={item} backendRoute={backendRoute} selectedService={selectedService} setSelectedService={setSelectedService} setView={setView}/>);
            })}
                {
        // If no service has been selected but we have a selected user
        (selectedUser && data) &&
            data
                .filter(function (item) { return item.user_id === selectedUser; })
                .sort(function (a, b) { return a.service_name < b.service_name ? -1 : 1; })
                .map(function (item) {
                return (<ServiceItem key={item.service_id} service={item} backendRoute={backendRoute} selectedService={selectedService} setSelectedService={setSelectedService} setView={setView}/>);
            })}
            </div>
        </div>);
}

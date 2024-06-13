import React from "react";
import { Dayjs } from "dayjs";
import { CustomerData, Data, Services } from "../..";
interface Final {
    backendRoute: string;
    data: Data[];
    services: Services[];
    selectedUser: string;
    selectedService: string;
    selectedDate: Dayjs;
    customerData: CustomerData;
}
export declare function Final({ backendRoute, data, services, selectedUser, selectedService, selectedDate, customerData }: Final): React.JSX.Element;
export {};

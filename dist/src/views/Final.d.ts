import { Dayjs } from "dayjs";
import { CustomerData, Data, Services } from "types";
interface Final {
    backendRoute: string;
    data: Data[];
    services: Services[];
    selectedUser: string;
    selectedService: string;
    selectedDate: Dayjs;
    customerData: CustomerData;
}
export default function Final({ backendRoute, data, services, selectedUser, selectedService, selectedDate, customerData }: Final): import("react/jsx-runtime").JSX.Element;
export {};

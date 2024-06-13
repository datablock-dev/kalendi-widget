import { Dispatch, SetStateAction } from "react";
import { Dayjs } from "dayjs";
import { CustomerData, Data, Options, Services } from "@types";
export interface ConfirmBookingView {
    backendRoute: string;
    data: Data[];
    services: Services[];
    selectedUser: string;
    selectedService: string;
    selectedDate: Dayjs;
    setView: Dispatch<SetStateAction<Options | null>>;
    setCustomerData: Dispatch<SetStateAction<CustomerData | null>>;
}
export default function ConfirmBookingView({ backendRoute, data, services, selectedUser, selectedService, selectedDate, setView, setCustomerData }: ConfirmBookingView): import("react/jsx-runtime").JSX.Element;

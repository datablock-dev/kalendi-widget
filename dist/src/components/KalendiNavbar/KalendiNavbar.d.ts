import { Dispatch, SetStateAction } from "react";
import { Dayjs } from "dayjs";
import { Options, Data, Services, Users } from "../../../types";
export interface KalendiNavbar {
    backendRoute: string;
    service_id?: string;
    services: Services[];
    data: Data[];
    header?: string;
    view: Options | null;
    setView: Dispatch<SetStateAction<Options | null>>;
    selectedUser: string | null;
    setSelectedUser: Dispatch<SetStateAction<string | null>>;
    selectedService: string | null;
    setSelectedService: Dispatch<SetStateAction<string | null>>;
    selectedDate: Dayjs | null;
    users: Users[] | false | null;
}
export declare function KalendiNavbar({ backendRoute, service_id, services, data, header, view, setView, selectedService, setSelectedService, selectedUser, setSelectedUser, selectedDate, users }: KalendiNavbar): import("react/jsx-runtime").JSX.Element;

import React, { Dispatch, SetStateAction } from "react";
import { Dayjs } from "dayjs";
import { Options, Data, Services } from "../..";
export interface KalendiSchedule {
    backendRoute: string;
    data: Data[];
    services: Services[];
    selectedUser: string;
    selectedService: string;
    setView: Dispatch<SetStateAction<Options | null>>;
    setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>;
}
export declare function KalendiSchedule({ backendRoute, data, services, selectedUser, selectedService, setView, setSelectedDate }: KalendiSchedule): React.JSX.Element;

import { Dispatch, SetStateAction } from "react";
import { Data, Options, Services } from "types";
import { Dayjs } from "dayjs";
export interface KalendiViewer {
    backendRoute: string;
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
    setSelectedDate: Dispatch<SetStateAction<Dayjs | null>>;
}
export default function KalendiViewer({ backendRoute, services, data, view, setView, selectedUser, setSelectedUser, selectedService, setSelectedService, selectedDate, setSelectedDate }: KalendiViewer): import("react").JSX.Element;

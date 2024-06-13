import React, { Dispatch, SetStateAction } from "react";
import { Options, Services, Data } from "../..";
interface ServiceView {
    backendRoute: string;
    services: Services[];
    setView: Dispatch<SetStateAction<Options | null>>;
    selectedService: string | null;
    setSelectedService: Dispatch<SetStateAction<string | null>>;
    selectedUser: string | null;
    setSelectedUser: Dispatch<SetStateAction<string | null>>;
    data: Data[];
}
export declare function ServiceView({ backendRoute, services, setView, selectedService, setSelectedService, selectedUser, setSelectedUser, data }: ServiceView): React.ReactNode;
export {};

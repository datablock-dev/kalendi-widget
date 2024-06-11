import { Dispatch, SetStateAction } from "react";
import { Data, Options } from "types";
export interface EmployeeView {
    backendRoute: string;
    data: Data[];
    setView: Dispatch<SetStateAction<Options | null>>;
    selectedService: string | null;
    selectedUser: string | null;
    setSelectedUser: Dispatch<SetStateAction<string | null>>;
}
export declare function EmployeeView({ backendRoute, data, setView, selectedService, selectedUser, setSelectedUser }: EmployeeView): import("react/jsx-runtime").JSX.Element;
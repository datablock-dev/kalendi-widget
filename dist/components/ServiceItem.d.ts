import React, { Dispatch, SetStateAction } from "react";
import { Options, Services } from "../";
export interface ServiceItem {
    service: Services;
    backendRoute: string;
    selectedService: string | null;
    setSelectedService: Dispatch<SetStateAction<string | null>>;
    setView: Dispatch<SetStateAction<Options | null>>;
}
export declare function ServiceItem({ service, backendRoute, selectedService, setSelectedService, setView }: ServiceItem): React.JSX.Element;

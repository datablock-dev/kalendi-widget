import { RefObject } from "react";
export interface Input {
    label: string;
    type?: string;
    onChangeCallBack?: (e?: any) => any;
    forwardRef?: RefObject<null | any>;
}
export declare function Input({ label, type, onChangeCallBack, forwardRef }: Input): import("react/jsx-runtime").JSX.Element;

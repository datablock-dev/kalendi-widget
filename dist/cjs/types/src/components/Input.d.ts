import { RefObject } from "react";
export interface Input {
    label: string;
    type?: string;
    onChangeCallBack?: (e?: any) => any;
    forwardRef?: RefObject<null | any>;
}
export default function Input({ label, type, onChangeCallBack, forwardRef }: Input): import("react/jsx-runtime").JSX.Element;

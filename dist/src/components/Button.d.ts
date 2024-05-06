/// <reference types="react" />
export interface Button {
    children?: React.ReactNode;
    text?: string;
    style?: any;
    callBack?: (e: any) => any;
    isClickable?: boolean;
    isLoading?: boolean;
    loadingColor?: string;
}
export default function Button({ children, text, style, callBack, isClickable, isLoading, loadingColor }: Button): import("react").JSX.Element;

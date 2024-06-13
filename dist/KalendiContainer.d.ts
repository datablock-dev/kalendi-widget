/// <reference types="react" />
interface KalendiContainerProps {
    backendRoute: string;
    user_id?: string;
    service_id?: string;
    header?: string;
    closeCallback?: (e?: any) => any;
}
export declare function KalendiContainer({ backendRoute, user_id, service_id, closeCallback, header }: KalendiContainerProps): JSX.Element;
export {};

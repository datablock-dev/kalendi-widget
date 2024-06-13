interface KalendiContainerProps {
    backendRoute: string;
    user_id?: string;
    service_id?: string;
    header?: string;
    closeCallback?: (e?: any) => any;
}
declare function KalendiContainer({ backendRoute, user_id, service_id, closeCallback, header }: KalendiContainerProps): JSX.Element;

declare const KalendiContainer$1_KalendiContainer: typeof KalendiContainer;
declare namespace KalendiContainer$1 {
  export { KalendiContainer$1_KalendiContainer as KalendiContainer };
}

export { KalendiContainer$1 as default };

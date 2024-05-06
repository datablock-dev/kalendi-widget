import ImageIcon from '@mui/icons-material/Image';
export default function Final(_a) {
    var backendRoute = _a.backendRoute, data = _a.data, services = _a.services, selectedUser = _a.selectedUser, selectedService = _a.selectedService, selectedDate = _a.selectedDate, customerData = _a.customerData;
    var service = services.find(function (item) { return item.service_id === selectedService; });
    var user = data.find(function (item) { return item.user_id === selectedUser; });
    if (!service || !user)
        return <div>Error...</div>;
    return (<div className="w-[100%] h-[100%] flex flex-col">
            <p className="whitespace-pre-line text-[18px]">
                Dear <span className="font-[600]">{customerData.name}</span>,
                <br /><br />
                We are thrilled to confirm that your booking has been successfully processed. Please review the details below to ensure that everything aligns with your request:
            </p>
            <div className="flex flex-col items-center mx-[20px]">
                <div className="flex flex-row items-center gap-[10px]">
                    <span className="bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid">{selectedDate.format('YYYY-MM-DD')}</span>
                    <span className="bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid">{selectedDate.format('HH:mm')}</span>
                    <span>to</span>
                    <span className="bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid">{selectedDate.add(service.service_time_block, 'minutes').format('HH:mm')}</span>
                </div>
                <div className="flex flex-col flex-wrap gap-[10px] my-[10px] w-fit">
                    <div className="flex flex-col items-center rounded-[3px] border-[#787878] border-[1px] border-solid sd:w-[100%] md:w-[300px] py-[10px]">
                        <label className="font-[600]">Service</label>
                        <div className="flex flex-row items-center gap-[10px]">
                            {service.service_image ?
            <img className="image-round" src={service.service_image ? "".concat(backendRoute, "/upload/").concat(service.service_image) : ""} alt="service_image"/>
            :
                <div className="image-round text-[12px] flex items-center justify-center">
                                        <ImageIcon />
                                    </div>}
                            <span>{service.service_name}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center rounded-[3px] border-[#787878] border-[1px] border-solid sd:w-[100%] md:w-[300px] py-[10px]">
                        <label className="font-[600]">Employee</label>
                        <div className="flex flex-row items-center gap-[10px]">
                            {user.avatar ?
            <img className="image-round" src={user.avatar ? "".concat(backendRoute, "/upload/").concat(user.avatar) : ""} alt="user_avatar"/>
            :
                <div className="image-round text-[12px] flex items-center justify-center">N/A</div>}
                            <span>{user.firstname} {user.lastname}</span>
                        </div>
                    </div>
                </div>
            </div>
            <p>
                A confirmation email has been sent to the email address provided during booking.<br />
                If you do not see it in your inbox, please check your spam or junk folder.

                Thank you for choosing our service. We look forward to serving you. If you have any questions or need further assistance, please feel free to reach out to us.
            </p>
        </div>);
}

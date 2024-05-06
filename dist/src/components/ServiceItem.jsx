import ImageIcon from '@mui/icons-material/Image';
export default function ServiceItem(_a) {
    var service = _a.service, backendRoute = _a.backendRoute, selectedService = _a.selectedService, setSelectedService = _a.setSelectedService, setView = _a.setView;
    return (<div className="list-item justify-between" key={service.service_id}>
            <div className="flex flex-row items-center gap-[10px]">
                {service.service_image ?
            <img className="w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4]" src={service.service_image ? "".concat(backendRoute, "/upload/").concat(service.service_image) : ""} alt="service_image"/>
            :
                <div className="w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4] text-[12px] flex items-center justify-center">
                            <ImageIcon />
                        </div>}
                <span>{service.service_name}</span>
            </div>
            <div className="rounded-[50%] h-[20px] w-[20px] border-[#787878] border-[1px] data-[selected=true]:bg-[#50913b] data-[selected=true]:border-[#141414] hover:bg-[#d4d4d4] hover:cursor-pointer" data-selected={selectedService === service.service_id ? true : false} onClick={function () {
            if (selectedService === service.service_id) {
                setSelectedService(null);
            }
            else {
                setSelectedService(service.service_id);
                setView('employee');
            }
        }}/>
        </div>);
}

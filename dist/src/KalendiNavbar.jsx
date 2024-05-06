import CategoryIcon from '@mui/icons-material/Category';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
export default function KalendiNavbar(_a) {
    var _b, _c, _d;
    var backendRoute = _a.backendRoute, service_id = _a.service_id, services = _a.services, data = _a.data, header = _a.header, view = _a.view, setView = _a.setView, selectedService = _a.selectedService, setSelectedService = _a.setSelectedService, selectedUser = _a.selectedUser, setSelectedUser = _a.setSelectedUser, selectedDate = _a.selectedDate, users = _a.users;
    return (<>
            <div className="w-[100%]">
                <h3 className="font-[600] text-[24px] mb-[10px]">{header || "Book an Appointment"}</h3>
                <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-[10px] flex-wrap">
                        {(selectedService && view !== "confirmation") &&
            <div className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] select-none data-[selected=true]:bg-[#d4d4d4] max-w-fit flex flex-row gap-[10px] items-center">
                                <CategoryIcon />
                                <span>{(_b = services.find(function (item) { return item.service_id === selectedService; })) === null || _b === void 0 ? void 0 : _b.service_name}</span>
                                <div className="w-[20px] h-[20px] flex items-center justify-center rounded-[50%] hover:bg-[#d4d4d4] hover:cursor-pointer" onClick={function () {
                    setSelectedService(null);
                    setSelectedUser(null);
                    setView('service');
                }}>
                                    <CloseIcon fontSize={"small"}/>
                                </div>
                            </div>}
                        {(selectedUser && users && view !== "confirmation") &&
            <div className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] select-none data-[selected=true]:bg-[#d4d4d4] max-w-fit flex flex-row gap-[10px] items-center">
                                <PersonIcon />
                                <span>{(_c = users.find(function (item) { return item.user_id === selectedUser; })) === null || _c === void 0 ? void 0 : _c.firstname} {(_d = users.find(function (item) { return item.user_id === selectedUser; })) === null || _d === void 0 ? void 0 : _d.lastname}</span>
                            </div>}
                    </div>
                    <div className="flex mt-[10px] flex-row gap-[10px] flex-wrap">
                        {view !== "confirmation" &&
            <>
                                <div className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4]" onClick={function () { view !== 'service' ? setView('service') : undefined; }} data-selected={view === "service" ? true : false}>
                                    Services
                                </div>
                                {selectedService &&
                    <div className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4]" onClick={function () { view !== 'employee' ? setView('employee') : undefined; }} data-selected={view === "employee" ? true : false}>
                                        Employees
                                    </div>}
                                {(selectedService && selectedUser) &&
                    <div className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4]" onClick={function () { view !== 'book' ? setView('book') : undefined; }} data-selected={view === "book" ? true : false}>
                                        Book
                                    </div>}
                                {(selectedDate && selectedService && selectedUser) &&
                    <div className="rounded-[3px] border-solid border-[#787878] border-[1px] py-[4px] px-[12px] hover:cursor-pointer hover:bg-[#d4d4d4] select-none data-[selected=true]:bg-[#d4d4d4]" onClick={function () { view !== "date-selected" ? setView("date-selected") : undefined; }} data-selected={view === "date-selected" ? true : false}>
                                        Confirm Booking
                                    </div>}

                            </>}
                    </div>
                </div>
            </div>
        </>);
}

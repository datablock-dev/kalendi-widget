import PersonIcon from '@mui/icons-material/Person';
export default function EmployeeView(_a) {
    var backendRoute = _a.backendRoute, data = _a.data, setView = _a.setView, selectedService = _a.selectedService, selectedUser = _a.selectedUser, setSelectedUser = _a.setSelectedUser;
    return (<div>
            <div className="list">
                {data
            .filter(function (item) { return item.service_id === selectedService; })
            .sort(function (a, b) { return a.firstname > b.firstname ? 1 : -1; })
            .map(function (employee) {
            return (<div className="list-item justify-between" key={employee.user_id}>
                                    <div className="flex flex-row items-center gap-[10px]">
                                        {employee.avatar ?
                    <img className="w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4]" src={employee.avatar ? "".concat(backendRoute, "/upload/").concat(employee.avatar) : ""} alt="service_image"/>
                    :
                        <div className="w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4] text-[12px] flex items-center justify-center">
                                                    <PersonIcon />
                                                </div>}
                                        <span>{employee.firstname} {employee.lastname}</span>
                                    </div>
                                    <div className="rounded-[50%] h-[20px] w-[20px] border-[#787878] border-[1px] data-[selected=true]:bg-[#50913b] hover:bg-[#d4d4d4] hover:cursor-pointer" data-selected={selectedUser === employee.user_id ? true : false} onClick={function () {
                    // Clear other settings that occurs after user selection
                    selectedUser === employee.user_id ? setSelectedUser(null) : setSelectedUser(employee.user_id);
                    setView('book');
                }}/>
                                </div>);
        })}
            </div>
        </div>);
}

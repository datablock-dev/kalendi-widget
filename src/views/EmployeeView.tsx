import { Dispatch, SetStateAction } from "react"
import { Data } from "types"

export interface EmployeeView {
    backendRoute: string
    data: Data[]
    selectedService: string | null
    selectedUser: string | null
    setSelectedUser: Dispatch<SetStateAction<string | null>>
}

export default function EmployeeView({ backendRoute, data, selectedService, selectedUser, setSelectedUser }: EmployeeView) {

    return (
        <div>
            <div className="list">
                {
                    data
                        .filter((item) => item.service_id === selectedService)
                        .sort((a, b) => a.firstname > b.firstname ? 1 : -1)
                        .map((employee) => {
                            return (
                                <div
                                    className="list-item justify-between"
                                    key={employee.user_id}
                                >
                                    <div className="flex flex-row items-center gap-[10px]">
                                        {
                                            employee.avatar ?
                                                <img
                                                    className="image-round"
                                                    src={employee.avatar ? `${backendRoute}/upload/${employee.avatar}` : ""}
                                                    alt="service_image"
                                                />
                                                :
                                                <div className="image-round text-[12px] flex items-center justify-center">N/A</div>
                                        }
                                        <span>{employee.firstname} {employee.lastname}</span>
                                    </div>
                                    <div
                                        className="rounded-[50%] h-[20px] w-[20px] border-[#787878] border-[1px] data-[selected=true]:bg-[#50913b] hover:bg-[#d4d4d4] hover:cursor-pointer"
                                        data-selected={selectedUser === employee.user_id ? true : false}
                                        onClick={() => {
                                            selectedUser === employee.user_id ? setSelectedUser(null) : setSelectedUser(employee.user_id)

                                        }}
                                    />
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}
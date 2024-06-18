import React, { Dispatch, SetStateAction } from "react"
import { Data, Options } from "../types"
import PersonIcon from '@mui/icons-material/Person';

export interface EmployeeView {
    backendRoute: string
    data: Data[]
    setView: Dispatch<SetStateAction<Options | null>>
    selectedService: string | null
    selectedUser: string | null
    setSelectedUser: Dispatch<SetStateAction<string | null>>
}

export default function EmployeeView({ backendRoute, data, setView, selectedService, selectedUser, setSelectedUser }: EmployeeView): React.ReactNode {
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
                                                    className="w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4]"
                                                    src={employee.avatar ? `${backendRoute}/upload/${employee.avatar}` : ""}
                                                    alt="service_image"
                                                />
                                                :
                                                <div className="w-[50px] h-[50px] rounded-[50%] object-cover bg-[#d4d4d4] text-[12px] flex items-center justify-center">
                                                    <PersonIcon sx={{fill: "#000"}}/>
                                                </div>
                                        }
                                        <span className="color-[#000]">{employee.firstname} {employee.lastname}</span>
                                    </div>
                                    <div
                                        className="rounded-[50%] h-[20px] w-[20px] border-[#787878] border-[1px] data-[selected=true]:bg-[#50913b] hover:bg-[#d4d4d4] hover:cursor-pointer"
                                        data-selected={selectedUser === employee.user_id ? true : false}
                                        onClick={() => {
                                            // Clear other settings that occurs after user selection
                                            selectedUser === employee.user_id ? setSelectedUser(null) : setSelectedUser(employee.user_id)
                                            setView('book')
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
import { Dispatch, SetStateAction } from "react"
import { Dayjs } from "dayjs"
import { CustomerData, Data, Options, Services } from "types"

interface Final {
    backendRoute: string
    // Data
    data: Data[]
    services: Services[]
    // Select states
    selectedUser: string
    selectedService: string
    selectedDate: Dayjs
    customerData: CustomerData,
}

export default function Final({ backendRoute, data, services, selectedUser, selectedService, selectedDate, customerData }: Final){
    return (
        <div className="w-[100%] h-[100%] flex flex-col">
            <h1>Booking</h1>
            <p className="whitespace-pre-line text-[18px]">
                Dear {customerData.name},
                <br/><br/>
                We are thrilled to confirm that your booking has been successfully processed. Please review the details below to ensure that everything aligns with your request:
                <br/><br/>
                [Include booking details here]
                <br/><br/>
                A confirmation email has been sent to the email address provided during booking.<br/>
                If you do not see it in your inbox, please check your spam or junk folder.

                Thank you for choosing our service. We look forward to serving you. If you have any questions or need further assistance, please feel free to reach out to us.
            </p>
        </div>
    )
}
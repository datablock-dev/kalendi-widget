var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useRef, useState } from "react";
import { isEmail } from "validator";
import Input from "../components/Input";
import Button from "../components/Button";
import ImageIcon from '@mui/icons-material/Image';
export default function ConfirmBookingView(_a) {
    var backendRoute = _a.backendRoute, data = _a.data, services = _a.services, selectedUser = _a.selectedUser, selectedService = _a.selectedService, selectedDate = _a.selectedDate, setView = _a.setView, setCustomerData = _a.setCustomerData;
    var _b = useState(false), isClickable = _b[0], setIsClickable = _b[1];
    var _c = useState(false), isLoading = _c[0], setIsLoading = _c[1];
    //console.log(selectedDate.format('YYYY-MM-DD HH:mm'))
    //console.log(selectedDate.add(60, 'minutes').format('YYYY-MM-DD HH:mm:ss'))
    // Ref
    var nameRef = useRef(null);
    var emailRef = useRef(null);
    var service = services.find(function (item) { return item.service_id === selectedService; });
    var user = data.find(function (item) { return item.user_id === selectedUser; });
    if (!service || !user)
        return <div>Error...</div>;
    function bookRequest() {
        return __awaiter(this, void 0, void 0, function () {
            var name_1, email, userService, payload, res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!service)
                            return [2 /*return*/];
                        if (!nameRef.current || !emailRef.current)
                            return [2 /*return*/, setIsClickable(false)];
                        name_1 = nameRef.current.value;
                        email = emailRef.current.value;
                        if (!isEmail(email))
                            return [2 /*return*/, alert('Please provide a valid email address')];
                        if (name_1.length < 2)
                            return [2 /*return*/, alert('Please provide a valid name value')];
                        setIsLoading(true);
                        userService = data.find(function (item) { return (item.user_id === selectedUser && item.service_id === selectedService); });
                        if (!userService) {
                            return [2 /*return*/, setIsLoading(false)];
                        }
                        payload = {
                            user_id: selectedUser,
                            service_id: selectedService,
                            from_timestamp: selectedDate.format('YYYY-MM-DD HH:mm:ss'),
                            to_timestamp: selectedDate.add(service === null || service === void 0 ? void 0 : service.service_time_block, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                            customer: {
                                name: name_1,
                                email: email
                            }
                        };
                        return [4 /*yield*/, fetch("".concat(backendRoute, "/public"), {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(payload)
                            })];
                    case 1:
                        res = _a.sent();
                        setCustomerData({ name: name_1,
                            email: email
                        });
                        setIsLoading(false);
                        setView('confirmation'); // Trigger the confirmation view
                        return [2 /*return*/];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    function changeEvent() {
        if (!nameRef.current || !emailRef.current)
            return setIsClickable(false);
        var name = nameRef.current.value;
        var email = emailRef.current.value;
        if (!isEmail(email))
            return setIsClickable(false);
        if (name.length < 2)
            return setIsClickable(false);
        setIsClickable(true);
    }
    return (<div className="w-[100%] h-[100%] flex flex-col">
            <div className="flex flex-row gap-[6px] items-center mb-[10px]">
                <label className="font-[600]">Date:</label>
                <div className="flex flex-row items-center gap-[10px]">
                    <span className="bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid">{selectedDate.format('YYYY-MM-DD')}</span>
                    <span className="bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid">{selectedDate.format('HH:mm')}</span>
                    <span className="bg-[#d4d4d4] rounded-[3px] px-[4px] py-[4px] border-[#7878785f] border-[1px] border-solid">{selectedDate.add(service.service_time_block, 'minutes').format('HH:mm')}</span>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-[10px]">
                <div className="flex flex-col items-center rounded-[3px] border-[#787878] border-[1px] border-solid sd:w-[100%] md:w-[min(calc(50%_-_5px),500px)] py-[10px]">
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
                <div className="flex flex-col items-center rounded-[3px] border-[#787878] border-[1px] border-solid sd:w-[100%] md:w-[min(calc(50%_-_5px),500px)] py-[10px]">
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
            <div className="grid grid-cols-[repeat(2,calc(50%_-_5px))] gap-[10px] mt-[20px] sd:flex sd:flex-col sd:gap-[10px]">
                <Input label="Name" forwardRef={nameRef} onChangeCallBack={changeEvent}/>
                <Input label="Email" type="Email" forwardRef={emailRef} onChangeCallBack={changeEvent}/>
            </div>
            <Button text="Book" callBack={bookRequest} isClickable={isClickable} isLoading={isLoading} loadingColor="#fff"/>
        </div>);
}

'use client';
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
import './style.css';
import './tailwind.css';
import React, { useEffect, useState } from "react";
import KalendiNavbar from './KalendiNavbar';
import CloseIcon from '@mui/icons-material/Close';
import KalendiViewer from './KalendiViewer';
export default function KalendiContainer(_a) {
    var backendRoute = _a.backendRoute, user_id = _a.user_id, service_id = _a.service_id, closeCallback = _a.closeCallback, header = _a.header;
    var _b = useState(null), services = _b[0], setServices = _b[1];
    var _c = useState(null), users = _c[0], setUsers = _c[1];
    var _d = useState(null), userServices = _d[0], setUserServices = _d[1];
    var _e = useState(null), data = _e[0], setData = _e[1];
    var _f = useState(true), isLoading = _f[0], setIsLoading = _f[1];
    var _g = useState('service'), view = _g[0], setView = _g[1];
    // Selection states
    var _h = useState(service_id || null), selectedService = _h[0], setSelectedService = _h[1];
    var _j = useState(user_id || null), selectedUser = _j[0], setSelectedUser = _j[1]; // The user_id
    var _k = useState(null), selectedDate = _k[0], setSelectedDate = _k[1];
    if (!backendRoute)
        throw new TypeError("backendRoute prop must be provided!");
    useEffect(function () {
        if (data === null) {
            getData();
        }
    }, [data]);
    useEffect(function () {
        if (users === null && data) {
            var uniqueUserSet_1 = new Set();
            var uniqueUserArray_1 = new Array();
            data.forEach(function (item) {
                if (!uniqueUserSet_1.has(item.user_id)) {
                    uniqueUserArray_1.push({
                        user_id: item.user_id,
                        firstname: item.firstname,
                        lastname: item.lastname,
                        avatar: item.avatar,
                        title: item.title,
                        email: item.email,
                        admin_id: item.admin_id
                    });
                    uniqueUserSet_1.add(item.user_id);
                }
            });
            setUsers(uniqueUserArray_1);
        }
    }, [users, data]);
    function getData() {
        return __awaiter(this, void 0, void 0, function () {
            var urlString, res, data_1, serviceSet_1, serviceArray_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        urlString = null;
                        if (user_id && !service_id) {
                            urlString = "".concat(backendRoute, "/public/user_data/").concat(user_id);
                        }
                        else if (service_id && !user_id) {
                            urlString = "".concat(backendRoute, "/public/user_data/null/").concat(service_id);
                        }
                        else if (service_id && user_id) {
                            urlString = "".concat(backendRoute, "/public/user_data/").concat(user_id, "/").concat(service_id);
                        }
                        else if (!service_id && !user_id) {
                            urlString = "".concat(backendRoute, "/public/user_data");
                        }
                        if (!urlString)
                            return [2 /*return*/];
                        return [4 /*yield*/, fetch(urlString, { method: 'GET', })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data_1 = _a.sent();
                        setData(data_1);
                        serviceSet_1 = new Set();
                        serviceArray_1 = new Array();
                        data_1.forEach(function (item) {
                            if (!serviceSet_1.has(item.service_id)) {
                                serviceArray_1.push({
                                    service_id: item.service_id,
                                    service_image: item.service_image,
                                    service_name: item.service_name,
                                    service_price: item.service_price,
                                    service_currency: item.service_currency,
                                    service_time_block: item.service_time_block
                                });
                                serviceSet_1.add(item.service_id);
                            }
                        });
                        setServices(serviceArray_1);
                        setIsLoading(false);
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        setIsLoading(false);
                        setData(false);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    return (<div className="kalendi-container">
            <div className="kalendi-widget-wrapper" data-loading={isLoading}>
                <div className='absolute flex justify-center items-center right-[20px] top-[20px] rounded-[50%] w-[30px] h-[30px] hover:cursor-pointer hover:opacity-80 hover:bg-[#d4d4d4]' onClick={closeCallback}>
                    <CloseIcon />
                </div>
                {isLoading &&
            <svg className="animate-spin" style={{ fill: "#000" }} xmlns="http://www.w3.org/2000/svg" height="80" width="80" viewBox="0 -960 960 960">
                        <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"/>
                    </svg>}
                {(!isLoading && data && services) &&
            <>
                        <KalendiNavbar backendRoute={backendRoute} service_id={service_id} services={services} data={data} header={header} 
            // Select states
            selectedService={selectedService} setSelectedService={setSelectedService} selectedUser={selectedUser} setSelectedUser={setSelectedUser} selectedDate={selectedDate} users={users} 
            // Views
            view={view} setView={setView}/>
                        <KalendiViewer backendRoute={backendRoute} services={services} data={data} view={view} setView={setView} selectedUser={selectedUser} setSelectedUser={setSelectedUser} selectedService={selectedService} setSelectedService={setSelectedService} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                    </>}
            </div>
            <a className='absolute bottom-[10px]' href="https://datablock.dev">
                Powered by Kalendi
            </a>
        </div>);
}

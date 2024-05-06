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
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { fixTimezoneTimestamp, months, weekDays } from "../utils/time";
var timeBoxes = Array.from({ length: 24 }).map(function (_, index) {
    var hasPrefix = index < 10 ? "0" : "";
    return ["".concat(hasPrefix).concat(index, ":00"), "".concat(hasPrefix).concat(index, ":15"), "".concat(hasPrefix).concat(index, ":30"), "".concat(hasPrefix).concat(index, ":45")];
}).flat(1);
export default function KalendiSchedule(_a) {
    var backendRoute = _a.backendRoute, data = _a.data, services = _a.services, selectedUser = _a.selectedUser, selectedService = _a.selectedService, setView = _a.setView, setSelectedDate = _a.setSelectedDate;
    dayjs.extend(isBetween);
    var currentDate = dayjs();
    var _b = useState(0), weekMove = _b[0], setWeekMove = _b[1];
    var _c = useState(null), weekView = _c[0], setWeekView = _c[1];
    var _d = useState(null), userAvailability = _d[0], setUserAvailability = _d[1];
    var _e = useState(null), events = _e[0], setEvents = _e[1];
    var _f = useState(null), bookings = _f[0], setBookings = _f[1];
    var service = services.find(function (item) { return item.service_id === selectedService; });
    if (!service)
        return <span>...</span>;
    useEffect(function () {
        if (!weekView) {
            setWeekView(createWeekView(currentDate, weekMove));
        }
        else if (weekView) {
            if (weekMove !== weekView[0].weekFromCurrentWeek) {
                setWeekView(createWeekView(currentDate, weekMove));
                fetchAvailability(createWeekView(currentDate, weekMove));
            }
        }
        if (userAvailability === null && selectedUser && weekView) {
            fetchAvailability(weekView);
        }
    }, [currentDate, weekMove]);
    function fetchAvailability(weekView) {
        return __awaiter(this, void 0, void 0, function () {
            var urlString, dateFrom, dateTo, res, data_1, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        urlString = null;
                        if (!selectedUser || !weekView)
                            return [2 /*return*/];
                        dateFrom = "".concat(weekView[0].year, "-").concat(weekView[0].monthLeadingZero, "-").concat(weekView[0].dayOfMonthLeadingZero);
                        dateTo = "".concat(weekView[4].year, "-").concat(weekView[4].monthLeadingZero, "-").concat(weekView[4].dayOfMonthLeadingZero);
                        urlString = "".concat(backendRoute, "/public/availability/").concat(selectedUser, "/null/").concat(dateFrom, "/").concat(dateTo);
                        if (!urlString)
                            return [2 /*return*/];
                        return [4 /*yield*/, fetch(urlString, { method: 'GET', })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2:
                        data_1 = _a.sent();
                        if (data_1.availability) {
                            setUserAvailability(data_1.availability);
                        }
                        else {
                            setUserAvailability(false);
                        }
                        if (data_1.bookings.length > 0) {
                            setBookings(data_1.bookings);
                        }
                        if (data_1.events) {
                            setEvents(data_1.events);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function changeWeek(direction) {
        if (direction === "right" && weekMove < 10) {
            setWeekMove(weekMove + 1);
        }
        else if (direction === "left" && weekMove > 0) {
            setWeekMove(weekMove - 1);
        }
    }
    return (<div className="h-[100%] w-[100%]">
            <div className="flex flex-row justify-between w-[100%] h-[40px] mb-[10px]">
                <div className="flex flex-row items-center gap-[6px] rounded-[3px] data-[selectable=true]:hover:cursor-pointer data-[selectable=false]:hover:cursor-not-allowed border-[#787878] border-[1px] border-solid px-[12px]" data-selectable={weekMove > 0 ? true : false} onClick={function () { changeWeek('left'); }}>
                    <KeyboardArrowLeftIcon /> Previous Week
                </div>
                <div className="flex flex-row items-center gap-[6px] rounded-[3px] data-[selectable=true]:hover:cursor-pointer data-[selectable=false]:hover:cursor-not-allowed data-[selectable=true]:hover:bg-[#d4d4d4] border-[#787878] border-[1px] border-solid px-[12px]" data-selectable={weekMove < 10 ? true : false} onClick={function () { changeWeek('right'); }}>
                    Next Week <KeyboardArrowRightIcon />
                </div>
            </div>
            {!weekView &&
            <div className="w-[100%] h-[100%] flex justify-center items-center">
                    <div id='outer'>
                        <div id='middle'>
                            <div id='inner'/>
                        </div>
                    </div>
                </div>}
            <div className="w-[100%] h-[50px] grid week-grid overflow-y-auto">
                {(weekView && userAvailability !== null) &&
            weekView.map(function (day) {
                return (<div className="w-[100%] h-[100%] min-h-[100%] flex flex-col odd:bg-[#c4c4c48a]" key={day.date.format('YYYY-MM-DD HH:mm:ss')} data-date={day.date.format('YYYY-MM-DD')}>
                                <div className="flex flex-col items-center">
                                    <span>{day.weekDayString.substring(0, 3)}</span>
                                    <span>{day.dayOfMonth}</span>
                                </div>
                            </div>);
            })}
            </div>
            <div className="w-[100%] h-[calc(100%_-_100px)] grid week-grid overflow-y-auto relative">
                {(weekView && userAvailability !== null) &&
            weekView.map(function (day, index) {
                // To identify if we are in a week that is non-bookable (no free slots)
                var isNonBookable = isNonBookableWeek(weekView, userAvailability);
                // We need to get the ranges from userAvailability
                var fromValueKey = userAvailability ? userAvailability[(Object.keys(userAvailability)[index * 2])] : null;
                var toValueKey = userAvailability ? userAvailability[(Object.keys(userAvailability)[(index * 2) + 1])] : null;
                var availableSlots = timeBoxes;
                var isBefore = false;
                if (day.date.isBefore(currentDate, 'day')) {
                    isBefore = true;
                    availableSlots = [];
                }
                /*
                    If the user has specified availability (i.e. time in the day)
                */
                if (fromValueKey) {
                    availableSlots = availableSlots.filter(function (slot) { return slot >= fromValueKey; });
                    if (availableSlots.length > 0 && toValueKey) {
                        availableSlots = availableSlots.filter(function (slot) { return slot < toValueKey; });
                    }
                }
                else {
                    availableSlots = [];
                }
                if (service.service_time_block) {
                    var diff_1 = service.service_time_block / 15;
                    availableSlots = availableSlots.filter(function (_, index) {
                        return index % diff_1 === 0;
                    });
                }
                // Filters out hours that are before the current hour if the we 
                // are in the current day                         
                if (dayjs().isSame(day.date, 'day')) {
                    availableSlots = availableSlots.filter(function (slot) {
                        var _a = slot.split(':').map(function (val) { return parseInt(val); }), slotHour = _a[0], slotMinute = _a[1];
                        if (dayjs().get('hour') < slotHour) {
                            return slot;
                        }
                        else if (dayjs().get('hour') === slotHour) {
                            if (dayjs().get('minute') < slotMinute) {
                                return slot;
                            }
                        }
                    });
                }
                // Filter on events
                if (events) {
                    var currDate_1 = dayjs(day.date);
                    events.forEach(function (event) {
                        var timeFrom = dayjs(fixTimezoneTimestamp(event.from_timestamp));
                        var timeTo = dayjs(fixTimezoneTimestamp(event.to_timestamp));
                        var isFullDay = timeTo.diff(timeFrom, 'hour') > 24 ? true : false;
                        if (isFullDay && dayjs(currDate_1).isBetween(timeFrom, timeTo, 'minute')) {
                            availableSlots = [];
                        }
                    });
                }
                // Filter out slots that are already booked
                if (bookings) {
                    var currDate_2 = dayjs(day.date);
                    var time_block = service.service_time_block;
                    bookings.forEach(function (booking) {
                        var from_timestamp = booking.from_timestamp, to_timestamp = booking.to_timestamp;
                        var bookingSlotFrom = dayjs(fixTimezoneTimestamp(from_timestamp));
                        var _a = from_timestamp.split('T'), bookingDate = _a[0], bookingTime = _a[1];
                        // Stop the loop if we are not in the same day
                        if (bookingDate !== currDate_2.format('YYYY-MM-DD'))
                            return;
                        availableSlots = availableSlots.filter(function (slot) {
                            var currentSlot = dayjs().set('hour', parseInt(slot.split(':')[0])).set('minute', parseInt(slot.split(':')[1]));
                            if (slot !== bookingTime.substring(0, 5)) {
                                return slot;
                            }
                        });
                    });
                }
                return (<div className="w-[100%] h-[100%] min-h-[100%] flex flex-col" key={day.date.format('YYYY-MM-DD HH:mm:ss')} data-date={day.date.format('YYYY-MM-DD')}>
                                <div className="flex flex-col h-[100%] items-center gap-[10px] bg-[#fff] pt-[10px]">
                                    {availableSlots.length > 0 &&
                        availableSlots
                            .filter(function (time) { return parseInt(time.substring(0, 2)) >= 7; })
                            .map(function (time) {
                            return (<div className="rounded-[3px] bg-[#fff] py-[4px] px-[4px] border-solid border-[#d4d4d4] border-[1px] hover:cursor-pointer hover:bg-[#e4e4e4]" key={day.weekDayString + time} onClick={function () {
                                    var timestamp = "".concat(day.year, "-").concat(day.monthLeadingZero, "-").concat(day.dayOfMonthLeadingZero, " ").concat(time, ":00");
                                    setSelectedDate(dayjs(timestamp));
                                    setView('date-selected');
                                }}>
                                                    <span>{time}</span>
                                                </div>);
                        })}
                                    {(!isNonBookable && availableSlots.length === 0 && !isBefore) &&
                        <div>
                                            <span className="text-wrap">No available slots</span>
                                        </div>}
                                    {(isNonBookable && index === 2 && !isBefore) &&
                        <div className="bg-[#1890ff] text-[#fff] px-[12px] py-[8px] rounded-[3px] border-[1px] hover:cursor-pointer hover:brightness-80 absolute bottom-[50%]">
                                            <span>Next available time</span>
                                        </div>}
                                    {isBefore &&
                        <div className="w-[calc(100%_-_2px)] h-[100%] bg-[repeating-linear-gradient(45deg,#606dbc,#606dbc_10px,#465298_10px,#465298_20px)] rounded-[3px]"></div>}
                                </div>
                            </div>);
            })}
            </div>
        </div>);
}
function createWeekView(currentDate, weeksMove) {
    var currDate = dayjs(currentDate);
    var currentWeekDay = currDate.day();
    var weekView = new Array();
    var rollBack = currentWeekDay > 0 ? 1 - currDate.day() : -6;
    var mondayOfWeek = currDate.add(rollBack, 'day').add(weeksMove, 'week');
    Array.from({ length: 5 }).forEach(function (_, index) {
        var mondayOfWeekCopy = mondayOfWeek;
        var newValue = mondayOfWeekCopy.add(index, 'day');
        weekView.push({
            dayOfMonth: newValue.date(),
            dayOfMonthLeadingZero: newValue.date() >= 10 ? "".concat(newValue.date()) : "0".concat(newValue.date()),
            year: newValue.year(),
            month: newValue.month(),
            monthLeadingZero: newValue.month() + 1 >= 10 ? "".concat(newValue.month() + 1) : "0".concat(newValue.month() + 1),
            monthString: months[newValue.month()],
            daysInMonth: newValue.daysInMonth(),
            weekDay: newValue.day(),
            weekDayString: weekDays[newValue.day()],
            date: newValue,
            weekFromCurrentWeek: weeksMove
        });
    });
    return weekView;
}
function isNonBookableWeek(weekView, userAvailability) {
    var isNonBookable = true;
    weekView.forEach(function (weekDay, index) {
        var fromValueKey = userAvailability ? userAvailability[(Object.keys(userAvailability)[index * 2])] : null;
        var toValueKey = userAvailability ? userAvailability[(Object.keys(userAvailability)[(index * 2) + 1])] : null;
        if (fromValueKey && toValueKey) {
            isNonBookable = false;
        }
    });
    return isNonBookable;
}

export var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export var weekDaysAlt = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
export var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', ' August', 'September', 'October', 'November', 'December'];
export function fixTimezoneTimestamp(timestamp) {
    var _a = timestamp.split('T'), firstPart = _a[0], secondPart = _a[1];
    return "".concat(firstPart, " ").concat(secondPart.replace('Z', ''));
}
export function timestampToString(timestamp) {
    var day = switchOrdinalNumbers(timestamp.date());
    var month = months[timestamp.month()];
    var year = timestamp.year();
    var dateTime = timestamp.toJSON().split('T')[1].substring(0, 5);
    return "".concat(day, " of ").concat(month, " ").concat(year, " at ").concat(dateTime);
}
function switchOrdinalNumbers(day) {
    switch (day) {
        case 1:
            return "1st";
        case 2:
            return "2nd";
        case 3:
            return "3rd";
        default:
            return "".concat(day, "th");
    }
}

export function JSONtoCal(jsonObject) {
    var finalString = '';
    Object.keys(jsonObject).forEach(function (key) {
        var value = jsonObject[key];
        var string = "".concat(key, ": ").concat(value);
        finalString = finalString += "".concat(string, " \n");
    });
    return finalString;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var separator = ";";
function GetPagesCountFromDeserialized(dataStr) {
    var _a, _b;
    return ((_b = (_a = dataStr) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.length) > 0 ? dataStr.split(separator).length : 0;
}
exports.GetPagesCountFromDeserialized = GetPagesCountFromDeserialized;
function DeserializePageData(dataStr) {
    var _a;
    var result = null;
    if (((_a = dataStr) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        var _b = dataStr.split(","), id = _b[0], statusId = _b[1], index = _b[2], score = _b[3];
        var status_1;
        switch (statusId) {
            case "1":
                status_1 = "completed";
                break;
            case "0":
                status_1 = "incomplete";
                break;
            default:
                status_1 = "not attempted";
                break;
        }
        result = {
            id: id,
            status: status_1,
            index: parseInt(index),
            score: score ? parseInt(score) : null
        };
    }
    return result;
}
exports.DeserializePageData = DeserializePageData;
function DeserializeMultiplePagesData(dataStr) {
    var _a;
    if (((_a = dataStr) === null || _a === void 0 ? void 0 : _a.trim().length) > 0) {
        return dataStr.split(separator).map(DeserializePageData);
    }
    else {
        return [];
    }
}
exports.DeserializeMultiplePagesData = DeserializeMultiplePagesData;
function SerializePageData(data) {
    var status;
    switch (data.status) {
        case "completed":
            status = 1;
            break;
        case "incomplete":
            status = 0;
            break;
        default:
            status = -1;
            break;
    }
    return data.id + "," + status + "," + data.index + "," + (data.score || "");
}
exports.SerializePageData = SerializePageData;
function SerializeMultiplePagesData(data) {
    return data.map(SerializePageData).join(separator);
}
exports.SerializeMultiplePagesData = SerializeMultiplePagesData;
//# sourceMappingURL=ScormPageData.js.map
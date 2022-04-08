const config_data = require('../config/config.json');

const HelperFunctions = function () {};
HelperFunctions.getUUID = function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

HelperFunctions.getMessageStatusId = function (name) {
    let id = config_data.message_status.find(function (item) {
        return item.Name === name;
    }).Id;
    return id;
}

HelperFunctions.getMessageStatusName = function (id) {
    let name = config_data.message_status.find(function (item) {
        return item.Id === id;
    }).Name;
    return name;
}

exports.HelperFunctions = HelperFunctions;
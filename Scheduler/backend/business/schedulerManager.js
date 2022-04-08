const SchedulerData = require('../data/schedulerData').SchedulerData;

let traceId, LoggerAdapter, config_data, HelperFunctions, commonParams;

const SchedulerManager = function (params) {
    commonParams = params;
    traceId = params.traceId;
    LoggerAdapter = params.LoggerAdapter;
    config_data = params.config_data;
    HelperFunctions = params.HelperFunctions;
    LoggerAdapter.debug({
        TraceID: traceId,
        Service: config_data.service_name,
        Message: "SchedulerManager constructor called."
    });
};

SchedulerManager.prototype.getScheduledTasks = async function () {
    try {
        LoggerAdapter.debug({
            TraceID: traceId,
            Service: config_data.service_name,
            Message: "Request received to SchedulerManager.prototype.getScheduledTasks"
        });

        let schedulerData = new SchedulerData(commonParams);
        return await schedulerData.getScheduledTasks();
    } catch (error) {
        throw error;
    }
}

SchedulerManager.prototype.udpateLastExecutionTime = async function (id, params) {
    try {
        LoggerAdapter.debug({
            TraceID: traceId,
            Service: config_data.service_name,
            Message: "Request received to SchedulerManager.prototype.udpateLastExecutionTime: " + JSON.stringify(params)
        });

        let schedulerData = new SchedulerData(commonParams);
        return schedulerData.udpateLastExecutionTime(id, params);

    } catch (error) {
        throw error;
    }
}

exports.SchedulerManager = SchedulerManager;
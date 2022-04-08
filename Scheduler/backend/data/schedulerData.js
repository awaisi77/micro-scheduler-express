const Connection = require("./dbConnection").Connection;

let traceId, LoggerAdapter, config_data, HelperFunctions, commonParams;

const SchedulerData = function (params) {
  commonParams = params;
  traceId = params.traceId;
  LoggerAdapter = params.LoggerAdapter;
  config_data = params.config_data;
  HelperFunctions = params.HelperFunctions;
  LoggerAdapter.debug({
    TraceID: traceId,
    Service: config_data.service_name,
    Message: "SchedulerData constructor called."
  });
};

SchedulerData.prototype.getScheduledTasks = async function () {
  LoggerAdapter.debug({
    TraceID: traceId,
    Service: config_data.service_name,
    Message: "Request received to SchedulerData.prototype.getScheduledTasks"
  });

  let connection = new Connection();
  let sequelize = connection.getSequelize();
  return sequelize.authenticate().then(async () => {
    return sequelize.transaction(async t => {
      return sequelize
        .query("select * from scheduler where `Active` = 1", {
          type: sequelize.QueryTypes.SELECT
        })
        .then(async function (result) {
          LoggerAdapter.debug({
            TraceID: traceId,
            Service: config_data.service_name,
            Message: "SchedulerData.prototype.getScheduledTasks: Response=Success"
          });
          return result;
        })
        .catch(err => {
          LoggerAdapter.error({
            TraceID: traceId,
            Service: config_data.service_name,
            Message: "SchedulerData.prototype.getScheduledTasks: Response= " + err
          });
          throw err;
        })
        .finally(() => {
          sequelize.connectionManager.close().then(() => {});
        });
    });
  });
};

SchedulerData.prototype.udpateLastExecutionTime = async function (id, params) {
  LoggerAdapter.debug({
    TraceID: traceId,
    Service: config_data.service_name,
    Message: "Request received to SchedulerData.prototype.udpateLastExecutionTime"
  });

  let connection = new Connection();
  let sequelize = connection.getSequelize();
  let model = sequelize.import("../../models/scheduler.js");

  return sequelize.authenticate().then(() => {
    return model.update(params, {
        where: {
          Id: id
        }
      })
      .then(async function (result) {
        LoggerAdapter.debug({
          TraceID: traceId,
          Service: config_data.service_name,
          Message: "SchedulerData.prototype.udpateLastExecutionTime: Response=Success"
        });
        return result;
      })
      .catch(err => {
        LoggerAdapter.error({
          TraceID: traceId,
          Service: config_data.service_name,
          Message: "SchedulerData.prototype.udpateLastExecutionTime: Response= " + err
        });
        throw err;
      })
      .finally(() => {
        sequelize.connectionManager.close().then(() => {});
      });
  });
};

exports.SchedulerData = SchedulerData;
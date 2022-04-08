const LoggerAdapter = require("../InvokeAdapters/loggerAdapter").LoggerAdapter;
const config_data = require("../config/config.json");
const SchedulerManager =
  require("../backend/business/schedulerManager").SchedulerManager;
const parser = require("cron-parser");
const apiAdapter = require("../InvokeAdapters/apiAdapter");
const HelperFunctions = require("./helperFunctions").HelperFunctions;

const Scheduler = function () {};

Scheduler.prototype.ExecuteScheduler = async function () {
  let traceId = HelperFunctions.getUUID();

  LoggerAdapter.info({
    TraceID: traceId,
    Service: config_data.service_name,
    Message: "Scheduler started.",
  });

  try {
    let params = {
      traceId,
      LoggerAdapter,
      config_data,
      HelperFunctions,
    };
    let schedulerManager = new SchedulerManager(params);

    let result = await schedulerManager.getScheduledTasks();
    let schedulerParams = {};
    for (var i = 0; i < result.length; i++) {
      let scheduler = result[i].ScheduledDateTime;
      let url = result[i].Execute;
      let name = result[i].Name;
      let nextRun = result[i].NextRun;
      let timeNow = new Date();
      console.log("scheduler:::", scheduler);
      traceId = result[i].Name;

      try {
        console.log("now", timeNow.getTime());
        console.log("nextRun:", new Date(nextRun).getTime());
        if (timeNow.getTime() > new Date(nextRun).getTime()) {
          schedulerParams.LastExecution = timeNow.toUTCString();
          schedulerParams.NextRun = new Date(
            parser.parseExpression(scheduler).next()
          ).toGMTString();

          LoggerAdapter.debug({
            TraceID: traceId,
            Service: config_data.service_name,
            Message:
              "Scheduler.prototype.ExecuteScheduler: calling udpateLastExecutionTime for service [" +
              name +
              "]" +
              " Next Run Time:" +
              schedulerParams.NextRun,
          });
          let schedulerManager = new SchedulerManager(params);
          let updateResult = await schedulerManager.udpateLastExecutionTime(
            result[i].Id,
            schedulerParams
          );

          LoggerAdapter.debug({
            TraceID: traceId,
            Service: config_data.service_name,
            Message:
              "Scheduler.prototype.ExecuteScheduler: Calling service [" +
              name +
              "]",
          });

          const api = apiAdapter(url);
          api
            .post()
            .then((res) => {
              LoggerAdapter.debug({
                TraceID: traceId,
                Service: config_data.service_name,
                Message:
                  "Scheduler.prototype.ExecuteScheduler: Service [" +
                  name +
                  "] Called = Success",
              });
              console.log("======================================");
              console.log("Response of scheduler service");
              console.log("======================================");
            })
            .catch(function (err) {
              LoggerAdapter.error({
                TraceID: traceId,
                Service: config_data.service_name,
                Message:
                  "Scheduler.prototype.ExecuteScheduler: Service [" +
                  name +
                  "] Error= " +
                  (err.stack == null || err.stack == undefined)
                    ? err
                    : err.stack,
              });
            });
        }
      } catch (err) {
        LoggerAdapter.error({
          TraceID: traceId,
          Service: config_data.service_name,
          Message:
            "Scheduler.prototype.ExecuteScheduler: Service [" +
            name +
            "] Error= " +
            (err.stack == null || err.stack == undefined)
              ? err
              : err.stack,
        });
      }
    }
  } catch (err1) {
    LoggerAdapter.error({
      TraceID: traceId,
      Service: config_data.service_name,
      Message:
        "Scheduler.prototype.ExecuteScheduler: Error= " +
        (err1.stack == null || err1.stack == undefined)
          ? err1
          : err1.stack,
    });
  }

  LoggerAdapter.info({
    TraceID: traceId,
    Service: config_data.service_name,
    Message: "Scheduler finsihed.",
  });
  return true;
};

exports.Scheduler = Scheduler;

const express = require("express");
const router = express.Router();
const log4js = require("log4js");
const jsonLayout = require("log4js-json-layout");
const AuditManager = require("../../backend/business/auditManager");
var path = require("path");
const fs = require("fs");
let logsPath = "../../logs";
var zip = require('express-zip');

log4js.addLayout("json", jsonLayout);
log4js.configure("./config/log4js.json");

const logger = log4js.getLogger();

router.get("/logs/file", async function (req, res, next) {
  try {
    let userInfo=null;
    if(req.headers.userinfo!=undefined){
      userInfo=JSON.parse(req.headers.userinfo);
    }
    

    let directoryPath = path.join(__dirname, logsPath);
    result = fs.readdirSync(directoryPath);
    const auditManager = new AuditManager();
    if(userInfo!=null){
        auditManager.insertAudit({
        Description: "All" ,
        CreatedBy: userInfo.Username,
        ModifiedBy: userInfo.Username,
        eventType: Event_Fetch,
        EventName: Event_Logs,
        UserId: userInfo.Id
      });
    }

    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.get("/logs/:fileName", async function (req, res, next) {

  let userInfo=null;
  if(req.query.User!=undefined){
    userInfo=JSON.parse(req.query.User);
  }


  let result = null;
  try {
    let files = []
    let filesToDownload = req.params.fileName.split(",")
    for (let eachFile of filesToDownload) {
      let filePath = path.join(__dirname, logsPath, "/", eachFile);
      files.push({
        path: filePath,
        name: eachFile
      })
    }
    const auditManager = new AuditManager();
    if(userInfo!=null){
        auditManager.insertAudit({
        Description: req.params.fileName ,
        CreatedBy: userInfo.Username,
        ModifiedBy: userInfo.Username,
        eventType: Download_File,
        EventName: Event_Logs,
        UserId: userInfo.Id
      });
    }


    // let files = [
    //   { path: filePath, name: req.params.fileName }
    // ]
    //.log from end
    console.log(files)
    res.zip(files, `Logs.zip`);
  } catch (err) {
    next(err);
  }
});

router.post("/logger/trace", async function (req, res, next) {
  try {

    logger.addContext("traceid", req.headers.traceid);
    logger.trace(JSON.stringify(req.body.LogMessage));
    res.send();
  } catch (err) {
    next(err);
  }
});
router.post("/logger/info", function (req, res, next) {
  try {
    logger.addContext("traceid", req.headers.traceid);
    logger.info(JSON.stringify(req.body.LogMessage));
    res.send();
  } catch (err) {
    next(err);
  }
});
router.post("/logger/debug", function (req, res, next) {
  try {
    logger.addContext("traceid", req.headers.traceid);
    logger.debug(JSON.stringify(req.body.LogMessage));
    res.send();
  } catch (err) {
    next(err);
  }
});
router.post("/logger/warn", function (req, res, next) {
  try {
    logger.addContext("traceid", req.headers.traceid);
    logger.warn(JSON.stringify(req.body.LogMessage));
    res.send();
  } catch (err) {
    next(err);
  }
});
router.post("/logger/error", function (req, res, next) {
  try {
    console.log("Req.headers.traceid", req.headers);
    logger.addContext("traceid", req.headers.traceid);
    logger.error(JSON.stringify(req.body.LogMessage));
    res.send();
  } catch (err) {
    next(err);
  }
});
router.post("/logger/fatal", function (req, res, next) {
  try {
    logger.addContext("traceid", req.headers.traceid);
    logger.fatal(JSON.stringify(req.body.LogMessage));
    res.send();
  } catch (err) {
    next(err);
  }
});
router.post("/logger/insertAudit", async function (req, res, next) {
  try {
    console.log("Insert Audit", req.body);
    const auditManager = new AuditManager();
    const result = await auditManager.insertAudit(req.body);
    res.send(result);
  } catch (err) {
    next(err);
  }
});
module.exports = router;

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({ 
    origin:'http://host.docker.internal:4000',
    origin: "*"
  })
);
global.Event_Fetch="Fetch";
global.Event_Update="Update";
global.Event_Delete="Delete";
global.Event_Insert="Insert";
global.Event_Logs="Logs";
global.User_ID=2;
global.User_Name="User";
global.Download_File="Download-File";
//Body Parser Middleware - Should be defined before defining routes
app.use(
  bodyParser.json({
    limit: "400000000"
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

/* Start Routes */
const LoggerAPI = require("./routes/api/logger");

/* End Routes*/

//API
app.use("/api/v1", LoggerAPI);
module.exports = app;

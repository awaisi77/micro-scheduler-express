const express = require("express");
const router = express.Router();

router.post("/scheduler/test", async function (req, res, next) {
  console.log("starting my customer scheduler");
  console.log("doing tasks....");
  console.log("done");
  console.log("bye bye.......");
  res.send({ res: true, success: 200 });
});

module.exports = router;

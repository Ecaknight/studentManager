const express = require("express");
const path = require("path");

const router = express.Router();

const studentMangerCTL = require(path.join(__dirname,"../controllers/studentManagerController.js"));

//集中路由
router.get("/list",studentMangerCTL.getStudentListPage);

module.exports = router;
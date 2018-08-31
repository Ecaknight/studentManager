const express = require("express");
const path = require("path");

const router = express.Router();

const studentMangerCTL = require(path.join(__dirname,"../controllers/studentManagerController.js"));

//集中路由
router.get("/list",studentMangerCTL.getStudentListPage);
//获取新增页面
router.get("/add",studentMangerCTL.getAddStudentPage);
//新增请求
router.post("/add",studentMangerCTL.addStudent);
//获取编辑页面
router.get("/edit/:studentId",studentMangerCTL.getEditStudentPage);
//编辑请求
router.post("/edit/:studentId",studentMangerCTL.editStudent);
//删除请求
router.get("/delStudent/:studentId",studentMangerCTL.delStudent);

module.exports = router;
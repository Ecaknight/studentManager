const express = require("express");
const path = require("path");

const router = express.Router();

const accountController = require(path.join(__dirname,"../controllers/accountController.js"));

//转发登录页面请求
router.get("/login",accountController.loginCTL);
//转发注册页面请求
router.get("/register",accountController.registerCTL);

//转发注册请求的操作
router.post("/register",accountController.register);

//转发验证码请求
router.get("/vcode",accountController.getVcode);

//转发登录的请求
router.post("/login",accountController.login);
//退出请求
router.get("/logout",accountController.logout);

module.exports = router;
//引入模块,创建应用
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
//创建一个app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ resave: false, saveUninitialized: true,  secret: 'keyboard cat', cookie: { maxAge: 600000 }}));

//实现拦截器功能
app.all("/*",(req,res,next) => {
    if(req.originalUrl.includes("/account")) {
        next();
    }else {
        if(req.session.loginName) {
            next();
        }else {
            res.send(`<script>alert("你还未登录,请先登录"); location="/account/login";</script>`);
        }
    }
    
})

//集成路由
//获取登录页面
const accountRouter = require(path.join(__dirname,"/routers/accountRouter.js"));
//学生管理页面
const studentRouter = require(path.join(__dirname,"/routers/studentManagerRouter.js"));

app.use("/account",accountRouter);
app.use("/studentManager",studentRouter);

//开启服务
app.listen(3000,"127.0.0.1",err => {
    if(err) throw err;
    console.log("start ok");
})
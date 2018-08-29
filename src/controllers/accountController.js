const path = require("path");

const captchapng = require('captchapng');
const dbTool = require(path.join(__dirname, "../tools/dataTool.js"))

//最终的登录请求处理返回页面
exports.loginCTL = (req, res) => {
    res.sendFile(path.join(__dirname, "../statics/views/login.html"));
}

//最终的登录请求处理返回页面
exports.registerCTL = (req, res) => {
    res.sendFile(path.join(__dirname, "../statics/views/register.html"));
}

//最终的注册请求的操作 0:注册成功  1:注册失败
exports.register = (req, res) => {
    const result = { status: 0, message: "注册成功" };

    dbTool.findOne("accountInfo", { username: req.body.username }, (err, doc) => {
        if (doc) {
            //如果存在就提示用户已注册
            result.status = 1;
            result.message = "用户已注册"
            res.json(result);
        } else {
            //如果不存在就插入
            console.log(req.body);
            dbTool.insertOne("accountInfo",req.body,(err,result2) => {
                if (result2 == null) {
                    result.status = 2;
                    result.message = "注册失败"
                }
                res.json(result);
            })
          
        }
    })


}

//处理验证码的请求
exports.getVcode = (req, res) => {
    var vcode = parseInt(Math.random() * 9000 + 1000);
    //存到session中
    req.session.vcode = vcode;
    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    // var imgbase64 = new Buffer(img, 'base64');
    //代替方法测试
    const imgbase64 = Buffer.from(img,'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

//处理登录的请求
exports.login = (req, res) => {
    let result = { status: 0, message: "登录成功" };
    //如果验证码不正确就提示并终止后续操作
    if (req.body.vcode != req.session.vcode) {
        result.status = 1;
        result.message = "验证码错误";
        res.json(result);
        return;
    }

    dbTool.findOne("accountInfo", { username: req.body.username, password: req.body.password }, (err, doc) => {
        console.log(req.body);
        
        if (doc) {
            res.json(result);
        } else {
            result.status = 2;
            result.message = "用户名或密码错误";
            res.json(result);
        }
    });

}
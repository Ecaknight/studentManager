const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const captchapng = require('captchapng');


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

    // Connection URL
    const url = 'mongodb://localhost:27017';

    //数据库
    const dbName = "dataDemo";

    //连接数据库服务
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        //获取db对象
        const db = client.db(dbName);

        //获取数据库集合
        const collection = db.collection('accountInfo');

        //查询数据库,如果存在就提示
        collection.findOne({ username: req.body.username }, (err, doc) => {

            if (doc) {
                client.close();
                //如果存在就提示用户已注册
                result.status = 1;
                result.message = "用户已注册"
                res.json(result);
            } else {
                //如果不存在就插入
                console.log(req.body);
                collection.insertOne(req.body, (err, result2) => {
                    client.close();
                    if (result2 == null) {
                        result.status = 2;
                        result.message = "注册失败"
                        res.json(result);
                    }
                    res.json(result);
                });
            }
        });


    });

}

//处理验证码的请求
exports.getVcode = (req, res) => {
    var vcode = parseInt(Math.random() * 9000 + 1000);
    //存到session中
    req.session.vcode = vcode;
    var p = new captchapng(80, 30,vcode ); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

//处理登录的请求
exports.login = (req,res) => {
    let result = {status:0,message:"登录成功"};
    //如果验证码不正确就提示并终止后续操作
    if(req.body.vcode != req.session.vcode) {
        result.status = 1;
        result.message = "验证码错误";
        res.json(result);
        return;
    }

    const url = 'mongodb://localhost:27017';
    const dbName = "dataDemo";

    //连接数据库
    MongoClient.connect(url,{useNewUrlParser: true},(err,client) => {
        const db = client.db(dbName);
        const collection = db.collection("accountInfo");

        //查询数据库
        console.log(req.body);
        collection.findOne({username:req.body.username,password:req.body.password},(err,doc)=> {
            client.close();
            if(doc) {
                res.json(result);
            }else {
                result.status = 2;
                result.message = "用户名或密码错误";
                res.json(result);
            }
        });
    });
}
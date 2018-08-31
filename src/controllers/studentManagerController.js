const xtpl = require("xtpl");
const path = require("path");
//引入工具类
const dbTools = require(path.join(__dirname, "../tools/dataTool.js"));

exports.getStudentListPage = (req, res) => {
    //获取关键字
    const keyword = req.query.keyword || '';

    //调用工具类对象的方法
    dbTools.findList("studentInfo", { name: { $regex: keyword } }, (err, docs) => {
        xtpl.renderFile(path.join(__dirname, "../statics/views/list.html"), {
            students: docs,
            keyword,
            loginName: req.session.loginName
        }, (err, content) => {
            res.send(content);
        });
    })

}
//获取新增页面
exports.getAddStudentPage = (req, res) => {
    xtpl.renderFile(path.join(__dirname, "../statics/views/add.html"), {loginName: req.session.loginName}, (err, content) => {
        res.send(content);
    });
}
//新增请求
exports.addStudent = (req, res) => {

    dbTools.insertOne("studentInfo", req.body, (err, result) => {
        if (!result) {
            res.send(`<script>alert("新增失败");</script>`);
        } else {
            res.send(`<script>location = "/studentManager/list"</script>`);
        }
    });
}

//获取编辑页面
exports.getEditStudentPage = (req, res) => {

    dbTools.findOne("studentInfo", { _id: dbTools.ObjectId(req.params.studentId),loginName: req.session.loginName }, (err, doc) => {
        xtpl.renderFile(path.join(__dirname, "../statics/views/edit.html"), {
            student : doc
        }, (err, content) => {
            res.send(content);
        });
    })
}

//编辑请求
exports.editStudent = (req,res) => {
    dbTools.updateOne("studentInfo",{_id:dbTools.ObjectId(req.params.studentId)},req.body,(err,result) => {
        if (!result) {
            res.send(`<script>alert("编辑失败");</script>`);
        } else {
            res.send(`<script>location = "/studentManager/list"</script>`);
        }
    });
}

//删除请求
exports.delStudent = (req,res) => {
    dbTools.deleteOne("studentInfo",{_id:dbTools.ObjectId(req.params.studentId)},(err,result) => {
        if (!result) {
            res.send(`<script>alert("删除失败");</script>`);
        } else {
            res.send(`<script>location = "/studentManager/list"</script>`);
        }
    })
}
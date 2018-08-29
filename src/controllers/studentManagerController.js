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
            keyword
        }, (err, content) => {
            res.send(content);
        });
    })


}
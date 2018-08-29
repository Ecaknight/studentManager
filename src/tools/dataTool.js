const path = require("path");
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017"
const dbName = "szhmqd21";

/**
 * 暴露方法
 * @param {*} collectionName 
 * @param {*} params 
 * @param {*} callback 
 */
exports.findList = (collectionName, params, callback) => {

    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        //通过数据库名获取数据库对象
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.find(params).toArray((err, docs) => {
            callback(err,docs);
        })
    });
}
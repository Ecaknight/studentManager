const path = require("path");
const MongoClient = require("mongodb").MongoClient;
//设置数据库连接和数据库名字
const url = "mongodb://localhost:27017";
const dbName = "dataDemo";

/**
 * 
 * @param {*} collectionName 
 * @param {*} params 
 * @param {*} callback 
 */
exports.findList = (collectionName, params, callback) => {

    MongoClient.connect(url,{useNewUrlParser:true},(err,client) => {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.find(params).toArray((err,docs) => {
            client.close();
            //异步传值
            callback(err,docs);
        })
    })

}

//查询一条
exports.findOne = (collectionName,params,callback) => {
    MongoClient.connect(url,{useNewUrlParser:true},(err,client) => {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.findOne(params,(err,doc) => {
            client.close();
            //异步传值
            callback(err,doc);
        })
    })
}

//插入一条
exports.insertOne = (collectionName,params,callback) => {
    MongoClient.connect(url,{useNewUrlParser:true},(err,client) => {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.insertOne(params,(err,result) => {
            client.close();
            //异步传值
            callback(err,result);
        })
    })
}
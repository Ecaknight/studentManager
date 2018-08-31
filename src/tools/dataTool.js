const path = require("path");
const MongoClient = require("mongodb").MongoClient;
//ObjectId获取
const ObjectId = require("mongodb").ObjectId;
//设置数据库连接和数据库名字
const url = "mongodb://localhost:27017";
const dbName = "dataDemo";

exports.ObjectId = ObjectId;

//连接的公共函数
const connectMongo = (collectionName,callback) => {
    MongoClient.connect(url,{useNewUrlParser:true},(err,client) => {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        callback(err,client,collection);
    })
}

/**
 *
 */
exports.findList = (collectionName, params, callback) => {

    connectMongo(collectionName,(err,client,collection) => {
        collection.find(params).toArray((err, docs) => {
            client.close();
            //异步传值
            callback(err, docs);
        })
    })

}

//查询一条
exports.findOne = (collectionName, params, callback) => {
    connectMongo(collectionName,(err,client,collection) => {
        collection.findOne(params,function(err,doc) {
            client.close;
            callback(err,doc);
        })
    })

}

    



//插入一条
exports.insertOne = (collectionName, params, callback) => {
    connectMongo(collectionName,(err,client,collection) => {
        collection.insertOne(params, (err, result) => {
            client.close();
            //异步传值
            callback(err, result);
        })
    })
}

//更新一条
exports.updateOne = (collectionName,condition,params,callback) => {
    connectMongo(collectionName,(err,client,collection) => {
        collection.updateOne(condition,{$set:params},(err,result) => {
            client.close();
            callback(err,result);
        })
    })
}

//删除一条
exports.deleteOne = (collectionName,params,callback) => {
    connectMongo(collectionName,(err,client,collection) => {
        collection.deleteOne(params,(err,result) => {
            callback(err,result);
        })
    })
}
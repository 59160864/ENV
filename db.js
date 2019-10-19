const Mongodb = require('mongodb')
const MONGODB_URL = process.env.MONGODB_URL
const MongoClient = Mongodb.MongoClient

module.exports=(async()=>{
    const client = await MongoClient.connect(MONGODB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    return client
})()

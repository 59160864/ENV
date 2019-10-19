const express = require ('express')
const Mongodb = require('mongodb')
const bcryptjs = require('bcryptjs')
const app = express()
const port = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL
const MongoClient = Mongodb.MongoClient
 
 
app.use(express.json())
// console.log(`MongoURL: ${process.env.MONGODB_URL}`)
 
app.post('/register', async (req, res) => {
    let name = req.body.name
    let email = req.body.email
    let studentId = req.body.studentId
    let password = req.body.password
    let encryptedPwd = await bcryptjs.hash(req.body.password,8)
 
    const o = 
    {
        name: name,
        email: email,
        studentId: studentId,
        password: encryptedPwd
    }
    const client = await require('./db')

    const db = client.db('buu')
    const r = await db.collection('users').insertOne(o).catch((err)=> {
        console.error(`Cannot insert data to user collection: ${err}`)
        res.status(500).json({error: err})
        return
    })
    let result = {
           _id:o._id,
           name:o.name,
           email:o.email,
           studentId:o.studentId
        }
       res.status(201).json(o)
})
app.post('/sign-in', async(req,res)=>{
   let email = req.body.email
    let password = req.body.password
    const client = await require('./db')
    let db = client.db('buu')
    let user = await db.collection('users').findOne({email:email}).catch((err)=>{
        console.err(`Cannot find user with email:${err}`)
        res.status(500).json({error:err})
    })
    if(!user){
        res.status(401).json({error:`your given email has not been found`})
    }
    let passwordIsValid=await bcryptjs.compare(password,user.password)
    if(!passwordIsValid){
        res.status(401).json({error:`username/password is not match`})
        return
    }
    res.status(200).json({token:`123456789`})
})
app.listen(port,() => {
   console.log(`Start at port: ${port}`)
})

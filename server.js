const express=require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const bodyParser=require('body-parser')
//const { json } = require('body-parser')


const AuthRoute=require('./routes/auth')
const CategoryRoute = require('./routes/category')
const QuestionRoute=require('./routes/question')
mongoose.connect('mongodb://0.0.0.0:27017/testdb',{useNewUrlParser:true,useUnifiedTopology:true})
const db=mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log('Database Connection Extablished')
})
const app=express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
const PORT=process.env.PORT||3000

app.listen(PORT,()=>{
    console.log('server is listening on port',PORT)
})
app.use('/user',AuthRoute)
app.use('/devforum',CategoryRoute)
app.use('/devforum',QuestionRoute)
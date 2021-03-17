const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config({path:'./config/.env'})
const router = express.Router()
const user = require('./models/User.js')

//Connexion to database with the server
const _user =  process.env.DB_USER; 
const password = process.env.DB_PASSWORD; 
const url = `mongodb+srv://${_user}:${password}@cluster0.nzlyr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

//parse the data
app.use(express.json()) 
app.use('/user',router)
mongoose.connect(url,{useNewUrlParser: true , useUnifiedTopology: true }, (err)=>{
    err ? console.log(err) : console.log("The database is connected")
})

const port = process.env.DB_PORT;
app.listen(port, (err) => {
    err ? console.log(err) : console.log(`The server is running on port ${port}`)
})

//ADD A NEW USER TO THE DATABASE  @POST 
router.post('/adduser',(req,res)=> {
    let newuser = new user(req.body)
    newuser.save((err,data) => {
        err ? console.log(err) : res.send('user was saved')
    })
})

//RETURN ALL USERS  @GET 
router.get('/users',(req,res)=> {
    user.find({},(err,data)=> {
        err ? console.log(err) : res.send(data)
    })
})

//EDIT A USER BY ID @PUT 
router.put('/update/:id',(req,res)=> {
    user.findByIdAndUpdate({_id:req.params.id},req.body, (err)=> {
        err ? console.log(err) : res.send('user was updated')
    })
})

//DELETE A USER BY ID @DELETE 
router.delete('/delete/:id',(req,res)=> {
    user.findByIdAndDelete({_id:req.params.id},(err)=> {
        err ? console.log(err) : res.send('user was deleted')
    })
})
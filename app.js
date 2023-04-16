// const mongoose = require('mongoose')
// mongoose.connect('mongodb://127.0.0.1:27017/lec-10')

// const Car = mongoose.model('Car' , {type:String})

// const car1 = new Car({type:'audi'})

// car1.save()
// .then((data)=>{
// console.log('car added');
// })
// .catch((e)=>{
// console.log(e);
// })
//////////////////////////////////=====================///////////////////////////////////////////

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
require('./db/mongoose')


//to parse automatically
app.use(express.json())

const userRouter = require("./routers/user")

app.use(userRouter)

app.listen(PORT, ()=>{
    console.log(`server run on http://localhost:${PORT}`);
})
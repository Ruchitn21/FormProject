
const express= require("express");
const path= require("path")
const data= require("./data/data.js")

const app= express()

app.use(function (req,res,next) {
    res.setHeader("Access-Control-Allow-Origin","*")

    res.setHeader("Access-Control-Allow-Methods","GET,POST");

    res.setHeader("Access-Control-Allow-Credentials",true)

    next();
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static("C:/xampp/htdocs/form_frontend"))

app.get("/api/data",(req,res)=>{
    res.status(200).json(data)
})

const PORT= 3000
app.listen(PORT, (req,res)=>{
    console.log(`Server Running at PORT ${PORT}`)
})
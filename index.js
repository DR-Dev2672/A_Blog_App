const express=require("express")

const app=express()

const PORT=8001;

app.get("/",(req,res)=>{
    res.send("hii from server")
})

app.listen(PORT,(req,res)=>{
    console.log(`server is started at PORT:${8001}`);
})
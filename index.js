const express=require("express")
const path=require("path")

const app=express()

const PORT=8001;

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.get("/",(req,res)=>{
    res.render("home");
})

// app.get("/",(req,res)=>{
//     res.send("hii from server")
// })

app.listen(PORT,(req,res)=>{
    console.log(`server is started at PORT:${8001}`);
})
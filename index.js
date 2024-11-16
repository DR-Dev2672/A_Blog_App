const express=require("express")
const path=require("path")
const userRoute=require("./routes/userRoute")

const mongoose=require("mongoose")


const app=express()

const PORT=8001;

// mongoose.connect("mongodb://localhost:")

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.get("/",(req,res)=>{
    res.render("home");
})
app.use("/user",userRoute);

// app.get("/",(req,res)=>{
//     res.send("hii from server")
// })

app.listen(PORT,(req,res)=>{
    console.log(`server is started at PORT:${8001}`);
})
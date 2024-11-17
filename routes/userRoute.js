const {Router} =require("express")

const router=Router();
const User=require("../models/userSchema")

router.get("/signup",(req,res)=>{
    res.render("signup")
})
router.get("/signin",(req,res)=>{
    res.render("signin")
})

router.post("/signup",async (req,res)=>{
  const {fullName,email,password}=req.body;
  await User.create({
   fullName,
   email,
   password
  })
  res.redirect("/")
  
})
router.post("/signin",async (req,res)=>{
  const {email,password}=req.body;
  console.log(email,password);
  const user=await User.matchPassword(email,password);
  console.log("User",user);
  return res.redirect("/");

})

module.exports=router;

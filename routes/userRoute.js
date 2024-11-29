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
  console.log("check ")
  res.redirect("/")
  
})
router.post("/signin",async (req,res)=>{
  const {email,password}=req.body;
  try {
    const token=await User.matchPasswordAndGenerateToken(email,password);
    return res.cookie("token",token).redirect("/");
    
  } catch (error) {
    res.render("signin",{
      error:"Incorrect Email or Password",
    })
    
  }

  router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
  })
  // console.log(email,password);
  
  // console.log(token)
  
  
 

})

module.exports=router;

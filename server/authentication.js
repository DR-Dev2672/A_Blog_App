
const jwt=require("jsonwebtoken")
const secret="Batman123"

function createTokenUser(user){
    const payload={
     _id:user._id,
     email:user.email,
     profileImageUrl:user.profileImageUrl,
     role:user.role

    }
    const token=jwt.sign(payload,secret)
    return token;
}


function validateToken(token){
    const payload=jwt.verify(token,secret)
    return payload
}

module.exports={
    createTokenUser,
    validateToken
}

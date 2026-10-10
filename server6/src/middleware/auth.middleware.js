import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const verifyJwt = async(req,res,next) =>{
    try {
        // at first we will access the accessToken from cookies
        const token = req.cookies.accessToken

        if(token == "undefined"){
            return res.status(400).json({
                msg : "AccessToken Not found"
            })
        }
        // accessToken ta valid ki na
        const isValidToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        console.log(isValidToken)
        if(!isValidToken){
            return res.status(403).json({
                msg : "Unauthorized User"
            })
        }
        req.user = isValidToken.id
        // next
        next()

    } catch (error) {
        console.log("Something went wrong while verify the token",error)
    }
}


export {verifyJwt}
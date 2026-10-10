import express from "express"
import connectionDB from "./src/db/user.db.js"
import router from "./src/routes/user.route.js"
import cookieParser from "cookie-parser"

import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
connectionDB()

app.use("/app/v1/users",router)
const Port = process.env.PORT

app.listen(Port,()=>{
    console.log(`this is my localhost ${Port}`)
})
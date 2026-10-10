import express from "express"
import connectionDB from "./src/db/user.db.js"

const app = express()

connectionDB()
const Port = 5000
app.listen(Port,()=>{
    console.log(`this is my localhost ${Port}`)
})
import express from "express"
import connectionDB from "./src/db/user.db.js"
import router from "./src/routes/user.route.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
connectionDB()

app.use("/app/v1/users",router)
const Port = 5000
app.listen(Port,()=>{
    console.log(`this is my localhost ${Port}`)
})

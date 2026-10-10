import mongoose from "mongoose";
// mongoose create the connection between the server and the db

const connectionDB = async() =>{
    try {
        const connection = await mongoose.connect("mongodb+srv://salkiaaneek_db_user:tAjpvBhaI8H6APQj@cluster0.lbkatep.mongodb.net/?appName=Cluster0")
        console.log("DB connected successfully")
    } catch (error) {
        console.log("Something went wrong while connecting the db")
    }
}

export default connectionDB
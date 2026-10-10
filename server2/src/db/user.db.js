import mongoose from "mongoose";


const connectionDB = async() =>{
    try {
        const connection = await mongoose.connect("mongodb+srv://salkiaaneek_db_user:g3Ssa8ggYu7cS2Fz@cluster0.3axxy3p.mongodb.net/?appName=Cluster0")
        console.log("DB connected successfully")
    } catch (error) {
        console.log("Something went wrong while connecting the db")
    }
}

export default connectionDB
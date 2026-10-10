import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            reuired: true
        },
        email:{
            type: String,
            required: true,
            unique: true
        },                                       
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true   //  created-at , updated-at  
    })


    const User = mongoose.model("User",userSchema)   //=>collection a save hobe users name a

    export default User
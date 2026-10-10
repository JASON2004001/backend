import mongoose from "mongoose";
import bcrypt from "bcryptjs";  

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
        },
        refreshToken : {
            type: String
        }
    },
    {
        timestamps: true   //  created-at , updated-at  
    })

    userSchema.pre("save", async function(){
        if(!(this.isModified("password"))) return 
        const hashPassword = await bcrypt.hash(this.password,10)
        this.password = hashPassword
        return
    })

    const User = mongoose.model("User",userSchema)   //=>collection a save hobe users name a

    export default User
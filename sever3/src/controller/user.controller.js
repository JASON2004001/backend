import User from "../model/user.model.js"

const registerUser = async(req,res) =>{    // 200 => successfull , 201 => created ,400 => Bad request, 403=> forbidden , 404 => not found , 500 => server error
                                          // database is always in another container
    try {
        // name,email ar password user kach thake nabo
        const {name,email,password} = req.body

        // ai 3 te field ar modha jodi kichu missing thake thole ami error dabo
        if(!name || !email || !password){
           return res.status(400).json({
            message : "All fields are required"
           }) 
        }
        // existing kono email ache kina same email a 
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                message: "User already exist please logIn"
            })
        }
        // we will simple create the user
        const newUser = await User.create({name,email,password})
        return res.status(201).json({
            message: "User registered successfully",
            data: newUser
        })
    } catch (error) {
        console.log(error)
        console.log("Someting went wrong while register in the user")
    }
}


export {registerUser}
let User = require("../models/User")
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")

const signUpUser = async (req,res) =>{
    const { fname, lname, email, username, password, country, confirmpass } = req.body;

    try {

        if (!fname || !lname || !email || !username || !password || !confirmpass) {
            return res.status(400).json({ message: 'Please fill in all required fields' });
          }


      if (password !== confirmpass) {
        return res.status(400).json({ message: 'Passwords do not match' });
      }

      const imageUrl = req.file && req.file.path ? req.file.path : undefined; 
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);
  
      // Create new user with the image URL returned from Cloudinary
      const newUser = new User({
        fname,
        lname,
        email,
        username,
        password: hashedPassword,
        country,
        image: imageUrl, // This is the Cloudinary URL
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  
}

const loginUser = async (req,res) =>{

    let {email,password} = req.body
    
    try {
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                status:false,
                message:'Invalid Credentials !'
            })
        }
        let isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                status:false,
                message:"Invalid Credentials !"
            })
        }
        let token =  jwt.sign({id:user.id},process.env.JWT_SECRET_KEY,{
            expiresIn:"24h"
        })

        user.password = undefined

        return res.status(200).json({
            status:true,
            user,
            token
            
        })
        
    } catch (error) {
        return res.status(400).json({
            status:false,
            message:error
        })
    }


}

const getUserById = async (req, res) => {
    let id = req.params.id;
    try {
        let user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {signUpUser,loginUser,getUserById}
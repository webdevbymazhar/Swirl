let User = require('../models/User')
let Post = require("../models/Post")

const addFollower = async (req,res) =>{
  try {
    let {userId} = req.body
  let id = req.params.id
  await User.updateOne({
    _id : userId
  },{
    $push : {following : id}
  })

  await User.updateOne({
    _id : id
  },{
    $push : {followers : userId}
  })

  res.status(200).json({
    status:true,
    message : "User followed Successfully!"
  })

  } catch (error) {
    res.status(400).json({
        status:true,
        message : error
      })
  }

}

const removeFollower = async (req,res) =>{
    try {
        let {userId} = req.body
      let id = req.params.id
      await User.updateOne({
        _id : userId
      },{
        $pull : {following : id}
      })
    
      await User.updateOne({
        _id : id
      },{
        $pull : {followers : userId}
      })
    
      res.status(200).json({
        status:true,
        message : "User un-followed Successfully!"
      })
    
      } catch (error) {
        res.status(400).json({
            status:true,
            message : error
          })
      }
    
}

const getFollowersPosts = async (req, res) => {
  let id = req.params.id;
  try {
    
    let user = await User.findById(id);

    if(!user){
      return res.status(400).json({
        status:false,
        message: " USER NOT THERE !"
      })
    }

   
    let followersArray = user.followers.map((v) => v);
   

    let posts = await Post.find({ userId: { $in: followersArray } })
      .sort({ updatedAt: -1 });
    let usersData = await User.find({ _id: { $in: followersArray } }).select("fname lname username image country  ");
    let userMap = {};
    usersData.forEach((v)=>{
         userMap[v._id] = v
    })

 
    let postsWithUserData = posts.map((post) => ({
      ...post._doc,
      user: userMap[post.userId] || null, 
    }));

    res.json(postsWithUserData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


const getFollowersById = async (req, res) => {
  let id = req.params.id;
  try {
    // Find the user by ID
    let user = await User.findById(id);
    
    // Check if the user exists
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found!"
      });
    }

    // Get the list of followers
    let userfollowers = user.followers.map((v)=>{
      return v
    })

    // Find followers by their IDs
    let followers = await User.find({ _id: { $in: userfollowers } });

    // Check if any followers are found
    if (!followers || followers.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No followers found"
      });
    }

    // Send the list of followers
    res.json(followers);

  } catch (error) {
    // Handle any errors
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Server Error"
    });
  }
};



module.exports = {addFollower,removeFollower,getFollowersPosts,getFollowersById}
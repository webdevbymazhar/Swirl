const { default: mongoose } = require("mongoose")
let Post = require("../models/Post")
let User = require("../models/User")

const createPost = async (req, res) => {
    const { content, userId } = req.body;
    let image = req.file && req.file.path ? req.file.path : undefined
    
    

  
    try {
      if (!content || !userId) {
        return res.status(400).json({
          status: false,
          message: "Please add content",
        });
      }
  
    //   if (!image) {
    //     return res.status(400).json({
    //       status: false,
    //       message: "Please add image!",
    //     });
    //   }

      const newPost = new Post({
        content,
        userId,
        image 
      });
  
      await newPost.save();
  
      await User.updateOne(
        { _id: userId },
        { $push: { posts: newPost._id } }  
      );
  
      res.status(200).json({
        status: true,
        message: "Post created successfully!",
        post: newPost,
      });
    } catch (error) {
      console.error("Error creating post:", error); 
      res.status(500).json({
        status: false,
        message: "An error occurred while creating the post.",
      });
    }
  };

const updatePost = async (req,res) => {
    let id = req.params.id
     try {
        let updatedPost = await Post.findByIdAndUpdate(id, req.body, {
            new: true,       
            runValidators: true 
        });
        res.status(200).json({
            status:true,
            message:"Post Updated Successfully",
            newpost : updatedPost
        })
     } catch (error) {
        res.status(400).json({
            status:true,
            message:error
        })
     }
}

const addComment = async (req,res) => {
 
   try {
    let {postId,content,userId} = req.body
    if(!content){
        res.status(400).json({
            status:false,
            message: "Please add some content to comment!"
        })
    }
    await Post.updateOne(
        {_id : postId},
        {
            $push: {
                comments: {
                    user: userId,
                    content: content
                }
            }
        }
    )
    res.status(200).json({
        status:true,
        message: "Comment Added Successfully!"
    })
   } catch (error) {
    res.status(400).json({
        status:false,
        message: error
    })
   }
}

const deletePost = async (req,res) =>{
    let id = req.params.id
try {
  await Post.findByIdAndDelete(id)
  res.status(200).json({
    status:true,
    message : "Post deleted Successfully" 
  })
} catch (error) {
    res.status(400).json({
        status:false,
        message : error
      })
}
}

const getAllPosts = async (req,res) =>{
    try {
        let posts = await Post.find()
        res.status(200).json({
            status:true,
            message:posts
        })
    } catch (error) {
        res.status(400).json({
            status:true,
            message:error
        })
    }
}

const getPostById = async (req,res) =>{
    let id = req.params.id
    try {
        let post = await Post.findById(id)
        res.status(200).json({
            status:true,
            message : post
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            message : error
        })
    }
}

const removeComment = async (req,res) =>{
    let commentId = req.params.id
    let {postId} = req.body
    
    try {
        await Post.updateOne(
            {_id : postId},
            { $pull: { comments: { _id: commentId } } }
        )
        res.status(200).json({
            status:true,
            message: "Comment Deleted Successfully!"
        })
       } catch (error) {
        res.status(400).json({
            status:false,
            message: error
        })
       }
}

const addLike = async (req,res) =>{
    let {userId} = req.body
    let postId = req.params.id
    try {
        await Post.updateOne(
            { _id: postId },
            { $push: { likes: userId } }
        );


        res.status(200).json({
            status:true,
            message:"Post Liked Successfully!"
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            message:error
        })
    }
}

const removelike = async (req,res) =>{
    let {userId} = req.body
    let postId = req.params.id
    try {
        await Post.updateOne(
            { _id: postId },
            { $pull: { likes: userId } }
        );


        res.status(200).json({
            status:true,
            message:"Post Un-Liked Successfully!"
        })
    } catch (error) {
        res.status(400).json({
            status:false,
            message:error
        })
    }
}

const postByUserId = async (req,res) =>{
   let id = req.params.id
   try { 
    let posts = await Post.find({userId : id}).sort({ updatedAt: -1 });
    res.status(200).json({
        status:true,
        message:posts
    })
   } catch (error) {
    res.status(400).json({
        status:false,
        message:error
    })
   }
}
module.exports = {createPost,addComment,updatePost,deletePost,getAllPosts,getPostById,removeComment,addLike,removelike,postByUserId}
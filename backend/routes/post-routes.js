const express = require("express");
const {
  createPost,
  addComment,
  updatePost,
  deletePost,
  getAllPosts,
  getPostById,
  removeComment,
  addLike,
  removelike,
  postByUserId
} = require("../controllers/post-controller");
const router = express.Router();
const multer = require('multer');
const { postStorage } = require('../cloudinary');
const upload = multer({ storage : postStorage });

router.post("/create-post", upload.single('image')  ,createPost);
router.patch("/add-comment", addComment);
router.patch("/update-post/:id", updatePost);
router.delete("/delete-post/:id", deletePost);
router.get("/all-posts", getAllPosts);
router.get("/get-post/:id", getPostById);
router.get("/post-by-user/:id",postByUserId)
router.patch("/delete-comment/:id", removeComment);
router.patch("/add-like/:id", addLike);
router.patch("/remove-like/:id", removelike);



module.exports = router;

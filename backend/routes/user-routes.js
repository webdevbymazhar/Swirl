const express = require("express")
const router = express.Router()
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});
const {signUpUser,loginUser, getUserById} = require("../controllers/user-controllers")

router.post("/signup",upload.single('image'),signUpUser)
router.post("/login",loginUser)
router.get("/get-user-by-id/:id",getUserById)


module.exports = router
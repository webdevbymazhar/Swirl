const express = require("express")
const router = express.Router()
const {addFollower,removeFollower, getFollowersPosts, getFollowersById} = require("../controllers/follower-controller")

router.patch("/add-follower/:id",addFollower)
router.patch("/remove-follower/:id",removeFollower)
router.get("/get-followers-post/:id",getFollowersPosts)
router.get("/get-followers/:id",getFollowersById)







module.exports = router
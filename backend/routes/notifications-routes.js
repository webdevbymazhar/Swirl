const express = require("express")
const router = express.Router()
let {sendNotification,getNotificationsById} = require("../controllers/notifications-controllers.js")

router.patch("/send/:id",sendNotification)
router.get("/get/:id",getNotificationsById)

module.exports = router
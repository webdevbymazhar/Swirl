const express = require("express")
const app = express()
const userRoutes = require("./routes/user-routes")
const { default: mongoose } = require("mongoose")
require('dotenv').config()
const cors = require('cors')
const postRoutes = require("./routes/post-routes")
const followerRoutes = require("./routes/follower-routes")
const notificationsRoute = require("./routes/notifications-routes")

app.use(cors())
app.use(express.json())
app.use("/user/",userRoutes)
app.use("/post/",postRoutes)
app.use("/",followerRoutes)
app.use("/notification",notificationsRoute)



mongoose.connect(process.env.DATABASE_URL).
then(()=>console.log("Connected to Db!")).
catch(()=>console.log("Not Connected!"))


app.get("/",(req,res)=>{
    res.send("Welcome to SWIRL API !")
})

app.listen(8000,()=>{
    console.log("listening from port 8000")
})
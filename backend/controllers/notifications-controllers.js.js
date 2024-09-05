const User = require("../models/User");

const sendNotification = async (req, res) => {
    const id = req.params.id;

    try {
        const { message, userId } = req.body;
        const fetchUser = await User.findById(userId).select("_id username image");

       

        let updatedUser = await User.findByIdAndUpdate(
            id,
            {notifications: {
            user: fetchUser,
            message: message
            }
            },
            { new: true }
        );

       

        return res.status(200).json({
            success: true,
            response: updatedUser
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};


const getNotificationsById = async (req,res) =>{
    let id = req.params.id
    try {
        let user = await User.findById(id)
        let notifications = user.notifications
        return res.status(200).json({
            notifications
        })
    } catch (error) {
        return res.status(200).json({
            success:true,
            message:error
        })
    }
}
module.exports = {sendNotification,getNotificationsById}
const express = require('express');
const router = express.Router();
const User = require('../../models/user.model')

router.post('/update-profile', async (req, res, next) => {
    let {profileImage, profileBio} = req.body
    let userID = req.user._id 
    let profileUser = await User.findOne({_id : userID}) 
    if(profileImage){
        profileUser.profilePic = profileImage
    }

    if(profileBio){
        profileUser.profileBio =  profileBio
        
    }
    let response = await profileUser.save()
    req.session.passport.user=response;
    return res.status(200).json({user:response});
});



module.exports = router;
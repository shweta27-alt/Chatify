const express = require('express');
const router = express.Router();
const User = require("../../models/user.model")

router.get('/usersearch', async (req, res, next) => {
   let userquery = req.query.search;
   if(userquery){
    let query =  {$or : [{fullName: {$regex: userquery,$options:"i"}},{email: {$regex: userquery,$options:"i"}},{ "mobile.phoneNumber" : {$regex: userquery,$options:"i"}}]}
    let response = await User.getUserByQuery(query,req.user._id);
    return res.status(200).json({users : response});
   }
   return res.status(200).json({users : []});
   
});



module.exports = router;
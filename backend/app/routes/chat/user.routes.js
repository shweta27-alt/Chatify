const express = require('express');
const router = express.Router();
const User = require("../../models/user.model");
const {checkAuthenticated} = require('../../middlewares');

//route to search for users
router.get('/usersearch',checkAuthenticated, async (req, res, next) => {
   let userquery = req.query.search;
   if(userquery){
   //check for userquery can be a fullName or email or mobile
    let query =  {$or : [{fullName: {$regex: userquery,$options:"i"}},{email: {$regex: userquery,$options:"i"}},{ "mobile.phoneNumber" : {$regex: userquery,$options:"i"}}]}
    let response = await User.getUserByQuery(query,req.user._id);
    return res.status(200).json({users : response});
   }
   return res.status(200).json({users : []});
   
});



module.exports = router;
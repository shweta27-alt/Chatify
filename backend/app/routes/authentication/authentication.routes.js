const express = require('express');
const router = express.Router();
const User = require('../../models/user.model');
const passport = require('passport');
const {checkAuthenticated} = require('../../middlewares')

//route to login with username password
router.post('/login', async(req,res)=>{
  //calling passport local stratergy
  passport.authenticate('local', function (err, user, info) {
    if (!user || err) {
        return res.status(400).json({
            message: (err && err.message) || 'Oops something went wrong',
        });
    }
    //if successfully authenticated login using login middleware
    req.login(user, (err, data) => {
        if (err) {
            return res.status(400).json({
                message: err.message || 'Oops something went wrong',
            });
        }
        res.json({
            user: user,
        });
    });
})(req, res);

})

//route to logout user
router.post('/logout',async(req,res)=>{
  req.logout(req,res)
  .then(()=>{
    return res.status(200).json({ message : {success : true}})
  })
  .catch(()=>{
  return res.status(400).json({message : "Oops something went wrong"})
  })
})

//route to register new user 
router.post('/register/form', async (req, res) => {
  let { body } = req
  let { fullName, phoneNumber, countryCode = 91, emailAddress, password } = body
  //validation for all fields 
  if (!fullName) {
    return res.status(400).json({ message: "Invalid FullName" })
  }

  if (!phoneNumber && phoneNumber.length != 10) {
    return res.status(400).json({ message: "Invalid PhoneNumber" })
  }

  if (!emailAddress) {
    return res.status(400).json({ message: "Invalid EmailAddress" })
  }


  if (!password) {
    return res.status(400).json({ message: "Invalid password" })
  }

   //check if phone number registerd to any other user
  let phoneUser = await User.getUserByPhoneNumber(phoneNumber, countryCode)
  if (phoneUser) {
    return res.status(400).json({ message: "Phone number already taken" })
  }


  //check if email registerd to any other user
  let emailUser = await User.getUserByEmail(emailAddress)
  if (emailUser) {
    return res.status(400).json({ message: "Email already taken" })
  }

  //create a user 
  let newUser = {
    email: emailAddress,
    mobile: {
      phoneNumber,
      countryCode
    },
    fullName: fullName,
    username: emailAddress
  }


  let user = await User.register(new User(newUser), password)
  return req.login(user, async (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({
      user
    });
  });
})

//route to user session for a valid session check
router.get('/usersession', checkAuthenticated,async(req,res,next)=>{
   res.json({user:req.user})
})


module.exports = router;
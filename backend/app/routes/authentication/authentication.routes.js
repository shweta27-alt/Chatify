const express = require('express');
const router = express.Router();
const User = require('../../models/user.model');
const passport = require('passport');
const {checkAuthenticated} = require('../../middlewares')

router.post('/login', async(req,res)=>{
  passport.authenticate('local', function (err, user, info) {
    if (!user || err) {
        return res.status(400).json({
            message: (err && err.message) || 'Oops something went wrong',
        });
    }
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

router.post('/logout',async(req,res)=>{
  req.logout(req,res)
  .then(()=>{
    return res.status(200).json({ message : {success : true}})
  })
  .catch(()=>{
  return res.status(400).json({message : "Oops something went wrong"})
  })
})

router.post('/register/form', async (req, res) => {
  let { body } = req
  let { fullName, phoneNumber, countryCode = 91, emailAddress, password } = body
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

  let phoneUser = await User.getUserByPhoneNumber(phoneNumber, countryCode)
  console.log(phoneUser)
  if (phoneUser) {
    return res.status(400).json({ message: "Phone number already taken" })
  }



  let emailUser = await User.getUserByEmail(emailAddress)
  if (emailUser) {
    return res.status(400).json({ message: "Email already taken" })
  }


  let newUser = {
    email: emailAddress,
    mobile: {
      phoneNumber,
      countryCode
    },
    fullname: fullName,
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


router.get('/usersession', checkAuthenticated,async(req,res,next)=>{
   res.json({user:req.user})
})




router.get('/test', async (req, res, next) => {
  console.log(req.session);
  // const newuser = new user({
  //     profilepic: "https://res.cloudinary.com/my_cloud/image/upload/t_transf1/t_transf2/v1/my_path/sample.jpg",
  //     profilebio: "I'm cool",
  //     email: "shweta@gmail.com",
  //     salt:{value:"!@#$$" },
  //     hash :{value:"####"},
  //     mobile: 88505558567,
  //     archive: true,

  // })
  // await newuser.save()

  // const newchat = new chat({
  //     isgroupchat : true,
  //     user: ["63b15d4cb2e092ebb1c28204", "63b15d4cb2e092ebb1c28204"],
  //     chatname:"friends",
  //     groupadmin:"63b15d4cb2e092ebb1c28204",
  //     latestmessage:"63b15d4cb2e092ebb1c28204"
  // })
  // await newchat.save()

  // const newmessage = new message ({
  //    readby:["63b15fafc5e214e62f3c8570"],
  //    sender:"63b15fafc5e214e62f3c8570",
  //    content: "hey, let's meet",
  //    chat:"63b15fafc5e214e62f3c8570"
  // })
  // await newmessage.save() 

  
  req.login({ mobile: '999999999' }, (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json({
      userExists: true,
      user: { mobile: '999999999' },
    });
  });

});



module.exports = router;
function checkAuthenticated(req,res,next){
  if(req.isAuthenticated()){
     return next()
  }

  return res.status(401).json({authenticated:false})
}

module.exports.checkAuthenticated = checkAuthenticated
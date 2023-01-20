const express = require('express');
const router = express.Router();




router.get('/test', async (req, res, next) => {
    return res.status(200).json({success:true});
});



module.exports = router;
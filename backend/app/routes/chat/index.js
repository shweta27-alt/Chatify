const express = require('express');
const router = express.Router();


router.use('/', require(`./chat.routes`));
router.use('/', require(`./message.routes`));
router.use('/', require(`./user.routes`));


module.exports = router;
const express = require('express');
const router = express.Router();

// @route GET api/posts/test
// @desc Test Profile Route
// @access Public
router.get('/test',(req,res)=> res.json({msg:'Hello Profile'}));

module.exports = router;
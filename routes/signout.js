/**
 * Created by dipper on 2016/11/17.
 */
var express = require('express');
var router = express.Router();


var checkLogin = require('../middlewares/check').checkLogin;

/**
 * GET /signout 登出
 */
router.get('/',checkLogin,function (req,res,next) {
    
})

module.exports = router;